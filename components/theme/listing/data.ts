export type Ad = {
    id: number;
    title: string;
    image: string;
    price: string;
    seller: string;
    time: string;
    location: string;
    highlight: boolean;
};

export const ads: Ad[] = [
    {
        id: 1,
        title: "Tecno Spark 40 Pro Plus + 8 / 128 mulus",
        image: "/ads/sample1.png",
        price: "Rp. 2.400.000",
        seller: "Fahmi Rizki",
        time: "17 Mei 2026",
        location: "Hay Sabi",
        highlight: true,
    },
    {
        id: 2,
        title: "Honda beat deluxe 2021 lengkap mesin halus",
        image: "/ads/sample2.png",
        price: "Rp. 13.250.000",
        seller: "Andika Steven",
        time: "16 Mei 2026",
        location: "Darrasah",
        highlight: false,
    },
    {
        id: 3,
        title: "Laptop lenovo thinkpad i5 ram 8gb ssd 128gb ngebut",
        image: "/ads/sample3.png",
        price: "Rp. 2.700.000",
        seller: "DepoLaptop.id",
        time: "2 Januari 2026",
        location: "Hay Asyir",
        highlight: false,
    },
];
