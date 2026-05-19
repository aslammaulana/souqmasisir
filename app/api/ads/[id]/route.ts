import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

// Helper — get user_id from session email
async function getUserId(email: string): Promise<string | null> {
    const { data } = await supabaseAdmin
        .from("users")
        .select("id")
        .eq("email", email)
        .single();
    return data?.id ?? null;
}

// ── GET /api/ads/[id] — public detail ─────────────────────────
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const { data, error } = await supabaseAdmin
        .from("ads")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !data) return NextResponse.json({ error: "Ad not found" }, { status: 404 });
    return NextResponse.json(data);
}

// ── PATCH /api/ads/[id] — update (owner only) ─────────────────
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const userId = await getUserId(session.user.email);
    if (!userId) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const body = await req.json();
    const {
        subcategory, kondisi, lokasi, lokasi_maps,
        cover_image, images,
        title, description, price, whatsapp, status,
    } = body;

    const { data, error } = await supabaseAdmin
        .from("ads")
        .update({
            ...(subcategory !== undefined && { subcategory }),
            ...(kondisi !== undefined && { kondisi }),
            ...(lokasi !== undefined && { lokasi }),
            ...(lokasi_maps !== undefined && { lokasi_maps }),
            ...(cover_image !== undefined && { cover_image }),
            ...(images !== undefined && { images }),
            ...(title !== undefined && { title }),
            ...(description !== undefined && { description }),
            ...(price !== undefined && { price: Number(price) }),
            ...(whatsapp !== undefined && { whatsapp }),
            ...(status !== undefined && { status }),
            updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .eq("user_id", userId)   // ensure ownership
        .select()
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data) return NextResponse.json({ error: "Ad not found or not yours" }, { status: 404 });

    // Invalidate homepage cache so changes appear immediately
    revalidatePath("/");

    return NextResponse.json(data);
}

// ── DELETE /api/ads/[id] — delete (owner only) ────────────────
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const userId = await getUserId(session.user.email);
    if (!userId) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const { error } = await supabaseAdmin
        .from("ads")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);  // ensure ownership

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Invalidate homepage cache so ad is removed immediately
    revalidatePath("/");

    return NextResponse.json({ success: true });
}
