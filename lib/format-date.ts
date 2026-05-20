import { formatDistanceToNow } from "date-fns";
import { id as localeId } from "date-fns/locale";

/**
 * Format a joined date string into a human-readable label.
 *
 * - < 1 day   → "Bergabung hari ini"
 * - < 7 days  → "Bergabung X hari yang lalu"
 * - >= 7 days → "Bergabung 1 Jan 2026"
 */
export function formatJoinDate(createdAt: string | null | undefined): string {
    if (!createdAt) return "";

    const created = new Date(createdAt);
    const now = new Date();
    const diffMs = now.getTime() - created.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return "Bergabung hari ini";
    if (diffDays < 7) return `Bergabung ${diffDays} hari yang lalu`;

    return "Bergabung " + created.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

/**
 * Format date to relative "X time ago"
 */
export function formatDate(date: string | Date): string {
    return formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: localeId,
    });
}
