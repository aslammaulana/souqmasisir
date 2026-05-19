"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { HiX } from "react-icons/hi";
import { HiOutlineCamera } from "react-icons/hi2";
import Footer from "@/components/theme/footer";

const NAME_MAX = 30;
const BIO_MAX = 140;

export default function EditProfilePage() {
    const { data: session, status } = useSession();
    const fileRef = useRef<HTMLInputElement>(null);

    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [phone, setPhone] = useState("");
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
                setPhone(d.phone ?? "");
            });
    }, [status]);

    const handleSave = async () => {
        setSaving(true);
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
                    <div className="flex gap-4 mb-5">
                        <div className="flex flex-col w-24 shrink-0">
                            <label className="text-gray-400 text-xs mb-1">Kode Negara</label>
                            <input
                                type="text"
                                defaultValue="+62"
                                className="border-b border-gray-300 focus:border-gray-900 outline-none text-gray-900 text-base pb-1 bg-transparent transition"
                            />
                        </div>
                        <div className="flex flex-col flex-1">
                            <label className="text-gray-400 text-xs mb-1">Nomor HP</label>
                            <input
                                type="tel"
                                value={phone}
                                placeholder="08xxxxxxxxxx"
                                onChange={(e) => setPhone(e.target.value)}
                                className="border-b border-gray-300 focus:border-gray-900 outline-none text-gray-900 text-base pb-1 bg-transparent placeholder-gray-400 transition"
                            />
                        </div>
                    </div>

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
