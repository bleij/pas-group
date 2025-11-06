"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SolutionNode } from "@/lib/queries/solutions";
import { useEffect, useState } from "react";

export default function SolutionsClient({ solutions }: { solutions: SolutionNode[] }) {
    const reversed = [...solutions].reverse();

    const [viewportOptions, setViewportOptions] = useState({ once: true, amount: 0.25 });

    // вычисляем ширину ЭКРАНА только на клиенте
    useEffect(() => {
        if (window.innerWidth < 768) {
            // на мобильных — анимация стартует сразу как только блок появился
            setViewportOptions({ once: true, amount: 0.05 });
        } else {
            // на десктопе оставляем как было
            setViewportOptions({ once: true, amount: 0.25 });
        }
    }, []);

    const fadeIn = {
        hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.6, ease: [0.3, 0, 0.3, 1] },
        },
    };

    return (
        <motion.section
            id="solutions"
            className="w-full bg-white py-6 md:py-16 overflow-hidden"
            initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={viewportOptions}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* заголовок */}
                <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.6 }}
                    viewport={viewportOptions}
                >
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
                        Что мы предлагаем
                    </h2>
                    <motion.div
                        className="h-1 w-32 bg-[#009999] mb-5 sm:mb-8 origin-left"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={viewportOptions}
                    />
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-6 sm:mb-8">
                        Отраслевые решения
                    </h3>
                </motion.div>

                {/* карточки */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
                    initial="hidden"
                    whileInView="visible"
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
                    viewport={viewportOptions}
                >
                    {reversed.map((s) => (
                        <motion.div
                            key={s.id}
                            variants={fadeIn}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.25, ease: "easeOut" },
                            }}
                            whileTap={{
                                scale: 0.96,
                                transition: { duration: 0.15, ease: "easeOut" },
                            }}
                        >
                            <Link
                                href={`/solutions/${s.slug}`}
                                className="block bg-[#F2F2F2] rounded-2xl p-3 sm:p-4 flex flex-col h-full transition-all hover:bg-[#E5E7EB] active:bg-[#D1D5DB]"
                            >
                                {s.featuredImage?.node?.sourceUrl && (
                                    <div className="relative w-full overflow-hidden rounded-lg mb-4">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                                            whileInView={{
                                                opacity: 1,
                                                y: 0,
                                                filter: "blur(0px)",
                                            }}
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                            viewport={viewportOptions}
                                        >
                                            <Image
                                                src={s.featuredImage.node.sourceUrl}
                                                alt={s.featuredImage.node.altText || s.title}
                                                width={400}
                                                height={250}
                                                className="rounded-lg object-cover w-full h-56 sm:h-48 group-hover:scale-105 transition-transform duration-400 ease-out"
                                            />
                                        </motion.div>
                                    </div>
                                )}

                                <h3 className="font-semibold text-base mb-2 line-clamp-2">{s.title}</h3>

                                {s.solutionFields?.shortDescription && (
                                    <p className="text-sm font-medium text-gray-600 line-clamp-3 mb-4">
                                        {s.solutionFields.shortDescription}
                                    </p>
                                )}

                                <div className="mt-auto">
                                    <motion.span
                                        className="inline-block px-5 py-2 rounded-md bg-[#E5E7EB] text-[#374151] font-medium text-sm hover:bg-[#A5A7AA] transition"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.92 }}
                                    >
                                        Подробнее
                                    </motion.span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* кнопка */}
                <motion.div
                    className="mt-6 md:mt-10 flex justify-start"
                    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                    viewport={viewportOptions}
                >
                    <motion.div
                        className="flex"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 180, damping: 10 }}
                    >
                        <Link
                            href="/solutions"
                            className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-[#E5E7EB] text-[#374151] rounded-md hover:bg-[#A5A7AA] transition text-md font-medium whitespace-nowrap min-h-[48px]"
                        >
                            Все решения
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}