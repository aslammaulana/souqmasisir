export type Category = {
    id: number;
    label: string;
    image: string;
    href: string;
};

export const categories: Category[] = [
    { id: 1, label: "View All", image: "/category/category-sample.png", href: "/categories" },
    { id: 2, label: "Makanan & Minuman", image: "/category/category-sample.png", href: "/categories/makanan-minuman" },
    { id: 3, label: "Jasa Taushil", image: "/category/category-sample.png", href: "/categories/jasa-taushil" },
    { id: 4, label: "Jasa Harian", image: "/category/category-sample.png", href: "/categories/jasa-harian" },
    { id: 5, label: "Elektronik", image: "/category/category-sample.png", href: "/categories/elektronik" },
    { id: 6, label: "Kebutuhan Rumah", image: "/category/category-sample.png", href: "/categories/kebutuhan-rumah" },
    { id: 7, label: "Lowongan & Jasa", image: "/category/category-sample.png", href: "/categories/lowongan-jasa" },
    { id: 8, label: "Properti & Sewa", image: "/category/category-sample.png", href: "/categories/properti-sewa" },
];
