"use client";

import { useState } from "react";
import { HiOutlineHome, HiHome, HiPlusCircle } from "react-icons/hi";
import { HiOutlineChatBubbleLeftRight, HiChatBubbleLeftRight } from "react-icons/hi2";
import { BsBoxSeam, BsBoxSeamFill } from "react-icons/bs";
import { HiOutlineUser, HiUser } from "react-icons/hi";
import { FiPlus } from "react-icons/fi";

type Tab = "explore" | "chat" | "myads" | "account";

const tabs: { id: Tab; label: string; icon: React.ReactNode; activeIcon: React.ReactNode }[] = [
    {
        id: "explore",
        label: "Explore",
        icon: <HiOutlineHome size={26} />,
        activeIcon: <HiHome size={26} />,
    },
    {
        id: "chat",
        label: "Chat",
        icon: <HiOutlineChatBubbleLeftRight size={26} />,
        activeIcon: <HiChatBubbleLeftRight size={26} />,
    },
    {
        id: "myads",
        label: "My Ads",
        icon: <BsBoxSeam size={22} />,
        activeIcon: <BsBoxSeamFill size={22} />,
    },
    {
        id: "account",
        label: "My Account",
        icon: <HiOutlineUser size={26} />,
        activeIcon: <HiUser size={26} />,
    },
];

export default function Footer() {
    const [active, setActive] = useState<Tab>("explore");

    // Split tabs around the FAB center button
    const leftTabs = tabs.slice(0, 2);
    const rightTabs = tabs.slice(2);

    return (
        <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
            <div className="flex items-end justify-around px-2 pt-2 pb-3 max-w-lg mx-auto relative">
                {/* Left tabs */}
                {leftTabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActive(tab.id)}
                        className="flex flex-col items-center gap-0.5 flex-1 transition-colors"
                    >
                        <span
                            className={
                                active === tab.id ? "text-blue2" : "text-black3"
                            }
                        >
                            {active === tab.id ? tab.activeIcon : tab.icon}
                        </span>
                        <span
                            className={`text-[11px] font-medium ${active === tab.id ? "text-blue2 font-bold" : "text-black3"
                                }`}
                        >
                            {tab.label}
                        </span>
                    </button>
                ))}

                {/* FAB center — Jual */}
                <div className="flex flex-col items-center -mt-7 flex-1">
                    <button
                        aria-label="Jual"
                        className="bg-blue2 hover:bg-blue1 transition-colors w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                            boxShadow: '0 0 0 4px white, 0 -8px 20px rgba(0, 0, 0, 0.25)'
                        }}
                    >
                        <FiPlus size={30} className="text-white" />
                    </button>
                    <span className="text-[11px] text-black3 font-medium mt-2">Jual</span>
                </div>

                {/* Right tabs */}
                {rightTabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActive(tab.id)}
                        className="flex flex-col items-center gap-0.5 flex-1 transition-colors"
                    >
                        <span
                            className={
                                active === tab.id ? "text-blue2" : "text-black3"
                            }
                        >
                            {active === tab.id ? tab.activeIcon : tab.icon}
                        </span>
                        <span
                            className={`text-[11px] font-medium ${active === tab.id ? "text-blue2 font-bold" : "text-black3"
                                }`}
                        >
                            {tab.label}
                        </span>
                    </button>
                ))}
            </div>
        </footer>
    );
}
