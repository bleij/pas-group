"use client";

import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {ChevronLeft, ChevronRight, X} from "lucide-react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import {motion, AnimatePresence} from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";

import type {DocumentNode} from "@/lib/queries/documents";

export default function DocumentsClient({items}: { items: DocumentNode[] }) {
    const [active, setActive] = useState<DocumentNode | null>(null);

    return (
        <section id="documents" className="w-full bg-[#F2F2F2] pb-16">
            <div className="max-w-7xl mx-auto px-6 relative">
                {/* заголовок */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold">Документация</h2>
                        <div className="h-1 w-32 bg-[#009999] mt-3"></div>
                    </div>

                    {/* стрелки */}
                    <div className="hidden md:flex gap-2">
                        <button
                            className="docs-prev rounded-full p-2 bg-[#009999] hover:bg-[#007A7A] text-white transition">
                            <ChevronLeft size={20}/>
                        </button>
                        <button
                            className="docs-next rounded-full p-2 bg-[#009999] hover:bg-[#007A7A] text-white transition">
                            <ChevronRight size={20}/>
                        </button>
                    </div>
                </div>

                {/* слайдер */}
                <Swiper
                    modules={[Navigation]}
                    navigation={{prevEl: ".docs-prev", nextEl: ".docs-next"}}
                    spaceBetween={24}
                    breakpoints={{
                        0: {slidesPerView: 1.1},
                        640: {slidesPerView: 2.2},
                        1024: {slidesPerView: 4},
                    }}
                >
                    {items.map((doc) => {
                        const src = doc.featuredImage?.node?.sourceUrl;
                        if (!src) return null;

                        return (
                            <SwiperSlide key={doc.id}>
                                <div
                                    onClick={() => setActive(doc)}
                                    className="bg-white overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
                                >
                                    <div className="relative w-full aspect-[210/297]">
                                        <Image
                                            src={src}
                                            alt={doc.featuredImage?.node?.altText || doc.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 25vw"
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>

                {/* кнопка */}
                <div className="mt-10 flex justify-start">
                    <Link
                        href="/documents"
                        className="inline-block px-6 py-3 bg-[#E5E7EB] rounded-md hover:bg-[#A5A7AA] transition font-medium text-xl text-[#374151]"
                    >
                        Посмотреть все
                    </Link>
                </div>
            </div>

            {/* модалка просмотра */}
            <AnimatePresence>
                {active && (
                    <motion.div
                        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                        onClick={() => setActive(null)}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        <motion.div
                            className="bg-white rounded-xl p-4 max-w-5xl w-full relative shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                            initial={{scale: 0.95, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            exit={{scale: 0.95, opacity: 0}}
                            transition={{duration: 0.2}}
                        >
                            <button
                                onClick={() => setActive(null)}
                                className="absolute top-3 right-3 p-2 text-gray-500 hover:text-gray-800"
                            >
                                <X size={24}/>
                            </button>

                            {active.featuredImage?.node?.sourceUrl && (
                                <Image
                                    src={active.featuredImage.node.sourceUrl}
                                    alt={active.featuredImage.node.altText || active.title}
                                    width={1200}
                                    height={1600}
                                    className="object-contain w-full max-h-[80vh] mx-auto"
                                    sizes="90vw"
                                />
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}