import { Suspense } from "react";
import Image from "next/image";
import Footer from "@/components/theme/footer";
import MyAdsList from "@/components/myads/myads-list";
import MyAdsSkeleton from "@/components/myads/myads-skeleton";

export const dynamic = "force-dynamic";

export default function MyAdsPage() {
    return (
        <div className="flex flex-col max-w-lg mx-auto min-h-screen bg-white pb-24">

            {/* ── Header ── */}
            <div className="flex items-center gap-2 px-5 pt-5 pb-2">
                <Image src="/brand/logo-souqmasisir.png" alt="MasisirPedia" width={26} height={26} className="object-contain" />
                <span className="text-gray-900 font-bold text-base">MasisirPedia</span>
            </div>

            <h1 className="text-gray-900 font-bold text-2xl text-center mt-4 mb-5 tracking-wide">MY ADS</h1>

            {/* ── Streaming: Suspense wraps data-fetching section ── */}
            <Suspense fallback={<MyAdsSkeleton />}>
                <MyAdsList />
            </Suspense>

            <Footer />
        </div>
    );
}
