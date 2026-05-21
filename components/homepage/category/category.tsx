import Image from "next/image";
import Link from "next/link";
import { categories } from "./data";

export default function CategorySection() {
    return (
        <section className="w-full px-4 py-2 mt-5">
            <div className="grid grid-cols-5 gap-x-3 gap-y-5">
                {categories.map((cat) => (
                    <Link
                        key={cat.id}
                        href={cat.href}
                        className="flex flex-col items-center gap-2 group"
                    >
                        {/* Icon box */}
                        <div className="w-full aspect-square  flex items-center justify-center overflow-hidden transition-transform duration-200 group-active:scale-95">
                            <Image
                                src={cat.image}
                                alt={cat.label}
                                width={80}
                                height={80}
                                className="w-[100%] h-[100%] object-contain"
                            />
                        </div>

                        {/* Label */}
                        <span className="text-center text-[11px] leading-[1.3] text-black2 font-medium">
                            {cat.label}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
