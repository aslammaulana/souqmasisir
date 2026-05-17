type Props = {
    description: string;
};

export default function Description({ description }: Props) {
    return (
        <div style={{ padding: "16px 16px 20px", borderBottom: "6px solid #f3f4f6" }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "#141414", marginBottom: 12 }}>Deskripsi</h2>
            <p style={{ fontSize: 14, color: "#4f4f4f", lineHeight: 1.65, whiteSpace: "pre-line", marginBottom: 20 }}>
                {description}
            </p>
        </div>
    );
}
