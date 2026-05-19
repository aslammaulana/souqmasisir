import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { HiArrowLeft, HiChevronRight } from "react-icons/hi";
import { categories } from "@/components/post-ads/data";

type Props = { params: Promise<{ id: string }> };

export default async function CategoryPage({ params }: Props) {
    const { id } = await params;
    const category = categories.find((c) => c.id === Number(id));

    if (!category) return notFound();

    return (
        <div className="flex flex-col max-w-lg mx-auto min-h-screen bg-gray-50">

            {/* ── Sticky Header ── */}
            <div className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
                <div className="flex items-centexr gap-3 px-4 h-14">
                    <Link
                        href="/"
                        aria-label="Kembali"
                        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors text-gray-800"
                    >
                        <HiArrowLeft size={20} />
                    </Link>
                    <h1 className="text-gray-900 font-semibold text-[15px] flex-1 truncate">
                        {category.label}
                    </h1>
                </div>
            </div>

            {/* ── Section label ── */}
            <div className="px-4 pt-5 pb-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Pilih Subkategori
                </p>
            </div>

            {/* ── Subcategory list card ── */}
            <div className="mx-4 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                {category.subcategories.map((sub, i) => (
                    <Link
                        key={sub.id}
                        href={`/ads?category=${category.id}&sub=${sub.id}&q=${encodeURIComponent(sub.label)}`}
                        className={`flex items-center gap-3 px-4 py-[14px] active:bg-gray-50 transition-colors${i < category.subcategories.length - 1
                            ? " border-b border-gray-100"
                            : ""
                            }`}
                    >
                        {/* Icon */}
                        <div className="w-11 h-11 shrink-0 rounded-xl  flex items-center justify-center overflow-hidden">
                            <Image
                                src={sub.image}
                                alt={sub.label}
                                width={40}
                                height={40}
                                className="object-contain w-[100%] h-[100%]"
                            />
                        </div>

                        {/* Label */}
                        <span className="text-gray-800 text-[14px] font-medium flex-1 leading-snug">
                            {sub.label}
                        </span>

                        {/* Chevron */}
                        <HiChevronRight size={18} className="text-gray-300 shrink-0" />
                    </Link>
                ))}
            </div>

            {/* ── Bottom padding ── */}
            <div className="h-6" />
        </div>
    );
}
