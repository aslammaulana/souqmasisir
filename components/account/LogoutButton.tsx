"use client";

import { signOut } from "next-auth/react";
import { HiOutlineLogout } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center gap-4 py-4 border-b border-gray-100 bg-transparent border-x-0 border-t-0 cursor-pointer"
        >
            <HiOutlineLogout size={24} className="text-red-500 shrink-0" />
            <div className="flex-1 text-left">
                <p className="text-red-500 font-semibold text-sm">Logout</p>
            </div>
            <HiChevronRight size={20} className="text-gray-400 shrink-0" />
        </button>
    );
}
