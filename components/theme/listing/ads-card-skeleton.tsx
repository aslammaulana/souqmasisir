// Skeleton component that mirrors the visual structure of AdsCard
// Used as Suspense fallback while ListingSection is fetching from Supabase

function SingleCardSkeleton() {
    return (
        <div className="flex flex-col rounded-lg overflow-hidden border-[1.5px] border-gray-200 bg-white animate-pulse">
            {/* Image placeholder */}
            <div className="w-full aspect-square bg-gray-200" />

            {/* Body placeholder */}
            <div className="flex flex-col flex-1 px-2.5 pt-2.5 pb-3 gap-2">
                {/* Title lines */}
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-3/4" />

                {/* Price */}
                <div className="h-4 bg-gray-200 rounded w-1/2 mt-1" />

                {/* Meta */}
                <div className="h-3 bg-gray-100 rounded w-2/3 mt-4" />
            </div>
        </div>
    );
}

export default function AdsCardSkeleton({ count = 6 }: { count?: number }) {
    return (
        <section className="w-full px-4 py-2 mt-5">
            {/* Title skeleton */}
            <div className="h-4 bg-gray-200 rounded w-28 mb-3 animate-pulse" />

            <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: count }).map((_, i) => (
                    <SingleCardSkeleton key={i} />
                ))}
            </div>
        </section>
    );
}
