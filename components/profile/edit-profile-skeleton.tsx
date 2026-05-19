export default function EditProfileSkeleton() {
    return (
        <div className="px-5 pt-6 flex flex-col gap-6 animate-pulse">

            {/* Basic Information section */}
            <section>
                <div className="h-6 bg-gray-200 rounded w-40 mb-5" />

                {/* Avatar skeleton */}
                <div className="relative w-20 h-20 mb-6">
                    <div className="w-20 h-20 rounded-full bg-gray-200" />
                    <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-gray-300" />
                </div>

                {/* Name field */}
                <div className="mb-5">
                    <div className="h-3 bg-gray-100 rounded w-24 mb-2" />
                    <div className="h-7 bg-gray-200 rounded w-full" />
                </div>

                {/* Bio field */}
                <div>
                    <div className="h-3 bg-gray-100 rounded w-48 mb-2" />
                    <div className="h-7 bg-gray-200 rounded w-full" />
                </div>
            </section>

            <div className="border-t border-gray-200" />

            {/* Contact Information section */}
            <section>
                <div className="h-6 bg-gray-200 rounded w-44 mb-5" />

                {/* Phone */}
                <div className="flex gap-4 mb-5 items-end">
                    <div className="flex flex-col w-28 gap-2">
                        <div className="h-3 bg-gray-100 rounded w-20" />
                        <div className="h-7 bg-gray-200 rounded w-full" />
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <div className="h-3 bg-gray-100 rounded w-16" />
                        <div className="h-7 bg-gray-200 rounded w-full" />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <div className="h-3 bg-gray-100 rounded w-10 mb-2" />
                    <div className="h-7 bg-gray-200 rounded w-full" />
                </div>
            </section>
        </div>
    );
}
