"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import type { LetterNode } from "@/lib/queries/letters";
import { motion, AnimatePresence } from "framer-motion";

export default function LettersClient({ letters }: { letters: LetterNode[] }) {
    const [active, setActive] = useState<LetterNode | null>(null);

    return (
        <section id="letters" className="w-full bg-[#F2F2F2] py-6 sm:py-10 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
                {/* заголовок */}
                <div className="flex items-center justify-between mb-6 sm:mb-10">
                    <div>
                        <h2 className="text-[20px] sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-6">
                            Наши отзывы
                        </h2>
                        <div className="h-1 w-24 sm:w-32 bg-[#009999] mt-2 sm:mt-3"></div>
                    </div>
                </div>

                {/* слайдер */}
                <Swiper
                    slidesPerView="auto"
                    spaceBetween={8}
                    breakpoints={{
                        640: { slidesPerView: 2.2, spaceBetween: 12 },
                        1024: { slidesPerView: 4, spaceBetween: 20 },
                    }}
                    className="!overflow-hidden !w-full"
                    style={{ paddingRight: "1rem" }} // чтобы не обрезало последний элемент
                >
                    {letters.map((l) => {
                        const src = l.featuredImage?.node?.sourceUrl;
                        if (!src) return null;
                        return (
                            <SwiperSlide
                                key={l.id}
                                className="!w-[45%] sm:!w-[30%] md:!w-[22%] flex items-center justify-center"
                            >
                                <Image
                                    src={src}
                                    alt={l.featuredImage?.node?.altText || l.title}
                                    width={300}
                                    height={400}
                                    className="object-contain w-full h-auto"
                                />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>

                {/* кнопка */}
                <div className="mt-6 sm:mt-10 flex justify-start">
                    <Link
                        href="/letters"
                        className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-[#E5E7EB] rounded-md hover:bg-[#A5A7AA] transition font-medium text-sm sm:text-base text-[#374151]"
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-xl p-4 max-w-5xl w-full relative shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <button
                                onClick={() => setActive(null)}
                                className="absolute top-3 right-3 p-2 text-gray-500 hover:text-gray-800"
                            >
                                <X size={24} />
                            </button>
                            {active.featuredImage?.node?.sourceUrl && (
                                <Image
                                    src={active.featuredImage.node.sourceUrl}
                                    alt={active.featuredImage.node.altText || active.title}
                                    width={1200}
                                    height={1600}
                                    className="w-full mx-auto"
                                    style={{ objectFit: "contain", height: "80vh" }}
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