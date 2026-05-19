import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

// GET — fetch current user profile from Supabase
export async function GET() {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabaseAdmin
        .from("users")
        .select("id, name, image, bio, phone, created_at")
        .eq("email", session.user.email)
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
}

// PATCH — update bio and phone
export async function PATCH(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, bio, phone } = body;

    const { data, error } = await supabaseAdmin
        .from("users")
        .update({
            ...(name !== undefined && { name }),
            ...(bio !== undefined && { bio }),
            ...(phone !== undefined && { phone }),
            updated_at: new Date().toISOString(),
        })
        .eq("email", session.user.email)
        .select()
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
}
