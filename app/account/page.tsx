import { auth } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import { formatJoinDate } from "@/lib/format-date";
import Footer from "@/components/theme/footer";
import AccountHeader from "@/components/account/AccountHeader";
import UserSection from "@/components/account/UserSection";
import EditProfileButton from "@/components/account/EditProfileButton";
import ProfileCompletion from "@/components/account/ProfileCompletion";
import AccountMenu from "@/components/account/AccountMenu";

export default async function AccountPage() {
    const session = await auth();

    // Defaults for unauthenticated users
    let name = "Guest";
    let imageUrl: string | null = null;
    let joinDate = "";

    if (session?.user?.email) {
        const { data } = await supabaseAdmin
            .from("users")
            .select("name, image, created_at")
            .eq("email", session.user.email)
            .single();

        if (data) {
            name = data.name ?? name;
            imageUrl = data.image ?? null;
            joinDate = formatJoinDate(data.created_at);
        }
    }

    return (
        <div className="flex flex-col max-w-lg mx-auto min-h-screen bg-white pb-24">
            <AccountHeader />
            <UserSection name={name} imageUrl={imageUrl} joinDate={joinDate} />
            <EditProfileButton />
            <ProfileCompletion completedSteps={2} totalSteps={6} />
            <AccountMenu />
            <Footer />
        </div>
    );
}
