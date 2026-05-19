import Image from "next/image";
import { HiUser } from "react-icons/hi";

type Props = {
    name: string;
    imageUrl: string | null;
    joinDate: string;
};

export default function UserSection({ name, imageUrl, joinDate }: Props) {
    return (
        <div className="flex items-center gap-4 px-5 pt-4 pb-6">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center shrink-0 overflow-hidden">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <HiUser size={36} className="text-blue2" />
                )}
            </div>
            {/* Name & joined */}
            <div>
                <p className="text-gray-900 font-bold text-lg leading-tight">{name}</p>
                <p className="text-gray-400 text-sm">{joinDate}</p>
            </div>
        </div>
    );
}
