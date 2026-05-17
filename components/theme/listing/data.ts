export type Ad = {
    id: number;
    title: string;
    imageCover: string;
    images: string[];
    price: string;
    seller: string;
    time: string;
    location: string;
    highlight: boolean;
    badge: "super" | "verified" | "none";
    description: string;
    userImage: string;
    whatsapp: string;
};

export const ads: Ad[] = [
    {
        id: 1,
        title: "Tecno Spark 40 Pro Plus + 8 / 128 mulus",
        imageCover: "/ads/sample1.png",
        images: ["/ads/sample1-1.png"],
        price: "Rp. 2.400.000",
        seller: "Fahmi Rizki",
        time: "17 Mei 2026",
        location: "Hay Sabi",
        highlight: true,
        badge: "super",
        description: `Laptop gaming & editing,
        

Mulus ori normal
Processor core i5 gen 6
Ssd 128gb
Ram 8gbv
Keyboard ok
Windows 10
Wifi ok
Speaker ok
Batre normal
Bisa cod atau diantar
Kelengkapan laptop, charger`,
        userImage: "/ads/user.png",
        whatsapp: "6285356078836",
    },
    {
        id: 2,
        title: "Honda beat deluxe 2021 lengkap mesin halus",
        imageCover: "/ads/sample2.png",
        images: ["/ads/sample2-1.png", "/ads/sample2-2.png"],
        price: "Rp. 13.250.000",
        seller: "Andika Steven",
        time: "16 Mei 2026",
        location: "Darrasah",
        highlight: false,
        badge: "verified",
        description: "loremipsum1",
        userImage: "/ads/user.png",
        whatsapp: "6285356078836",
    },
    {
        id: 3,
        title: "Laptop lenovo thinkpad i5 ram 8gb ssd 128gb ngebut",
        imageCover: "/ads/sample3.png",
        images: ["/ads/sample3-1.png", "/ads/sample3-2.png"],
        price: "Rp. 2.700.000",
        seller: "DepoLaptop.id",
        time: "2 Januari 2026",
        location: "Hay Asyir",
        highlight: false,
        badge: "none",
        description: "loremipsum1",
        userImage: "/ads/user.png",
        whatsapp: "6285356078836",
    },
];
