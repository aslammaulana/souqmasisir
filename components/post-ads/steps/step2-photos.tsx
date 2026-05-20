"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { HiOutlinePhoto } from "react-icons/hi2";
import { HiPlus, HiX } from "react-icons/hi";
import type { NewAdForm } from "@/components/post-ads/types";
import { convertToWebP } from "@/hooks/useImageConverter";

type Props = { form: NewAdForm; onChange: (u: Partial<NewAdForm>) => void };

type PhotoKey = "coverImage" | "image1" | "image2";

const SLOTS: { key: PhotoKey; label: string; isCover: boolean }[] = [
    { key: "coverImage", label: "Cover Photo", isCover: true },
    { key: "image1", label: "Photo 1", isCover: false },
    { key: "image2", label: "Photo 2", isCover: false },
];

export default function Step2Photos({ form, onChange }: Props) {
    const [uploading, setUploading] = useState<PhotoKey | null>(null);
    const refs = {
        coverImage: useRef<HTMLInputElement>(null),
        image1: useRef<HTMLInputElement>(null),
        image2: useRef<HTMLInputElement>(null),
    };

    const handleFile = async (key: PhotoKey, file: File) => {
        setUploading(key);
        try {
            const webpFile = await convertToWebP(file);
            const fd = new FormData();
            fd.append("file", webpFile);
            const res = await fetch("/api/upload", { method: "POST", body: fd });
            const data = await res.json();
            if (data.url) {
                onChange({ [key]: data.url } as Partial<NewAdForm>);
            } else {
                alert("Upload gagal: " + (data.error ?? "Unknown error"));
            }
        } catch (err) {
            alert("Upload gagal: " + (err instanceof Error ? err.message : "Koneksi bermasalah"));
        } finally {
            setUploading(null);
        }
    };

    return (
        <div className="px-5 pt-6 flex flex-col gap-4">
            <p className="text-gray-500 text-sm">
                Tambahkan hingga 3 foto. Foto pertama akan jadi cover iklan.
            </p>

            {/* ── 3-column photo grid ── */}
            <div className="flex gap-3">
                {SLOTS.map(({ key, label, isCover }) => {
                    const url = form[key] as string;
                    return (
                        <div key={key} className="flex flex-col items-center gap-2 flex-1">
                            {/* Box */}
                            <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 bg-gray-50">
                                {url ? (
                                    <>
                                        <Image src={url} alt={label} fill className="object-cover" />
                                        <button
                                            onClick={() => onChange({ [key]: "" } as Partial<NewAdForm>)}
                                            className="absolute top-1.5 right-1.5 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center"
                                        >
                                            <HiX size={10} className="text-white" />
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => refs[key].current?.click()}
                                        disabled={uploading === key}
                                        className="w-full h-full flex items-center justify-center bg-transparent border-0"
                                    >
                                        {uploading === key ? (
                                            <span className="text-gray-300 text-xs">...</span>
                                        ) : isCover ? (
                                            <HiOutlinePhoto size={28} className="text-gray-300" />
                                        ) : (
                                            <HiPlus size={24} className="text-gray-300" />
                                        )}
                                    </button>
                                )}
                            </div>

                            {/* Label */}
                            <span className="text-gray-500 text-xs">{label}</span>

                            <input
                                ref={refs[key]}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleFile(key, file);
                                    e.target.value = "";
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
