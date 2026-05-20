import { supabaseAdmin } from "@/lib/supabase";
import AdsCard from "@/components/theme/listing/ads-card";
import { toAdSlug } from "@/lib/ad-slug";
import { formatDistanceToNow } from "date-fns";
import { id as localeId } from "date-fns/locale";

type Props = {
    favoritedIds: Set<string>;
    isLoggedIn: boolean;
};

export default async function ListingSection({ favoritedIds, isLoggedIn }: Props) {
    const { data: ads } = await supabaseAdmin
        .from("ads")
        .select("id, title, cover_image, price, lokasi, created_at, status")
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(20);

    const list = ads ?? [];

    return (
        <section className="w-full px-4 py-2 mt-5">
            <h2 className="text-sm font-semibold text-black1 mb-3">Iklan Terbaru</h2>

            {list.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-8">Belum ada iklan</p>
            ) : (
                <div className="grid grid-cols-2 gap-3">
                    {list.map((ad) => (
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
                            isLoggedIn={isLoggedIn}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
