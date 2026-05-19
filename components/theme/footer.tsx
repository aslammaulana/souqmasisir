"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { HiOutlineHome, HiHome } from "react-icons/hi";
import { HiOutlineChatBubbleLeftRight, HiChatBubbleLeftRight } from "react-icons/hi2";
import { BsBoxSeam, BsBoxSeamFill } from "react-icons/bs";
import { HiOutlineUser, HiUser } from "react-icons/hi";
import { FiPlus } from "react-icons/fi";

const tabs = [
    {
        href: "/",
        label: "Explore",
        icon: <HiOutlineHome size={26} />,
        activeIcon: <HiHome size={26} />,
        match: (p: string) => p === "/",
    },
    {
        href: "/",
        label: "Chat",
        icon: <HiOutlineChatBubbleLeftRight size={26} />,
        activeIcon: <HiChatBubbleLeftRight size={26} />,
        match: (p: string) => p === "/chat",
    },
    {
        href: "/myads",
        label: "My Ads",
        icon: <BsBoxSeam size={22} />,
        activeIcon: <BsBoxSeamFill size={22} />,
        match: (p: string) => p.startsWith("/myads"),
    },
    {
        href: "/account",
        label: "My Account",
        icon: <HiOutlineUser size={26} />,
        activeIcon: <HiUser size={26} />,
        match: (p: string) => p.startsWith("/account") || p === "/login",
    },
];

const leftTabs = tabs.slice(0, 2);
const rightTabs = tabs.slice(2);

export default function Footer() {
    const pathname = usePathname();
    const { status } = useSession();

    const renderTab = (tab: typeof tabs[0]) => {
        const isActive = tab.match(pathname);
        // Show /login ONLY when we are sure the user is not logged in
        const href = tab.label === "My Account"
            ? (status === "unauthenticated" ? "/login" : "/account")
            : (tab.href ?? "/");
        return (
            <Link
                key={href + tab.label}
                href={href}
                className="flex flex-col items-center gap-0.5 flex-1 transition-colors"
            >
                <span className={isActive ? "text-blue2" : "text-black3"}>
                    {isActive ? tab.activeIcon : tab.icon}
                </span>
                <span className={`text-[11px] font-medium ${isActive ? "text-blue2 font-bold" : "text-black3"}`}>
                    {tab.label}
                </span>
            </Link>
        );
    };

    return (
        <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
            <div className="flex items-end justify-around px-2 pt-2 pb-3 max-w-lg mx-auto relative">
                {/* Left tabs */}
                {leftTabs.map(renderTab)}

                {/* FAB center — Jual */}
                <div className="flex flex-col items-center -mt-7 flex-1">
                    <Link
                        href="/myads/new"
                        aria-label="Jual"
                        className="bg-blue2 hover:bg-blue1 transition-colors w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ boxShadow: "0 0 0 4px white, 0 -8px 20px rgba(0, 0, 0, 0.25)" }}
                    >
                        <FiPlus size={30} className="text-white" />
                    </Link>
                    <span className="text-[11px] text-black3 font-medium mt-2">Jual</span>
                </div>

                {/* Right tabs */}
                {rightTabs.map(renderTab)}
            </div>
        </footer>
    );
}
