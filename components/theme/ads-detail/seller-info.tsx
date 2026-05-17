import Image from "next/image";
import { FiChevronRight } from "react-icons/fi";

type Props = {
    seller: string;
    userImage: string;
};

export default function SellerInfo({ seller, userImage }: Props) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 16px", marginBottom: 50 }}>
            <Image
                src={userImage}
                alt={seller}
                width={44}
                height={44}
                style={{ borderRadius: "50%" }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#141414", margin: 0 }}>{seller}</p>
                <p style={{ fontSize: 12, color: "#797979", margin: 0 }}>Bergabung 1 Minggu yang lalu</p>
            </div>
            <FiChevronRight size={22} style={{ color: "#797979", flexShrink: 0 }} />
        </div>
    );
}
