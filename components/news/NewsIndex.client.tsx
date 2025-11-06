"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SubscribeCard from "@/components/shared/SubscribeCard";

type CardPost = {
    id: string;
    slug: string;
    title: string;
    date: string;
    image?: string;
    alt?: string;
    excerpt?: string;
    categories?: string[];
};

type PageInfo = {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    endCursor: string | null;
    startCursor: string | null;
};

type Prefetched = {
    posts: CardPost[];
    pageInfo: PageInfo;
} | null;

export default function NewsIndexClient({
                                            posts,
                                            initialPageInfo,
                                        }: {
    posts: CardPost[];
    initialPageInfo: PageInfo;
}) {
    const [allPosts, setAllPosts] = useState<CardPost[]>(posts);
    const [pageInfo, setPageInfo] = useState<PageInfo>(initialPageInfo);
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState("Все");

    const prefetchedRef = useRef<Prefetched>(null);
    const prefetchInFlight = useRef(false);

    const allCats = useMemo(() => {
        const set = new Set<string>();
        allPosts.forEach((p) => (p.categories || []).forEach((c) => set.add(c)));
        return ["Все", ...Array.from(set)];
    }, [allPosts]);

    const filtered = useMemo(
        () => (active === "Все" ? allPosts : allPosts.filter((p) => p.categories?.includes(active))),
        [active, allPosts]
    );

    // ⚡ Предзагрузка следующих страниц
    useEffect(() => {
        if (!pageInfo?.hasNextPage || !pageInfo?.endCursor) {
            prefetchedRef.current = null;
            return;
        }
        if (prefetchInFlight.current) return;

        prefetchInFlight.current = true;
        (async () => {
            try {
                const res = await fetch("/api/news", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ after: pageInfo.endCursor, first: 6 }),
                });
                const data = await res.json();
                const nextPosts: CardPost[] = Array.isArray(data?.posts) ? data.posts : [];
                const nextInfo: PageInfo =
                    data?.pageInfo ?? { hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null };

                prefetchedRef.current = { posts: nextPosts, pageInfo: nextInfo };
            } catch {
                prefetchedRef.current = null;
            } finally {
                prefetchInFlight.current = false;
            }
        })();
    }, [pageInfo?.endCursor, pageInfo?.hasNextPage]);

    // ⚡ Загрузка "Показать больше"
    async function loadMore() {
        if (loading) return;

        const nextData = prefetchedRef.current;
        if (nextData && nextData.posts.length > 0) {
            setAllPosts((prev) => [...prev, ...nextData.posts]);
            setPageInfo(nextData.pageInfo);
            prefetchedRef.current = null;
            return;
        }

        if (!pageInfo?.hasNextPage) return;
        setLoading(true);
        try {
            const res = await fetch("/api/news", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ after: pageInfo.endCursor, first: 6 }),
            });
            const data = await res.json();
            const nextPosts: CardPost[] = Array.isArray(data?.posts) ? data.posts : [];
            const nextInfo: PageInfo =
                data?.pageInfo ?? { hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null };

            if (nextPosts.length > 0) {
                setAllPosts((prev) => [...prev, ...nextPosts]);
                setPageInfo(nextInfo);
            }
        } finally {
            setLoading(false);
        }
    }

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
            className="w-full bg-white"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
                visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: 0.7, ease: "easeOut" },
                },
            }}
        >
            <div className="max-w-7xl mx-auto">
                {/* хлебные крошки + заголовок */}
                <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8"
                >
                    <div className="text-sm text-gray-500 mb-3">
                        Главная <span className="mx-1">/</span> Новости
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold">Новости</h1>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10">
                    {/* левая колонка */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.15 } },
                        }}
                    >
                        {/* фильтры */}
                        <motion.div
                            className="mb-8 -mx-2 overflow-x-auto scrollbar-hide"
                            variants={fadeIn}
                        >
                            <div className="flex gap-3 px-2">
                                {allCats.map((name) => (
                                    <motion.button
                                        key={name}
                                        onClick={() => setActive(name)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 12 }}
                                        className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                            active === name
                                                ? "bg-[#009999] text-white"
                                                : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                                        }`}
                                    >
                                        {name}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>

                        {/* карточки */}
                        <motion.div
                            className="flex flex-col gap-10"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: { transition: { staggerChildren: 0.15 } },
                            }}
                        >
                            {filtered.map((p) => (
                                <motion.div key={p.id} variants={fadeIn}>
                                    <Card post={p} />
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* показать больше */}
                        {pageInfo?.hasNextPage && (
                            <motion.div
                                className="mt-12 flex justify-center"
                                variants={fadeIn}
                            >
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <button
                                        onClick={loadMore}
                                        disabled={loading}
                                        className="px-6 py-3 rounded-md text-sm font-medium border border-gray-300 hover:bg-gray-100 text-gray-700 disabled:opacity-40"
                                    >
                                        {loading ? "Загрузка..." : "Показать больше"}
                                    </button>
                                </motion.div>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* правая колонка — подписка */}
                    <aside className="hidden lg:block">
                        <motion.div
                            className="sticky top-88"
                            variants={fadeIn}
                        >
                            <SubscribeCard />
                        </motion.div>
                    </aside>
                </div>
            </div>
        </motion.section>
    );
}

/* ---------- карточка ---------- */
function SafeImage({ src, alt }: { src?: string; alt?: string }) {
    const [fallback, setFallback] = useState(false);
    if (!src) return <div className="absolute inset-0 bg-slate-200" />;
    const safe = src.includes("%") ? src : encodeURI(src);
    return fallback ? (
        <img src={safe} alt={alt || ""} className="w-full h-full object-cover" />
    ) : (
        <Image
            src={safe}
            alt={alt || ""}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 430px"
            unoptimized
            onError={() => setFallback(true)}
        />
    );
}

function Card({ post }: { post: CardPost }) {
    return (
        <Link
            href={`/news/${post.slug}`}
            className="group flex flex-row items-stretch rounded-2xl bg-gray-50 hover:bg-gray-100 transition overflow-hidden"
        >
            {/* текст */}
            <div className="flex flex-col justify-center gap-3 p-5 md:p-6 flex-1 h-[180px] md:h-[240px] overflow-hidden">
                {post.categories?.length ? (
                    <div className="flex gap-2 overflow-x-auto no-scrollbar max-w-full">
                        {post.categories.map((cat) => (
                            <span
                                key={cat}
                                className="flex-shrink-0 bg-gray-200 text-gray-800 text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap group-hover:bg-[#009999] group-hover:text-white transition"
                            >
                                {cat}
                            </span>
                        ))}
                    </div>
                ) : null}

                <h3 className="text-sm md:text-2xl font-bold leading-snug text-gray-900 line-clamp-3">
                    {post.title}
                </h3>

                <span className="text-xs text-gray-500 mt-auto">{post.date}</span>
            </div>

            {/* картинка */}
            <div className="relative w-[50%] sm:w-[40%] md:w-[430px] h-[180px] sm:h-[200px] md:h-[360px] flex-shrink-0 overflow-hidden">
                <SafeImage src={post.image} alt={post.alt || post.title} />
            </div>
        </Link>
    );
}