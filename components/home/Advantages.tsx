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
                        Чем мы отличаемся?
                    </h2>

                    <ul className="space-y-6">
                        {items.map((item) => (
                            <li key={item.number} className="flex gap-4">
                <span className="text-lg text-gray-400 font-regular min-w-[2rem]">
                  {item.number}
                </span>
                                <p className="text-2xl">
                                    <span className="font-medium">{item.title}: </span>
                                    {item.text}
                                </p>
                            </li>
                        ))}
                    </ul>

                    {/* Кнопки */}
                    <div className="mt-10 flex flex-wrap gap-6">
                        <button className="px-6 py-3 bg-[#009999] text-white rounded-md hover:bg-[#007A7A] transition text-xl">
                            Скачать презентации
                        </button>
                        <button className="px-6 py-3 border-b-2 border-black hover:border-gray-500 transition text-xl">
                            Сертификаты
                        </button>
                    </div>
                </div>

                {/* Правая картинка-заглушка */}
                <div className="flex justify-end items-start">
                    <div className="relative rounded-[24px] overflow-hidden w-full md:w-[500px] h-80 md:h-[520px]">
                        <Image
                            src="/advantages.png"
                            alt="Чем мы отличаемся"
                            fill
                            className="object-cover object-[75%_center]"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
