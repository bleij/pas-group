"use client";

import {useState, useEffect, useCallback} from "react";
import Image from "next/image";
import {motion, AnimatePresence} from "framer-motion";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Keyboard} from "swiper/modules";
import {X} from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import type {CertificateNode} from "@/lib/queries/certificates";

const blurFade = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration: 0.45, ease: [0.33, 1, 0.68, 1] as any },
    },
    exit: {
        opacity: 0,
        filter: "blur(10px)",
        transition: { duration: 0.45, ease: [0.33, 1, 0.68, 1] as any },
    },
};

export default function CertificatesModal({items}: { items: CertificateNode[] }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => e.key === "Escape" && setActiveIndex(null);
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    return (
        <>
            {/* 🔹 Заголовок */}
            <motion.div
                initial={{opacity: 0, y: 30, filter: "blur(10px)"}}
                animate={{opacity: 1, y: 0, filter: "blur(0px)"}}
                transition={{duration: 0.7, ease: "easeOut"}}
                className="mb-8"
            >
                <h1 className="text-[30px] md:text-[34px] font-bold mb-4">Сертификаты</h1>
                <motion.div
                    className="h-1 w-16 bg-[#009999]"
                    initial={{scaleX: 0}}
                    animate={{scaleX: 1}}
                    transition={{duration: 0.6, ease: "easeOut"}}
                    style={{originX: 0}}
                />
            </motion.div>

            {/* 🔹 Сетка */}
            <motion.div
                variants={blurFade}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            >
                {items.map((c, i) => {
                    const src = c.featuredImage?.node?.sourceUrl;
                    if (!src) return null;

                    return (
                        <motion.button
                            key={c.id}
                            onClick={() => setActiveIndex(i)}
                            whileHover={{scale: 1.04}}
                            whileTap={{scale: 0.97}}
                            transition={{type: "spring", stiffness: 250, damping: 20}}
                            className="bg-white shadow-sm hover:shadow-lg transition-all overflow-hidden cursor-pointer"
                        >
                            <div className="relative w-full aspect-[4/3] bg-white flex items-center justify-center overflow-hidden">
                                <Image
                                    src={src}
                                    alt={c.featuredImage?.node?.altText || c.title || ""}
                                    fill
                                    className="object-contain max-h-[280px] md:max-h-[320px] select-none"
                                    sizes="(max-width: 768px) 100vw, 25vw"
                                    draggable={false}
                                />
                            </div>
                        </motion.button>
                    );
                })}
            </motion.div>

            {/* 🔹 Модалка */}
            <AnimatePresence>
                {activeIndex !== null && items[activeIndex] && (
                    <motion.div
                        key="overlay"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={blurFade}
                        className="fixed inset-0 flex items-center justify-center z-[9999]"
                        onClick={() => setActiveIndex(null)}
                        style={{
                            backgroundColor: "rgba(0,0,0,0.8)",
                            backdropFilter: "blur(4px)",
                        }}
                    >
                        <motion.div
                            key="modal"
                            onClick={(e) => e.stopPropagation()}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={blurFade}
                            className="relative w-[92vw] max-w-[880px] rounded-xl bg-white shadow-xl overflow-hidden"
                        >
                            <motion.button
                                onClick={() => setActiveIndex(null)}
                                whileHover={{rotate: 90, scale: 1.08}}
                                transition={{duration: 0.25}}
                                className="absolute top-3 right-3 z-10 p-2 text-gray-500 hover:text-gray-800"
                            >
                                <X size={24}/>
                            </motion.button>

                            <Swiper
                                modules={[Navigation, Keyboard]}
                                navigation
                                keyboard={{enabled: true}}
                                initialSlide={activeIndex ?? 0}
                                slidesPerGroup={1}
                                slidesPerView={1}
                                spaceBetween={0}
                                className="relative h-[60vh] md:h-[64vh]"
                            >
                                {items.map((c) => {
                                    const src = c.featuredImage?.node?.sourceUrl || "";
                                    const alt = c.featuredImage?.node?.altText || c.title || "";
                                    return (
                                        <SwiperSlide key={c.id}>
                                            <motion.div
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                variants={blurFade}
                                                className="flex items-center justify-center h-full w-full p-6"
                                            >
                                                <Image
                                                    src={src}
                                                    alt={alt}
                                                    fill
                                                    className="object-contain select-none"
                                                    draggable={false}
                                                    priority
                                                />
                                            </motion.div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}