"use client";

import { useState } from "react";
import Image from "next/image";
import SmallAdsCard from "@/components/theme/listing/small-ads-card";
import { ads } from "@/components/theme/listing/data";
import Footer from "@/components/theme/footer";

type Tab = "ads" | "favourites";

const USER_NAME = "DepoLaptop.id";
const myAds = ads.filter((ad) => ad.seller === USER_NAME);
const favourites = ads.filter((ad) => ad.seller !== USER_NAME); // placeholder

export default function MyAdsPage() {
    const [activeTab, setActiveTab] = useState<Tab>("ads");

    const list = activeTab === "ads" ? myAds : favourites;

    return (
        <div className="flex flex-col max-w-lg mx-auto min-h-screen bg-white pb-24">

            {/* ── Header: MasisirPedia logo ── */}
            <div className="flex items-center gap-2 px-5 pt-5 pb-2">
                <Image
                    src="/brand/logo-souqmasisir.png"
                    alt="MasisirPedia"
                    width={26}
                    height={26}
                    className="object-contain"
                />
                <span className="text-gray-900 font-bold text-base">MasisirPedia</span>
            </div>

            {/* ── Title ── */}
            <h1 className="text-gray-900 font-bold text-2xl text-center mt-4 mb-5 tracking-wide">
                MY ADS
            </h1>

            {/* ── Tabs ── */}
            <div className="flex mx-5 mb-5 rounded-xl overflow-hidden border border-gray-200">
                <button
                    onClick={() => setActiveTab("ads")}
                    className="flex-1 py-3.5 text-sm font-bold tracking-wider transition"
                    style={{
                        backgroundColor: activeTab === "ads" ? "#132a4c" : "#f3f4f6",
                        color: activeTab === "ads" ? "#ffffff" : "#132a4c",
                    }}
                >
                    ADS
                </button>
                <button
                    onClick={() => setActiveTab("favourites")}
                    className="flex-1 py-3.5 text-sm font-bold tracking-wider transition"
                    style={{
                        backgroundColor: activeTab === "favourites" ? "#132a4c" : "#f3f4f6",
                        color: activeTab === "favourites" ? "#ffffff" : "#132a4c",
                    }}
                >
                    FAVOURITES
                </button>
            </div>

            {/* ── Listing ── */}
            <div className="flex flex-col gap-3 px-5">
                {list.length > 0 ? (
                    list.map((ad) => (
                        <SmallAdsCard key={ad.id} ad={ad} />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <p className="text-gray-400 text-sm">Belum ada iklan</p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
