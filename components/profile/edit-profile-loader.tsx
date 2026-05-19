import { supabaseAdmin } from "@/lib/supabase";
import { auth } from "@/lib/auth";
import EditProfileForm from "./edit-profile-form";

export default async function EditProfileLoader() {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) return null;

    const { data: dbUser } = await supabaseAdmin
        .from("users")
        .select("name, bio, phone")
        .eq("id", userId)
        .single();

    return (
        <EditProfileForm
            initialData={{
                name: dbUser?.name ?? "",
                bio: dbUser?.bio ?? "",
                phone: dbUser?.phone ?? "",
                email: session.user?.email ?? "",
                avatarUrl: session.user?.image ?? null,
            }}
        />
    );
}
