"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import { FiHeart, FiChevronRight } from "react-icons/fi";
import { IoChevronBack, IoLocationSharp, IoLogoWhatsapp } from "react-icons/io5";
import { motion, useMotionValue, animate } from "framer-motion";
import type { Ad } from "./data";

export default function AdsDetail({ ad }: { ad: Ad }) {
    const router = useRouter();
    const allImages = [ad.imageCover, ...ad.images];

    /* ── carousel state ── */
    const [current, setCurrent] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);
    const [slideWidth, setSlideWidth] = useState(0);
    const x = useMotionValue(0);

    // Measure the track width (= one slide width)
    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;
        const measure = () => setSlideWidth(el.offsetWidth);
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        measure();
        return () => ro.disconnect();
    }, []);

    const getTargetX = useCallback(
        (idx: number) => -idx * slideWidth,
        [slideWidth]
    );

    useEffect(() => {
        if (!isDragging && slideWidth > 0) {
            animate(x, getTargetX(current), {
                type: "spring",
                stiffness: 320,
                damping: 32,
            });
        }
    }, [current, isDragging, slideWidth, getTargetX, x]);

    return (
        <div style={{ backgroundColor: "#ffffff", color: "#141414", minHeight: "100dvh" }}>
            <div style={{ maxWidth: 512, margin: "0 auto" }}>

                {/* ─── Carousel ─── */}
                {/*
                  "trackRef" is the overflow-hidden viewport.
                  It has an explicit height so neither the parent nor child
                  needs to resolve dimensions circularly.
                */}
                <div
                    ref={trackRef}
                    style={{
                        position: "relative",
                        width: "100%",
                        /* square: min of viewport width and 512px */
                        height: `min(100vw, 512px)`,
                        overflow: "hidden",
                        backgroundColor: "#f3f4f6",
                    }}
                >
                    <motion.div
                        style={{
                            display: "flex",
                            height: "100%",
                            /* total width = slides × track width */
                            width: slideWidth > 0 ? slideWidth * allImages.length : "100%",
                            x,
                        }}
                        drag="x"
                        dragDirectionLock
                        dragElastic={0.15}
                        dragMomentum={false}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={(_, info) => {
                            setIsDragging(false);
                            const { offset, velocity } = info;
                            let next = current;
                            if (Math.abs(velocity.x) > 500) {
                                next = velocity.x > 0 ? current - 1 : current + 1;
                            } else if (Math.abs(offset.x) > slideWidth * 0.25) {
                                next = offset.x > 0 ? current - 1 : current + 1;
                            }
                            next = Math.max(0, Math.min(allImages.length - 1, next));
                            setCurrent(next);
                        }}
                    >
                        {allImages.map((src, i) => (
                            <div
                                key={i}
                                style={{
                                    position: "relative",
                                    flexShrink: 0,
                                    width: slideWidth > 0 ? slideWidth : "100%",
                                    height: "100%",
                                }}
                            >
                                <Image
                                    src={src}
                                    alt={`${ad.title} — foto ${i + 1}`}
                                    fill
                                    style={{ objectFit: "cover", userSelect: "none", pointerEvents: "none" }}
                                    sizes="(max-width: 512px) 100vw, 512px"
                                    priority={i === 0}
                                    draggable={false}
                                />
                            </div>
                        ))}
                    </motion.div>

                    {/* Back button */}
                    <button
                        onClick={() => router.back()}
                        aria-label="Kembali"
                        style={{
                            position: "absolute", zIndex: 10,
                            top: 16, left: 16,
                            width: 36, height: 36,
                            borderRadius: "50%",
                            backgroundColor: "rgba(0,0,0,0.4)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            border: "none", cursor: "pointer",
                        }}
                    >
                        <IoChevronBack size={22} color="#fff" />
                    </button>

                    {/* Wishlist overlay button */}
                    <button
                        onClick={(e) => e.preventDefault()}
                        aria-label="Tambah ke wishlist"
                        style={{
                            position: "absolute", zIndex: 10,
                            top: 16, right: 16,
                            width: 36, height: 36,
                            borderRadius: "50%",
                            backgroundColor: "rgba(0,0,0,0.4)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            border: "none", cursor: "pointer",
                        }}
                    >
                        <FiHeart size={20} color="#fff" strokeWidth={1.8} />
                    </button>

                    {/* Dots */}
                    <div
                        style={{
                            position: "absolute", zIndex: 10,
                            bottom: 14, left: 0, right: 0,
                            display: "flex", justifyContent: "center", gap: 8,
                        }}
                    >
                        {allImages.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                aria-label={`Foto ${i + 1}`}
                                style={{
                                    height: 8,
                                    width: i === current ? 24 : 8,
                                    borderRadius: 99,
                                    backgroundColor: i === current ? "#2e62d4" : "rgba(255,255,255,0.75)",
                                    border: "none",
                                    cursor: "pointer",
                                    transition: "width 0.3s",
                                    padding: 0,
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* ─── Price & Title ─── */}
                <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid #f0f0f0" }}>
                    <p style={{ fontSize: 22, fontWeight: 700, color: "#141414", margin: 0 }}>{ad.price}</p>
                    <p style={{ fontSize: 15, color: "#4f4f4f", marginTop: 4, lineHeight: 1.4 }}>{ad.title}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12, color: "#797979" }}>
                        <IoLocationSharp size={15} style={{ flexShrink: 0 }} />
                        <p style={{ fontSize: 13, margin: 0 }}>{ad.time} – {ad.location}</p>
                    </div>
                </div>

                {/* ─── Description ─── */}
                <div style={{ padding: "16px 16px 20px", borderBottom: "6px solid #f3f4f6" }}>
                    <h2 style={{ fontSize: 15, fontWeight: 700, color: "#141414", marginBottom: 12 }}>Deskripsi</h2>
                    <p style={{ fontSize: 14, color: "#4f4f4f", lineHeight: 1.65, whiteSpace: "pre-line", marginBottom: 20 }}>
                        {ad.description}
                    </p>
                </div>

                {/* ─── Seller Info ─── */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 16px", marginBottom: 50 }}>
                    <Image
                        src={ad.userImage}
                        alt={ad.seller}
                        width={44}
                        height={44}
                        style={{ borderRadius: "50%" }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 14, fontWeight: 700, color: "#141414", margin: 0 }}>{ad.seller}</p>
                        <p style={{ fontSize: 12, color: "#797979", margin: 0 }}>Bergabung 1 Minggu yang lalu</p>
                    </div>
                    <FiChevronRight size={22} style={{ color: "#797979", flexShrink: 0 }} />
                </div>

                {/* Spacer for sticky footer */}
                <div style={{ height: 80 }} />
            </div>

            {/* ─── Sticky Footer ─── */}
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

                    <a
                        href={`https://wa.me/${ad.whatsapp}?text=${encodeURIComponent(`Halo, saya tertarik dengan iklan: ${ad.title}`)}`}
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
        </div>
    );
}
