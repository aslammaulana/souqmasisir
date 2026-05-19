"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/theme/footer";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

type Tab = "ads" | "favourites";

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

export default function MyAdsPage() {
    const [activeTab, setActiveTab] = useState<Tab>("ads");
    const [myAds, setMyAds] = useState<Ad[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/ads")
            .then((r) => r.json())
            .then((data) => {
                if (Array.isArray(data)) setMyAds(data);
            })
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Hapus iklan ini?")) return;
        setDeletingId(id);
        await fetch(`/api/ads/${id}`, { method: "DELETE" });
        setMyAds((prev) => prev.filter((ad) => ad.id !== id));
        setDeletingId(null);
    };

    return (
        <div className="flex flex-col max-w-lg mx-auto min-h-screen bg-white pb-24">

            {/* ── Header ── */}
            <div className="flex items-center gap-2 px-5 pt-5 pb-2">
                <Image src="/brand/logo-souqmasisir.png" alt="MasisirPedia" width={26} height={26} className="object-contain" />
                <span className="text-gray-900 font-bold text-base">MasisirPedia</span>
            </div>

            <h1 className="text-gray-900 font-bold text-2xl text-center mt-4 mb-5 tracking-wide">MY ADS</h1>

            {/* ── Tabs ── */}
            <div className="flex mx-5 mb-5 rounded-xl overflow-hidden border border-gray-200">
                {(["ads", "favourites"] as Tab[]).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className="flex-1 py-3.5 text-sm font-bold tracking-wider transition"
                        style={{
                            backgroundColor: activeTab === tab ? "#132a4c" : "#f3f4f6",
                            color: activeTab === tab ? "#ffffff" : "#132a4c",
                        }}
                    >
                        {tab === "ads" ? "ADS" : "FAVOURITES"}
                    </button>
                ))}
            </div>

            {/* ── Content ── */}
            <div className="flex flex-col gap-3 px-5">
                {activeTab === "favourites" ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <p className="text-gray-400 text-sm">Belum ada favorit</p>
                    </div>
                ) : loading ? (
                    <div className="flex flex-col items-center justify-center py-16">
                        <p className="text-gray-400 text-sm">Memuat iklan...</p>
                    </div>
                ) : myAds.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <p className="text-gray-400 text-sm mb-2">Belum ada iklan</p>
                        <Link href="/myads/new" className="text-blue-600 text-sm font-semibold">+ Pasang Iklan</Link>
                    </div>
                ) : (
                    myAds.map((ad) => (
                        <div key={ad.id} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl">
                            {/* Thumbnail */}
                            <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                                {ad.cover_image && (
                                    <Image src={ad.cover_image} alt={ad.title} width={80} height={80} className="object-cover w-full h-full" />
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-gray-900 font-semibold text-sm truncate">{ad.title}</p>
                                <p className="text-blue-600 font-bold text-sm mt-0.5">EGP {ad.price.toLocaleString()}</p>
                                <p className="text-gray-400 text-xs mt-0.5">{ad.lokasi} · {ad.kondisi}</p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2 shrink-0">
                                <Link
                                    href={`/myads/${ad.id}/edit`}
                                    className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center"
                                >
                                    <HiOutlinePencil size={16} className="text-gray-600" />
                                </Link>
                                <button
                                    onClick={() => handleDelete(ad.id)}
                                    disabled={deletingId === ad.id}
                                    className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center disabled:opacity-40"
                                >
                                    <HiOutlineTrash size={16} className="text-red-500" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <Footer />
        </div>
    );
}
