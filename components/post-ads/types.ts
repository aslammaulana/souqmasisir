export type NewAdForm = {
    // Meta
    category: string;
    categoryId: number;

    // Step 1 — details
    subcategory: string;
    kondisi: string;   // "Baru" | "Bekas"
    lokasi: string;
    lokasiMaps: string;   // optional Google Maps URL

    // Step 2 — photos (stored as uploaded URLs)
    coverImage: string;
    image1: string;
    image2: string;

    // Step 3 — description
    title: string;
    description: string;
    price: string;
    whatsapp: string;
};

export const EMPTY_FORM: NewAdForm = {
    category: "",
    categoryId: 0,
    subcategory: "",
    kondisi: "",
    lokasi: "",
    lokasiMaps: "",
    coverImage: "",
    image1: "",
    image2: "",
    title: "",
    description: "",
    price: "",
    whatsapp: "",
};
