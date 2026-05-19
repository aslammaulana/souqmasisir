"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { toAdSlug } from "@/lib/ad-slug";

type Ad = {
    id: string;
    title: string;
    price: number;
    cover_image: string;
    lokasi: string;
    kondisi: string;
    status: string;
    created_at: string;
};

export default function ProfileAdsClient({ initialAds }: { initialAds: Ad[] }) {
    const [ads, setAds] = useState<Ad[]>(initialAds);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        if (!confirm("Hapus iklan ini?")) return;
        setDeletingId(id);
        await fetch(`/api/ads/${id}`, { method: "DELETE" });
        setAds((prev) => prev.filter((ad) => ad.id !== id));
        setDeletingId(null);
    };

    if (ads.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-400 text-sm mb-2">Belum ada iklan</p>
                <Link href="/myads/new" className="text-blue-600 text-sm font-semibold">
                    + Pasang Iklan
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            {ads.map((ad) => (
                <div
                    key={ad.id}
                    className="flex flex-row rounded-2xl overflow-hidden border border-gray-200 bg-white"
                >
                    {/* Gambar → link ke detail iklan */}
                    <Link
                        href={`/ads/${toAdSlug(ad.title, ad.id)}`}
                        className="relative w-28 shrink-0 self-stretch overflow-hidden bg-gray-100 active:opacity-80 transition-opacity"
                    >
                        {ad.cover_image && (
                            <Image
                                src={ad.cover_image}
                                alt={ad.title}
                                fill
                                className="object-cover"
                                sizes="112px"
                            />
                        )}
                    </Link>

                    {/* Info */}
                    <div className="flex flex-col flex-1 px-3 py-3 justify-between min-w-0">
                        <p className="text-[13px] text-black leading-snug line-clamp-2 font-medium">{ad.title}</p>
                        <p className="text-[15px] font-bold text-blue-600 mt-1">EGP {ad.price.toLocaleString()}</p>
                        <p className="text-[11px] text-gray-400 mt-1">{ad.lokasi}</p>
                    </div>

                    {/* Tombol Edit & Delete */}
                    <div className="flex flex-col gap-2 justify-center pr-3 shrink-0">
                        <Link
                            href={`/myads/${ad.id}/edit`}
                            className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center"
                        >
                            <HiOutlinePencil size={15} className="text-gray-600" />
                        </Link>
                        <button
                            onClick={() => handleDelete(ad.id)}
                            disabled={deletingId === ad.id}
                            className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center disabled:opacity-40"
                        >
                            <HiOutlineTrash size={15} className="text-red-500" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
