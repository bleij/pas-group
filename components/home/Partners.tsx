"use client";

import Image from "next/image";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {useRef} from "react";

export default function Partners() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (dir: "left" | "right") => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: dir === "left" ? -300 : 300,
                behavior: "smooth",
            });
        }
    };

    const partners = [
        {src: "/partner-schneider.png", alt: "Schneider Electric"},
        {src: "/partner-emerson.png", alt: "Emerson"},
        {src: "/partner-abb.png", alt: "ABB"},
        {src: "/partner-obo.png", alt: "OBO Bettermann"},
        {src: "/partner-samara.png", alt: "Электрощит Самара"},
        {src: "/partner-si.png", alt: "SI"},
    ];

    return (
        <section className="w-full bg-white py-16">
            <div className="max-w-7xl mx-auto px-6">
                {/* Заголовок */}
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Наши партнеры</h2>
                <div className="h-1 w-16 bg-blue-900 mb-10"></div>

                {/* Слайдер логотипов */}
                <div className="relative">
                    {/* Кнопки влево/вправо */}
                    <button
                        onClick={() => scroll("left")}
                        className="absolute -left-4 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                        <ChevronLeft/>
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="absolute -right-4 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                        <ChevronRight/>
                    </button>

                    {/* Лента логотипов */}
                    <div
                        ref={scrollRef}
                        className="flex gap-10 overflow-x-auto scrollbar-hide scroll-smooth px-10"
                    >
                        {partners.map((p, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-center min-w-[160px] h-20"
                            >
                                <Image
                                    src={p.src}
                                    alt={p.alt}
                                    width={160}
                                    height={80}
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Кнопка */}
                <div className="mt-10">
                    <button className="px-6 py-3 bg-gray-200 rounded-md hover:bg-gray-300 transition">
                        Посмотреть все
                    </button>
                </div>
            </div>
        </section>
    );
}
