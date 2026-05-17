import { ads } from "@/components/theme/listing/data";
import AdsCard from "@/components/theme/listing/ads-card";

export default function ListingSection() {
    // Sort: highlight first
    const sorted = [...ads].sort((a, b) => (b.highlight ? 1 : 0) - (a.highlight ? 1 : 0));

    return (
        <section className="w-full px-4 py-2 mt-5">
            <h2 className="text-sm font-semibold text-black1 mb-3">Iklan Terbaru</h2>

            <div className="grid grid-cols-2 gap-3">
                {sorted.map((ad) => (
                    <AdsCard key={ad.id} ad={ad} />
                ))}
            </div>
        </section>
    );
}

