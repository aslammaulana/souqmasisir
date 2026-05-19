import Image from "next/image";

export default function AccountHeader() {
    return (
        <div className="flex items-center gap-2 px-5 pt-5 pb-4">
            <Image
                src="/brand/logo-souqmasisir.png"
                alt="MasisirPedia"
                width={28}
                height={28}
                className="object-contain"
            />
            <span className="text-gray-900 font-bold text-base">MasisirPedia</span>
        </div>
    );
}
