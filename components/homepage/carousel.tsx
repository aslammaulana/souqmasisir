"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, animate } from "framer-motion";

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
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const isJumping = useRef(false);

    const x = useMotionValue(0);

    // Track container width
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

    // Calculate target X for a given index
    const getTargetX = useCallback(
        (idx: number) => peekOffset - idx * (slideWidth + GAP),
        [peekOffset, slideWidth]
    );

    // Animate to current slide (skip if we just did a silent clone jump)
    useEffect(() => {
        if (isJumping.current) {
            isJumping.current = false;
            return;
        }
        if (!isDragging && containerWidth > 0) {
            animate(x, getTargetX(current), {
                type: "spring",
                stiffness: 300,
                damping: 30,
                onComplete: () => {
                    // If we landed on a clone, silently jump to the real slide
                    if (current === 0) {
                        isJumping.current = true;
                        x.set(getTargetX(LAST_REAL));
                        setCurrent(LAST_REAL);
                    } else if (current === slides.length - 1) {
                        isJumping.current = true;
                        x.set(getTargetX(FIRST_REAL));
                        setCurrent(FIRST_REAL);
                    }
                },
            });
        }
    }, [current, isDragging, containerWidth, getTargetX, x]);

    // Go to next/prev
    const go = useCallback(
        (dir: 1 | -1) => {
            setCurrent((prev) => prev + dir);
        },
        []
    );

    // Auto-play — skip tick if user is currently dragging
    useEffect(() => {
        const timer = setInterval(() => {
            if (!isDragging) go(1);
        }, AUTOPLAY_DELAY);
        return () => clearInterval(timer);
    }, [go, isDragging]);

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
                    style={{ gap: GAP, x }}
                    drag="x"
                    dragElastic={0.2}
                    dragMomentum={false}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={(_, info) => {
                        setIsDragging(false);
                        const offset = info.offset.x;
                        const velocity = info.velocity.x;

                        let newIndex = current;

                        // Fast swipe → use velocity
                        if (Math.abs(velocity) > 500) {
                            newIndex = velocity > 0 ? current - 1 : current + 1;
                        }
                        // Otherwise use offset threshold (30% of slide width)
                        else if (Math.abs(offset) > slideWidth * 0.3) {
                            newIndex = offset > 0 ? current - 1 : current + 1;
                        }

                        // Clamp to valid slide range (including clones for infinite loop)
                        newIndex = Math.max(0, Math.min(slides.length - 1, newIndex));
                        setCurrent(newIndex);
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
                                    className="w-full h-full object-cover select-none pointer-events-none"
                                    priority={i === FIRST_REAL}
                                    draggable={false}
                                />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            {/* Dots — mapped to real slides only */}
            <div className="flex items-center justify-center gap-2 mt-3">
                {REAL_SLIDES.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i + FIRST_REAL)}
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
