import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SouqMasisir — Marketplace Komunitas Masisir di Mesir",
  description:
    "Platform marketplace khusus Mahasiswa Indonesia & Asia Tenggara di Mesir (Masisir). Jual beli, jasa, sewa rumah, makanan, laundry, dan layanan lainnya — temukan semua dalam hitungan detik.",
  keywords: [
    "SouqMasisir",
    "marketplace masisir",
    "jual beli masisir",
    "mahasiswa indonesia mesir",
    "komunitas cairo",
    "sewa rumah cairo",
    "jasa masisir",
  ],
  openGraph: {
    title: "SouqMasisir — Marketplace Komunitas Masisir di Mesir",
    description:
      "Temukan barang, jasa, dan layanan untuk komunitas Masisir di Cairo. Lebih mudah dari grup WhatsApp.",
    url: "https://souqmasisir.com",
    siteName: "SouqMasisir",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SouqMasisir — Marketplace Komunitas Masisir di Mesir",
    description:
      "Temukan barang, jasa, dan layanan untuk komunitas Masisir di Cairo.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
