"use client";

import Image from "next/image";
import Link from "next/link";
import { BsLightningChargeFill } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { useFavorite } from "@/hooks/useFavorite";

type Props = {
    id: string; // The DATABASE UUID
    title: string;
    imageCover: string;
    price: string;
    location: string;
    time: string;
    highlight?: boolean;
    seller?: string;
    badge?: "super" | "verified" | "none";
    initialFavorited?: boolean;
    isLoggedIn?: boolean;
    slug?: string; // Optional SEO slug
};

export default function AdsCard({
    id,
    title,
    imageCover,
    price,
    location,
    time,
    highlight = false,
    seller,
    badge = "none",
    initialFavorited = false,
    isLoggedIn = false,
    slug,
}: Props) {
    const { favorited, loading, toggle } = useFavorite(id, initialFavorited, isLoggedIn);
    const navigatePath = slug || id;

    return (
        <Link
            href={`/ads/${navigatePath}`}
            className="flex flex-col rounded-lg overflow-hidden border-[1.5px] active:scale-[0.98] transition-transform duration-150"
            style={{
                backgroundColor: highlight ? "#e6efff" : "#ffffff",
                borderColor: highlight ? "#5e99ef" : "var(--color-gray2)",
            }}
        >
            {/* Image */}
            <div className="relative w-full aspect-square overflow-hidden">
                <Image
                    src={imageCover}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="50vw"
                />
                {/* Wishlist icon */}
                <button
                    className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-black/40 transition-opacity disabled:opacity-60"
                    onClick={toggle}
                    disabled={loading}
                    aria-label={favorited ? "Hapus dari wishlist" : "Tambah ke wishlist"}
                >
                    <FiHeart
                        size={14}
                        strokeWidth={2}
                        className={favorited ? "text-red-500 fill-red-500" : "text-white"}
                    />
                </button>
            </div>

            {/* Highlight badge */}
            {highlight && (
                <div className="flex items-center justify-center gap-1 bg-blue2 py-1 px-3">
                    <BsLightningChargeFill className="text-white text-[10px]" />
                    <span className="text-white text-[10px] font-semibold">Highlight</span>
                </div>
            )}

            {/* Body */}
            <div className="flex flex-col flex-1 px-2.5 pt-2.5 pb-3">
                <div className="flex-1">
                    <p className="text-[12px] text-black2 leading-snug line-clamp-2">{title}</p>
                    <p className="text-[14px] font-bold text-black1">{price}</p>
                </div>

                {/* Seller / meta */}
                <div className="mt-5">
                    {seller && (
                        <div className="flex items-center gap-1">
                            {badge !== "none" && (
                                <Image
                                    src={`/badge/${badge}.png`}
                                    alt={badge}
                                    width={badge === "verified" ? 15 : 59}
                                    height={15}
                                    className="h-[15px] w-auto object-contain"
                                />
                            )}
                            <p className="text-[12px] font-semibold text-black1">{seller}</p>
                        </div>
                    )}
                    <p className="text-[11px] text-black3 mt-0.5">{time} · {location}</p>
                </div>
            </div>
        </Link>
    );
}
