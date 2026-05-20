import { supabaseAdmin } from "@/lib/supabase";
import { toAdSlug } from "@/lib/ad-slug";
import AdsCard from "@/components/theme/listing/ads-card";
import SearchPageClient from "@/components/search/search-page-client";
import { formatDistanceToNow } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { auth } from "@/lib/auth";

type Props = { searchParams: Promise<{ q?: string }> };

export default async function AdsSearchPage({ searchParams }: Props) {
    const { q } = await searchParams;
    const query = (q ?? "").trim();
    const session = await auth();
    const userEmail = session?.user?.email;

    let ads: {
        id: string; title: string; cover_image: string;
        price: number; lokasi: string; created_at: string;
    }[] = [];

    let favoritedIds: Set<string> = new Set();

    if (query) {
        const { data } = await supabaseAdmin
            .from("ads")
            .select("id, title, cover_image, price, lokasi, created_at")
            .eq("status", "active")
            .or(
                `title.ilike.%${query}%,subcategory.ilike.%${query}%,lokasi.ilike.%${query}%`
            )
            .order("created_at", { ascending: false })
            .limit(40);

        ads = data ?? [];

        if (userEmail && ads.length > 0) {
            const { data: favs } = await supabaseAdmin
                .from("favorites")
                .select("ad_id")
                .eq("user_email", userEmail);

            if (favs) {
                // Normalize stored IDs (handling potential slugs)
                favoritedIds = new Set(favs.map(f =>
                    f.ad_id.includes("--") ? f.ad_id.split("--").pop()! : f.ad_id
                ));
            }
        }
    }

    return (
        <SearchPageClient initialQuery={query}>
            {/* Results */}
            {!query ? (
                <p className="text-gray-400 text-sm text-center py-16">Ketik sesuatu untuk mencari iklan</p>
            ) : ads.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-16">
                    Tidak ada iklan untuk &ldquo;{query}&rdquo;
                </p>
            ) : (
                <>
                    <p className="text-gray-500 text-xs mb-3">{ads.length} iklan ditemukan</p>
                    <div className="grid grid-cols-2 gap-3">
                        {ads.map((ad) => (
                            <AdsCard
                                key={ad.id}
                                id={ad.id}
                                slug={toAdSlug(ad.title, ad.id)}
                                title={ad.title}
                                imageCover={ad.cover_image}
                                price={`EGP ${Number(ad.price).toLocaleString()}`}
                                location={ad.lokasi}
                                time={formatDistanceToNow(new Date(ad.created_at), {
                                    addSuffix: true,
                                    locale: localeId,
                                })}
                                initialFavorited={favoritedIds.has(ad.id)}
                                isLoggedIn={!!session}
                            />
                        ))}
                    </div>
                </>
            )}
        </SearchPageClient>
    );
}
