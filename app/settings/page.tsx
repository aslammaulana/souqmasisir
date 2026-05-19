"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { HiArrowLeft, HiChevronRight } from "react-icons/hi";
import { HiOutlineLogout } from "react-icons/hi";
import { IoContrastOutline } from "react-icons/io5";
import Footer from "@/components/theme/footer";

export default function SettingsPage() {
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const isDark = theme === "dark";
    const toggleTheme = () => setTheme(isDark ? "light" : "dark");

    return (
        <div className="flex flex-col max-w-lg mx-auto min-h-screen bg-white dark:bg-gray-900 pb-24">

            {/* ── Header ── */}
            <div className="flex items-center gap-3 px-4 h-14 border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-10">
                <button
                    onClick={() => router.back()}
                    aria-label="Kembali"
                    className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 transition-colors text-gray-800 dark:text-gray-200"
                >
                    <HiArrowLeft size={20} />
                </button>
                <h1 className="text-gray-900 dark:text-white font-semibold text-[15px]">Settings</h1>
            </div>

            {/* ── Menu List ── */}
            <div className="px-5 mt-4">

                {/* Theme Mode */}
                <div className="flex items-center gap-4 py-4 border-b border-gray-100 dark:border-gray-800">
                    <IoContrastOutline size={24} className="text-gray-800 dark:text-gray-200 shrink-0" />
                    <div className="flex-1">
                        <p className="text-gray-900 dark:text-white font-semibold text-sm">Theme Mode</p>
                        {mounted && (
                            <p className="text-gray-400 dark:text-gray-500 text-xs">
                                {isDark ? "Ubah menjadi Light Mode" : "Ubah menjadi Dark Mode"}
                            </p>
                        )}
                    </div>

                    {/* Toggle switch — hidden during SSR to avoid hydration mismatch */}
                    {mounted && (
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle dark mode"
                            aria-pressed={isDark}
                            className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${isDark ? "bg-gray-600" : "bg-gray-300"
                                }`}
                        >
                            <span
                                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${isDark ? "translate-x-6" : "translate-x-0"
                                    }`}
                            />
                        </button>
                    )}
                </div>

                {/* Logout */}
                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="w-full flex items-center gap-4 py-4 border-b border-gray-100 dark:border-gray-800 bg-transparent cursor-pointer"
                >
                    <HiOutlineLogout size={24} className="text-red-500 shrink-0" />
                    <div className="flex-1 text-left">
                        <p className="text-red-500 font-semibold text-sm">Logout</p>
                    </div>
                    <HiChevronRight size={20} className="text-gray-400 dark:text-gray-600 shrink-0" />
                </button>
            </div>

            <Footer />
        </div>
    );
}
