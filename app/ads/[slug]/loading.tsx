// Skeleton loading state for Ads Detail page
// Automatically used by Next.js App Router as a Suspense boundary

export default function AdsDetailLoading() {
    return (
        <div style={{ backgroundColor: "#ffffff", color: "#141414", minHeight: "100dvh" }}>
            <div style={{ maxWidth: 512, margin: "0 auto" }}>

                {/* Carousel skeleton */}
                <div className="relative w-full animate-pulse" style={{ aspectRatio: "1 / 1" }}>
                    <div className="w-full h-full bg-gray-200" />
                    {/* Back button placeholder */}
                    <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-gray-300" />
                    {/* Dots placeholder */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className={`h-2 rounded-full ${i === 0 ? "w-5 bg-gray-400" : "w-2 bg-gray-300"}`} />
                        ))}
                    </div>
                </div>

                {/* Price & Title skeleton */}
                <div className="px-4 pt-4 pb-3 border-b border-gray-100 animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-3" />
                    <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>

                {/* Category chips skeleton */}
                <div className="px-4 pt-4 pb-4 border-b border-gray-100 animate-pulse">
                    <div className="flex flex-wrap gap-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-7 bg-blue-50 border border-blue-100 rounded-full" style={{ width: `${60 + i * 20}px` }} />
                        ))}
                    </div>
                </div>

                {/* Description skeleton */}
                <div className="px-4 pt-4 pb-4 border-b border-gray-100 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-3" />
                    <div className="space-y-2">
                        <div className="h-3 bg-gray-100 rounded w-full" />
                        <div className="h-3 bg-gray-100 rounded w-full" />
                        <div className="h-3 bg-gray-100 rounded w-5/6" />
                        <div className="h-3 bg-gray-100 rounded w-2/3" />
                    </div>
                </div>

                {/* Seller info skeleton */}
                <div className="px-4 pt-4 pb-4 border-b border-gray-100 animate-pulse">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-gray-200 shrink-0" />
                        <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded w-28 mb-1.5" />
                            <div className="h-3 bg-gray-100 rounded w-20" />
                        </div>
                    </div>
                </div>

                {/* Bottom spacer */}
                <div style={{ height: 80 }} />
            </div>

            {/* Sticky footer skeleton */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 animate-pulse" style={{ maxWidth: 512, margin: "0 auto" }}>
                <div className="flex items-center gap-3 px-4 py-3">
                    <div className="h-11 bg-gray-200 rounded-xl flex-1" />
                    <div className="h-11 w-11 bg-gray-200 rounded-xl" />
                </div>
            </div>
        </div>
    );
}
