"use client";

import type { NewAdForm } from "@/components/post-ads/types";

const TITLE_MAX = 30;
const DESC_MAX = 4096;

type Props = {
    form: NewAdForm;
    onChange: (updates: Partial<NewAdForm>) => void;
};

export default function Step3Description({ form, onChange }: Props) {
    return (
        <div className="flex flex-col px-5 gap-5">
            {/* Title & Description */}
            <div>
                <h2 className="text-gray-900 font-bold text-lg mb-4">Please Provide title and description</h2>

                {/* Title */}
                <div className="mb-4">
                    <label className="text-gray-500 text-sm mb-1.5 block">Title of ad*</label>
                    <input
                        type="text"
                        maxLength={TITLE_MAX}
                        placeholder="Masukkan judul iklan..."
                        value={form.title}
                        onChange={(e) => onChange({ title: e.target.value })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-900 placeholder-gray-300 outline-none focus:border-gray-600 transition bg-white"
                    />
                    <p className="text-gray-400 text-xs text-right mt-1">{form.title.length}/{TITLE_MAX}</p>
                </div>

                {/* Description */}
                <div>
                    <label className="text-gray-500 text-sm mb-1.5 block">Description*</label>
                    <textarea
                        maxLength={DESC_MAX}
                        rows={5}
                        placeholder="Masukkan deskripsi lengkap..."
                        value={form.description}
                        onChange={(e) => onChange({ description: e.target.value })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-300 outline-none focus:border-gray-600 transition bg-white resize-none"
                    />
                    <p className="text-gray-400 text-xs text-right mt-1">{form.description.length}/{DESC_MAX}</p>
                </div>
            </div>

            {/* Price */}
            <div>
                <h2 className="text-gray-900 font-bold text-lg mb-3">Mention your price</h2>
                <label className="text-gray-500 text-sm mb-1.5 block">Harga*</label>
                <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden focus-within:border-gray-600 transition">
                    <span className="px-4 py-3.5 text-sm text-gray-700 font-medium border-r border-gray-300 bg-gray-50 shrink-0">Rp.</span>
                    <input
                        type="number"
                        min={0}
                        placeholder="0"
                        value={form.harga}
                        onChange={(e) => onChange({ harga: e.target.value })}
                        className="flex-1 px-4 py-3.5 text-sm text-gray-900 outline-none bg-white"
                    />
                </div>
            </div>
        </div>
    );
}
