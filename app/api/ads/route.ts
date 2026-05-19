import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

// ── GET — list all ads for the logged-in user ──────────────────
export async function GET() {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user id from DB
    const { data: user } = await supabaseAdmin
        .from("users")
        .select("id")
        .eq("email", session.user.email)
        .single();

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const { data, error } = await supabaseAdmin
        .from("ads")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
}

// ── POST — create a new ad ─────────────────────────────────────
export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: user } = await supabaseAdmin
        .from("users")
        .select("id")
        .eq("email", session.user.email)
        .single();

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const body = await req.json();
    const {
        category_id, subcategory, kondisi, lokasi, lokasi_maps,
        cover_image, images,
        title, description, price, whatsapp,
    } = body;

    // Basic validation
    if (!subcategory || !kondisi || !lokasi || !cover_image || !title || !description || !price || !whatsapp) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
        .from("ads")
        .insert({
            user_id: user.id,
            category_id,
            subcategory,
            kondisi,
            lokasi,
            lokasi_maps: lokasi_maps ?? null,
            cover_image,
            images: images ?? [],
            title,
            description,
            price: Number(price),
            whatsapp,
        })
        .select()
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data, { status: 201 });
}
