"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Presentation = {
    id: string;
    title: string;
    cover?: string;
    alt?: string;
    pdf?: string;
};

export default function PresentationsClient({
                                                items,
                                                showMoreHref,
                                                bgColor = "bg-gray-100",
                                            }: {
    items: Presentation[];
    showMoreHref?: string;
    bgColor?: string;
}) {
    return (
        <motion.section
            id="presentations"
            className={`w-full ${bgColor} py-4 sm:py-8 md:py-14`}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.25 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* заголовок */}
                <motion.h2
                    className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4"
                    initial={{ opacity: 0, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    Презентации
                </motion.h2>
                <motion.div
                    className="h-1 w-24 sm:w-32 bg-[#009999] mb-6 sm:mb-8"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    style={{ transformOrigin: "left" }}
                />

                {/* сетка */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
                    initial={{ opacity: 0, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    {items.map((p, idx) => (
                        <motion.button
                            key={p.id}
                            type="button"
                            onClick={() =>
                                p.pdf ? window.open(p.pdf, "_blank") : alert("PDF не прикреплён")
                            }
                            className="relative bg-white rounded-lg overflow-hidden shadow-sm transition group"
                            initial={{ opacity: 0, filter: "blur(6px)" }}
                            whileInView={{ opacity: 1, filter: "blur(0px)" }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.06 }}
                            viewport={{ once: true }}
                            whileTap={{ scale: 0.97 }}
                        >
                            {p.cover && (
                                <div className="relative w-full h-56 sm:h-64 md:h-72 rounded-xl overflow-hidden">
                                    {/* размытый фон */}
                                    <Image
                                        src={p.cover}
                                        alt=""
                                        fill
                                        className="object-cover blur-xl scale-110 opacity-70"
                                    />
                                    {/* основное изображение поверх */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Image
                                            src={p.cover}
                                            alt={p.alt || p.title}
                                            width={800}
                                            height={600}
                                            className="object-contain w-full h-full relative z-10 transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* оверлей при наведении */}
                            <div className="hidden md:flex absolute inset-0 bg-black/40 items-center justify-center text-white text-sm opacity-0 group-hover:opacity-100 transition">
                                Открыть
                            </div>
                        </motion.button>
                    ))}
                </motion.div>

                {/* кнопка */}
                {showMoreHref && (
                    <motion.div
                        className="mt-6 sm:mt-10 flex justify-start"
                        initial={{ opacity: 0, filter: "blur(6px)" }}
                        whileInView={{ opacity: 1, filter: "blur(0px)" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 180, damping: 10 }}
                            className="flex"
                        >
                            <Link
                                href={showMoreHref}
                                className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-[#E5E7EB] rounded-md hover:bg-[#A5A7AA] transition font-medium text-sm sm:text-base text-[#374151]"
                            >
                                Все презентации
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </motion.section>
    );
}