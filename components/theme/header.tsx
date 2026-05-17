"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiHeart, FiBell } from "react-icons/fi";

// Logo row height (pt-4=16 + img=32 + pb-2=8 = 56px)
const LOGO_H = 56;
// Search bar height (py-2=16 + h-11=44 = 60px)
const SEARCH_H = 60;

export default function Header() {
    const [showLogo, setShowLogo] = useState(true);
    const lastScrollY = useRef(0);
    const ticking = useRef(false);

    useEffect(() => {
        const onScroll = () => {
            if (ticking.current) return;
            ticking.current = true;

            requestAnimationFrame(() => {
                const y = window.scrollY;

                if (y <= 10) {
                    setShowLogo(true);
                } else if (y < lastScrollY.current - 8) {
                    // scrolling UP by at least 8px → show logo
                    setShowLogo(true);
                } else if (y > lastScrollY.current + 8) {
                    // scrolling DOWN by at least 8px → hide logo
                    setShowLogo(false);
                }

                lastScrollY.current = y;
                ticking.current = false;
            });
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            {/* Static spacer — always full height to prevent layout shift */}
            <div style={{ height: LOGO_H + SEARCH_H }} />

            {/* Fixed header — out of document flow, no layout shift */}
            <div className="fixed top-0 left-0 right-0 z-50">
                {/* Logo — instantly hidden/shown, no slide animation */}
                {showLogo && (
                    <div
                        className="flex items-center gap-2 bg-white px-4"
                        style={{ height: LOGO_H }}
                    >
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
                )}

                {/* Search bar — always visible */}
                <div
                    className="bg-white px-4 py-2 shadow-sm"
                    style={{ height: SEARCH_H }}
                >
                    <div className="flex items-center gap-3 h-full">
                        <div className="flex-1 flex items-center border border-gray1 rounded-xl px-4 h-11 bg-white">
                            <input
                                type="text"
                                placeholder="Cari Kebutuhan Kamu..."
                                className="w-full bg-transparent text-sm text-black2 placeholder:text-gray1 outline-none"
                            />
                        </div>
                        <button aria-label="Wishlist" className="text-black1 hover:text-blue2 transition-colors">
                            <FiHeart size={24} strokeWidth={1.8} />
                        </button>
                        <button aria-label="Notifications" className="text-black1 hover:text-blue2 transition-colors">
                            <FiBell size={24} strokeWidth={1.8} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
