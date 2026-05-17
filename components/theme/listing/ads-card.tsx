import Image from "next/image";
import Link from "next/link";
import { BsLightningChargeFill } from "react-icons/bs";
import type { Ad } from "./data";

export default function AdsCard({ ad }: { ad: Ad }) {
    return (
        <Link
            href={`/ads/${ad.id}`}
            className="flex flex-col rounded-lg overflow-hidden border-[2px] border-gray1  active:scale-[0.98] transition-transform duration-150"
            style={{ backgroundColor: ad.highlight ? "#e6efff" : "#ffffff" }}
        >
            {/* Image */}
            <div className="relative w-full aspect-square overflow-hidden">
                <Image
                    src={ad.image}
                    alt={ad.title}
                    fill
                    className="object-cover"
                    sizes="50vw"
                />
            </div>

            {/* Highlight badge */}
            {ad.highlight && (
                <div className="flex items-center justify-center gap-1 bg-blue2 py-1.5 px-3">
                    <BsLightningChargeFill className="text-white text-xs" />
                    <span className="text-white text-xs font-semibold">Highlight</span>
                </div>
            )}

            {/* Body */}
            <div className="flex flex-col flex-1 px-2.5 pt-2.5 pb-3">
                {/* Title + price push to top */}
                <div className="flex-1">
                    <p className="text-xs text-black1 leading-snug line-clamp-2">{ad.title}</p>
                    <p className="text-sm font-bold text-black1 mt-1">{ad.price}</p>
                </div>

                {/* Seller info pinned to bottom */}
                <div className="mt-5">
                    <p className="text-[11px] font-semibold text-black1">{ad.seller}</p>
                    <p className="text-[10px] text-black3 mt-0.5">{ad.time} · {ad.location}</p>
                </div>
            </div>
        </Link>
    );
}
