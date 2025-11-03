"use client";

import {useState, useEffect} from "react";
import Image from "next/image";
import {motion, AnimatePresence} from "framer-motion";
import type {LetterNode} from "@/lib/queries/letters";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Keyboard} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function LettersModal({letters}: { letters: LetterNode[] }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const prev = () => {
        if (activeIndex === null) return;
        setActiveIndex((i) => (i! - 1 + letters.length) % letters.length);
    };

    const next = () => {
        if (activeIndex === null) return;
        setActiveIndex((i) => (i! + 1) % letters.length);
    };

    // ✅ обработка стрелок клавиатуры
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (activeIndex === null) return;

            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
            if (e.key === "Escape") setActiveIndex(null);
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeIndex]);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {letters.map((l, i) => {
                    const src = l.featuredImage?.node?.sourceUrl;
                    if (!src) return null;
                    return (
                        <button
                            key={l.id}
                            onClick={() => setActiveIndex(i)}
                            className="bg-white shadow-sm hover:shadow-md transition block overflow-hidden cursor-pointer"
                        >
                            <Image
                                src={src}
                                alt={l.featuredImage?.node?.altText || l.title}
                                width={600}
                                height={800}
                                className="object-contain w-full h-auto"
                                sizes="(max-width: 768px) 100vw, 25vw"
                            />
                        </button>
                    );
                })}
            </div>

            {/* модалка */}
            <AnimatePresence>
                {activeIndex !== null && letters[activeIndex] && (
                    <motion.div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                        onClick={() => setActiveIndex(null)}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        <motion.div
                            className="bg-white rounded-xl p-4 sm:p-6 max-w-2xl w-full relative shadow-lg flex justify-center items-center"
                            onClick={(e) => e.stopPropagation()}
                            initial={{scale: 0.96, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            exit={{scale: 0.96, opacity: 0}}
                            transition={{duration: 0.18}}
                        >

                            {/* swiper внутри модалки */}
                            <Swiper
                                modules={[Navigation, Keyboard]}
                                navigation
                                keyboard={{enabled: true}}
                                initialSlide={activeIndex}
                                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                                className="w-full"
                            >
                                {letters.map((l) => {
                                    const src = l.featuredImage?.node?.sourceUrl;
                                    if (!src) return null;
                                    return (
                                        <SwiperSlide key={l.id}>
                                            <Image
                                                src={src}
                                                alt={l.featuredImage?.node?.altText || l.title}
                                                width={1200}
                                                height={1600}
                                                className="w-full mx-auto object-contain max-h-[80vh]"
                                            />
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