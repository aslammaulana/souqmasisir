"use client";

import Image from "next/image";
import Link from "next/link";
import { HiX } from "react-icons/hi";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { BsPhone } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineEmail } from "react-icons/md";
import { signIn } from "next-auth/react";
import Footer from "@/components/theme/footer";

export default function LoginPage() {
    return (
        <div className="flex flex-col max-w-lg mx-auto h-screen overflow-hidden">

            {/* ── Top Blue Section (50% height) ── */}
            <div
                className="flex flex-col"
                style={{ backgroundColor: "#2d62c2", flex: "0 0 50%" }}
            >
                {/* Header row */}
                <div className="flex items-center justify-between px-5 pt-5">
                    <Link href="/" aria-label="Close">
                        <HiX size={26} className="text-white" />
                    </Link>
                    <button className="flex items-center gap-1.5 text-white font-semibold text-base bg-transparent border-0">
                        <HiOutlineInformationCircle size={22} />
                        Help
                    </button>
                </div>

                {/* Logo centered */}
                <div className="flex flex-col items-center justify-center gap-4 flex-1 pb-4">
                    <Image
                        src="/brand/logo-putih.svg"
                        alt="Souq Masisir Logo"
                        width={130}
                        height={130}
                        className="object-contain"
                        priority
                    />
                    <h1 className="text-white font-bold text-3xl tracking-tight">
                        Souq Masisir
                    </h1>
                </div>
            </div>

            {/* ── Bottom Dark Section (remaining height) ── */}
            <div
                className="flex flex-col gap-3 px-6 pt-8 pb-28 overflow-y-auto flex-1"
                style={{ backgroundColor: "#132a4c" }}
            >
                {/* Continue with Phone */}
                <button className="w-full flex items-center gap-3 bg-white text-gray-900 rounded-xl px-5 py-4 font-semibold text-sm shadow-sm hover:bg-gray-50 active:scale-[0.98] transition-all border-0">
                    <BsPhone size={20} className="text-gray-800 shrink-0" />
                    Continue with Phone
                </button>

                {/* Continue with Google */}
                <button
                    onClick={() => signIn("google", { callbackUrl: "/account" })}
                    className="w-full flex items-center gap-3 bg-white text-gray-900 rounded-xl px-5 py-4 font-semibold text-sm shadow-sm hover:bg-gray-50 active:scale-[0.98] transition-all border-0"
                >
                    <FcGoogle size={20} className="shrink-0" />
                    Continue with Google
                </button>

                {/* Continue with Email */}
                <button className="w-full flex items-center gap-3 bg-white text-gray-900 rounded-xl px-5 py-4 font-semibold text-sm shadow-sm hover:bg-gray-50 active:scale-[0.98] transition-all border-0">
                    <MdOutlineEmail size={20} className="text-gray-800 shrink-0" />
                    Continue with Email
                </button>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
