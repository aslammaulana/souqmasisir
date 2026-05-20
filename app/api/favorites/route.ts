import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import { extractIdFromSlug } from "@/lib/ad-slug";

// POST /api/favorites
// Body: { adId: string }
// Toggles favorite: inserts if not exists, deletes if exists.
// Returns: { favorited: boolean }
export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { adId: rawAdId } = await req.json();
    if (!rawAdId) {
        return NextResponse.json({ error: "adId is required" }, { status: 400 });
    }

    // Ensure we use the UUID part even if a slug was passed
    const adId = rawAdId.includes("--") ? extractIdFromSlug(rawAdId) : rawAdId;

    const userEmail = session.user.email;

    // Check if already favorited
    const { data: existing } = await supabaseAdmin
        .from("favorites")
        .select("id")
        .eq("user_email", userEmail)
        .eq("ad_id", adId)
        .maybeSingle();

    if (existing) {
        // Unfavorite
        await supabaseAdmin
            .from("favorites")
            .delete()
            .eq("user_email", userEmail)
            .eq("ad_id", adId);

        return NextResponse.json({ favorited: false });
    } else {
        // Favorite
        await supabaseAdmin
            .from("favorites")
            .insert({ user_email: userEmail, ad_id: adId });

        return NextResponse.json({ favorited: true });
    }
}
