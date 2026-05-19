import Link from "next/link";

export default function EditProfileButton() {
    return (
        <div className="px-5 mb-6">
            <Link
                href="/account/profile"
                className="block w-full py-4 rounded-xl text-center text-white font-semibold text-base transition active:scale-[0.98]"
                style={{ backgroundColor: "#132a4c" }}
            >
                View and Edit Profile
            </Link>
        </div>
    );
}
