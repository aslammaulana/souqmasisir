"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { Category } from "./data";

type Props = {
    category: Category | null;
    onClose: () => void;
    onSelectSub: (subLabel: string) => void;
};

export default function PopupNew({ category, onClose, onSelectSub }: Props) {
    // Close on backdrop click or ESC key
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    if (!category) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40 bg-black/30"
                onClick={onClose}
            />

            {/* Bottom Sheet */}
            <div
                className="fixed bottom-0 left-0 right-0 z-50 max-w-lg mx-auto rounded-t-3xl overflow-hidden"
                style={{ backgroundColor: "#ffffff" }}
            >
                {/* Drag handle */}
                <div className="flex justify-center bg-[#dde9ff] pt-3 pb-1">
                    <div className="w-10 h-1 rounded-full bg-white" />
                </div>

                {/* Category header row — blue bg */}
                <div className="flex items-center gap-4 px-5 py-1" style={{ backgroundColor: "#dde9ff" }}>
                    <div className="w-12 h-12 shrink-0">
                        <Image
                            src={category.image}
                            alt={category.label}
                            width={48}
                            height={48}
                            className="object-contain w-full h-full"
                        />
                    </div>
                    <span className="text-gray-900 font-bold text-base">{category.label}</span>
                </div>

                {/* Subcategory list */}
                <div className="overflow-y-auto" style={{ maxHeight: "60vh" }}>
                    {category.subcategories.map((sub, i) => (
                        <button
                            key={sub.id}
                            onClick={() => { onSelectSub(sub.label); onClose(); }}
                            className={`w-full flex items-center gap-4 px-5 py-2 text-left transition hover:bg-gray-50 active:bg-gray-100 bg-transparent border-0 ${i < category.subcategories.length - 1 ? "border-b border-gray-100" : ""
                                }`}
                        >
                            <div className="w-10 h-10 shrink-0">
                                <Image
                                    src={sub.image}
                                    alt={sub.label}
                                    width={40}
                                    height={40}
                                    className="object-contain w-full h-full"
                                />
                            </div>
                            <span className="text-gray-800 text-sm">{sub.label}</span>
                        </button>
                    ))}
                </div>

                {/* Bottom safe area */}
                <div className="h-6" />
            </div>
        </>
    );
}
