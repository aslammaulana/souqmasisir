"use client";

import type { NewAdForm } from "@/components/post-ads/types";

const KONDISI_OPTIONS = ["Baru", "Bekas"];
const LOKASI_OPTIONS = ["Hay Asyir", "Darrasah", "Hay Sabi", "Nasr City", "Abbasiyah"];

type Props = { form: NewAdForm; onChange: (u: Partial<NewAdForm>) => void };

export default function Step1Details({ form, onChange }: Props) {
    return (
        <div className="px-5 pt-6 flex flex-col gap-6">

            {/* ── Kondisi ── */}
            <div>
                <label className="text-gray-700 font-semibold text-sm mb-2 block">
                    Kondisi <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                    {KONDISI_OPTIONS.map((k) => (
                        <button
                            key={k}
                            onClick={() => onChange({ kondisi: k })}
                            className={`flex-1 py-3 rounded-xl text-sm font-semibold border transition ${form.kondisi === k
                                    ? "border-blue-600 bg-blue-50 text-blue-700"
                                    : "border-gray-200 text-gray-600 bg-white"
                                }`}
                        >
                            {k}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Lokasi ── */}
            <div>
                <label className="text-gray-700 font-semibold text-sm mb-2 block">
                    Lokasi <span className="text-red-500">*</span>
                </label>
                <select
                    value={form.lokasi}
                    onChange={(e) => onChange({ lokasi: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 bg-white focus:outline-none focus:border-blue-500"
                >
                    <option value="">Pilih lokasi...</option>
                    {LOKASI_OPTIONS.map((l) => (
                        <option key={l} value={l}>{l}</option>
                    ))}
                </select>
            </div>

            {/* ── Google Maps URL ── */}
            <div>
                <label className="text-gray-700 font-semibold text-sm mb-2 block">
                    Google Maps URL <span className="text-gray-400 font-normal">(opsional)</span>
                </label>
                <input
                    type="url"
                    value={form.lokasiMaps}
                    placeholder="https://maps.google.com/..."
                    onChange={(e) => onChange({ lokasiMaps: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
            </div>
        </div>
    );
}
