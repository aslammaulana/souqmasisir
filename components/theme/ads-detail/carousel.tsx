"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { FaArrowLeft, FaRegHeart } from "react-icons/fa";

type Props = {
    images: string[];
    title: string;
};

export default function AdsCarousel({ images, title }: Props) {
    const router = useRouter();

    const [current, setCurrent] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);
    const [slideWidth, setSlideWidth] = useState(0);
    const x = useMotionValue(0);

    // Measure track width
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
        <div
            ref={trackRef}
            style={{
                position: "relative",
                width: "100%",
                height: "min(100vw, 512px)",
                overflow: "hidden",
                backgroundColor: "#f3f4f6",
            }}
        >
            {/* Slides */}
            <motion.div
                style={{
                    display: "flex",
                    height: "100%",
                    width: slideWidth > 0 ? slideWidth * images.length : "100%",
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
                    next = Math.max(0, Math.min(images.length - 1, next));
                    setCurrent(next);
                }}
            >
                {images.map((src, i) => (
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
                            alt={`${title} — foto ${i + 1}`}
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
                <FaArrowLeft size={22} color="#fff" />
            </button>

            {/* Wishlist overlay */}
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
                <FaRegHeart   size={20} color="#fff" strokeWidth={1.8} />
            </button>

            {/* Dots */}
            <div
                style={{
                    position: "absolute", zIndex: 10,
                    bottom: 14, left: 0, right: 0,
                    display: "flex", justifyContent: "center", gap: 8,
                }}
            >
                {images.map((_, i) => (
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
    );
}
