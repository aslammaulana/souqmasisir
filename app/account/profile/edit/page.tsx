import { Suspense } from "react";
import EditProfileLoader from "@/components/profile/edit-profile-loader";
import EditProfileSkeleton from "@/components/profile/edit-profile-skeleton";

export const dynamic = "force-dynamic";

export default function EditProfilePage() {
    return (
        <Suspense fallback={
            <div className="flex flex-col max-w-lg mx-auto min-h-screen bg-white pb-24">
                {/* Header static */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                    <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
                    <div className="w-12 h-5 bg-gray-200 rounded animate-pulse" />
                </div>
                <EditProfileSkeleton />
            </div>
        }>
            <EditProfileLoader />
        </Suspense>
    );
}
