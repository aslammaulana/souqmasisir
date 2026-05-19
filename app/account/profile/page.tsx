"use client";

import Link from "next/link";
import { HiArrowLeft, HiChevronRight, HiUser } from "react-icons/hi";
import Footer from "@/components/theme/footer";
import SmallAdsCard from "@/components/theme/listing/small-ads-card";
import { ads } from "@/components/theme/listing/data";

const USER_NAME = "DepoLaptop.id";
const STEPS_LEFT = 4;

// Filter ads belonging to this user
const myAds = ads.filter((ad) => ad.seller === USER_NAME);

export default function ProfilePage() {
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
                    <HiUser size={44} className="text-blue2" />
                </div>

                {/* Name */}
                <h1 className="text-gray-900 font-bold text-2xl mb-1">{USER_NAME}</h1>

                {/* Joined */}
                <p className="text-gray-400 text-sm mb-5">Bergabung 1 Minggu yang lalu</p>

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
