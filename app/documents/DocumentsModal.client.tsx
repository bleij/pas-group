"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import type { DocumentNode } from "@/lib/queries/documents";
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
export default function DocumentsModal({ documents }: { documents: DocumentNode[] }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const prev = () => {
        if (activeIndex === null) return;
        setActiveIndex((i) => (i! - 1 + documents.length) % documents.length);
    };

    const next = () => {
        if (activeIndex === null) return;
        setActiveIndex((i) => (i! + 1) % documents.length);
    };

    // клавиатура
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
            {/* ---------- Заголовок ---------- */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Документация</h1>
            <div className="h-1 w-16 bg-[#009999] mb-8"></div>

            {/* ---------- Сетка превью ---------- */}
            <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            >
                {documents.map((doc, i) => {
                    const src = doc.featuredImage?.node?.sourceUrl;
                    if (!src) return null;

                    return (
                        <motion.button
                            key={doc.id}
                            onClick={() => setActiveIndex(i)}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: "spring", stiffness: 250, damping: 20 }}
                            className="bg-white shadow-sm hover:shadow-lg transition-all overflow-hidden cursor-pointer"
                        >
                            <Image
                                src={src}
                                alt={doc.featuredImage?.node?.altText || doc.title}
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
                {activeIndex !== null && documents[activeIndex] && (
                    <ModalPortal>
                        <motion.div
                            className="fixed inset-0 flex items-center justify-center z-[9999]"
                            onClick={() => setActiveIndex(null)}
                            initial={{ opacity: 0, filter: "blur(10px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, filter: "blur(8px)" }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            style={{
                                backgroundColor: "rgba(0,0,0,0.8)",
                                backdropFilter: "blur(4px)",
                            }}
                        >
                            <motion.div
                                className="bg-white rounded-xl p-4 sm:p-6 max-w-3xl w-full relative shadow-xl flex justify-center items-center overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                                initial={{ scale: 0.9, opacity: 0, filter: "blur(8px)" }}
                                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                                exit={{ scale: 0.9, opacity: 0, filter: "blur(8px)" }}
                                transition={{ duration: 0.35, ease: "easeOut" }}
                            >
                                {/* кнопка закрытия */}
                                <motion.button
                                    onClick={() => setActiveIndex(null)}
                                    whileHover={{ rotate: 90, scale: 1.1 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    className="absolute top-3 right-3 p-2 text-gray-500 hover:text-gray-800"
                                >
                                    <X size={24} />
                                </motion.button>

                                {/* Swiper */}
                                <Swiper
                                    modules={[Navigation, Keyboard]}
                                    navigation
                                    keyboard={{ enabled: true }}
                                    initialSlide={activeIndex}
                                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                                    className="w-full"
                                >
                                    {documents.map((doc) => {
                                        const src = doc.featuredImage?.node?.sourceUrl;
                                        if (!src) return null;
                                        return (
                                            <SwiperSlide key={doc.id}>
                                                <motion.div
                                                    initial={{ opacity: 0, filter: "blur(10px)" }}
                                                    animate={{ opacity: 1, filter: "blur(0px)" }}
                                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                                >
                                                    <Image
                                                        src={src}
                                                        alt={doc.featuredImage?.node?.altText || doc.title}
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