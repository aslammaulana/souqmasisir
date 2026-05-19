"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { HiX, HiChevronDown } from "react-icons/hi";
import { HiOutlineCamera } from "react-icons/hi2";
import Footer from "@/components/theme/footer";

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

function parsePhone(full: string) {
    const cleaned = full.startsWith("+") ? full : "+" + full;
    const sorted = [...DIAL_CODES].sort((a, b) => b.code.length - a.code.length);
    for (const { code } of sorted) {
        if (cleaned.startsWith(code)) return { dialCode: code, local: cleaned.slice(code.length) };
    }
    return { dialCode: "+62", local: cleaned.replace(/^\+/, "") };
}

const NAME_MAX = 30;
const BIO_MAX = 140;

export default function EditProfilePage() {
    const { data: session, status } = useSession();
    const fileRef = useRef<HTMLInputElement>(null);

    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [dialCode, setDialCode] = useState("+62");
    const [localPhone, setLocalPhone] = useState("");
    const [showDialPicker, setShowDialPicker] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    // Load user data from API once session is ready
    useEffect(() => {
        if (status !== "authenticated") return;
        fetch("/api/user/profile")
            .then((r) => r.json())
            .then((d) => {
                setName(d.name ?? "");
                setBio(d.bio ?? "");
                if (d.phone) {
                    const { dialCode: dc, local } = parsePhone(d.phone);
                    setDialCode(dc);
                    setLocalPhone(local);
                }
            });
    }, [status]);

    const handleSave = async () => {
        setSaving(true);
        const phone = localPhone ? dialCode + localPhone : "";
        await fetch("/api/user/profile", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, bio, phone }),
        });
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    if (status === "loading") {
        return <div className="flex items-center justify-center min-h-screen text-gray-400 text-sm">Loading...</div>;
    }

    if (status === "unauthenticated") {
        return <div className="flex items-center justify-center min-h-screen text-gray-400 text-sm">Silakan login terlebih dahulu.</div>;
    }

    const avatarUrl = session?.user?.image ?? null;
    const email = session?.user?.email ?? "";

    return (
        <div className="flex flex-col max-w-lg mx-auto min-h-screen bg-white pb-24">

            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                <Link href="/account/profile" aria-label="Close">
                    <HiX size={24} className="text-gray-900" />
                </Link>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="text-gray-900 font-semibold text-base bg-transparent border-0 cursor-pointer disabled:opacity-50"
                >
                    {saving ? "Saving..." : saved ? "Saved ✓" : "Save"}
                </button>
            </div>

            <div className="px-5 pt-6 flex flex-col gap-6">

                {/* ── Basic Information ── */}
                <section>
                    <h2 className="text-gray-900 font-bold text-lg mb-5">Basic Information</h2>

                    {/* Avatar */}
                    <div className="relative w-20 h-20 mb-6">
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-blue-100">
                            {avatarUrl ? (
                                <Image src={avatarUrl} alt="Avatar" width={80} height={80} className="object-cover w-full h-full" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-blue-400 text-3xl font-bold">
                                    {name?.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => fileRef.current?.click()}
                            className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center border-2 border-white"
                            style={{ backgroundColor: "#f0c800" }}
                            aria-label="Ganti foto"
                        >
                            <HiOutlineCamera size={14} className="text-white" />
                        </button>
                        <input ref={fileRef} type="file" accept="image/*" className="hidden" />
                    </div>

                    {/* Name */}
                    <div className="mb-5">
                        <label className="text-gray-400 text-xs mb-1 block">Enter your name</label>
                        <input
                            type="text"
                            value={name}
                            maxLength={NAME_MAX}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border-b border-gray-300 focus:border-gray-900 outline-none text-gray-900 text-base pb-1 bg-transparent transition"
                        />
                        <p className="text-gray-400 text-xs text-right mt-1">{name.length}/{NAME_MAX}</p>
                    </div>

                    {/* Bio / Deskripsi Toko */}
                    <div>
                        <label className="text-gray-400 text-xs mb-1 block">Something about you / deskripsi toko</label>
                        <input
                            type="text"
                            value={bio}
                            maxLength={BIO_MAX}
                            placeholder="Ceritakan tentang toko kamu..."
                            onChange={(e) => setBio(e.target.value)}
                            className="w-full border-b border-gray-300 focus:border-gray-900 outline-none text-gray-900 text-base pb-1 bg-transparent placeholder-gray-400 transition"
                        />
                        <p className="text-gray-400 text-xs text-right mt-1">{bio.length}/{BIO_MAX}</p>
                    </div>
                </section>

                {/* ── Divider ── */}
                <div className="border-t border-gray-200" />

                {/* ── Contact Information ── */}
                <section>
                    <h2 className="text-gray-900 font-bold text-lg mb-5">Informasi Kontak</h2>

                    {/* Phone */}
                    <div className="flex gap-4 mb-5 items-end">
                        {/* Tombol kode negara */}
                        <div className="flex flex-col w-28 shrink-0">
                            <label className="text-gray-400 text-xs mb-1">Kode Negara</label>
                            <button
                                type="button"
                                onClick={() => setShowDialPicker(true)}
                                className="flex items-center gap-1 border-b border-gray-300 pb-1 text-gray-900 text-base bg-transparent focus:outline-none"
                            >
                                <span>{DIAL_CODES.find(d => d.code === dialCode)?.flag}</span>
                                <span className="font-medium">{dialCode}</span>
                                <HiChevronDown size={14} className="text-gray-400 ml-auto" />
                            </button>
                        </div>
                        {/* Input nomor lokal */}
                        <div className="flex flex-col flex-1">
                            <label className="text-gray-400 text-xs mb-1">Nomor HP</label>
                            <input
                                type="tel"
                                value={localPhone}
                                placeholder="8123456789"
                                onChange={(e) => setLocalPhone(e.target.value.replace(/\D/g, ""))}
                                className="border-b border-gray-300 focus:border-gray-900 outline-none text-gray-900 text-base pb-1 bg-transparent placeholder-gray-400 transition"
                            />
                        </div>
                    </div>

                    {/* Preview nomor full */}
                    {localPhone && (
                        <p className="text-gray-400 text-xs -mt-3 mb-4">
                            Nomor tersimpan: <span className="text-gray-700 font-medium">{dialCode}{localPhone}</span>
                        </p>
                    )}

                    {/* Bottom-sheet popup kode negara */}
                    {showDialPicker && typeof document !== "undefined" && createPortal(
                        <>
                            <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" onClick={() => setShowDialPicker(false)} />
                            <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-2xl max-h-[70vh] flex flex-col">
                                <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-100 shrink-0">
                                    <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2" />
                                    <p className="font-bold text-gray-800 text-base">Pilih Kode Negara</p>
                                    <button onClick={() => setShowDialPicker(false)} className="p-1 rounded-full hover:bg-gray-100 transition">
                                        <HiX size={18} className="text-gray-500" />
                                    </button>
                                </div>
                                <div className="overflow-y-auto flex-1 pb-6">
                                    {DIAL_CODES.map((d) => (
                                        <button
                                            key={d.code}
                                            type="button"
                                            onClick={() => { setDialCode(d.code); setShowDialPicker(false); }}
                                            className={`w-full flex items-center gap-4 px-5 py-3.5 text-left transition-colors ${dialCode === d.code ? "bg-blue-50" : "hover:bg-gray-50"
                                                }`}
                                        >
                                            <span className="text-2xl">{d.flag}</span>
                                            <span className={`flex-1 text-sm font-medium ${dialCode === d.code ? "text-blue-700" : "text-gray-700"}`}>{d.label}</span>
                                            <span className={`text-sm font-semibold tabular-nums ${dialCode === d.code ? "text-blue-600" : "text-gray-400"}`}>{d.code}</span>
                                            {dialCode === d.code && <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>,
                        document.body
                    )}

                    {/* Email — readonly dari Google */}
                    <div>
                        <label className="text-gray-400 text-xs mb-1 block">Email</label>
                        <input
                            type="email"
                            value={email}
                            readOnly
                            className="w-full border-b border-gray-300 outline-none text-gray-900 text-base pb-1 bg-transparent cursor-default"
                        />
                        <p className="text-gray-400 text-[10px] mt-1">Email dari akun Google, tidak dapat diubah</p>
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
}
