import { IoLocationSharp } from "react-icons/io5";

type Props = {
    price: string;
    title: string;
    time: string;
    location: string;
};

export default function PriceInfo({ price, title, time, location }: Props) {
    return (
        <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid #f0f0f0" }}>
            <p style={{ fontSize: 22, fontWeight: 700, color: "#141414", margin: 0 }}>{price}</p>
            <p style={{ fontSize: 15, color: "#4f4f4f", marginTop: 4, lineHeight: 1.4 }}>{title}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12, color: "#797979" }}>
                <IoLocationSharp size={15} style={{ flexShrink: 0 }} />
                <p style={{ fontSize: 13, margin: 0 }}>{time} – {location}</p>
            </div>
        </div>
    );
}
