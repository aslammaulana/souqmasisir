"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { HiX, HiUser } from "react-icons/hi";
import { HiOutlineCamera } from "react-icons/hi2";
import Footer from "@/components/theme/footer";

const NAME_MAX = 30;
const BIO_MAX = 140;

export default function EditProfilePage() {
    const [name, setName] = useState("Aslammln10");
    const [bio, setBio] = useState("");
    const [phone, setPhone] = useState("");
    const [email] = useState("Aslammln10@gmail.com");
    const fileRef = useRef<HTMLInputElement>(null);

    return (
        <div className="flex flex-col max-w-lg mx-auto min-h-screen bg-white pb-24">

            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                <Link href="/account/profile" aria-label="Close">
                    <HiX size={24} className="text-gray-900" />
                </Link>
                <button
                    className="text-gray-900 font-semibold text-base bg-transparent border-0 cursor-pointer"
                >
                    Save
                </button>
            </div>

            <div className="px-5 pt-6 flex flex-col gap-6">

                {/* ── Basic Information ── */}
                <section>
                    <h2 className="text-gray-900 font-bold text-lg mb-5">Basic Information</h2>

                    {/* Avatar + upload */}
                    <div className="relative w-20 h-20 mb-6">
                        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                            <HiUser size={44} className="text-blue2" />
                        </div>
                        {/* Camera badge */}
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

                    {/* Bio */}
                    <div>
                        <input
                            type="text"
                            value={bio}
                            maxLength={BIO_MAX}
                            placeholder="Something about you"
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
                    <h2 className="text-gray-900 font-bold text-lg mb-5">Iklan Saya</h2>

                    {/* Phone row */}
                    <div className="flex gap-4 mb-5">
                        {/* Country code */}
                        <div className="flex flex-col w-24 shrink-0">
                            <label className="text-gray-400 text-xs mb-1">Country</label>
                            <input
                                type="text"
                                defaultValue="+62"
                                className="border-b border-gray-300 focus:border-gray-900 outline-none text-gray-900 text-base pb-1 bg-transparent transition"
                            />
                        </div>
                        {/* Phone number */}
                        <div className="flex flex-col flex-1">
                            <label className="text-gray-400 text-xs mb-1">Country</label>
                            <input
                                type="tel"
                                value={phone}
                                placeholder="Phone Number"
                                onChange={(e) => setPhone(e.target.value)}
                                className="border-b border-gray-300 focus:border-gray-900 outline-none text-gray-900 text-base pb-1 bg-transparent placeholder-gray-400 transition"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-gray-400 text-xs mb-1 block">Email</label>
                        <input
                            type="email"
                            value={email}
                            readOnly
                            className="w-full border-b border-gray-300 outline-none text-gray-900 text-base pb-1 bg-transparent cursor-default"
                        />
                    </div>
                </section>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
