"use client";

import Image from "next/image";
import Link from "next/link";
import { BsLightningChargeFill } from "react-icons/bs";
import type { Ad } from "./data";

export default function SmallAdsCard({ ad }: { ad: Ad }) {
    return (
        <Link
            href={`/ads/${ad.id}`}
            className="flex flex-row rounded-2xl overflow-hidden border border-gray-200 bg-white active:scale-[0.98] transition-transform duration-150"
        >
            {/* Image — left, fixed square */}
            <div className="relative w-28 shrink-0 self-stretch overflow-hidden">
                <Image
                    src={ad.imageCover}
                    alt={ad.title}
                    fill
                    className="object-cover"
                    sizes="112px"
                />
            </div>

            {/* Right content */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Highlight badge — full width strip */}
                {ad.highlight && (
                    <div className="flex items-center justify-center gap-1.5 bg-blue2 py-1.5 px-3">
                        <BsLightningChargeFill className="text-white text-[11px]" />
                        <span className="text-white text-[11px] font-semibold">Highlight</span>
                    </div>
                )}

                {/* Text content */}
                <div className="flex flex-col flex-1 justify-between px-3 py-3">
                    <div>
                        <p className="text-[13px] text-black2 leading-snug line-clamp-2">{ad.title}</p>
                        <p className="text-[15px] font-bold text-black1 mt-1">{ad.price}</p>
                    </div>

                    {/* Time & Location — bottom right */}
                    <p className="text-[11px] text-black3 text-right mt-2">
                        {ad.time} - {ad.location}
                    </p>
                </div>
            </div>
        </Link>
    );
}
