// hooks/useFavorite.ts
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface UseFavoriteReturn {
    favorited: boolean;
    loading: boolean;
    toggle: (e: React.MouseEvent) => Promise<void>;
}

export function useFavorite(
    adId: string,
    initialFavorited: boolean,
    isLoggedIn: boolean
): UseFavoriteReturn {
    const router = useRouter();
    const [favorited, setFavorited] = useState(initialFavorited);
    const [loading, setLoading] = useState(false);

    const toggle = async (e: React.MouseEvent) => {
        e.preventDefault(); // prevent Link navigation when button is inside a Link

        if (!isLoggedIn) {
            router.push("/login");
            return;
        }

        // Optimistic update
        const previous = favorited;
        setFavorited((f) => !f);
        setLoading(true);

        try {
            const res = await fetch("/api/favorites", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ adId }),
            });

            if (!res.ok) {
                // Rollback on HTTP error
                setFavorited(previous);
                return;
            }

            const data = await res.json();
            // Sync with actual server state
            setFavorited(data.favorited);
        } catch {
            // Rollback on network error
            setFavorited(previous);
        } finally {
            setLoading(false);
        }
    };

    return { favorited, loading, toggle };
}
