import Link from "next/link";
import { HiChevronRight } from "react-icons/hi";
import { HiUserGroup } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";

export default function AccountMenu() {
    return (
        <>
            {/* Divider */}
            <div className="border-t border-gray-100 mx-5 mb-2" />

            {/* Menu Items */}
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
        </>
    );
}
