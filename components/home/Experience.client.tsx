"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import type { CaseNode } from "@/lib/queries/experience";

type Props = { items: CaseNode[] };

export default function ExperienceClient({ items }: Props) {
    return (
        <motion.section
            className="w-full bg-white py-4 sm:py-10 md:py-16 overflow-hidden"
            initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.25 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* заголовок */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-[20px] sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
                        Наш опыт
                    </h2>
                    <motion.div
                        className="h-1 w-28 bg-[#009999] mb-6 sm:mb-8 origin-left"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                    />
                </motion.div>

                {/* mobile slider */}
                <div className="md:hidden">
                    <Swiper spaceBetween={12} slidesPerView={1.05}>
                        {items.map((c, i) => (
                            <SwiperSlide key={c.id}>
                                <Card data={c} index={i} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* desktop grid */}
                <div className="hidden md:grid grid-cols-3 gap-8 md:gap-10">
                    {items.map((c, i) => (
                        <Card key={c.id} data={c} index={i} />
                    ))}
                </div>
            </div>
        </motion.section>
    );
}

function Card({ data, index }: { data: CaseNode; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
            }}
            viewport={{ once: true }}
            className="flex flex-col group cursor-pointer"
        >
            <Link href={`/experience/${data.slug}`} className="block">
                <motion.div
                    whileHover={{
                        scale: 1.04,
                        y: -3,
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                        transition: { duration: 0.2, ease: "easeOut" },
                    }}
                    whileTap={{ scale: 0.97 }}
                    className="relative w-full h-44 sm:h-52 md:h-[260px] rounded-2xl overflow-hidden bg-gray-200"
                >
                    {data.featuredImage?.node?.sourceUrl && (
                        <motion.div
                            className="absolute inset-0"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <Image
                                src={data.featuredImage.node.sourceUrl}
                                alt={data.featuredImage.node.altText || data.title}
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    )}
                </motion.div>

                <h3 className="font-semibold text-base sm:text-lg md:text-xl mt-4 sm:mt-5 mb-1.5 sm:mb-2">
                    {data.title}
                </h3>

                {data.caseFields?.shortDescription && (
                    <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4 leading-snug">
                        {data.caseFields.shortDescription}
                    </p>
                )}

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-3 sm:mt-4 inline-block px-4 py-2 rounded-md bg-[#E5E7EB] text-[#374151] font-medium text-sm hover:bg-[#A5A7AA] transition"
                >
                    Подробнее
                </motion.div>
            </Link>
        </motion.div>
    );
}