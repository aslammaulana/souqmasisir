"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import Footer from "@/components/theme/footer";
import PopupNew from "@/components/post-ads/popup-new";
import { categories, type Category } from "@/components/post-ads/data";

export default function NewAdsPage() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const filtered = categories.filter((c) =>
        c.label.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelectSub = (subLabel: string) => {
        // Convert label to URL-safe slug: "Handphone & Gadget" → "handphone-&-gadget"
        const slug = encodeURIComponent(subLabel.toLowerCase().replace(/\s+/g, "-"));
        router.push(`/myads/new/${slug}`);
    };

    return (
        <div className="flex flex-col max-w-lg mx-auto min-h-screen bg-white pb-24">

            {/* ── Header ── */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200">
                <Link href="/myads" aria-label="Back">
                    <HiArrowLeft size={22} className="text-gray-900" />
                </Link>
                <span className="text-gray-900 font-bold text-base">Sell Now</span>
            </div>

            {/* ── Search Bar ── */}
            <div className="px-5 pt-5 pb-4">
                <div className="flex items-center overflow-hidden rounded-xl border border-gray-200">
                    <input
                        type="text"
                        placeholder="Cari Kebutuhan Kamu..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none bg-white"
                    />
                    <button
                        className="w-12 h-12 flex items-center justify-center shrink-0"
                        style={{ backgroundColor: "#132a4c" }}
                        aria-label="Cari"
                    >
                        <HiMagnifyingGlass size={20} className="text-white" />
                    </button>
                </div>
            </div>

            {/* ── Category Grid ── */}
            <div className="grid grid-cols-3 gap-4 px-5">
                {filtered.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat)}
                        className="flex flex-col items-center gap-2 active:scale-95 transition-transform bg-transparent border-0 cursor-pointer"
                    >
                        <div className="w-full aspect-square rounded-2xl overflow-hidden flex items-center justify-center">
                            <Image
                                src={cat.image}
                                alt={cat.label}
                                width={80}
                                height={80}
                                className="object-contain w-full h-full"
                            />
                        </div>
                        <span className="text-gray-900 text-xs font-medium">{cat.label}</span>
                    </button>
                ))}
            </div>

            {/* Footer */}
            <Footer />

            {/* ── Popup Bottom Sheet ── */}
            <PopupNew
                category={selectedCategory}
                onClose={() => setSelectedCategory(null)}
                onSelectSub={handleSelectSub}
            />
        </div>
    );
}
