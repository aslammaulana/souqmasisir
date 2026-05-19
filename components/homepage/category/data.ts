export type Category = {
    id: number;
    label: string;
    image: string;
    href: string;
};

export const categories: Category[] = [
    { id: 0, label: "Semua", image: "/category/cat-sample1.png", href: "/ads" },
    { id: 1, label: "Makanan & Minuman", image: "/category/cat-sample2.png", href: "/category/1" },
    { id: 2, label: "Properti & Sewa", image: "/category/cat-sample1.png", href: "/category/2" },
    { id: 3, label: "Jasa Taushil", image: "/category/cat-sample2.png", href: "/category/3" },
    { id: 4, label: "Jasa Harian", image: "/category/cat-sample1.png", href: "/category/4" },
    { id: 5, label: "Elektronik", image: "/category/cat-sample2.png", href: "/category/5" },
    { id: 6, label: "Perabot Rumah", image: "/category/cat-sample1.png", href: "/category/6" },
    { id: 7, label: "Lowongan & Jasa", image: "/category/cat-sample2.png", href: "/category/7" },
];
