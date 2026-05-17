"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const REAL_SLIDES = [
    { id: 1, src: "/carousel/image2.png", alt: "Promo 1" },
    { id: 2, src: "/carousel/image3.png", alt: "Promo 2" },
    { id: 3, src: "/carousel/image4.png", alt: "Promo 3" },
];

// Clone: [last, ...real, first]  → real slides start at index 1
const slides = [
    { ...REAL_SLIDES[REAL_SLIDES.length - 1], id: -1 }, // clone of last
    ...REAL_SLIDES,
    { ...REAL_SLIDES[0], id: 999 },                     // clone of first
];
const FIRST_REAL = 1;
const LAST_REAL = REAL_SLIDES.length; // = slides.length - 2

const AUTOPLAY_DELAY = 4000;
const SLIDE_RATIO = 0.80; // 80% visible, ~10% peek each side
const GAP = 12; // px

export default function Carousel() {
    const [current, setCurrent] = useState(FIRST_REAL);
    const [animated, setAnimated] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const isJumping = useRef(false);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new ResizeObserver(() => setContainerWidth(el.offsetWidth));
        observer.observe(el);
        setContainerWidth(el.offsetWidth);
        return () => observer.disconnect();
    }, []);

    const slideWidth = containerWidth * SLIDE_RATIO;
    const peekOffset = containerWidth > 0 ? (containerWidth - slideWidth) / 2 : 0;
    const trackX = peekOffset - current * (slideWidth + GAP);

    // After animating to a clone, silently jump to the matching real slide
    const handleAnimationComplete = useCallback(() => {
        if (isJumping.current) return;
        if (current === 0) {
            isJumping.current = true;
            setAnimated(false);
            setCurrent(LAST_REAL);
        } else if (current === slides.length - 1) {
            isJumping.current = true;
            setAnimated(false);
            setCurrent(FIRST_REAL);
        }
    }, [current]);

    // Re-enable animation after the silent jump renders
    useEffect(() => {
        if (!animated) {
            // Wait one frame then re-enable animation
            const raf = requestAnimationFrame(() => {
                setAnimated(true);
                isJumping.current = false;
            });
            return () => cancelAnimationFrame(raf);
        }
    }, [animated]);

    const go = useCallback((dir: 1 | -1) => {
        setCurrent((prev) => prev + dir);
        setAnimated(true);
    }, []);

    // Auto-play — always go next
    useEffect(() => {
        const timer = setInterval(() => go(1), AUTOPLAY_DELAY);
        return () => clearInterval(timer);
    }, [go]);

    // Dot = which real slide is active (1-indexed → 0-indexed for dots)
    const realIndex =
        current === 0
            ? REAL_SLIDES.length - 1
            : current === slides.length - 1
                ? 0
                : current - FIRST_REAL;

    return (
        <div className="w-full py-3">
            {/* Viewport */}
            <div ref={containerRef} className="w-full overflow-hidden">
                <motion.div
                    className="flex"
                    style={{ gap: GAP }}
                    animate={{ x: trackX }}
                    transition={
                        animated
                            ? { type: "spring", stiffness: 260, damping: 28 }
                            : { duration: 0 }
                    }
                    onAnimationComplete={handleAnimationComplete}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.15}
                    onDragEnd={(_, info) => {
                        if (info.offset.x < -30) go(1);
                        else if (info.offset.x > 30) go(-1);
                    }}
                >
                    {slides.map((slide, i) => {
                        const isActive = i === current;
                        return (
                            <motion.div
                                key={`${slide.id}-${i}`}
                                className="shrink-0 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing"
                                style={{
                                    width: slideWidth || `${SLIDE_RATIO * 100}%`,
                                    aspectRatio: "2 / 1", // 1230 × 615
                                }}
                                animate={{ opacity: isActive ? 1 : 0.75 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Image
                                    src={slide.src}
                                    alt={slide.alt}
                                    width={1230}
                                    height={615}
                                    className="w-full h-full object-cover select-none"
                                    priority={i === FIRST_REAL}
                                    draggable={false}
                                />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            {/* Dots — mapped to real slides only */}
            <div className="flex  items-center justify-center gap-2 mt-3">
                {REAL_SLIDES.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            setAnimated(true);
                            setCurrent(i + FIRST_REAL);
                        }}
                        aria-label={`Slide ${i + 1}`}
                        className="rounded-full cursor-pointer h-2 transition-all duration-300"
                        style={{
                            width: i === realIndex ? "24px" : "8px",
                            backgroundColor: i === realIndex ? "#2e62d4" : "#cecece",
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
