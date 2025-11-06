"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import type { LetterNode } from "@/lib/queries/letters";

function ModalPortal({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;
    return createPortal(children, document.body);
}

export default function LettersClient({ letters }: { letters: LetterNode[] }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    // клавиши для выхода
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setActiveIndex(null);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    return (
        <section
            id="letters"
            className="w-full bg-[#F2F2F2] py-6 sm:py-10 md:py-16 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
                {/* заголовок */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between mb-6 sm:mb-10"
                >
                    <div>
                        <h2 className="text-[20px] sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-5">
                            Наши отзывы
                        </h2>
                        <motion.div
                            className="h-1 w-28 sm:w-32 bg-[#009999]"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            viewport={{ once: true }}
                            style={{ originX: 0 }}
                        />
                    </div>
                </motion.div>

                {/* превью-слайдер */}
                <motion.div
                    initial={{ opacity: 0, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <Swiper
                        slidesPerView="auto"
                        spaceBetween={8}
                        breakpoints={{
                            640: { slidesPerView: 2.2, spaceBetween: 12 },
                            1024: { slidesPerView: 4, spaceBetween: 20 },
                        }}
                        className="!overflow-visible !w-full"
                        style={{ paddingRight: "1rem" }}
                    >
                        {letters.map((l, i) => {
                            const src = l.featuredImage?.node?.sourceUrl;
                            if (!src) return null;

                            return (
                                <SwiperSlide
                                    key={l.id}
                                    className="!w-[45%] sm:!w-[30%] md:!w-[22%] flex items-center justify-center"
                                >
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            scale: 0.95,
                                            y: 15,
                                            filter: "blur(6px)",
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            scale: 1,
                                            y: 0,
                                            filter: "blur(0px)",
                                        }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        viewport={{ once: true }}
                                    >
                                        <motion.div
                                            onClick={() => setActiveIndex(i)}
                                            whileHover={{
                                                scale: 1.04,
                                                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                                                transition: { duration: 0.15 },
                                            }}
                                            whileTap={{ scale: 0.96 }}
                                            className="cursor-pointer bg-white/90 overflow-hidden"
                                        >
                                            <Image
                                                src={src}
                                                alt={l.featuredImage?.node?.altText || l.title}
                                                width={300}
                                                height={400}
                                                className="object-contain w-full h-auto"
                                            />
                                        </motion.div>
                                    </motion.div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </motion.div>

                {/* кнопка */}
                <motion.div
                    className="mt-6 sm:mt-10 flex justify-start"
                    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 180, damping: 10 }}
                    >
                        <Link
                            href="/letters"
                            className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-[#E5E7EB] rounded-md hover:bg-[#A5A7AA] transition font-medium text-sm sm:text-base text-[#374151]"
                        >
                            Посмотреть все
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* модалка через портал */}
            <AnimatePresence>
                {activeIndex !== null && (
                    <ModalPortal>
                        {/* ✅ добавлено z-[9999] и pointer-events, чтобы быть поверх хедера */}
                        <motion.div
                            className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-auto"
                            onClick={() => setActiveIndex(null)}
                            initial={{ opacity: 0, filter: "blur(10px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, filter: "blur(8px)" }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            style={{
                                backgroundColor: "rgba(0, 0, 0, 0.8)",
                                backdropFilter: "blur(4px)",
                            }}
                        >
                            <motion.div
                                className="bg-white rounded-xl p-4 max-w-5xl w-full relative shadow-xl overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                                initial={{ scale: 0.9, opacity: 0, filter: "blur(8px)" }}
                                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                                exit={{ scale: 0.9, opacity: 0, filter: "blur(8px)" }}
                                transition={{ duration: 0.35, ease: "easeOut" }}
                            >
                                <motion.button
                                    onClick={() => setActiveIndex(null)}
                                    whileHover={{ rotate: 90, scale: 1.1 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    className="absolute top-3 right-3 p-2 text-gray-500 hover:text-gray-800"
                                >
                                    <X size={24} />
                                </motion.button>

                                <Swiper
                                    modules={[Navigation, Keyboard]}
                                    navigation
                                    keyboard={{ enabled: true }}
                                    initialSlide={activeIndex}
                                    onSlideChange={(swiper) =>
                                        setActiveIndex(swiper.activeIndex)
                                    }
                                    className="w-full"
                                >
                                    {letters.map((l) => {
                                        const src = l.featuredImage?.node?.sourceUrl;
                                        if (!src) return null;
                                        return (
                                            <SwiperSlide key={l.id}>
                                                <motion.div
                                                    initial={{ opacity: 0, filter: "blur(10px)" }}
                                                    animate={{ opacity: 1, filter: "blur(0px)" }}
                                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                                >
                                                    <Image
                                                        src={src}
                                                        alt={l.featuredImage?.node?.altText || l.title}
                                                        width={1200}
                                                        height={1600}
                                                        className="w-full mx-auto object-contain max-h-[80vh]"
                                                    />
                                                </motion.div>
                                            </SwiperSlide>
                                        );
                                    })}
                                </Swiper>
                            </motion.div>
                        </motion.div>
                    </ModalPortal>
                )}
            </AnimatePresence>
        </section>
    );
}