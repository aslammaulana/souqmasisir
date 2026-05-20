import { supabaseAdmin } from "@/lib/supabase";
import { auth } from "@/lib/auth";
import MyAdsClient from "./myads-client";

export type FavoriteAd = {
    id: string;
    title: string;
    price: number;
    cover_image: string;
    lokasi: string;
    kondisi: string;
    created_at: string;
};

export default async function MyAdsList() {
    const session = await auth();
    const userId = session?.user?.id;
    const userEmail = session?.user?.email;

    if (!userId || !userEmail) return null;

    // Fetch user's own ads
    const { data: ads } = await supabaseAdmin
        .from("ads")
        .select("id, title, price, cover_image, lokasi, kondisi, status, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    // Step 1: Fetch favorited ad_ids ordered by when user favorited (ascending = oldest first)
    const { data: favRows } = await supabaseAdmin
        .from("favorites")
        .select("ad_id, created_at")
        .eq("user_email", userEmail)
        .order("created_at", { ascending: false });

    let favoriteAds: FavoriteAd[] = [];

    if (favRows && favRows.length > 0) {
        // Normalize: extract UUID from slugs if any legacy data exists
        const adIds = favRows.map((f) =>
            f.ad_id.includes("--") ? f.ad_id.split("--").pop()! : f.ad_id
        );

        // Step 2: Fetch the actual ad data using those IDs
        const { data: favAdData } = await supabaseAdmin
            .from("ads")
            .select("id, title, price, cover_image, lokasi, kondisi, created_at")
            .in("id", adIds)
            .eq("status", "active");

        // Re-sort to match the favorites order (oldest favorite first)
        // .in() doesn't preserve order, so we do it manually
        if (favAdData) {
            const adMap = new Map(favAdData.map((ad) => [ad.id, ad]));
            favoriteAds = adIds
                .map((id) => adMap.get(id))
                .filter(Boolean) as FavoriteAd[];
        }
    }

    return (
        <MyAdsClient
            initialAds={ads ?? []}
            initialFavorites={favoriteAds}
        />
    );
}
