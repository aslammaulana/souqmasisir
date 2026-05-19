export type Subcategory = {
    id: number;
    label: string;
    image: string;
};

export type Category = {
    id: number;
    label: string;
    image: string;
    subcategories: Subcategory[];
};

export const categories: Category[] = [
    {
        id: 1,
        label: "Makanan & Minuman",
        image: "/category/cat-sample1.png",
        subcategories: [
            { id: 101, label: "Masakan Indonesia", image: "/category/cat-sample1.png" },
            { id: 102, label: "Katering & Pesanan", image: "/category/cat-sample1.png" },
            { id: 103, label: "Kue & Jajanan", image: "/category/cat-sample1.png" },
            { id: 104, label: "Sembako & Bahan Masak", image: "/category/cat-sample1.png" },
            { id: 105, label: "Minuman & Frozen Food", image: "/category/cat-sample1.png" },
        ],
    },
    {
        id: 2,
        label: "Properti & Sewa",
        image: "/category/cat-sample2.png",
        subcategories: [
            { id: 201, label: "Sewa Kamar / Kost", image: "/category/cat-sample2.png" },
            { id: 202, label: "Sewa Apartemen", image: "/category/cat-sample2.png" },
            { id: 203, label: "Cari Teman Sekamar", image: "/category/cat-sample2.png" },
            { id: 204, label: "Jual Properti", image: "/category/cat-sample2.png" },
        ],
    },
    {
        id: 3,
        label: "Jasa Taushil & Transportasi",
        image: "/category/cat-sample1.png",
        subcategories: [
            { id: 301, label: "Antar Jemput Bandara", image: "/category/cat-sample1.png" },
            { id: 302, label: "Antar Barang & Titip", image: "/category/cat-sample1.png" },
            { id: 303, label: "Sewa Kendaraan", image: "/category/cat-sample1.png" },
            { id: 304, label: "Jasa Pemandu / Guide", image: "/category/cat-sample1.png" },
        ],
    },
    {
        id: 4,
        label: "Jasa Harian",
        image: "/category/cat-sample2.png",
        subcategories: [
            { id: 401, label: "Laundry & Setrika", image: "/category/cat-sample2.png" },
            { id: 402, label: "Potong Rambut", image: "/category/cat-sample2.png" },
            { id: 403, label: "Pijat & Kesehatan", image: "/category/cat-sample2.png" },
            { id: 404, label: "Jasa Kebersihan", image: "/category/cat-sample2.png" },
            { id: 405, label: "Jahit & Bordir", image: "/category/cat-sample2.png" },
        ],
    },
    {
        id: 5,
        label: "Elektronik & Gadget",
        image: "/category/cat-sample1.png",
        subcategories: [
            { id: 501, label: "Handphone & Tablet", image: "/category/cat-sample1.png" },
            { id: 502, label: "Laptop & Komputer", image: "/category/cat-sample1.png" },
            { id: 503, label: "Aksesoris Gadget", image: "/category/cat-sample1.png" },
            { id: 504, label: "Kamera & Foto", image: "/category/cat-sample1.png" },
        ],
    },
    {
        id: 6,
        label: "Perabot & Kebutuhan Rumah",
        image: "/category/cat-sample2.png",
        subcategories: [
            { id: 601, label: "Furnitur Bekas", image: "/category/cat-sample2.png" },
            { id: 602, label: "Peralatan Dapur", image: "/category/cat-sample2.png" },
            { id: 603, label: "Kebutuhan Kamar", image: "/category/cat-sample2.png" },
            { id: 604, label: "Elektronik Rumah Tangga", image: "/category/cat-sample2.png" },
        ],
    },
    {
        id: 7,
        label: "Lowongan & Jasa Profesional",
        image: "/category/cat-sample1.png",
        subcategories: [
            { id: 701, label: "Lowongan Kerja", image: "/category/cat-sample1.png" },
            { id: 702, label: "Jasa Desain & Kreatif", image: "/category/cat-sample1.png" },
            { id: 703, label: "Les & Bimbel", image: "/category/cat-sample1.png" },
            { id: 704, label: "Jasa Terjemah", image: "/category/cat-sample1.png" },
            { id: 705, label: "Jasa IT & Teknis", image: "/category/cat-sample1.png" },
        ],
    },
    {
        id: 8,
        label: "Fashion & Keperluan Pribadi",
        image: "/category/cat-sample2.png",
        subcategories: [
            { id: 801, label: "Pakaian Pria & Wanita", image: "/category/cat-sample2.png" },
            { id: 802, label: "Mukena, Hijab & Aksesoris", image: "/category/cat-sample2.png" },
            { id: 803, label: "Obat & Suplemen", image: "/category/cat-sample2.png" },
            { id: 804, label: "Kosmetik & Perawatan", image: "/category/cat-sample2.png" },
            { id: 805, label: "Buku & Kitab", image: "/category/cat-sample2.png" },
        ],
    },
];
