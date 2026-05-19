"use client";

import Image from "next/image";
import Link from "next/link";
import { HiChevronRight, HiUser } from "react-icons/hi";
import { HiUserGroup } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import Footer from "@/components/theme/footer";

const TOTAL_STEPS = 6;
const COMPLETED_STEPS = 2;

export default function AccountPage() {
    return (
        <div className="flex flex-col max-w-lg mx-auto min-h-screen bg-white pb-24">

            {/* ── Header: MasisirPedia logo ── */}
            <div className="flex items-center gap-2 px-5 pt-5 pb-4">
                <Image
                    src="/brand/logo-souqmasisir.png"
                    alt="MasisirPedia"
                    width={28}
                    height={28}
                    className="object-contain"
                />
                <span className="text-gray-900 font-bold text-base">MasisirPedia</span>
            </div>

            {/* ── Profile Section ── */}
            <div className="flex items-center gap-4 px-5 pt-4 pb-6">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center shrink-0 overflow-hidden">
                    <HiUser size={36} className="text-blue2" />
                </div>
                {/* Name & joined */}
                <div>
                    <p className="text-gray-900 font-bold text-lg leading-tight">DepoLaptop.id</p>
                    <p className="text-gray-400 text-sm">Bergabung 1 Minggu yang lalu</p>
                </div>
            </div>

            {/* ── View and Edit Profile Button ── */}
            <div className="px-5 mb-6">
                <Link
                    href="/account/profile"
                    className="block w-full py-4 rounded-xl text-center text-white font-semibold text-base transition active:scale-[0.98]"
                    style={{ backgroundColor: "#132a4c" }}
                >
                    View and Edit Profile
                </Link>
            </div>

            {/* ── Steps Progress ── */}
            <div className="px-5 mb-6">
                <p className="text-gray-900 font-bold text-base mb-3">
                    {TOTAL_STEPS - COMPLETED_STEPS} steps left
                </p>
                {/* Progress bar */}
                <div className="flex gap-1.5 mb-2">
                    {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                        <div
                            key={i}
                            className="h-2 flex-1 rounded-full"
                            style={{ backgroundColor: i < COMPLETED_STEPS ? "#f0c800" : "#e5e7eb" }}
                        />
                    ))}
                </div>
                <p className="text-gray-400 text-xs">
                    We are built on trust, Help one another to get to know other better
                </p>
            </div>

            {/* ── Divider ── */}
            <div className="border-t border-gray-100 mx-5 mb-2" />

            {/* ── Menu Items ── */}
            <div className="px-5">
                {/* About Us */}
                <Link
                    href="/about"
                    className="flex items-center gap-4 py-4 border-b border-gray-100"
                >
                    <HiUserGroup size={26} className="text-gray-800 shrink-0" />
                    <div className="flex-1">
                        <p className="text-gray-900 font-semibold text-sm">About Us</p>
                        <p className="text-gray-400 text-xs">Berdikari untuk Negri</p>
                    </div>
                    <HiChevronRight size={20} className="text-gray-400 shrink-0" />
                </Link>

                {/* Settings */}
                <Link
                    href="/settings"
                    className="flex items-center gap-4 py-4 border-b border-gray-100"
                >
                    <IoSettingsOutline size={24} className="text-gray-800 shrink-0" />
                    <div className="flex-1">
                        <p className="text-gray-900 font-semibold text-sm">Settings</p>
                        <p className="text-gray-400 text-xs">Privacy and logout</p>
                    </div>
                    <HiChevronRight size={20} className="text-gray-400 shrink-0" />
                </Link>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
