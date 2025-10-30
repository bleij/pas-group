"use client";

import Link from "next/link";
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
        <section className="w-full bg-white py-6 sm:py-8 md:py-16">
            <div
                className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
                {/* Текстовая часть */}
                <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8">
                        Чем мы отличаемся?
                    </h2>

                    <ul className="space-y-3 sm:space-y-4 md:space-y-6">
                        {items.map((item) => (
                            <li key={item.number} className="flex gap-3 sm:gap-4">
                <span className="text-sm sm:text-base text-gray-400 min-w-[1.8rem] sm:min-w-[2rem]">
                  {item.number}
                </span>
                                <p className="text-sm sm:text-base md:text-lg leading-snug sm:leading-relaxed">
                                    <span className="font-semibold">{item.title}: </span>
                                    {item.text}
                                </p>
                            </li>
                        ))}
                    </ul>

                    {/* Кнопки */}
                    <div className="mt-6 sm:mt-8 md:mt-10 flex flex-wrap gap-4 sm:gap-6">
                        <Link
                            href="#presentations"
                            className="px-4 sm:px-6 py-2 sm:py-3 bg-[#009999] text-white rounded-md hover:bg-[#007A7A] transition text-sm sm:text-base md:text-xl"
                        >
                            Скачать презентации
                        </Link>

                        <Link
                            href="#certificates"
                            className="px-4 sm:px-6 py-2 sm:py-3 border-b-2 border-black hover:border-gray-500 transition text-sm sm:text-base md:text-xl"
                        >
                            Сертификаты
                        </Link>
                    </div>
                </div>

                {/* Правая картинка-заглушка */}
                <div className="flex justify-end items-start mt-6 md:mt-0">
                    <div
                        className="relative rounded-[16px] md:rounded-[24px] overflow-hidden w-full sm:w-[400px] md:w-[500px] h-48 sm:h-64 md:h-[520px]">
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