"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { HiArrowLeft, HiChevronRight, HiUser } from "react-icons/hi";
import Footer from "@/components/theme/footer";
import SmallAdsCard from "@/components/theme/listing/small-ads-card";
import { ads } from "@/components/theme/listing/data";
import { formatJoinDate } from "@/lib/format-date";

const STEPS_LEFT = 4;

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const name = session?.user?.name ?? "Guest";
    const imageUrl = session?.user?.image ?? null;
    const [joinDate, setJoinDate] = useState("");

    useEffect(() => {
        if (status !== "authenticated") return;
        fetch("/api/user/profile")
            .then((r) => r.json())
            .then((d) => setJoinDate(formatJoinDate(d.created_at)));
    }, [status]);

    // Filter ads belonging to this user (when real API: filter by user id)
    const myAds = ads.filter((ad) => ad.seller === "DepoLaptop.id");

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
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4 overflow-hidden">
                    {imageUrl ? (
                        <Image src={imageUrl} alt={name} width={80} height={80} className="object-cover w-full h-full" />
                    ) : (
                        <HiUser size={44} className="text-blue2" />
                    )}
                </div>

                {/* Name */}
                <h1 className="text-gray-900 font-bold text-2xl mb-1">{name}</h1>

                {/* Joined */}
                <p className="text-gray-400 text-sm mb-5">{joinDate}</p>

                {/* Edit Profile button */}
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
                            <SmallAdsCard key={ad.id} ad={ad} />
                        ))
                    ) : (
                        <p className="text-gray-400 text-sm text-center py-8">
                            Belum ada iklan
                        </p>
                    )}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
