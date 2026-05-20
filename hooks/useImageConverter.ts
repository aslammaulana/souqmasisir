// hooks/useImageConverter.ts

/**
 * Converts an image File to WebP format using the Canvas API.
 * Processing is done entirely in the browser — nothing is sent to a server.
 *
 * @param file    - The source image File (any browser-supported format).
 * @param quality - WebP quality 0–1 (default 0.85).
 * @returns       - A new File with .webp extension and image/webp type.
 *                  If the file is already WebP it is returned as-is.
 */
export function convertToWebP(file: File, quality = 0.85): Promise<File> {
    // Already WebP – skip conversion to save CPU
    if (file.type === "image/webp") return Promise.resolve(file);

    return new Promise((resolve, reject) => {
        const objectUrl = URL.createObjectURL(file);
        const img = new Image();

        img.onload = () => {
            URL.revokeObjectURL(objectUrl);

            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;

            const ctx = canvas.getContext("2d");
            if (!ctx) {
                return reject(new Error("Canvas 2D context not available"));
            }

            // Fill white background so transparent PNGs look correct in WebP
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);

            canvas.toBlob(
                (blob) => {
                    if (!blob) return reject(new Error("WebP conversion failed"));

                    // Keep the original filename but change extension to .webp
                    const baseName = file.name.replace(/\.[^.]+$/, "");
                    const webpFile = new File([blob], `${baseName}.webp`, {
                        type: "image/webp",
                        lastModified: Date.now(),
                    });

                    resolve(webpFile);
                },
                "image/webp",
                quality
            );
        };

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error("Failed to load image"));
        };

        img.src = objectUrl;
    });
}
