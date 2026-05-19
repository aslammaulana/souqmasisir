"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { FaWhatsapp } from "react-icons/fa";
import { HiChevronDown, HiX } from "react-icons/hi";
import { createPortal } from "react-dom";

// ── Daftar kode negara ────────────────────────────────────────────────────────
const DIAL_CODES = [
    { code: "+62", flag: "🇮🇩", label: "Indonesia" },
    { code: "+20", flag: "🇪🇬", label: "Mesir" },
    { code: "+60", flag: "🇲🇾", label: "Malaysia" },
    { code: "+66", flag: "🇹🇭", label: "Thailand" },
    { code: "+65", flag: "🇸🇬", label: "Singapura" },
    { code: "+966", flag: "🇸🇦", label: "Arab Saudi" },
    { code: "+971", flag: "🇦🇪", label: "UAE" },
    { code: "+44", flag: "🇬🇧", label: "Inggris" },
    { code: "+1", flag: "🇺🇸", label: "Amerika" },
];

// ── Parse E.164 → { dialCode, local } ─────────────────────────────────────────
function parsePhone(full: string): { dialCode: string; local: string } {
    const cleaned = full.startsWith("+") ? full : "+" + full;
    const sorted = [...DIAL_CODES].sort((a, b) => b.code.length - a.code.length);
    for (const { code } of sorted) {
        if (cleaned.startsWith(code)) {
            return { dialCode: code, local: cleaned.slice(code.length) };
        }
    }
    return { dialCode: "+62", local: cleaned.replace(/^\+/, "") };
}

