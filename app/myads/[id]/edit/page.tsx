"use client";

import { use, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { HiArrowLeft, HiX } from "react-icons/hi";
import { HiOutlineCamera } from "react-icons/hi2";
import { categories } from "@/components/post-ads/data";
import WhatsAppSelector from "@/components/post-ads/WhatsAppSelector";

const KONDISI_OPTIONS = ["Baru", "Bekas"];
const LOKASI_OPTIONS = ["Hay Asyir", "Darrasah", "Hay Sabi", "Nasr City", "Abbasiyah"];

type PhotoKey = "cover_image" | "image1" | "image2";

export default function EditAdPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Form fields
    const [subcategory, setSubcategory] = useState("");
    const [category, setCategory] = useState("");
    const [categoryId, setCategoryId] = useState(0);
    const [kondisi, setKondisi] = useState("");
    const [lokasi, setLokasi] = useState("");
    const [lokasiMaps, setLokasiMaps] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [whatsapp, setWhatsapp] = useState("");

    const [uploadingKey, setUploadingKey] = useState<PhotoKey | null>(null);
    const refs = {
        cover_image: useRef<HTMLInputElement>(null),
        image1: useRef<HTMLInputElement>(null),
        image2: useRef<HTMLInputElement>(null),
    };

    // Load existing ad
    useEffect(() => {
        fetch(`/api/ads/${id}`)
            .then((r) => r.json())
            .then((d) => {
                setSubcategory(d.subcategory ?? "");
                setKondisi(d.kondisi ?? "");
                setLokasi(d.lokasi ?? "");
                setLokasiMaps(d.lokasi_maps ?? "");
                setCoverImage(d.cover_image ?? "");
                setImage1(d.images?.[0] ?? "");
                setImage2(d.images?.[1] ?? "");
                setTitle(d.title ?? "");
                setDescription(d.description ?? "");
                setPrice(String(d.price ?? ""));
                setWhatsapp(d.whatsapp ?? "");
                // Resolve parent category from subcategory
                const parentCat = categories.find((c) =>
                    c.subcategories.some((s) => s.label === d.subcategory)
                );
                if (parentCat) {
                    setCategory(parentCat.label);
                    setCategoryId(parentCat.id);
                }
            })
            .finally(() => setLoading(false));
    }, [id]);

    const handleUpload = async (key: PhotoKey, file: File) => {
        setUploadingKey(key);
        try {
            const fd = new FormData();
            fd.append("file", file);
            const res = await fetch("/api/upload", { method: "POST", body: fd });
            const data = await res.json();
            if (data.url) {
                if (key === "cover_image") setCoverImage(data.url);
                if (key === "image1") setImage1(data.url);
                if (key === "image2") setImage2(data.url);
            } else if (data.error) {
                alert("Upload gagal: " + data.error);
            }
        } catch {
            alert("Upload gagal: masalah koneksi");
        } finally {
            setUploadingKey(null);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch(`/api/ads/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    subcategory,
                    category_id: categoryId,
                    kondisi,
                    lokasi,
                    lokasi_maps: lokasiMaps || null,
                    cover_image: coverImage,
                    images: [image1, image2].filter(Boolean),
                    title,
                    description,
                    price: Number(price),
                    whatsapp,
                }),
            });
            if (res.ok) {
                router.push("/myads");
            } else {
                const err = await res.json().catch(() => ({}));
                alert("Gagal menyimpan: " + (err.error ?? `HTTP ${res.status}`));
            }
        } catch {
            alert("Gagal menyimpan: masalah koneksi");
        } finally {
            setSaving(false);
        }
    };

    const photoSlots: { key: PhotoKey; label: string; url: string; clear: () => void }[] = [
        { key: "cover_image", label: "Cover *", url: coverImage, clear: () => setCoverImage("") },
        { key: "image1", label: "Foto 2", url: image1, clear: () => setImage1("") },
        { key: "image2", label: "Foto 3", url: image2, clear: () => setImage2("") },
    ];

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen text-gray-400 text-sm">Memuat...</div>;
    }

    return (
        <div className="flex flex-col max-w-lg mx-auto min-h-screen bg-white pb-28">

            {/* ── Header ── */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.back()} className="bg-transparent border-0 p-0 cursor-pointer">
                        <HiArrowLeft size={22} className="text-gray-900" />
                    </button>
                    <span className="text-gray-900 font-bold text-base">Edit Iklan</span>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="text-gray-900 font-bold text-base bg-transparent border-0 cursor-pointer disabled:opacity-40"
                >
                    {saving ? "Menyimpan..." : "Simpan"}
                </button>
            </div>

            <div className="flex flex-col gap-6 px-5 pt-6">

                {/* ── Photos ── */}
                <section>
                    <h2 className="text-gray-900 font-bold text-base mb-3">Foto Iklan</h2>
                    <div className="flex gap-3">
                        {photoSlots.map(({ key, label, url, clear }) => (
                            <div key={key} className="flex flex-col items-center gap-1 flex-1">
                                <div className="relative w-full aspect-square rounded-xl overflow-hidden border-2 border-dashed border-gray-200 bg-gray-50">
                                    {url ? (
                                        <>
                                            <Image src={url} alt={label} fill className="object-cover" />
                                            <button
                                                onClick={clear}
                                                className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center"
                                            >
                                                <HiX size={10} className="text-white" />
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => refs[key].current?.click()}
                                            className="w-full h-full flex items-center justify-center"
                                        >
                                            {uploadingKey === key
                                                ? <span className="text-gray-400 text-xs">...</span>
                                                : <HiOutlineCamera size={22} className="text-gray-300" />
                                            }
                                        </button>
                                    )}
                                </div>
                                <span className="text-gray-400 text-xs">{label}</span>
                                <input
                                    ref={refs[key]}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(key, f); e.target.value = ""; }}
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Kategori Utama ── */}
                <div>
                    <label className="text-gray-700 font-semibold text-sm mb-2 block">Kategori Utama</label>
                    <select
                        value={category}
                        onChange={(e) => {
                            const label = e.target.value;
                            setCategory(label);
                            const cat = categories.find((c) => c.label === label);
                            setCategoryId(cat?.id ?? 0);
                            setSubcategory(""); // reset subcategory when category changes
                        }}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 bg-white focus:outline-none"
                    >
                        <option value="">Pilih kategori...</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.label}>{c.label}</option>
                        ))}
                    </select>
                </div>

                {/* ── Subkategori ── */}
                <div>
                    <label className="text-gray-700 font-semibold text-sm mb-2 block">Subkategori</label>
                    {(() => {
                        const subs = categories.find((c) => c.label === category)?.subcategories ?? [];
                        return subs.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {subs.map((s) => (
                                    <button
                                        key={s.id}
                                        onClick={() => setSubcategory(s.label)}
                                        className={`px-3 py-2 rounded-lg text-sm border transition ${subcategory === s.label
                                            ? "border-blue-600 bg-blue-50 text-blue-700 font-semibold"
                                            : "border-gray-200 text-gray-600"
                                            }`}
                                    >
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400 text-sm">Pilih kategori utama dulu</p>
                        );
                    })()}
                </div>

                {/* ── Kondisi ── */}
                <div>
                    <label className="text-gray-700 font-semibold text-sm mb-2 block">Kondisi</label>
                    <div className="flex gap-3">
                        {KONDISI_OPTIONS.map((k) => (
                            <button
                                key={k}
                                onClick={() => setKondisi(k)}
                                className={`flex-1 py-3 rounded-xl text-sm font-semibold border transition ${kondisi === k ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600"
                                    }`}
                            >
                                {k}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Lokasi ── */}
                <div>
                    <label className="text-gray-700 font-semibold text-sm mb-2 block">Lokasi</label>
                    <select
                        value={lokasi}
                        onChange={(e) => setLokasi(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 bg-white focus:outline-none"
                    >
                        <option value="">Pilih lokasi...</option>
                        {LOKASI_OPTIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                </div>

                {/* ── Maps ── */}
                <div>
                    <label className="text-gray-700 font-semibold text-sm mb-2 block">Google Maps URL <span className="text-gray-400 font-normal">(opsional)</span></label>
                    <input type="url" value={lokasiMaps} onChange={(e) => setLokasiMaps(e.target.value)}
                        placeholder="https://maps.google.com/..."
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none" />
                </div>

                {/* ── Title ── */}
                <div>
                    <label className="text-gray-700 font-semibold text-sm mb-2 block">Judul Iklan</label>
                    <input type="text" value={title} maxLength={60} onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none" />
                    <p className="text-gray-400 text-xs text-right mt-1">{title.length}/60</p>
                </div>

                {/* ── Description ── */}
                <div>
                    <label className="text-gray-700 font-semibold text-sm mb-2 block">Deskripsi</label>
                    <textarea value={description} maxLength={500} rows={5} onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none resize-none" />
                    <p className="text-gray-400 text-xs text-right mt-1">{description.length}/500</p>
                </div>

                {/* ── Price ── */}
                <div>
                    <label className="text-gray-700 font-semibold text-sm mb-2 block">Harga (EGP)</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">EGP</span>
                        <input
                            type="text"
                            inputMode="numeric"
                            value={price ? Number(price).toLocaleString("id-ID") : ""}
                            placeholder="0"
                            onChange={(e) => setPrice(e.target.value.replace(/\D/g, ""))}
                            className="w-full border border-gray-200 rounded-xl pl-14 pr-4 py-3 text-sm text-gray-700 focus:outline-none"
                        />
                    </div>
                    {price && (
                        <p className="text-gray-400 text-xs mt-1">EGP {Number(price).toLocaleString("id-ID")}</p>
                    )}
                </div>

                {/* ── WhatsApp ── */}
                <WhatsAppSelector
                    value={whatsapp}
                    onChange={setWhatsapp}
                />
            </div>

            {/* ── Sticky Save ── */}
            <div className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto px-5 py-4 bg-white border-t border-gray-100">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full py-4 rounded-xl text-white font-semibold text-base transition active:scale-[0.98] disabled:opacity-40"
                    style={{ backgroundColor: "#132a4c" }}
                >
                    {saving ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
            </div>
        </div>
    );
}
