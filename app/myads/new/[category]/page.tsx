"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";
import StepIndicator from "@/components/post-ads/steps/step-indicator";
import Step1Photos from "@/components/post-ads/steps/step1-photos";
import Step2Details from "@/components/post-ads/steps/step2-details";
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
    const categoryLabel = decodeURIComponent(category).replace(/-/g, " ");

    const [step, setStep] = useState<Step>(1);
    const [form, setForm] = useState<NewAdForm>({
        ...EMPTY_FORM,
        category: categoryLabel,
    });

    const updateForm = (updates: Partial<NewAdForm>) => {
        setForm((prev) => ({ ...prev, ...updates }));
    };

    const handleBack = () => {
        if (step === 1) router.back();
        else setStep((s) => (s - 1) as Step);
    };

    const handleContinue = () => {
        if (step < 3) {
            setStep((s) => (s + 1) as Step);
        } else {
            // TODO: submit form
            console.log("Submit:", form);
            router.push("/myads");
        }
    };

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
                <span className="text-gray-900 font-bold text-base capitalize">{categoryLabel}</span>
            </div>

            {/* ── Step Indicator ── */}
            <StepIndicator current={step} />

            {/* ── Step Content ── */}
            <div className="flex-1 overflow-y-auto pb-32">
                {step === 1 && <Step1Photos form={form} onChange={updateForm} />}
                {step === 2 && <Step2Details form={form} onChange={updateForm} />}
                {step === 3 && <Step3Description form={form} onChange={updateForm} />}
            </div>

            {/* ── Continue Button — sticky bottom ── */}
            <div className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto px-5 py-4 bg-white border-t border-gray-100">
                <button
                    onClick={handleContinue}
                    className="w-full py-4 rounded-xl text-white font-semibold text-base transition active:scale-[0.98]"
                    style={{ backgroundColor: "#132a4c" }}
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
