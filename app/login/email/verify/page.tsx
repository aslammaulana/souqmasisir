"use client";

import Link from "next/link";
import { useRef, useState, KeyboardEvent, ChangeEvent } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import Footer from "@/components/theme/footer";

const EMAIL = "youremail@gmail.com";
const OTP_LENGTH = 4;

export default function VerifyEmailPage() {
    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
    const inputs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, "").slice(-1);
        const next = [...otp];
        next[index] = val;
        setOtp(next);
        if (val && index < OTP_LENGTH - 1) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
        if (!pasted) return;
        const next = [...otp];
        pasted.split("").forEach((char, i) => { next[i] = char; });
        setOtp(next);
        inputs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
        e.preventDefault();
    };

    return (
        <div className="flex flex-col max-w-lg mx-auto h-screen bg-white">

            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200">
                <Link href="/login/email" aria-label="Back">
                    <HiArrowLeft size={22} className="text-gray-900" />
                </Link>
                <span className="text-gray-900 font-semibold text-base">Login</span>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 px-5 pt-8 pb-32">
                <h1 className="text-gray-900 font-bold text-xl mb-2">Welcome back</h1>

                {/* Subtitle + edit icon */}
                <div className="flex items-center justify-between mb-8">
                    <p className="text-gray-400 text-sm">
                        We sent 4-digit code to {EMAIL}
                    </p>
                    <Link href="/login/email" aria-label="Edit email">
                        <HiOutlinePencilSquare size={22} className="text-gray-700 shrink-0 ml-2" />
                    </Link>
                </div>

                {/* OTP Inputs */}
                <div className="flex gap-4 mb-8" onPaste={handlePaste}>
                    {otp.map((digit, i) => (
                        <input
                            key={i}
                            ref={(el) => { inputs.current[i] = el; }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(i, e)}
                            onKeyDown={(e) => handleKeyDown(i, e)}
                            className={`w-16 h-16 text-center text-xl font-semibold text-gray-900 rounded-xl border-2 outline-none transition
                                ${digit || i === otp.findIndex((d) => !d)
                                    ? "border-blue-600 bg-white"
                                    : "border-gray-200 bg-gray-50"
                                }
                                focus:border-blue-600`}
                        />
                    ))}
                </div>

                {/* Resend */}
                <button className="text-gray-900 text-sm font-medium underline underline-offset-2 text-left w-fit bg-transparent border-0 cursor-pointer">
                    Resend code by email
                </button>
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
