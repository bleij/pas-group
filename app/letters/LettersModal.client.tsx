"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import { createPortal } from "react-dom";
import type { LetterNode } from "@/lib/queries/letters";
import "swiper/css";
import "swiper/css/navigation";

/* ---------- Портал ---------- */
function ModalPortal({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;
    return createPortal(children, document.body);
}

/* ---------- Основной компонент ---------- */
export default function LettersModal({ letters }: { letters: LetterNode[] }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const prev = () => {
        if (activeIndex === null) return;
        setActiveIndex((i) => (i! - 1 + letters.length) % letters.length);
    };

    const next = () => {
        if (activeIndex === null) return;
        setActiveIndex((i) => (i! + 1) % letters.length);
    };

    // обработка клавиатуры
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setActiveIndex(null);
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [activeIndex]);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 25, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Отзывы</h1>
                <motion.div
                    className="h-1 w-16 bg-[#009999] mb-8 origin-left"
                    initial={{ scaleX: 0, filter: "blur(8px)" }}
                    whileInView={{ scaleX: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                    viewport={{ once: true }}
                />
            </motion.div>
            {/* Сетка превью */}
            <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            >
                {letters.map((l, i) => {
                    const src = l.featuredImage?.node?.sourceUrl;
                    if (!src) return null;

                    return (
                        <motion.button
                            key={l.id}
                            onClick={() => setActiveIndex(i)}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: "spring", stiffness: 250, damping: 20 }}
                            className="bg-white shadow-sm hover:shadow-lg transition-all overflow-hidden cursor-pointer"
                        >
                            <Image
                                src={src}
                                alt={l.featuredImage?.node?.altText || l.title}
                                width={600}
                                height={800}
                                className="object-contain w-full h-auto"
                                sizes="(max-width: 768px) 100vw, 25vw"
                            />
                        </motion.button>
                    );
                })}
            </motion.div>

            {/* ---------- Модалка ---------- */}
            <AnimatePresence>
                {activeIndex !== null && letters[activeIndex] && (
                    <ModalPortal>
                        <motion.div
                            className="fixed inset-0 flex items-center justify-center z-[9999]" // повыше хедера
                            onClick={() => setActiveIndex(null)}
                            initial={{ opacity: 0, filter: "blur(10px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, filter: "blur(8px)" }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            style={{ backgroundColor: "rgba(0, 0, 0, 0.8)", backdropFilter: "blur(4px)" }}
                        >
                            <motion.div
                                className="bg-white rounded-xl p-4 sm:p-6 max-w-3xl w-full relative shadow-xl flex justify-center items-center overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                                initial={{ scale: 0.9, opacity: 0, filter: "blur(8px)" }}
                                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                                exit={{ scale: 0.9, opacity: 0, filter: "blur(8px)" }}
                                transition={{ duration: 0.35, ease: "easeOut" }}
                            >
                                {/* Swiper внутри */}
                                <Swiper
                                    modules={[Navigation, Keyboard]}
                                    navigation
                                    keyboard={{ enabled: true }}
                                    initialSlide={activeIndex}
                                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
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
        </>
    );
}