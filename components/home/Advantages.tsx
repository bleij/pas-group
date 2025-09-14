"use client";

import Image from "next/image";

export default function Advantages() {
    const items = [
        {
            number: "01",
            title: "Квалификация",
            text: "специалисты обучены на заводах Европы, США и РФ",
        },
        {
            number: "02",
            title: "Оборудование",
            text: "мировые производители, срок службы до 30 лет",
        },
        {
            number: "03",
            title: "Безопасность",
            text: "испытания по международным нормам, 0 отрицательных случаев",
        },
        {
            number: "04",
            title: "Полный цикл",
            text: "от проектирования до пуско-наладки и сервиса",
        },
    ];

    return (
        <section className="w-full bg-white py-16">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Текстовая часть */}
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-8">
                        <span className="text-blue-900">ЧЕМ МЫ</span> ОТЛИЧАЕМСЯ?
                    </h2>

                    <ul className="space-y-6">
                        {items.map((item) => (
                            <li key={item.number} className="flex gap-4">
                <span className="text-gray-400 font-semibold min-w-[2rem]">
                  {item.number}
                </span>
                                <p>
                                    <span className="font-bold">{item.title}: </span>
                                    {item.text}
                                </p>
                            </li>
                        ))}
                    </ul>

                    {/* Кнопки */}
                    <div className="mt-10 flex flex-wrap gap-6">
                        <button className="px-6 py-3 bg-gray-200 rounded-md hover:bg-gray-300 transition">
                            Скачать перечень брендов
                        </button>
                        <button className="px-6 py-3 border-b-2 border-black hover:border-gray-500 transition">
                            Сертификаты
                        </button>
                    </div>
                </div>

                {/* Правая картинка-заглушка */}
                <div className="bg-gray-200 rounded-2xl w-full h-80 md:h-[420px]"/>
            </div>
        </section>
    );
}
