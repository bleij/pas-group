"use client";

import * as React from "react";
import {useRef} from "react";
import {ChevronLeft, ChevronRight, Globe} from "lucide-react";

export default function Services() {
    const scrollRef1 = useRef<HTMLDivElement | null>(null);
    const scrollRef2 = useRef<HTMLDivElement | null>(null);

    const scroll = (ref: React.RefObject<HTMLDivElement | null>, dir: "left" | "right") => {
        ref.current?.scrollBy({
            left: dir === "left" ? -300 : 300,
            behavior: "smooth",
        });
    };

    const services1 = [
        {
            title: "Поставка и монтаж трансформаторных подстанций",
            text: "Проектируем, поставляем и запускаем подстанции для надежного энергоснабжения объектов",
        },
        {
            title: "Сборка распределительных устройств и шкафов",
            text: "Изготавливаем и монтируем силовые электрические шкафы под нужды конкретного предприятия",
        },
        {
            title: "Оборудование для электроснабжения",
            text: "Поставка и монтаж оборудования, которое обеспечивает бесперебойную подачу электроэнергии",
        },
        {
            title: "Узлы учета нефти и газа",
            text: "Монтаж и наладка систем учета для точного контроля и оптимизации процессов",
        },
        {
            title: "Системы безопасности и видеонаблюдения",
            text: "Устанавливаем АПС, АПТ и CCTV для защиты людей, имущества и производства",
        },
    ];

    const services2 = [
        {
            title: "Предпроектные научно-технические работы",
            text: "Проводим исследования, проектирование и анализ, чтобы создать надёжное решение под ваши задачи",
        },
        {
            title: "Изготовление, поставка и монтаж оборудования",
            text: "Комплектуем объект проверенным оборудованием и обеспечиваем его качественный монтаж",
        },
        {
            title: "Пуско-наладочные работы и обучение персонала",
            text: "Настраиваем системы, сопровождаем запуски и обучаем сотрудников работе с оборудованием",
        },
        {
            title: "Сервис и послегарантийное обслуживание",
            text: "Берём на себя регулярное обслуживание, чтобы оборудование работало стабильно и безопасно долгие годы",
        },
        {
            title: "Реконструкция и модернизация объектов",
            text: "Обновляем и совершенствуем существующие объекты для повышения их эффективности и надёжности",
        },
    ];

    const Card = ({title, text}: { title: string; text: string }) => (
        <div className="min-w-[260px] max-w-[280px] bg-gray-100 rounded-lg p-5 flex flex-col justify-between">
            <div className="mb-4">
                <div className="bg-blue-950 text-white w-12 h-12 flex items-center justify-center rounded-md mb-4">
                    <Globe className="w-6 h-6"/>
                </div>
                <h4 className="font-semibold mb-2">{title}</h4>
                <p className="text-sm text-gray-700">{text}</p>
            </div>
            <button className="mt-auto px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm">
                Подробнее
            </button>
        </div>
    );

    return (
        <section className="w-full bg-white py-16">
            <div className="max-w-7xl mx-auto px-6 space-y-16">
                {/* Первая группа */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl md:text-2xl font-bold">
                            Услуги в сфере энергетики и автоматизации
                        </h2>
                        <div className="flex gap-2">
                            <button
                                onClick={() => scroll(scrollRef1, "left")}
                                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                            >
                                <ChevronLeft/>
                            </button>
                            <button
                                onClick={() => scroll(scrollRef1, "right")}
                                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                            >
                                <ChevronRight/>
                            </button>
                        </div>
                    </div>

                    <div
                        ref={scrollRef1}
                        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
                    >
                        {services1.map((s, i) => (
                            <Card key={i} {...s} />
                        ))}
                    </div>
                </div>

                {/* Вторая группа */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl md:text-2xl font-bold">
                            Услуги по созданию объектов обустройства месторождений с нулевого цикла &quot;Под ключ&quot;
                        </h2>
                        <div className="flex gap-2">
                            <button
                                onClick={() => scroll(scrollRef2, "left")}
                                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                            >
                                <ChevronLeft/>
                            </button>
                            <button
                                onClick={() => scroll(scrollRef2, "right")}
                                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                            >
                                <ChevronRight/>
                            </button>
                        </div>
                    </div>

                    <div
                        ref={scrollRef2}
                        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
                    >
                        {services2.map((s, i) => (
                            <Card key={i} {...s} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
