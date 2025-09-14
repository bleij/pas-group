"use client";

import Image from "next/image";
import {ArrowUpRight} from "lucide-react";

export default function News() {
    const news = [
        {
            title: "Водоподготовка и водоотведение",
            date: "20.05.2025",
            image: "/news1.jpg",
        },
        {
            title: "Водоподготовка и водоотведение",
            date: "20.05.2025",
            image: "/news2.jpg",
        },
        {
            title: "Водоподготовка и водоотведение",
            date: "20.05.2025",
            image: "/news3.jpg",
        },
    ];

    return (
        <section className="w-full bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-6">
                {/* Заголовок */}
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Новости</h2>
                <div className="h-1 w-16 bg-blue-900 mb-10"></div>

                {/* Карточки */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    {news.map((item, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                        >
                            <div className="relative w-full h-48">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={400}
                                    height={200}
                                    className="w-full h-full object-cover"
                                />
                                <button className="absolute top-2 right-2 p-2 bg-gray-200 rounded-md hover:bg-gray-300">
                                    <ArrowUpRight size={16}/>
                                </button>
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600">{item.date}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Кнопка */}
                <div>
                    <button className="px-6 py-3 bg-gray-200 rounded-md hover:bg-gray-300 transition">
                        Все статьи →
                    </button>
                </div>
            </div>
        </section>
    );
}
