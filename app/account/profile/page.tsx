"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { HiArrowLeft, HiChevronRight, HiUser } from "react-icons/hi";
import Footer from "@/components/theme/footer";
import { formatJoinDate } from "@/lib/format-date";
import { toAdSlug } from "@/lib/ad-slug";

const STEPS_LEFT = 4;

type SupabaseAd = {
    id: string;
    title: string;
    cover_image: string;
    price: number;
    lokasi: string;
    created_at: string;
};

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const name = session?.user?.name ?? "Guest";
    const imageUrl = session?.user?.image ?? null;
    const [joinDate, setJoinDate] = useState("");
    const [myAds, setMyAds] = useState<SupabaseAd[]>([]);

    useEffect(() => {
        if (status !== "authenticated") return;
        // Fetch join date
        fetch("/api/user/profile")
            .then((r) => r.json())
            .then((d) => setJoinDate(formatJoinDate(d.created_at)));
        // Fetch real ads
        fetch("/api/ads")
            .then((r) => r.json())
            .then((d) => { if (Array.isArray(d)) setMyAds(d); });
    }, [status]);

    return (
        <div className="flex flex-col max-w-lg mx-auto min-h-screen bg-white pb-24">

            {/* ── Header ── */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200">
                <Link href="/account" aria-label="Back">
                    <HiArrowLeft size={22} className="text-gray-900" />
                </Link>
                <span className="text-gray-900 font-bold text-base">My Profile</span>
            </div>

            {/* ── Yellow steps banner ── */}
            <Link
                href="/account/profile/edit"
                className="flex items-center justify-between px-4 py-3"
                style={{ backgroundColor: "#f0c800" }}
            >
                <span className="text-gray-900 font-semibold text-sm">
                    You have {STEPS_LEFT} steps left. Complete your profile!
                </span>
                <HiChevronRight size={18} className="text-gray-900 shrink-0" />
            </Link>

            {/* ── Profile Info ── */}
            <div className="px-5 pt-6 pb-4">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4 overflow-hidden">
                    {imageUrl ? (
                        <Image src={imageUrl} alt={name} width={80} height={80} className="object-cover w-full h-full" />
                    ) : (
                        <HiUser size={44} className="text-blue2" />
                    )}
                </div>
                <h1 className="text-gray-900 font-bold text-2xl mb-1">{name}</h1>
                <p className="text-gray-400 text-sm mb-5">{joinDate}</p>
                <Link
                    href="/account/profile/edit"
                    className="block w-full py-4 rounded-xl text-center text-white font-semibold text-base transition active:scale-[0.98]"
                    style={{ backgroundColor: "#132a4c" }}
                >
                    Edit Profile
                </Link>
            </div>

            {/* ── Divider ── */}
            <div className="border-t border-gray-100 mx-5 my-2" />

            {/* ── My Ads ── */}
            <div className="px-5 pt-3">
                <h2 className="text-gray-900 font-bold text-base mb-4">Iklan Saya</h2>
                <div className="flex flex-col gap-3">
                    {myAds.length > 0 ? (
                        myAds.map((ad) => (
                            <Link
                                key={ad.id}
                                href={`/ads/${toAdSlug(ad.title, ad.id)}`}
                                className="flex flex-row rounded-2xl overflow-hidden border border-gray-200 bg-white active:scale-[0.98] transition-transform duration-150"
                            >
                                <div className="relative w-28 shrink-0 self-stretch overflow-hidden bg-gray-100">
                                    {ad.cover_image && (
                                        <Image src={ad.cover_image} alt={ad.title} fill className="object-cover" sizes="112px" />
                                    )}
                                </div>
                                <div className="flex flex-col flex-1 px-3 py-3 justify-between">
                                    <p className="text-[13px] text-black2 leading-snug line-clamp-2">{ad.title}</p>
                                    <p className="text-[15px] font-bold text-black1 mt-1">EGP {ad.price.toLocaleString()}</p>
                                    <p className="text-[11px] text-black3 text-right mt-2">{ad.lokasi}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-gray-400 text-sm text-center py-8">Belum ada iklan</p>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
