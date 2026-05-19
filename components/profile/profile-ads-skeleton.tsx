export default function ProfileAdsSkeleton() {
    return (
        <div className="flex flex-col gap-3">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-row rounded-2xl overflow-hidden border border-gray-200 bg-white animate-pulse">
                    {/* Image skeleton */}
                    <div className="w-28 h-24 shrink-0 bg-gray-200" />
                    {/* Info skeleton */}
                    <div className="flex flex-col flex-1 px-3 py-3 gap-2">
                        <div className="h-3.5 bg-gray-200 rounded w-4/5" />
                        <div className="h-3.5 bg-gray-200 rounded w-2/5" />
                        <div className="h-3 bg-gray-100 rounded w-1/3 mt-auto" />
                    </div>
                    {/* Action buttons skeleton */}
                    <div className="flex flex-col gap-2 justify-center pr-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-200" />
                        <div className="w-8 h-8 rounded-lg bg-gray-100" />
                    </div>
                </div>
            ))}
        </div>
    );
}
