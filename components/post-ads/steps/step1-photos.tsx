"use client";

import { useRef } from "react";
import { HiOutlinePhoto } from "react-icons/hi2";
import { HiPlus } from "react-icons/hi";
import type { NewAdForm } from "@/components/post-ads/types";

type Props = {
    form: NewAdForm;
    onChange: (updates: Partial<NewAdForm>) => void;
};

type PhotoSlot = {
    key: keyof Pick<NewAdForm, "coverPhoto" | "photo1" | "photo2">;
    label: string;
    isCover: boolean;
};

const SLOTS: PhotoSlot[] = [
    { key: "coverPhoto", label: "Cover Photo", isCover: true },
    { key: "photo1", label: "Photo 1", isCover: false },
    { key: "photo2", label: "Photo 2", isCover: false },
];

export default function Step1Photos({ form, onChange }: Props) {
    const refs = useRef<(HTMLInputElement | null)[]>([]);

    return (
        <div className="flex flex-col px-5">
            <h2 className="text-gray-900 font-bold text-lg mb-1">Upload a Photo</h2>
            <p className="text-gray-400 text-sm mb-6">Your photo will be cover photo/thumbnail</p>

            <div className="flex gap-3">
                {SLOTS.map((slot, i) => {
                    const file = form[slot.key] as File | null;
                    const previewUrl = file ? URL.createObjectURL(file) : null;

                    return (
                        <div key={slot.key} className="flex flex-col items-center gap-1.5 flex-1">
                            <button
                                type="button"
                                onClick={() => refs.current[i]?.click()}
                                className="w-full aspect-square rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden transition hover:border-gray-400 bg-transparent"
                                style={previewUrl ? { border: "none", padding: 0 } : {}}
                            >
                                {previewUrl ? (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img src={previewUrl} alt={slot.label} className="w-full h-full object-cover rounded-xl" />
                                ) : slot.isCover ? (
                                    <HiOutlinePhoto size={28} className="text-gray-300" />
                                ) : (
                                    <HiPlus size={24} className="text-gray-300" />
                                )}
                            </button>
                            <span className="text-gray-400 text-xs">{slot.label}</span>
                            <input
                                ref={(el) => { refs.current[i] = el; }}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    const f = e.target.files?.[0] ?? null;
                                    onChange({ [slot.key]: f });
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
