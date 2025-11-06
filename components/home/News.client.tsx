"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type NewsItem = {
    id: string;
    slug: string;
    title: string;
    date: string;
    image?: string;
    excerpt?: string;
};

function formatDate(dateString: string): string {
    if (!dateString) return "";

    if (!isNaN(Date.parse(dateString))) {
        return new Date(dateString).toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }

    const match = dateString.match(/^(\d{2})[./-](\d{2})[./-](\d{4})$/);
    if (match) {
        const [_, day, month, year] = match;
        const parsed = new Date(+year, +month - 1, +day);
        return parsed.toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }

    return dateString;
}

export default function NewsClient({ posts }: { posts: NewsItem[] }) {
    const fadeInUp = {
        hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
        },
    };

    return (
        <section className="w-full bg-[#F3F4F6] py-8 sm:py-10 md:py-12 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* заголовок */}
                <motion.h2
                    className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 md:mb-4"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                >
                    Новости
                </motion.h2>

                {/* линия */}
                <motion.div
                    className="h-1 w-24 sm:w-32 bg-[#009999] mb-6 sm:mb-8 origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    viewport={{ once: true }}
                />

                {/* сетка карточек */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
                    initial="hidden"
                    whileInView="visible"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: { staggerChildren: 0.15, delayChildren: 0.1 },
                        },
                    }}
                    viewport={{ once: true, amount: 0.15 }}
                >
                    {posts.map((post, i) => (
                        <motion.div
                            key={post.id}
                            variants={fadeInUp}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.3, ease: "easeOut" },
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link
                                href={`/news/${post.slug}`}
                                className="group bg-white rounded-xl p-3 sm:p-4 flex flex-col transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <div className="relative w-full overflow-hidden rounded-lg mb-3 sm:mb-4">
                                    {post.image && (
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            width={400}
                                            height={250}
                                            className="rounded-lg object-cover w-full h-44 sm:h-48 group-hover:scale-110 transition-transform duration-700"
                                            style={{ objectPosition: "center 10%" }}
                                        />
                                    )}

                                    {/* стрелочка */}
                                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-md p-1.5 group-hover:bg-[#009999]/90 transition-all duration-300">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="w-4 h-4 text-gray-700 group-hover:text-white transition"
                                        >
                                            <path d="M7 17L17 7M7 7h10v10" />
                                        </svg>
                                    </div>
                                </div>

                                <h3 className="font-semibold text-sm sm:text-base mb-1 sm:mb-2 line-clamp-2 group-hover:text-[#009999] transition-colors duration-300">
                                    {post.title}
                                </h3>

                                <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
                                    {formatDate(post.date)}
                                </p>

                                {post.excerpt && (
                                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-snug">
                                        {post.excerpt}
                                    </p>
                                )}
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* кнопка */}
                <motion.div
                    className="mt-6 sm:mt-10 flex justify-start"
                    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 180, damping: 10 }}
                    >
                        <Link
                            href="/news"
                            className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-[#E5E7EB] rounded-md hover:bg-[#A5A7AA] transition font-medium text-sm sm:text-base text-[#374151]"
                        >
                            Все новости →
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}