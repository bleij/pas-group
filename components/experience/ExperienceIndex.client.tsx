"use client";

import {useState, useEffect} from "react";
import {motion} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SubscribeCard from "@/components/shared/SubscribeCard";
import type {Variants} from "framer-motion";

type CardPost = {
    id: string;
    slug: string;
    title: string;
    image?: string;
    alt?: string;
    excerpt?: string;
};

export default function ExperienceIndexClient({posts}: { posts: CardPost[] }) {
    const [visible, setVisible] = useState(6);
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const handleLoadMore = () => setVisible((prev) => prev + 6);

    const fadeIn: Variants = {
        hidden: {opacity: 0, y: 30, filter: "blur(10px)"},
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {duration: 0.6, ease: [0.3, 0, 0.3, 1] as const},
        },
    };

    return (
        <motion.section
            className="w-full bg-white"
            initial={{opacity: 0, y: 60, filter: "blur(12px)"}}
            animate={mounted ? {opacity: 1, y: 0, filter: "blur(0px)"} : {}}
            transition={{duration: 0.8, ease: "easeOut"}}
        >
            <div className="max-w-7xl mx-auto">
                {/* хлебные крошки + заголовок */}
                <motion.div
                    initial={{opacity: 0, y: 20, filter: "blur(8px)"}}
                    animate={{opacity: 1, y: 0, filter: "blur(0px)"}}
                    transition={{duration: 0.8, ease: "easeOut"}}
                    className="mb-8"
                >
                    <div className="text-sm text-gray-500 mb-3">
                        Главная <span className="mx-1">/</span> Наш опыт
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold leading-tight">Наш опыт</h1>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10">
                    {/* левая колонка */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{visible: {transition: {staggerChildren: 0.15}}}}
                        className="flex flex-col gap-10"
                    >
                        {posts.slice(0, visible).map((p) => (
                            <motion.div key={p.id} variants={fadeIn}>
                                <Card post={p}/>
                            </motion.div>
                        ))}

                        {/* 💌 форма подписки — только на мобилке */}
                        <motion.div
                            variants={fadeIn}
                            className="block lg:hidden mt-4"
                            initial={{opacity: 0, y: 20, filter: "blur(6px)"}}
                            whileInView={{opacity: 1, y: 0, filter: "blur(0px)"}}
                            transition={{duration: 0.7, ease: "easeOut"}}
                        >
                            <SubscribeCard/>
                        </motion.div>

                        {visible < posts.length && (
                            <motion.div variants={fadeIn} className="mt-12 flex justify-center">
                                <motion.button
                                    onClick={handleLoadMore}
                                    whileHover={{scale: 1.05}}
                                    whileTap={{scale: 0.95}}
                                    className="px-6 py-3 rounded-md text-sm font-medium border border-gray-300 hover:bg-gray-100 text-gray-700 disabled:opacity-40"
                                >
                                    Показать больше
                                </motion.button>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* правая колонка — форма подписки */}
                    <aside className="hidden lg:block">
                        <motion.div
                            className="sticky top-36"
                            initial={{opacity: 0, y: 40, filter: "blur(10px)"}}
                            whileInView={{opacity: 1, y: 0, filter: "blur(0px)"}}
                            transition={{duration: 0.9, ease: "easeOut"}}
                        >
                            <SubscribeCard/>
                        </motion.div>
                    </aside>
                </div>
            </div>
        </motion.section>
    );
}

/* ---------- безопасное изображение ---------- */
function SafeImage({src, alt}: { src?: string; alt?: string }) {
    const [fallback, setFallback] = useState(false);
    if (!src) return <div className="absolute inset-0 bg-slate-200"/>;

    const safe = src.includes("%") ? src : encodeURI(src);

    return (
        <div className="relative w-full h-full">
            <Image
                src={safe}
                alt={alt || ""}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 430px"
                unoptimized
                onError={() => setFallback(true)}
            />
            {fallback && <div className="absolute inset-0 bg-slate-200"/>}
        </div>
    );
}

/* ---------- карточка ---------- */
function Card({post}: { post: CardPost }) {
    return (
        <Link
            href={`/experience/${post.slug}`}
            className="group flex flex-row items-stretch rounded-2xl bg-gray-50
                 hover:bg-gray-100 transition overflow-hidden"
        >
            {/* текст */}
            <div className="flex flex-col justify-center gap-3 p-5 md:p-6 flex-1 pr-2">
                <h3 className="text-sm md:text-2xl font-bold leading-snug text-gray-900 line-clamp-3 shrink">
                    {post.title}
                </h3>

                {!!post.excerpt && (
                    <p className="text-sm md:text-base text-gray-700 line-clamp-3 leading-snug">
                        {post.excerpt}
                    </p>
                )}
            </div>

            {/* картинка справа */}
            <div
                className="relative w-[50%] sm:w-[40%] md:w-[430px]
                   h-[180px] sm:h-[200px] md:h-[360px] flex-shrink-0 overflow-hidden"
            >
                <SafeImage src={post.image} alt={post.alt || post.title}/>
            </div>
        </Link>
    );
}