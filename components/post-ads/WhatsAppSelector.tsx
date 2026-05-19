"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { FaWhatsapp } from "react-icons/fa";

type Props = {
    value: string;
    onChange: (val: string) => void;
};

export default function WhatsAppSelector({ value, onChange }: Props) {
    const { data: session } = useSession();
    // @ts-ignore
    const profilePhone: string = (session?.user?.phone as string) ?? "";

    const initialized = useRef(false);
    const [mode, setMode] = useState<"profile" | "custom">("custom");

    // One-time init after profilePhone is available
    useEffect(() => {
        if (initialized.current) return;
        if (!profilePhone) return;

        initialized.current = true;
        // If existing value matches profile phone → profile mode
        if (!value || value === profilePhone || value === profilePhone.replace(/^\+62|^62|^0/, "")) {
            setMode("profile");
            onChange(profilePhone);
        } else {
            setMode("custom");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profilePhone]);

    const selectProfile = () => {
        setMode("profile");
        onChange(profilePhone);
    };

    const selectCustom = () => {
        setMode("custom");
        onChange(""); // clear so user types a new number
    };

    const displayPhone = profilePhone || "";

    return (
        <div>
            <label className="text-gray-700 font-semibold text-[11px] uppercase tracking-widest mb-3 block">
                Kontak WhatsApp <span className="text-red-500">*</span>
            </label>

            <div className="flex flex-col rounded-xl overflow-hidden border border-gray-200">

                {/* ── Opsi 1: Dari Profil ── */}
                {displayPhone ? (
                    <button
                        type="button"
                        onClick={selectProfile}
                        className={`flex items-center gap-3 p-4 text-left transition-colors border-b border-gray-200 ${mode === "profile" ? "bg-blue-50 border-l-4 border-l-blue-600" : "bg-white hover:bg-gray-50"
                            }`}
                    >
                        {/* Radio dot */}
                        <span className={`w-3 h-3 rounded-full  flex items-center justify-center shrink-0 ${mode === "profile" ? "border-white bg-blue-600" : "border-gray-300"
                            }`}>
                            {mode === "profile" && <span className="w-2 h-2 rounded-full bg-blue-600" />}
                        </span>

                        <div className="flex-1">
                            <p className={`font-semibold text-[15px] ${mode === "profile" ? "text-blue-700" : "text-gray-800"}`}>
                                Gunakan nomor profil
                            </p>
                            <p className={`text-xs flex items-center gap-1.5 mt-0.5 ${mode === "profile" ? "text-blue-500" : "text-gray-500"}`}>
                                <FaWhatsapp size={12} className="text-green-500" />
                                {displayPhone}
                            </p>
                        </div>

                        <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${mode === "profile" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"
                            }`}>
                            Dari profil
                        </span>
                    </button>
                ) : null}

                {/* ── Opsi 2: Nomor Custom ── */}
                <button
                    type="button"
                    onClick={selectCustom}
                    className={`flex items-center gap-3 p-4 text-left transition-colors ${mode === "custom" ? "bg-blue-50 border-l-4 border-l-blue-600" : "bg-white hover:bg-gray-50"
                        }`}
                >
                    <span className={`w-3 h-3 rounded-full flex items-center justify-center shrink-0 ${mode === "custom" ? "border-white bg-blue-600" : "border-2 border-gray-300"
                        }`}>
                        {mode === "custom" && <span className="w-2 h-2 rounded-full bg-blue-600" />}
                    </span>

                    <div className="flex-1">
                        <p className={`font-semibold text-[15px] ${mode === "custom" ? "text-blue-700" : "text-gray-800"}`}>
                            Gunakan nomor lain
                        </p>
                        <p className={`text-xs mt-0.5 ${mode === "custom" ? "text-blue-500" : "text-gray-500"}`}>
                            Khusus untuk iklan ini
                        </p>
                    </div>
                </button>
            </div>

            {/* Input field – hanya muncul di custom mode */}
            {mode === "custom" && (
                <div className="mt-3 relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">+62</span>
                    <input
                        type="tel"
                        value={value}
                        placeholder="8xxxxxxxxxx"
                        onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
                        className="w-full border border-gray-200 rounded-xl pl-14 pr-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    />
                </div>
            )}

            {mode === "profile" && (
                <p className="text-gray-400 text-xs mt-2">Pembeli akan menghubungi Anda di nomor profil Anda.</p>
            )}
        </div>
    );
}
