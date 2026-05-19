"use client";

import { use, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { HiArrowLeft, HiChevronDown } from "react-icons/hi";
import { HiOutlinePhoto } from "react-icons/hi2";
import { HiPlus } from "react-icons/hi";
import { ads } from "@/components/theme/listing/data";

const TITLE_MAX = 30;
const DESC_MAX = 4096;
const CONDITIONS = ["Baru", "Bekas - Sangat Baik", "Bekas - Baik", "Bekas - Cukup"];
const LOCATIONS = ["Hay Asyir", "Hay Sabi", "Darrasah", "Abbassiyah", "Nasr City", "Maadi", "Heliopolis"];

export default function EditAdPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const ad = ads.find((a) => String(a.id) === id);

    const [kondisi, setKondisi] = useState("");
    const [lokasi, setLokasi] = useState(ad?.location ?? "");
    const [mapsUrl, setMapsUrl] = useState("");
    const [title, setTitle] = useState(ad?.title ?? "");
    const [description, setDescription] = useState(ad?.description ?? "");
    const [harga, setHarga] = useState(ad?.price.replace(/[^0-9]/g, "") ?? "");

    const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
    const [photo1, setPhoto1] = useState<File | null>(null);
    const [photo2, setPhoto2] = useState<File | null>(null);

    const coverRef = useRef<HTMLInputElement>(null);
    const photo1Ref = useRef<HTMLInputElement>(null);
    const photo2Ref = useRef<HTMLInputElement>(null);

    const photoSlots = [
        { label: "Cover Photo", file: coverPhoto, set: setCoverPhoto, ref: coverRef, isCover: true },
        { label: "Photo 1", file: photo1, set: setPhoto1, ref: photo1Ref, isCover: false },
        { label: "Photo 2", file: photo2, set: setPhoto2, ref: photo2Ref, isCover: false },
    ];

    const handleSave = () => {
        // TODO: submit update
        console.log("Update ad", id, { kondisi, lokasi, mapsUrl, title, description, harga });
        router.back();
    };

    if (!ad) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-400">Iklan tidak ditemukan</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col max-w-lg mx-auto min-h-screen bg-white pb-28">

            {/* ── Header ── */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.back()} className="bg-transparent border-0 p-0 cursor-pointer">
                        <HiArrowLeft size={22} className="text-gray-900" />
                    </button>
                    <span className="text-gray-900 font-bold text-base">Edit</span>
                </div>
                <button
                    onClick={handleSave}
                    className="text-gray-900 font-bold text-base bg-transparent border-0 cursor-pointer"
                >
                    Save
                </button>
            </div>

            <div className="flex flex-col gap-8 px-5 pt-6">

                {/* ── Upload Photo ── */}
                <section>
                    <h2 className="text-gray-900 font-bold text-lg mb-1">Upload a Photo</h2>
                    <p className="text-gray-400 text-sm mb-5">Your photo will be cover photo/thumbnail</p>
                    <div className="flex gap-3">
                        {photoSlots.map((slot) => {
                            const preview = slot.file ? URL.createObjectURL(slot.file) : null;
                            return (
                                <div key={slot.label} className="flex flex-col items-center gap-1.5 flex-1">
                                    <button
                                        type="button"
                                        onClick={() => slot.ref.current?.click()}
                                        className="w-full aspect-square rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-transparent transition hover:border-gray-400"
                                        style={preview ? { border: "none" } : {}}
                                    >
                                        {preview ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={preview} alt={slot.label} className="w-full h-full object-cover rounded-xl" />
                                        ) : slot.isCover ? (
                                            <HiOutlinePhoto size={28} className="text-gray-300" />
                                        ) : (
                                            <HiPlus size={24} className="text-gray-300" />
                                        )}
                                    </button>
                                    <span className="text-gray-400 text-xs">{slot.label}</span>
                                    <input
                                        ref={slot.ref}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => slot.set(e.target.files?.[0] ?? null)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ── Item Details ── */}
                <section className="flex flex-col gap-4">
                    <h2 className="text-gray-900 font-bold text-lg">Provide Item Details</h2>

                    {/* Kondisi */}
                    <div>
                        <label className="text-gray-500 text-sm mb-1.5 block">Kondisi</label>
                        <div className="relative">
                            <select
                                value={kondisi}
                                onChange={(e) => setKondisi(e.target.value)}
                                className="w-full appearance-none border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-900 bg-white outline-none focus:border-gray-600 transition"
                            >
                                <option value="">-- Pilih Kondisi --</option>
                                {CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <HiChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                        </div>
                    </div>

                    {/* Lokasi */}
                    <div>
                        <label className="text-gray-500 text-sm mb-1.5 block">Lokasi</label>
                        <div className="relative">
                            <select
                                value={lokasi}
                                onChange={(e) => setLokasi(e.target.value)}
                                className="w-full appearance-none border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-900 bg-white outline-none focus:border-gray-600 transition"
                            >
                                <option value="">-- Pilih Lokasi --</option>
                                {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                            </select>
                            <HiChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                        </div>
                    </div>

                    {/* Google Maps */}
                    <div>
                        <label className="text-gray-500 text-sm mb-1.5 block">Lokasi Google Maps</label>
                        <input
                            type="url"
                            placeholder="Cantumkan Url Google Maps..."
                            value={mapsUrl}
                            onChange={(e) => setMapsUrl(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-900 placeholder-gray-300 outline-none focus:border-gray-600 transition bg-white"
                        />
                    </div>
                </section>

                {/* ── Title & Description ── */}
                <section className="flex flex-col gap-4">
                    <h2 className="text-gray-900 font-bold text-lg">Please Provide title and description</h2>

                    {/* Title */}
                    <div>
                        <label className="text-gray-500 text-sm mb-1.5 block">Title of ad*</label>
                        <input
                            type="text"
                            maxLength={TITLE_MAX}
                            placeholder="Masukkan judul iklan..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-900 placeholder-gray-300 outline-none focus:border-gray-600 transition bg-white"
                        />
                        <p className="text-gray-400 text-xs text-right mt-1">{title.length}/{TITLE_MAX}</p>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-gray-500 text-sm mb-1.5 block">Description*</label>
                        <textarea
                            maxLength={DESC_MAX}
                            rows={5}
                            placeholder="Masukkan deskripsi lengkap..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-300 outline-none focus:border-gray-600 transition bg-white resize-none"
                        />
                        <p className="text-gray-400 text-xs text-right mt-1">{description.length}/{DESC_MAX}</p>
                    </div>
                </section>

                {/* ── Price ── */}
                <section>
                    <h2 className="text-gray-900 font-bold text-lg mb-3">Mention your price</h2>
                    <label className="text-gray-500 text-sm mb-1.5 block">Harga*</label>
                    <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden focus-within:border-gray-600 transition">
                        <span className="px-4 py-3.5 text-sm text-gray-700 font-medium border-r border-gray-300 bg-gray-50 shrink-0">Rp.</span>
                        <input
                            type="number"
                            min={0}
                            placeholder="0"
                            value={harga}
                            onChange={(e) => setHarga(e.target.value)}
                            className="flex-1 px-4 py-3.5 text-sm text-gray-900 outline-none bg-white"
                        />
                    </div>
                    <p className="text-gray-400 text-xs text-right mt-1">{harga.length}/{TITLE_MAX}</p>
                </section>
            </div>

            {/* ── Save Button — sticky bottom ── */}
            <div className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto px-5 py-4 bg-white border-t border-gray-100">
                <button
                    onClick={handleSave}
                    className="w-full py-4 rounded-xl text-white font-semibold text-base transition active:scale-[0.98]"
                    style={{ backgroundColor: "#132a4c" }}
                >
                    Save
                </button>
            </div>
        </div>
    );
}
