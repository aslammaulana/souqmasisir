"use client";

import Image from "next/image";
import { FiHeart, FiBell } from "react-icons/fi";

export default function Header() {
    return (
        <header className="w-full bg-white px-4 pt-4 pb-3 sticky top-0 z-50 shadow-sm">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-3">
                <Image
                    src="/brand/logo-souqmasisir.png"
                    alt="SouqMasisir logo"
                    width={32}
                    height={32}
                    className="object-contain"
                />
                <span className="text-black1 font-bold text-lg tracking-tight">
                    SouqMasisir
                </span>
            </div>

            {/* Search bar + action icons */}
            <div className="flex items-center gap-3">
                <div className="flex-1 flex items-center border border-gray1 rounded-xl px-4 h-11 bg-white">
                    <input
                        type="text"
                        placeholder="Cari Kebutuhan Kamu..."
                        className="w-full bg-transparent text-sm text-black2 placeholder:text-gray1 outline-none"
                    />
                </div>

                {/* Action Icons */}
                <button
                    aria-label="Wishlist"
                    className="text-black1 hover:text-blue2 transition-colors"
                >
                    <FiHeart size={24} strokeWidth={1.8} />
                </button>
                <button
                    aria-label="Notifications"
                    className="text-black1 hover:text-blue2 transition-colors"
                >
                    <FiBell size={24} strokeWidth={1.8} />
                </button>
            </div>
        </header>
    );
}
