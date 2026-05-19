/**
 * Convert an ad title + UUID into a SEO-friendly slug.
 * Format: "laptop-asus-rog-bekas--90cd7727-f74d-482e-9c92"
 * Double-dash (--) separates the title slug from the UUID.
 */
export function toAdSlug(title: string, id: string): string {
    const titleSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")   // remove special chars
        .trim()
        .replace(/\s+/g, "-")            // spaces → dashes
        .replace(/-+/g, "-")             // collapse multiple dashes
        .slice(0, 60);                   // max 60 chars
    return `${titleSlug}--${id}`;
}

/**
 * Extract the UUID from a slug like "laptop-asus-rog--90cd7727-f74d-..."
 * Returns the part after the last "--".
 */
export function extractIdFromSlug(slug: string): string {
    const parts = slug.split("--");
    return parts[parts.length - 1];
}
