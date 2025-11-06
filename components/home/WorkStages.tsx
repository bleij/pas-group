"use client";

import { useEffect, useState } from "react";
import {Variants, motion } from "framer-motion";

export default function WorkStages() {
    const stages = [
        { number: "01", title: "Консультация и анализ", text: "Определяем задачи заказчика и проводим техническое обследование объекта." },
        { number: "02", title: "Проектирование", text: "Разрабатываем проектную документацию и готовим оптимальные инженерные решения." },
        { number: "03", title: "Поставка оборудования", text: "Комплектуем объект современным оборудованием ведущих мировых производителей." },
        { number: "04", title: "Монтаж и сборка", text: "Выполняем монтаж подстанций, шкафов и систем электроснабжения объекта." },
        { number: "05", title: "Пуско-наладка и обучение", text: "Настраиваем оборудование, тестируем системы и обучаем персонал заказчика." },
        { number: "06", title: "Сервис и модернизация", text: "Предоставляем обслуживание, реконструкцию и техническое перевооружение объектов." },
    ];

    const [viewportOptions, setViewportOptions] = useState({ once: true, amount: 0.25 });

    useEffect(() => {
        if (window.innerWidth < 768) {
            // на мобилке — запускаем анимацию почти сразу
            setViewportOptions({ once: true, amount: 0.3 });
        } else {
            setViewportOptions({ once: true, amount: 0.25 });
        }
    }, []);

    const container = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
    };

    const fadeIn: Variants = {
        hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.6, ease: [0.3, 0, 0.3, 1] },
        },
    };

    return (
        <motion.section
            className="w-full bg-white py-8 sm:py-10 md:py-16"
            initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={viewportOptions}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* заголовок */}
                <motion.h2
                    className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-6"
                    initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    viewport={viewportOptions}
                >
                    Этапы работ
                </motion.h2>

                {/* полоса */}
                <motion.div
                    className="h-1 w-24 sm:w-32 bg-[#009999] mb-6 sm:mb-10 origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={viewportOptions}
                />

                {/* карточки */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
                    initial="hidden"
                    whileInView="visible"
                    variants={container}
                    viewport={viewportOptions}
                >
                    {stages.map((stage, i) => (
                        <motion.div
                            key={i}
                            variants={fadeIn}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="bg-[#F2F2F2] rounded-lg p-4 sm:p-5 md:p-6 flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="font-bold text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 leading-tight">
                                    {stage.title}
                                </h3>
                                <div className="h-[3px] w-14 sm:w-16 bg-[#009999] mb-2 sm:mb-3" />
                                <p className="text-sm sm:text-base text-[#374151] leading-snug">
                                    {stage.text}
                                </p>
                            </div>
                            <div className="mt-4 sm:mt-6 text-right font-bold text-lg sm:text-xl md:text-2xl text-[#374151]">
                                {stage.number}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}