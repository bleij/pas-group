"use client";

import {Variants, motion} from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Advantages() {
    const items = [
        {
            number: "01",
            title: "Единая ответственность",
            text: "Мы объединяем экспертизу, предоставляя единое решение и единую ответственность.",
        },
        {
            number: "02",
            title: "25+ лет опыта",
            text: "Наша экспертиза основана на четверти века успешных проектов. Решаем задачи, опираясь на реальный опыт.",
        },
        {
            number: "03",
            title: "Мировая экспертиза",
            text: "Наши компетенции направлены на внедрение лучших мировых технологий и решений в Казахстан.",
        },
        {
            number: "04",
            title: "Полный цикл",
            text: "От аудита и проектирования до сборки НКУ, ПНР и сервисного обслуживания.",
        },
        {
            number: "05",
            title: "Безопасность и «ноль отклонений»",
            text: "Наш стандарт — «ноль» отклонений. Все решения проходят строгие испытания, соответствуют международным нормам и гарантируют промышленную безопасность вашего объекта.",
        },
    ];

    const blurUp: Variants = {
        hidden: {opacity: 0, y: 60, filter: "blur(10px)"},
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {duration: 0.8, ease: "easeOut"},
        },
    };

    return (
        <motion.section
            className="w-full bg-white py-6 sm:py-8 md:py-16"
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.25}}
            variants={blurUp}
        >
            <div
                className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
                {/* Текстовая часть */}
                <motion.div variants={blurUp}>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8">
                        Чем мы отличаемся?
                    </h2>

                    <ul className="space-y-3 sm:space-y-4 md:space-y-6">
                        {items.map((item, i) => (
                            <motion.li
                                key={item.number}
                                className="flex gap-3 sm:gap-4"
                                initial={{opacity: 0, y: 20, filter: "blur(8px)"}}
                                whileInView={{opacity: 1, y: 0, filter: "blur(0px)"}}
                                transition={{
                                    duration: 0.6,
                                    delay: i * 0.1,
                                    ease: "easeOut",
                                }}
                                viewport={{once: true}}
                            >
                                <span className="text-sm sm:text-base text-gray-400 min-w-[1.8rem] sm:min-w-[2rem]">
                                    {item.number}
                                </span>
                                <p className="text-sm sm:text-base md:text-lg leading-snug sm:leading-relaxed">
                                    <span className="font-semibold">{item.title}: </span>
                                    {item.text}
                                </p>
                            </motion.li>
                        ))}
                    </ul>

                    {/* Кнопки */}
                    <motion.div
                        className="mt-6 sm:mt-8 md:mt-10 flex flex-wrap gap-4 sm:gap-6"
                        initial={{opacity: 0, y: 30, filter: "blur(10px)"}}
                        whileInView={{opacity: 1, y: 0, filter: "blur(0px)"}}
                        transition={{duration: 0.8, delay: 0.3}}
                        viewport={{once: true}}
                    >
                        <motion.div
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.97}}
                            transition={{type: "spring", stiffness: 180, damping: 12}}
                        >
                            <Link
                                href="#presentations"
                                className="px-4 sm:px-6 py-2 sm:py-3 bg-[#009999] text-white rounded-md hover:bg-[#007A7A] transition text-sm sm:text-base md:text-xl"
                            >
                                Скачать презентации
                            </Link>
                        </motion.div>

                        <motion.div
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.97}}
                            transition={{type: "spring", stiffness: 180, damping: 12}}
                        >
                            <Link
                                href="#certificates"
                                className="px-4 sm:px-6 py-2 sm:py-3 border-b-2 border-black hover:border-gray-500 transition text-sm sm:text-base md:text-xl"
                            >
                                Сертификаты
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Правая картинка */}
                <motion.div
                    className="flex justify-end items-start mt-6 md:mt-0"
                    initial={{opacity: 0, scale: 0.95, x: 60, filter: "blur(10px)"}}
                    whileInView={{opacity: 1, scale: 1, x: 0, filter: "blur(0px)"}}
                    transition={{duration: 1, ease: "easeOut", delay: 0.4}}
                    viewport={{once: true}}
                >
                    <div
                        className="relative rounded-[16px] md:rounded-[24px] overflow-hidden w-full sm:w-[400px] md:w-[500px] h-48 sm:h-64 md:h-[520px] shadow-lg">
                        <Image
                            src="/advantages.png"
                            alt="Чем мы отличаемся"
                            fill
                            className="object-cover object-[75%_center]"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}