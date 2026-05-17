export type Category = {
    id: number;
    label: string;
    image: string;
    href: string;
};

export const categories: Category[] = [
    { id: 1, label: "View All", image: "/category/cat-sample1.png", href: "/categories" },
    { id: 2, label: "Makanan & Minuman", image: "/category/cat-sample2.png", href: "/categories/makanan-minuman" },
    { id: 3, label: "Jasa Taushil", image: "/category/cat-sample1.png", href: "/categories/jasa-taushil" },
    { id: 4, label: "Jasa Harian", image: "/category/cat-sample2.png", href: "/categories/jasa-harian" },
    { id: 5, label: "Elektronik", image: "/category/cat-sample1.png", href: "/categories/elektronik" },
    { id: 6, label: "Kebutuhan Rumah", image: "/category/cat-sample2.png", href: "/categories/kebutuhan-rumah" },
    { id: 7, label: "Lowongan & Jasa", image: "/category/cat-sample1.png", href: "/categories/lowongan-jasa" },
    { id: 8, label: "Properti & Sewa", image: "/category/cat-sample2.png", href: "/categories/properti-sewa" },
];
