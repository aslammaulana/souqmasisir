"use client";

import Link from "next/link";
import { useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import Footer from "@/components/theme/footer";

export default function LoginEmailPage() {
    const [email, setEmail] = useState("");

    return (
        <div className="flex flex-col max-w-lg mx-auto h-screen bg-white">

            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200">
                <Link href="/login" aria-label="Back">
                    <HiArrowLeft size={22} className="text-gray-900" />
                </Link>
                <span className="text-gray-900 font-semibold text-base">Login</span>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 px-5 pt-8 pb-32">
                <h1 className="text-gray-900 font-bold text-xl mb-5">
                    Enter your Email
                </h1>

                <label className="text-gray-600 text-sm mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-100 text-gray-900 placeholder-gray-400 rounded-lg px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
            </div>

            {/* Next Button — sticky above footer */}
            <div className="fixed bottom-20 left-0 right-0 max-w-lg mx-auto px-5">
                <button
                    className="w-full py-4 rounded-xl font-semibold text-white text-base transition active:scale-[0.98]"
                    style={{ backgroundColor: "#132a4c" }}
                >
                    Next
                </button>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
