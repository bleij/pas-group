"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
    return (
        <motion.section
            className="w-full bg-white py-8 sm:py-12 md:pt-32 md:pb-16 overflow-hidden"
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-20 items-start">

                {/* текстовая часть */}
                <motion.div
                    className="flex flex-col justify-between order-2 md:order-1 h-full"
                    initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
                            О нашей компании
                        </h2>

                        <motion.div
                            className="h-1 w-24 sm:w-32 bg-[#009999] mb-6 sm:mb-8 origin-left"
                            initial={{ scaleX: 0, filter: "blur(6px)" }}
                            whileInView={{ scaleX: 1, filter: "blur(0px)" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true }}
                        />

                        <div className="space-y-6 text-gray-800">
                            <motion.div
                                initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
                                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                                viewport={{ once: true }}
                            >
                                <p className="text-base sm:text-lg md:text-[20px] font-semibold mb-2">
                                    Гарантируем качество и надежность
                                </p>
                                <p className="text-sm sm:text-base md:text-[20px] leading-snug">
                                    В эпоху цифровизации важно грамотно организовать работу сложных систем:
                                    обеспечить бесперебойность, предотвратить риски и заложить запас мощности.
                                    Мы делаем это силами одной профессиональной команды.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
                                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                                viewport={{ once: true }}
                            >
                                <p className="text-sm sm:text-base md:text-[20px] leading-snug">
                                    <span className="font-semibold">Наша миссия — </span>
                                    предоставлять современные и высокотехнологичные решения, повышать качество и
                                    надежность объектов, быть вашим надежным энергетическим партнёром.
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    <motion.div
                        className="hidden md:flex flex-col mt-10"
                        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <p className="text-lg text-[#374151]">Основатель</p>
                        <p className="font-bold text-xl">Александр Пауκ</p>
                    </motion.div>
                </motion.div>

                {/* фото — уменьшенная версия */}
                <motion.div
                    className="hidden md:flex justify-end order-1 md:order-2"
                    initial={{ opacity: 0, scale: 0.95, x: 60, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1.1, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <div className="relative w-[360px] md:w-[400px] rounded-2xl overflow-hidden shadow-lg">
                        <Image
                            src="/founder.jpg"
                            alt="Основатель компании"
                            width={600}
                            height={800}
                            className="object-cover w-full h-auto"
                            priority
                        />
                    </div>
                </motion.div>

                {/* мобильная версия */}
                <motion.div
                    className="md:hidden order-3 mt-6"
                    initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <div className="w-full rounded-xl overflow-hidden shadow-md mb-3">
                        <Image
                            src="/founder.jpg"
                            alt="Основатель компании"
                            width={600}
                            height={800}
                            className="object-cover w-full h-auto"
                        />
                    </div>
                    <div className="text-left">
                        <p className="text-xs text-gray-600">Основатель</p>
                        <p className="font-bold text-base">Александр Пауκ</p>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}