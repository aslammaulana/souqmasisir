export type NewAdForm = {
    category: string;
    coverPhoto: File | null;
    photo1: File | null;
    photo2: File | null;
    kondisi: string;
    lokasi: string;
    googleMapsUrl: string;
    title: string;
    description: string;
    harga: string;
};

export const EMPTY_FORM: NewAdForm = {
    category: "",
    coverPhoto: null,
    photo1: null,
    photo2: null,
    kondisi: "",
    lokasi: "",
    googleMapsUrl: "",
    title: "",
    description: "",
    harga: "",
};
