"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SubscribeCard from "@/components/shared/SubscribeCard";

const fadeUp = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.6,
            ease: "easeOut",
            delay: i * 0.15, // ⏱️ эффект цепочки
        },
    }),
};

export default function PostClient({ post, morePosts }: any) {
    const cover =
        post.newsFields?.mainImage?.node?.sourceUrl ||
        post.featuredImage?.node?.sourceUrl ||
        null;

    const coverAlt =
        post.newsFields?.mainImage?.node?.altText ||
        post.featuredImage?.node?.altText ||
        post.title;

    return (
        <main className="max-w-7xl mx-auto px-6 py-12 overflow-hidden">
            {/* хлебные крошки */}
            <motion.nav
                custom={0}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-sm text-gray-500 mb-5"
            >
                Главная <span className="mx-1">/</span>
                <Link href="/news" className="hover:underline">
                    Новости
                </Link>
                <span className="mx-1">/</span>
                <span dangerouslySetInnerHTML={{ __html: post.title }} />
            </motion.nav>

            {/* заголовок */}
            <motion.h1
                custom={1}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-xl md:text-4xl font-bold leading-tight mb-3"
                dangerouslySetInnerHTML={{ __html: post.title }}
            />

            {/* дата */}
            <motion.div
                custom={2}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-sm text-gray-500 mb-8"
            >
                {new Date(post.date).toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                })}
            </motion.div>

            {/* картинка */}
            {cover && (
                <motion.div
                    custom={3}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mb-12 w-full flex items-center justify-center rounded-2xl overflow-hidden bg-gray-100"
                    style={{ maxHeight: "70vh" }}
                >
                    <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                            src={cover}
                            alt={coverAlt}
                            width={1400}
                            height={700}
                            className="w-auto max-h-[70vh] rounded-2xl object-contain md:object-contain sm:object-cover"
                            priority
                        />
                    </div>
                </motion.div>
            )}

            {/* контент + подписка */}
            <motion.div
                custom={4}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10 mb-12"
            >
                {/* ✨ контент теперь тянется во всю ширину */}
                <article
                    className="w-full text-[17px] leading-relaxed text-gray-800 tracking-wide"
                    dangerouslySetInnerHTML={{
                        __html: post.newsFields?.contentFull || "",
                    }}
                />
                <aside className="hidden lg:block">
                    <SubscribeCard />
                </aside>
            </motion.div>

            {/* автор */}
            {post.author?.node?.name && (
                <motion.div
                    custom={5}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="rounded-xl bg-gray-100 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-20"
                >
                    <div>
                        <span className="block text-sm text-gray-500 mb-1">Автор</span>
                        <span className="text-lg font-semibold">
                            {post.author.node.name}
                        </span>
                        <p className="text-sm text-gray-600 mt-1">Основатель</p>
                    </div>
                    <p className="text-sm text-gray-500">
                        {new Date(post.date).toLocaleDateString("ru-RU")}
                    </p>
                </motion.div>
            )}

            {/* ✅ блок “Смотреть больше” */}
            <motion.section
                custom={6}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="w-full bg-white py-16"
            >
                <div className="max-w-7xl mx-auto px-auto md:px-0">
                    <div className="mb-10 lg:hidden">
                        <SubscribeCard />
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                        Смотреть больше
                    </h2>
                    <div className="h-1 w-16 bg-[#009999] mb-8"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {morePosts.map((p: any, idx: number) => (
                            <motion.div
                                key={p.id}
                                custom={7 + idx}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <Link
                                    href={`/news/${p.slug}`}
                                    className="group bg-[#F3F4F6] rounded-2xl p-4 flex flex-col transition-all hover:bg-[#E5E7EB]"
                                >
                                    <div className="relative w-full overflow-hidden rounded-lg mb-4">
                                        {p.featuredImage?.node?.sourceUrl && (
                                            <Image
                                                src={p.featuredImage.node.sourceUrl}
                                                alt={p.title}
                                                width={400}
                                                height={250}
                                                className="rounded-lg object-cover w-full h-48 group-hover:scale-105 transition-transform"
                                            />
                                        )}
                                        <div className="absolute top-3 right-3 bg-white rounded-md p-1.5">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2}
                                                stroke="currentColor"
                                                className="w-4 h-4 text-gray-700"
                                            >
                                                <path d="M7 17L17 7M7 7h10v10" />
                                            </svg>
                                        </div>
                                    </div>

                                    <h3 className="font-semibold text-base mb-2 line-clamp-2">
                                        {p.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-2">
                                        {new Date(p.date).toLocaleDateString("ru-RU")}
                                    </p>
                                    {p.newsFields?.shortDescription && (
                                        <p className="text-sm text-gray-600 line-clamp-3">
                                            {p.newsFields.shortDescription}
                                        </p>
                                    )}
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-10">
                        <Link
                            href="/news"
                            className="inline-block px-6 py-3 bg-[#E5E7EB] text-[#374151] rounded-md hover:bg-[#A5A7AA] transition text-md font-medium"
                        >
                            Все новости →
                        </Link>
                    </div>
                </div>
            </motion.section>
        </main>
    );
}