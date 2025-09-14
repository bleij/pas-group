"use client";

import Image from "next/image";

export default function Certificates() {
    const certificates = [
        {src: "/cert1.jpg", alt: "Сертификат 1"},
        {src: "/cert2.jpg", alt: "Сертификат 2"},
        {src: "/cert3.jpg", alt: "Сертификат 3"},
        {src: "/cert4.jpg", alt: "Сертификат 4"},
    ];

    return (
        <section className="w-full bg-white py-16">
            <div className="max-w-7xl mx-auto px-6">
                {/* Заголовок */}
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Сертификаты</h2>
                <div className="h-1 w-16 bg-blue-900 mb-10"></div>

                {/* Сетка сертификатов */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                    {certificates.map((cert, i) => (
                        <div
                            key={i}
                            className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                        >
                            <Image
                                src={cert.src}
                                alt={cert.alt}
                                width={400}
                                height={300}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    ))}
                </div>

                {/* Кнопка */}
                <div className="flex justify-start">
                    <button className="px-6 py-3 bg-gray-200 rounded-md hover:bg-gray-300 transition">
                        Посмотреть все
                    </button>
                </div>
            </div>
        </section>
    );
}
