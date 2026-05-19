import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import { extractIdFromSlug } from "@/lib/ad-slug";
import { categories } from "@/components/post-ads/data";
import AdsCarousel from "@/components/theme/ads-detail/carousel";
import PriceInfo from "@/components/theme/ads-detail/price-info";
import Description from "@/components/theme/ads-detail/description";
import SellerInfo from "@/components/theme/ads-detail/seller-info";
import AdsFooter from "@/components/theme/ads-detail/ads-footer";
import { formatDistanceToNow } from "date-fns";
import { id as localeId } from "date-fns/locale";

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function AdsPage({ params }: Props) {
    const { slug } = await params;
    const id = extractIdFromSlug(slug);   // pulls UUID from "title-slug--uuid"

    // Fetch ad from Supabase by UUID
    const { data: ad } = await supabaseAdmin
        .from("ads")
        .select("*, users(name, image)")
        .eq("id", id)
        .single();

    if (!ad) return notFound();

    const allImages = [ad.cover_image, ...(ad.images ?? [])].filter(Boolean);
    const timeAgo = formatDistanceToNow(new Date(ad.created_at), {
        addSuffix: true,
        locale: localeId,
    });
    const sellerName = (ad.users as { name: string; image: string } | null)?.name ?? "Penjual";
    const sellerImage = (ad.users as { name: string; image: string } | null)?.image ?? "/brand/logo-souqmasisir.png";

    // Resolve category label from category_id (stored in data.ts, not DB)
    const categoryLabel = categories.find((c) => c.id === ad.category_id)?.label ?? "";

    return (
        <div style={{ backgroundColor: "#ffffff", color: "#141414", minHeight: "100dvh" }}>
            <div style={{ maxWidth: 512, margin: "0 auto" }}>
                <AdsCarousel images={allImages} title={ad.title} />
                <PriceInfo
                    price={`EGP ${Number(ad.price).toLocaleString()}`}
                    title={ad.title}
                    time={timeAgo}
                    location={ad.lokasi}
                />

                {/* ── Category / Meta chips ── */}
                <div className="px-4 pt-4 pb-4 border-b border-gray-100">
                    <div className="flex flex-wrap gap-2">
                        {categoryLabel && (
                            <span className="px-3 py-1 rounded-full border border-blue-600 bg-blue-50 text-blue-700  text-xs font-semibold">
                                {categoryLabel}
                            </span>
                        )}
                        {ad.subcategory && (
                            <span className="px-3 py-1 rounded-full border border-blue-600 bg-blue-50 text-blue-700 text-xs font-semibold">
                                {ad.subcategory}
                            </span>
                        )}
                        {ad.lokasi && (
                            <span className="px-3 py-1 rounded-full border border-blue-600 bg-blue-50 text-blue-700 text-xs font-semibold">
                                {ad.lokasi}
                            </span>
                        )}
                        {ad.kondisi && (
                            <span className="px-3 py-1 rounded-full border border-blue-600 bg-blue-50 text-blue-700 text-xs font-semibold">
                                Kondisi: {ad.kondisi}
                            </span>
                        )}
                    </div>
                </div>

                <Description description={ad.description} />
                <SellerInfo seller={sellerName} userImage={sellerImage} />
                <div style={{ height: 80 }} />
            </div>
            <AdsFooter whatsapp={ad.whatsapp} title={ad.title} />
        </div>
    );
}
