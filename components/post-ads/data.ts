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
        label: "Makanan",
        image: "/category/cat-sample1.png",
        subcategories: [
            { id: 101, label: "Makanan Siap Saji", image: "/category/cat-sample1.png" },
            { id: 102, label: "Minuman & Jus", image: "/category/cat-sample1.png" },
            { id: 103, label: "Kue & Roti", image: "/category/cat-sample1.png" },
            { id: 104, label: "Bumbu & Rempah", image: "/category/cat-sample1.png" },
            { id: 105, label: "Snack & Camilan", image: "/category/cat-sample1.png" },
        ],
    },
    {
        id: 2,
        label: "Mobil",
        image: "/category/cat-sample2.png",
        subcategories: [
            { id: 201, label: "Mobil Penumpang", image: "/category/cat-sample2.png" },
            { id: 202, label: "Mobil Niaga", image: "/category/cat-sample2.png" },
            { id: 203, label: "Spare Part Mobil", image: "/category/cat-sample2.png" },
            { id: 204, label: "Aksesoris Mobil", image: "/category/cat-sample2.png" },
            { id: 205, label: "Servis & Bengkel", image: "/category/cat-sample2.png" },
        ],
    },
    {
        id: 3,
        label: "Handphone & Gadget",
        image: "/category/cat-sample1.png",
        subcategories: [
            { id: 301, label: "Handphone", image: "/category/cat-sample1.png" },
            { id: 302, label: "Tablet", image: "/category/cat-sample1.png" },
            { id: 303, label: "Aksesoris Handphone & Tablet", image: "/category/cat-sample1.png" },
            { id: 304, label: "Fotografi & Videografi", image: "/category/cat-sample1.png" },
            { id: 305, label: "Komputer & Laptop", image: "/category/cat-sample1.png" },
            { id: 306, label: "Televisi, Audio & Aksesoris", image: "/category/cat-sample1.png" },
        ],
    },
    {
        id: 4,
        label: "Fashion",
        image: "/category/cat-sample2.png",
        subcategories: [
            { id: 401, label: "Pakaian Pria", image: "/category/cat-sample2.png" },
            { id: 402, label: "Pakaian Wanita", image: "/category/cat-sample2.png" },
            { id: 403, label: "Pakaian Anak", image: "/category/cat-sample2.png" },
            { id: 404, label: "Sepatu & Sandal", image: "/category/cat-sample2.png" },
            { id: 405, label: "Tas & Dompet", image: "/category/cat-sample2.png" },
            { id: 406, label: "Jam Tangan", image: "/category/cat-sample2.png" },
        ],
    },
    {
        id: 5,
        label: "Elektronik",
        image: "/category/cat-sample2.png",
        subcategories: [
            { id: 501, label: "Kulkas & Freezer", image: "/category/cat-sample2.png" },
            { id: 502, label: "Mesin Cuci", image: "/category/cat-sample2.png" },
            { id: 503, label: "AC & Kipas Angin", image: "/category/cat-sample2.png" },
            { id: 504, label: "Peralatan Dapur", image: "/category/cat-sample2.png" },
            { id: 505, label: "Kamera & Optik", image: "/category/cat-sample2.png" },
        ],
    },
    {
        id: 6,
        label: "Properti",
        image: "/category/cat-sample1.png",
        subcategories: [
            { id: 601, label: "Rumah Dijual", image: "/category/cat-sample1.png" },
            { id: 602, label: "Apartemen Dijual", image: "/category/cat-sample1.png" },
            { id: 603, label: "Tanah Dijual", image: "/category/cat-sample1.png" },
            { id: 604, label: "Kontrakan & Kost", image: "/category/cat-sample1.png" },
            { id: 605, label: "Ruko & Gudang", image: "/category/cat-sample1.png" },
        ],
    },
    {
        id: 7,
        label: "Motor",
        image: "/category/cat-sample2.png",
        subcategories: [
            { id: 701, label: "Motor Bebek", image: "/category/cat-sample2.png" },
            { id: 702, label: "Motor Matic", image: "/category/cat-sample2.png" },
            { id: 703, label: "Motor Sport", image: "/category/cat-sample2.png" },
            { id: 704, label: "Spare Part Motor", image: "/category/cat-sample2.png" },
            { id: 705, label: "Aksesoris Motor", image: "/category/cat-sample2.png" },
        ],
    },
    {
        id: 8,
        label: "Jasa",
        image: "/category/cat-sample1.png",
        subcategories: [
            { id: 801, label: "Jasa Rumah Tangga", image: "/category/cat-sample1.png" },
            { id: 802, label: "Jasa Pendidikan", image: "/category/cat-sample1.png" },
            { id: 803, label: "Jasa Kecantikan", image: "/category/cat-sample1.png" },
            { id: 804, label: "Jasa Teknik", image: "/category/cat-sample1.png" },
            { id: 805, label: "Jasa Transportasi", image: "/category/cat-sample1.png" },
        ],
    },
    {
        id: 9,
        label: "Perabot",
        image: "/category/cat-sample1.png",
        subcategories: [
            { id: 901, label: "Furnitur", image: "/category/cat-sample1.png" },
            { id: 902, label: "Dekorasi Rumah", image: "/category/cat-sample1.png" },
            { id: 903, label: "Perlengkapan Tidur", image: "/category/cat-sample1.png" },
            { id: 904, label: "Dapur & Makan", image: "/category/cat-sample1.png" },
            { id: 905, label: "Lampu & Pencahayan", image: "/category/cat-sample1.png" },
        ],
    },
];
