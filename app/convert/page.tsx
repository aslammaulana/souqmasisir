// app/convert/page.tsx
"use client";

import { useRef, useState, useCallback } from "react";

interface ConversionResult {
    blob: Blob;
    url: string;
    size: number;
    filename: string;
}

function formatSize(bytes: number): string {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

function getFormatLabel(type: string): string {
    const map: Record<string, string> = {
        "image/jpeg": "JPG",
        "image/jpg": "JPG",
        "image/png": "PNG",
        "image/gif": "GIF",
        "image/bmp": "BMP",
        "image/tiff": "TIFF",
        "image/avif": "AVIF",
        "image/svg+xml": "SVG",
        "image/webp": "WEBP",
    };
    return map[type] ?? type.split("/")[1]?.toUpperCase() ?? "?";
}

function convertToWebP(file: File, quality: number): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);

        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;

            const ctx = canvas.getContext("2d");
            if (!ctx) {
                URL.revokeObjectURL(objectUrl);
                return reject(new Error("Canvas tidak didukung"));
            }

            // Background putih untuk PNG transparan
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(objectUrl);

            canvas.toBlob(
                (blob) => {
                    if (!blob) return reject(new Error("Konversi gagal"));
                    resolve(blob);
                },
                "image/webp",
                quality
            );
        };

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error("Gagal memuat gambar"));
        };

        img.src = objectUrl;
    });
}

export default function ConvertPage() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [origPreview, setOrigPreview] = useState<string>("");
    const [quality, setQuality] = useState<number>(85);
    const [converting, setConverting] = useState<boolean>(false);
    const [result, setResult] = useState<ConversionResult | null>(null);
    const [error, setError] = useState<string>("");
    const [dragOver, setDragOver] = useState<boolean>(false);
    const [dimensions, setDimensions] = useState<string>("");

    const handleFile = useCallback((f: File) => {
        setError("");
        setResult(null);
        setDimensions("");

        if (!f.type.startsWith("image/")) {
            setError("File harus berupa gambar.");
            return;
        }
        if (f.size > 5 * 1024 * 1024) {
            setError("Ukuran file melebihi batas 5MB.");
            return;
        }

        setFile(f);
        const url = URL.createObjectURL(f);
        setOrigPreview(url);

        const img = new Image();
        img.onload = () =>
            setDimensions(`${img.naturalWidth} × ${img.naturalHeight}`);
        img.src = url;
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) handleFile(e.target.files[0]);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
    };

    const handleConvert = async () => {
        if (!file) return;
        setConverting(true);
        setError("");

        try {
            const blob = await convertToWebP(file, quality / 100);
            const url = URL.createObjectURL(blob);
            const origName = file.name.replace(/\.[^.]+$/, "");

            setResult({
                blob,
                url,
                size: blob.size,
                filename: `${origName}.webp`,
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Konversi gagal.");
        } finally {
            setConverting(false);
        }
    };

    const savedBytes = result && file ? file.size - result.size : 0;
    const savedPercent =
        result && file ? Math.round((savedBytes / file.size) * 100) : 0;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Konversi Gambar ke WebP
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        PNG, JPG, GIF, BMP, TIFF, AVIF, SVG — maks 5MB. Diproses
                        sepenuhnya di browser, tidak dikirim ke server.
                    </p>
                </div>

                {/* Drop Zone */}
                <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${dragOver
                            ? "border-blue-400 bg-blue-50"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                >
                    <svg
                        className="mx-auto mb-3 text-gray-400"
                        width="40"
                        height="40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                        />
                    </svg>
                    <p className="text-sm font-medium text-gray-700">
                        Klik atau seret gambar ke sini
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        Semua format gambar didukung, maks 5MB
                    </p>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleInputChange}
                    />
                </div>

                {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

                {/* Quality Slider + Convert Button */}
                {file && (
                    <div className="mt-4 bg-white rounded-xl border border-gray-100 p-5">
                        <div className="flex items-center gap-3">
                            <label className="text-sm text-gray-500 w-24 shrink-0">
                                Kualitas{" "}
                                <span className="font-medium text-gray-900">{quality}%</span>
                            </label>
                            <input
                                type="range"
                                min={10}
                                max={100}
                                step={1}
                                value={quality}
                                onChange={(e) => setQuality(Number(e.target.value))}
                                className="flex-1"
                            />
                        </div>

                        <button
                            onClick={handleConvert}
                            disabled={converting}
                            className="mt-4 w-full py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                        >
                            {converting
                                ? "Mengonversi..."
                                : result
                                    ? "Konversi Ulang"
                                    : "Konversi ke WebP"}
                        </button>
                    </div>
                )}

                {/* Preview Cards */}
                {file && (
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        {/* Original */}
                        <div className="bg-white rounded-xl border border-gray-100 p-4">
                            <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 mb-3">
                                Original
                            </span>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={origPreview}
                                alt="Original"
                                className="w-full h-44 object-contain bg-gray-50 rounded-lg"
                            />
                            <div className="grid grid-cols-2 gap-2 mt-3">
                                <div className="bg-gray-50 rounded-lg p-2.5">
                                    <p className="text-xs text-gray-400">Format</p>
                                    <p className="text-sm font-medium mt-0.5">
                                        {getFormatLabel(file.type)}
                                    </p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-2.5">
                                    <p className="text-xs text-gray-400">Ukuran</p>
                                    <p className="text-sm font-medium mt-0.5">
                                        {formatSize(file.size)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* WebP Result */}
                        <div className="bg-white rounded-xl border border-gray-100 p-4">
                            <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700 mb-3">
                                WebP
                            </span>
                            {result ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={result.url}
                                    alt="WebP result"
                                    className="w-full h-44 object-contain bg-gray-50 rounded-lg"
                                />
                            ) : (
                                <div className="w-full h-44 bg-gray-50 rounded-lg flex items-center justify-center">
                                    <p className="text-xs text-gray-400">Tekan tombol konversi</p>
                                </div>
                            )}
                            <div className="grid grid-cols-2 gap-2 mt-3">
                                <div className="bg-gray-50 rounded-lg p-2.5">
                                    <p className="text-xs text-gray-400">Format</p>
                                    <p className="text-sm font-medium mt-0.5">
                                        {result ? "WEBP" : "—"}
                                    </p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-2.5">
                                    <p className="text-xs text-gray-400">Ukuran</p>
                                    <p className="text-sm font-medium mt-0.5">
                                        {result ? formatSize(result.size) : "—"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Summary + Download */}
                {result && file && (
                    <div className="mt-4 bg-white rounded-xl border border-gray-100 p-5">
                        <div className="grid grid-cols-3 gap-3">
                            <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-xs text-gray-400">Dimensi</p>
                                <p className="text-sm font-medium mt-0.5">{dimensions}</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3 col-span-2">
                                <p className="text-xs text-gray-400">Penghematan</p>
                                <p
                                    className={`text-sm font-medium mt-0.5 ${savedBytes > 0 ? "text-green-600" : "text-gray-500"
                                        }`}
                                >
                                    {savedBytes > 0
                                        ? `${formatSize(savedBytes)} lebih kecil (${savedPercent}%)`
                                        : `Ukuran bertambah ${Math.abs(savedPercent)}%`}
                                </p>
                            </div>
                        </div>

                        <a
                            href={result.url}
                            download={result.filename}
                            className="mt-3 w-full py-2.5 rounded-lg border border-green-200 bg-green-50 text-green-700 text-sm font-medium hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
                        >
                            <svg
                                width="16"
                                height="16"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                                />
                            </svg>
                            Unduh {result.filename}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}