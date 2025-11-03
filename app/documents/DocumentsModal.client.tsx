"use client";

import {useState, useEffect} from "react";
import Image from "next/image";
import {motion, AnimatePresence} from "framer-motion";
import {X} from "lucide-react";
import type {DocumentNode} from "@/lib/queries/documents";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Keyboard} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function DocumentsModal({documents}: { documents: DocumentNode[] }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    // обработка клавиши Esc
    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if (activeIndex === null) return;
            if (e.key === "Escape") setActiveIndex(null);
        }

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [activeIndex]);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {documents.map((doc, i) => {
                    const src = doc.featuredImage?.node?.sourceUrl;
                    if (!src) return null;
                    return (
                        <button
                            key={doc.id}
                            onClick={() => setActiveIndex(i)}
                            className="bg-white shadow-sm hover:shadow-md transition block overflow-hidden cursor-pointer"
                        >
                            <Image
                                src={src}
                                alt={doc.featuredImage?.node?.altText || doc.title}
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
                {activeIndex !== null && (
                    <motion.div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                        onClick={() => setActiveIndex(null)}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        <motion.div
                            className="bg-white rounded-xl p-4 max-w-2xl w-full relative shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                            initial={{scale: 0.95, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            exit={{scale: 0.95, opacity: 0}}
                            transition={{duration: 0.2}}
                        >
                            <button
                                onClick={() => setActiveIndex(null)}
                                className="absolute top-3 right-3 p-2 text-gray-500 hover:text-gray-800"
                            >
                                <X size={24}/>
                            </button>

                            {/* swiper внутри модалки */}
                            <Swiper
                                modules={[Navigation, Keyboard]}
                                navigation
                                keyboard={{enabled: true}}
                                initialSlide={activeIndex}
                                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                                className="w-full"
                            >
                                {documents.map((doc) => {
                                    const src = doc.featuredImage?.node?.sourceUrl;
                                    if (!src) return null;
                                    return (
                                        <SwiperSlide key={doc.id}>
                                            <Image
                                                src={src}
                                                alt={doc.featuredImage?.node?.altText || doc.title}
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