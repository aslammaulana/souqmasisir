"use client";

import { FiHeart } from "react-icons/fi";
import { IoLogoWhatsapp } from "react-icons/io5";

type Props = {
    whatsapp: string;
    title: string;
};

export default function AdsFooter({ whatsapp, title }: Props) {
    return (
        <div
            style={{
                position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
                backgroundColor: "#ffffff",
                borderTop: "1px solid #e5e7eb",
            }}
        >
            <div
                style={{
                    maxWidth: 512, margin: "0 auto",
                    display: "flex", alignItems: "center",
                    gap: 12, padding: "12px 16px",
                }}
            >
                {/* Wishlist button */}
                <button
                    aria-label="Wishlist"
                    style={{
                        width: 56, height: 48,
                        borderRadius: 12,
                        border: "2px solid #254ea0",
                        backgroundColor: "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer",
                    }}
                >
                    <FiHeart size={22} strokeWidth={1.8} style={{ color: "#254ea0" }} />
                </button>

                {/* Chat WhatsApp */}
                <a
                    href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`Halo, saya tertarik dengan iklan: ${title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        flex: 1,
                        height: 48, borderRadius: 12,
                        backgroundColor: "#142d5c",
                        color: "#ffffff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        gap: 8,
                        fontWeight: 600, fontSize: 15,
                        textDecoration: "none",
                    }}
                >
                    <IoLogoWhatsapp size={22} />
                    Chat WhatsApp
                </a>
            </div>
        </div>
    );
}
