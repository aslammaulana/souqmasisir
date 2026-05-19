import { supabaseAdmin } from "@/lib/supabase";
import { auth } from "@/lib/auth";
import ProfileAdsClient from "./profile-ads-client";

export default async function ProfileAdsList() {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) return null;

    const { data: ads } = await supabaseAdmin
        .from("ads")
        .select("id, title, price, cover_image, lokasi, kondisi, status, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    return <ProfileAdsClient initialAds={ads ?? []} />;
}
