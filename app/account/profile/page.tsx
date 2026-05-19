import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { HiArrowLeft, HiChevronRight, HiUser } from "react-icons/hi";
import Footer from "@/components/theme/footer";
import { auth } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import { formatJoinDate } from "@/lib/format-date";
import ProfileAdsList from "@/components/profile/profile-ads-list";
import ProfileAdsSkeleton from "@/components/profile/profile-ads-skeleton";

export const dynamic = "force-dynamic";

const STEPS_LEFT = 4;

export default async function ProfilePage() {
    const session = await auth();
    if (!session?.user) redirect("/login");

    const userId = session.user.id!;
    const name = session.user.name ?? "Guest";
    const imageUrl = session.user.image ?? null;

    // Fetch join date from Supabase (server-side, no client fetch needed)
    const { data: dbUser } = await supabaseAdmin
        .from("users")
        .select("created_at")
        .eq("id", userId)
        .single();

    const joinDate = formatJoinDate(dbUser?.created_at);

    return (
        <div className="flex flex-col max-w-lg mx-auto min-h-screen bg-white pb-24">

            {/* ── Header ── */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200">
                <Link href="/account" aria-label="Back">
                    <HiArrowLeft size={22} className="text-gray-900" />
                </Link>
                <span className="text-gray-900 font-bold text-base">My Profile</span>
            </div>

            {/* ── Yellow steps banner ── */}
            <Link
                href="/account/profile/edit"
                className="flex items-center justify-between px-4 py-3"
                style={{ backgroundColor: "#f0c800" }}
            >
                <span className="text-gray-900 font-semibold text-sm">
                    You have {STEPS_LEFT} steps left. Complete your profile!
                </span>
                <HiChevronRight size={18} className="text-gray-900 shrink-0" />
            </Link>

            {/* ── Profile Info ── */}
            <div className="px-5 pt-6 pb-4">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4 overflow-hidden">
                    {imageUrl ? (
                        <Image src={imageUrl} alt={name} width={80} height={80} className="object-cover w-full h-full" />
                    ) : (
                        <HiUser size={44} className="text-blue-500" />
                    )}
                </div>
                <h1 className="text-gray-900 font-bold text-2xl mb-1">{name}</h1>
                <p className="text-gray-400 text-sm mb-5">{joinDate}</p>
                <Link
                    href="/account/profile/edit"
                    className="block w-full py-4 rounded-xl text-center text-white font-semibold text-base transition active:scale-[0.98]"
                    style={{ backgroundColor: "#132a4c" }}
                >
                    Edit Profile
                </Link>
            </div>

            {/* ── Divider ── */}
            <div className="border-t border-gray-100 mx-5 my-2" />

            {/* ── Iklan Saya — Streaming ── */}
            <div className="px-5 pt-3">
                <h2 className="text-gray-900 font-bold text-base mb-4">Iklan Saya</h2>
                <Suspense fallback={<ProfileAdsSkeleton />}>
                    <ProfileAdsList />
                </Suspense>
            </div>

            <Footer />
        </div>
    );
}
