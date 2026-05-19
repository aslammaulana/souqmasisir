"use client";

import { useState, use, useMemo } from "react";
import { useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";
import { categories } from "@/components/post-ads/data";
import StepIndicator from "@/components/post-ads/steps/step-indicator";
import Step1Details from "@/components/post-ads/steps/step1-details";
import Step2Photos from "@/components/post-ads/steps/step2-photos";
import Step3Description from "@/components/post-ads/steps/step3-description";
import { EMPTY_FORM, type NewAdForm } from "@/components/post-ads/types";

type Step = 1 | 2 | 3;

export default function NewAdCategoryPage({
    params,
}: {
    params: Promise<{ category: string }>;
}) {
    const router = useRouter();
    const { category } = use(params);
    // The URL slug is actually the SUBCATEGORY (set by popup-new.tsx)
    const subcategoryLabel = decodeURIComponent(category).replace(/-/g, " ");

    // Find parent category by searching through all subcategories
    const parentCategory = useMemo(() =>
        categories.find((c) =>
            c.subcategories.some(
                (s) => s.label.toLowerCase() === subcategoryLabel.toLowerCase()
            )
        ),
        [subcategoryLabel]
    );

    const [step, setStep] = useState<Step>(1);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState<NewAdForm>({
        ...EMPTY_FORM,
        category: parentCategory?.label ?? "",
        categoryId: parentCategory?.id ?? 0,
        subcategory: subcategoryLabel,
    });

    const updateForm = (updates: Partial<NewAdForm>) => {
        setForm((prev) => ({ ...prev, ...updates }));
    };

    const handleBack = () => {
        if (step === 1) router.back();
        else setStep((s) => (s - 1) as Step);
    };

    // Validate current step before advancing
    const canContinue = (): boolean => {
        if (step === 1) return !!form.kondisi && !!form.lokasi;
        if (step === 2) return !!form.coverImage;
        if (step === 3) return !!form.title && !!form.description && !!form.price && !!form.whatsapp;
        return false;
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            const res = await fetch("/api/ads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    category_id: form.categoryId,
                    subcategory: form.subcategory,
                    kondisi: form.kondisi,
                    lokasi: form.lokasi,
                    lokasi_maps: form.lokasiMaps || null,
                    cover_image: form.coverImage,
                    images: [form.image1, form.image2].filter(Boolean),
                    title: form.title,
                    description: form.description,
                    price: Number(form.price),
                    whatsapp: form.whatsapp,
                }),
            });

            if (res.ok) {
                router.push("/myads");
            } else {
                const err = await res.json();
                alert("Gagal pasang iklan: " + (err.error ?? "Unknown error"));
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleContinue = () => {
        if (!canContinue()) return;
        if (step < 3) setStep((s) => (s + 1) as Step);
        else handleSubmit();
    };

    const buttonLabel = submitting ? "Menerbitkan..." : step < 3 ? "Lanjut" : "Pasang Iklan";

    return (
        <div className="flex flex-col max-w-lg mx-auto min-h-screen bg-white">

            {/* ── Header ── */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200 shrink-0">
                <button
                    onClick={handleBack}
                    aria-label="Back"
                    className="bg-transparent border-0 cursor-pointer p-0"
                >
                    <HiArrowLeft size={22} className="text-gray-900" />
                </button>
                <span className="text-gray-900 font-bold text-base capitalize">{subcategoryLabel}</span>
            </div>

            {/* ── Step Indicator ── */}
            <StepIndicator current={step} />

            {/* ── Step Content ── */}
            <div className="flex-1 overflow-y-auto pb-32">
                {step === 1 && <Step1Details form={form} onChange={updateForm} />}
                {step === 2 && <Step2Photos form={form} onChange={updateForm} />}
                {step === 3 && <Step3Description form={form} onChange={updateForm} />}
            </div>

            {/* ── Sticky Bottom Button ── */}
            <div className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto px-5 py-4 bg-white border-t border-gray-100">
                <button
                    onClick={handleContinue}
                    disabled={!canContinue() || submitting}
                    className="w-full py-4 rounded-xl text-white font-semibold text-base transition active:scale-[0.98] disabled:opacity-40"
                    style={{ backgroundColor: "#132a4c" }}
                >
                    {buttonLabel}
                </button>
            </div>
        </div>
    );
}
