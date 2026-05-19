"use client";

import { motion } from "framer-motion";

export default function SlideInWrapper({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ minHeight: "100vh", width: "100%" }}
        >
            {children}
        </motion.div>
    );
}