// ── Modal Popup Kode Negara ────────────────────────────────────────────────────
function DialCodeModal({
    current,
    onSelect,
    onClose,
}: {
    current: string;
    onSelect: (code: string) => void;
    onClose: () => void;
}) {
    return createPortal(
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-2xl max-h-[70vh] flex flex-col">
                {/* Handle + Header */}
                <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-100 shrink-0">
                    <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2" />
                    <p className="font-bold text-gray-800 text-base">Pilih Kode Negara</p>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition">
                        <HiX size={18} className="text-gray-500" />
                    </button>
                </div>

                {/* List */}
                <div className="overflow-y-auto flex-1 pb-6">
                    {DIAL_CODES.map((d) => (
                        <button
                            key={d.code}
                            type="button"
                            onClick={() => { onSelect(d.code); onClose(); }}
                            className={`w-full flex items-center gap-4 px-5 py-3.5 text-left transition-colors ${current === d.code
                                ? "bg-blue-50"
                                : "hover:bg-gray-50"
                                }`}
                        >
                            <span className="text-2xl">{d.flag}</span>
                            <span className={`flex-1 text-sm font-medium ${current === d.code ? "text-blue-700" : "text-gray-700"}`}>
                                {d.label}
                            </span>
                            <span className={`text-sm font-semibold tabular-nums ${current === d.code ? "text-blue-600" : "text-gray-400"}`}>
                                {d.code}
                            </span>
                            {current === d.code && (
                                <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </>,
        document.body
    );
}

// ── Komponen Utama ─────────────────────────────────────────────────────────────
type Props = {
    value: string;
    onChange: (val: string) => void;
};

export default function WhatsAppSelector({ value, onChange }: Props) {
    const { data: session } = useSession();
    // @ts-ignore
    const profilePhone: string = (session?.user?.phone as string) ?? "";

    // Normalisasi: rekonstruksi nomor penuh E.164 via parsePhone
    // Contoh: "85356078836" → parsePhone → "+62" + "85356078836" = "+6285356078836"
    const normalizedProfile = profilePhone
        ? (() => { const { dialCode: dc, local } = parsePhone(profilePhone); return dc + local; })()
        : "";

    const initialized = useRef(false);
    const [mode, setMode] = useState<"profile" | "custom">("custom");
    const [dialCode, setDialCode] = useState("+62");
    const [localNumber, setLocalNumber] = useState("");
    const [showModal, setShowModal] = useState(false);

    // ── Init sekali saat data tersedia ───────────────────────────────────────
    useEffect(() => {
        if (initialized.current) return;
        if (!profilePhone && !value) return;

        initialized.current = true;

        if (value && value !== profilePhone) {
            setMode("custom");
            const { dialCode: dc, local } = parsePhone(value);
            setDialCode(dc);
            setLocalNumber(local);
        } else if (profilePhone) {
            setMode("profile");
            onChange(normalizedProfile);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profilePhone, value]);

    const handleDialSelect = (code: string) => {
        setDialCode(code);
        onChange(code + localNumber);
    };

    const handleLocalChange = (raw: string) => {
        const digits = raw.replace(/\D/g, "");
        setLocalNumber(digits);
        onChange(dialCode + digits);
    };

    const selectProfile = () => {
        setMode("profile");
        onChange(normalizedProfile);
    };

    const selectCustom = () => {
        setMode("custom");
        if (mode === "profile") {
            setLocalNumber("");
            onChange("");
        }
    };

    const currentDial = DIAL_CODES.find((d) => d.code === dialCode) ?? DIAL_CODES[0];

    return (
        <div>
            <label className="text-gray-700 font-semibold text-[11px] uppercase tracking-widest mb-3 block">
                Kontak WhatsApp <span className="text-red-500">*</span>
            </label>

            {/* ── Pilihan Mode ── */}
            <div className="flex flex-col rounded-xl overflow-hidden border border-gray-200">

                {normalizedProfile ? (
                    <button
                        type="button"
                        onClick={selectProfile}
                        className={`flex items-center gap-3 p-4 text-left transition-colors border-b border-gray-200 ${mode === "profile" ? "bg-blue-50 border-l-4 border-l-blue-600" : "bg-white hover:bg-gray-50"
                            }`}
                    >
                        <span className={`w-3 h-3 rounded-full flex items-center justify-center shrink-0 ${mode === "profile" ? "bg-blue-600" : "border-2 border-gray-300"
                            }`}>
                            {mode === "profile" && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                        <div className="flex-1">
                            <p className={`font-semibold text-[15px] ${mode === "profile" ? "text-blue-700" : "text-gray-800"}`}>
                                Gunakan nomor profil
                            </p>
                            <p className={`text-xs flex items-center gap-1.5 mt-0.5 ${mode === "profile" ? "text-blue-500" : "text-gray-500"}`}>
                                <FaWhatsapp size={12} className="text-green-500" />
                                {normalizedProfile}
                            </p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${mode === "profile" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"
                            }`}>
                            Dari profil
                        </span>
                    </button>
                ) : null}

                <button
                    type="button"
                    onClick={selectCustom}
                    className={`flex items-center gap-3 p-4 text-left transition-colors ${mode === "custom" ? "bg-blue-50 border-l-4 border-l-blue-600" : "bg-white hover:bg-gray-50"
                        }`}
                >
                    <span className={`w-3 h-3 rounded-full flex items-center justify-center shrink-0 ${mode === "custom" ? "bg-blue-600" : "border-2 border-gray-300"
                        }`}>
                        {mode === "custom" && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
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

            {/* ── Input Custom ── */}
            {mode === "custom" && (
                <div className="mt-3 flex gap-2 items-stretch">

                    {/* Tombol kode negara → buka popup */}
                    <button
                        type="button"
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-1.5 px-3 py-3 border border-gray-200 rounded-xl bg-white text-sm text-gray-700 whitespace-nowrap focus:outline-none focus:border-blue-500 hover:bg-gray-50 transition"
                    >
                        <span className="text-base">{currentDial.flag}</span>
                        <span className="font-semibold">{currentDial.code}</span>
                        <HiChevronDown size={13} className="text-gray-400" />
                    </button>

                    {/* Input nomor lokal */}
                    <input
                        type="tel"
                        value={localNumber}
                        placeholder="8123456789"
                        onChange={(e) => handleLocalChange(e.target.value)}
                        className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    />
                </div>
            )}

            {mode === "profile" && (
                <p className="text-gray-400 text-xs mt-2">
                    Pembeli akan menghubungi Anda di nomor profil Anda.
                </p>
            )}

            {/* ── Bottom-sheet popup kode negara ── */}
            {showModal && (
                <DialCodeModal
                    current={dialCode}
                    onSelect={handleDialSelect}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
}
