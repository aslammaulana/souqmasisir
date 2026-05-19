export default function MyAdsSkeleton() {
    return (
        <div className="flex flex-col gap-3 px-5">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl animate-pulse">
                    {/* Thumbnail skeleton */}
                    <div className="w-20 h-20 rounded-lg bg-gray-200 shrink-0" />

                    {/* Info skeleton */}
                    <div className="flex-1 min-w-0 flex flex-col gap-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-1/3" />
                        <div className="h-3 bg-gray-100 rounded w-1/2" />
                    </div>

                    {/* Actions skeleton */}
                    <div className="flex flex-col gap-2 shrink-0">
                        <div className="w-8 h-8 rounded-lg bg-gray-200" />
                        <div className="w-8 h-8 rounded-lg bg-gray-100" />
                    </div>
                </div>
            ))}
        </div>
    );
}
