"use client";

import Image from "next/image";

export default function Presentations() {
    const presentations = [
        {
            title: "Инжиниринг",
            image: "/presentation1.jpg",
        },
        {
            title: "Комплексные решения",
            image: "/presentation2.jpg",
        },
        {
            title: "АСУТП и программное обеспечение",
            image: "/presentation3.jpg",
        },
    ];

    return (
        <section className="w-full bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-6">
                {/* Заголовок */}
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Презентации</h2>
                <div className="h-1 w-16 bg-blue-900 mb-10"></div>

                {/* Сетка карточек */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    {presentations.map((p, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                        >
                            <Image
                                src={p.image}
                                alt={p.title}
                                width={400}
                                height={250}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                {/* Кнопка */}
                <div>
                    <button className="px-6 py-3 bg-gray-200 rounded-md hover:bg-gray-300 transition">
                        Все презентации →
                    </button>
                </div>
            </div>
        </section>
    );
}
