"use client";

import type { NewAdForm } from "@/components/post-ads/types";
import WhatsAppSelector from "@/components/post-ads/WhatsAppSelector";

type Props = { form: NewAdForm; onChange: (u: Partial<NewAdForm>) => void };

export default function Step3Description({ form, onChange }: Props) {
    return (
        <div className="px-5 pt-6 flex flex-col gap-6">

            {/* ── Judul Iklan ── */}
            <div>
                <label className="text-gray-700 font-semibold text-sm mb-2 block">
                    Judul Iklan <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={form.title}
                    maxLength={60}
                    placeholder="Contoh: Laptop Asus ROG Bekas Kondisi Mulus"
                    onChange={(e) => onChange({ title: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
                <p className="text-gray-400 text-xs text-right mt-1">{form.title.length}/60</p>
            </div>

            {/* ── Deskripsi ── */}
            <div>
                <label className="text-gray-700 font-semibold text-sm mb-2 block">
                    Deskripsi <span className="text-red-500">*</span>
                </label>
                <textarea
                    value={form.description}
                    maxLength={500}
                    rows={5}
                    placeholder="Ceritakan kondisi, spesifikasi, atau detail lainnya..."
                    onChange={(e) => onChange({ description: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"
                />
                <p className="text-gray-400 text-xs text-right mt-1">{form.description.length}/500</p>
            </div>

            {/* ── Harga ── */}
            <div>
                <label className="text-gray-700 font-semibold text-sm mb-2 block">
                    Harga (EGP) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">EGP</span>
                    <input
                        type="text"
                        inputMode="numeric"
                        value={form.price ? Number(form.price).toLocaleString("id-ID") : ""}
                        placeholder="0"
                        onChange={(e) => {
                            // strip everything except digits
                            const raw = e.target.value.replace(/\D/g, "");
                            onChange({ price: raw });
                        }}
                        className="w-full border border-gray-200 rounded-xl pl-14 pr-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    />
                </div>
                {form.price && (
                    <p className="text-gray-400 text-xs mt-1">
                        EGP {Number(form.price).toLocaleString("id-ID")}
                    </p>
                )}
            </div>

            {/* ── WhatsApp ── */}
            <WhatsAppSelector
                value={form.whatsapp}
                onChange={(val) => onChange({ whatsapp: val })}
            />
        </div>
    );
}
