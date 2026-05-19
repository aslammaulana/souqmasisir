"use client";

import { HiChevronDown } from "react-icons/hi";
import type { NewAdForm } from "@/components/post-ads/types";

type Props = {
    form: NewAdForm;
    onChange: (updates: Partial<NewAdForm>) => void;
};

const CONDITIONS = ["Baru", "Bekas - Sangat Baik", "Bekas - Baik", "Bekas - Cukup"];
const LOCATIONS = ["Hay Asyir", "Hay Sabi", "Darrasah", "Abbassiyah", "Nasr City", "Maadi", "Heliopolis"];

export default function Step2Details({ form, onChange }: Props) {
    return (
        <div className="flex flex-col px-5 gap-5">
            <h2 className="text-gray-900 font-bold text-lg">Provide Item Details</h2>

            {/* Kondisi */}
            <div>
                <label className="text-gray-500 text-sm mb-1.5 block">Kondisi</label>
                <div className="relative">
                    <select
                        value={form.kondisi}
                        onChange={(e) => onChange({ kondisi: e.target.value })}
                        className="w-full appearance-none border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-900 bg-white outline-none focus:border-gray-600 transition"
                    >
                        <option value="">-- Pilih Kondisi --</option>
                        {CONDITIONS.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                    <HiChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
            </div>

            {/* Lokasi */}
            <div>
                <label className="text-gray-500 text-sm mb-1.5 block">Lokasi</label>
                <div className="relative">
                    <select
                        value={form.lokasi}
                        onChange={(e) => onChange({ lokasi: e.target.value })}
                        className="w-full appearance-none border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-900 bg-white outline-none focus:border-gray-600 transition"
                    >
                        <option value="">-- Pilih Lokasi --</option>
                        {LOCATIONS.map((l) => (
                            <option key={l} value={l}>{l}</option>
                        ))}
                    </select>
                    <HiChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
            </div>

            {/* Google Maps URL */}
            <div>
                <label className="text-gray-500 text-sm mb-1.5 block">Lokasi Google Maps</label>
                <input
                    type="url"
                    placeholder="Cantumkan Url Google Maps..."
                    value={form.googleMapsUrl}
                    onChange={(e) => onChange({ googleMapsUrl: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-900 placeholder-gray-300 outline-none focus:border-gray-600 transition bg-white"
                />
            </div>
        </div>
    );
}
