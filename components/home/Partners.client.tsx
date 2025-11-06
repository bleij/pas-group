"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import { PartnerNode } from "@/lib/queries/partners";

export default function PartnersClient({ partners }: { partners: PartnerNode[] }) {
    return (
        <motion.section
            className="w-full bg-white py-4 sm:py-6 md:py-16"
            initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
                {/* заголовок */}
                <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-xl sm:text-xl md:text-3xl font-bold mb-1 sm:mb-2 md:mb-4">
                        Наши партнёры
                    </h2>
                    <motion.div
                        className="h-[3px] w-20 sm:w-28 md:w-32 bg-[#009999] mb-4 sm:mb-6 md:mb-8"
                        initial={{ scaleX: 0, filter: "blur(8px)" }}
                        whileInView={{ scaleX: 1, filter: "blur(0px)" }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                        viewport={{ once: true }}
                        style={{ transformOrigin: "left" }}
                    />
                </motion.div>

                {/* слайдер */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <Swiper
                        modules={[Autoplay]}
                        slidesPerView={2}
                        spaceBetween={8}
                        loop
                        autoplay={{ delay: 2000, disableOnInteraction: false }}
                        breakpoints={{
                            640: { slidesPerView: 3, spaceBetween: 16 },
                            1024: { slidesPerView: 5, spaceBetween: 20 },
                        }}
                    >
                        {partners.map((p, index) => (
                            <SwiperSlide key={p.id}>
                                {p.featuredImage?.node?.sourceUrl && (
                                    <motion.div
                                        className="flex items-center justify-center h-14 sm:h-16 md:h-24"
                                        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.2 + index * 0.05,
                                            ease: "easeOut",
                                        }}
                                        viewport={{ once: true }}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.4, ease: "easeOut" }}
                                        >
                                            <Image
                                                src={p.featuredImage.node.sourceUrl}
                                                alt={p.featuredImage.node.altText || p.title}
                                                width={100}
                                                height={60}
                                                className="object-contain max-h-14 sm:max-h-16 md:max-h-24"
                                            />
                                        </motion.div>
                                    </motion.div>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>

                {/* кнопка */}
                {partners.length > 0 && (
                    <motion.div
                        className="mt-6 sm:mt-10 flex justify-start"
                        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            className="flex"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 180, damping: 10 }}
                        >
                            <Link
                                href="/partners"
                                className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-[#E5E7EB] rounded-md hover:bg-[#A5A7AA] transition font-medium text-sm sm:text-base text-[#374151]"
                            >
                                Смотреть всех
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </motion.section>
    );
}