"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

type Props = {
    initialQuery: string;
    children: ReactNode;
};

export default function SearchPageClient({ initialQuery, children }: Props) {
    const router = useRouter();
    const [q, setQ] = useState(initialQuery);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (q.trim()) router.push(`/ads?q=${encodeURIComponent(q.trim())}`);
    };

    return (
        <div className="flex flex-col max-w-lg mx-auto min-h-screen bg-white">

            {/* ── Sticky Header ── */}
            <div className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3">
                <form onSubmit={handleSearch} className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="bg-transparent border-0 p-0 cursor-pointer shrink-0"
                        aria-label="Back"
                    >
                        <HiArrowLeft size={22} className="text-gray-900" />
                    </button>

                    <div className="flex-1 flex items-center border border-gray-200 rounded-xl px-3 h-10 bg-gray-50">
                        <input
                            type="text"
                            value={q}
                            autoFocus
                            placeholder="Cari iklan..."
                            onChange={(e) => setQ(e.target.value)}
                            className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none"
                        />
                    </div>

                    <button
                        type="button"
                        aria-label="Filter"
                        className="shrink-0 text-gray-600"
                    >
                        <HiAdjustmentsHorizontal size={22} />
                    </button>
                </form>
            </div>

            {/* ── Results ── */}
            <div className="flex-1 px-4 pt-4 pb-24">
                {children}
            </div>
        </div>
    );
}
