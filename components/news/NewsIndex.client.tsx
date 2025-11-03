// components/news/NewsIndex.client.tsx
"use client";

import {useState, useMemo, useEffect, useRef} from "react";
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

    // буфер предзагрузки
    const prefetchedRef = useRef<Prefetched>(null);
    const prefetchInFlight = useRef(false);

    // категории
    const allCats = useMemo(() => {
        const set = new Set<string>();
        allPosts.forEach((p) => (p.categories || []).forEach((c) => set.add(c)));
        return ["Все", ...Array.from(set)];
    }, [allPosts]);

    const filtered = useMemo(
        () => (active === "Все" ? allPosts : allPosts.filter((p) => p.categories?.includes(active))),
        [active, allPosts]
    );

    // предзагружаем «следующую» страницу сразу после маунта/обновления pageInfo
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
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({after: pageInfo.endCursor, first: 6}),
                });
                const data = await res.json();
                const nextPosts: CardPost[] = Array.isArray(data?.posts) ? data.posts : [];
                const nextInfo: PageInfo =
                    data?.pageInfo ?? {hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null};

                prefetchedRef.current = {posts: nextPosts, pageInfo: nextInfo};
            } catch (e) {
                console.error("Prefetch failed:", e);
                prefetchedRef.current = null;
            } finally {
                prefetchInFlight.current = false;
            }
        })();
    }, [pageInfo?.endCursor, pageInfo?.hasNextPage]);

    async function loadMore() {
        if (loading) return;

        // 1) если есть предзагруженные — используем мгновенно
        if (prefetchedRef.current && prefetchedRef.current.posts.length > 0) {
            const {posts: nextPosts, pageInfo: nextInfo} = prefetchedRef.current;

            setAllPosts((prev) => {
                const merged = [...prev, ...nextPosts];
                const unique = Array.from(new Map(merged.map((p) => [p.id, p])).values());
                return unique;
            });
            setPageInfo(nextInfo);

            // сразу очищаем буфер и стартуем предзагрузку следующей
            prefetchedRef.current = null;

            // фоновый префетч запустится сам из useEffect, т.к. мы обновили pageInfo
            return;
        }

        // 2) если буфера нет — обычная загрузка
        if (!pageInfo?.hasNextPage) return;
        setLoading(true);
        try {
            const res = await fetch("/api/news", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({after: pageInfo.endCursor, first: 6}),
            });
            const data = await res.json();

            const nextPosts: CardPost[] = Array.isArray(data?.posts) ? data.posts : [];
            const nextInfo: PageInfo =
                data?.pageInfo ?? {hasNextPage: false, hasPreviousPage: false, startCursor: null, endCursor: null};

            if (nextPosts.length > 0) {
                setAllPosts((prev) => {
                    const merged = [...prev, ...nextPosts];
                    const unique = Array.from(new Map(merged.map((p) => [p.id, p])).values());
                    return unique;
                });
                setPageInfo(nextInfo);
            }
        } catch (e) {
            console.error("loadMore failed:", e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="w-full bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10">
                {/* основная лента */}
                <div>
                    {/* фильтры */}
                    <div className="mb-8 -mx-2 overflow-x-auto scrollbar-hide">
                        <div className="flex gap-3 px-2">
                            {allCats.map((name) => (
                                <button
                                    key={name}
                                    onClick={() => setActive(name)}
                                    className={[
                                        "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium",
                                        active === name
                                            ? "bg-[#009999] text-white"
                                            : "bg-gray-200 text-gray-900 hover:bg-gray-300 transition",
                                    ].join(" ")}
                                >
                                    {name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* карточки */}
                    <div className="space-y-10">
                        {filtered.map((p) => (
                            <Card key={p.id} post={p}/>
                        ))}
                    </div>

                    {/* показать больше */}
                    {pageInfo?.hasNextPage && (
                        <div className="mt-12 flex justify-center">
                            <button
                                onClick={loadMore}
                                disabled={loading}
                                className="px-6 py-3 rounded-md text-sm font-medium border border-gray-300 hover:bg-gray-100 text-gray-700 disabled:opacity-40"
                            >
                                {loading ? "Загрузка..." : "Показать больше"}
                            </button>
                        </div>
                    )}
                </div>

                {/* правая колонка — форма подписки */}
                <aside className="hidden lg:block">
                    <div className="sticky top-24">
                        <SubscribeCard/>
                    </div>
                </aside>
            </div>
        </section>
    );
}

/* ---------- карточка ---------- */
function SafeImage({src, alt}: { src?: string; alt?: string }) {
    const [fallback, setFallback] = useState(false);
    if (!src) return <div className="absolute inset-0 bg-slate-200"/>;
    const safe = src.includes("%") ? src : encodeURI(src);
    return fallback ? (
        <img src={safe} alt={alt || ""} className="w-full h-full object-cover"/>
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

function Card({post}: { post: CardPost }) {
    return (
        <Link
            href={`/news/${post.slug}`}
            className="group flex flex-row items-stretch rounded-2xl bg-gray-50
                 hover:bg-gray-100 transition overflow-hidden"
        >
            {/* текстовая часть */}
            <div
                className="flex flex-col justify-center gap-3 p-5 md:p-6 flex-1 h-[180px] md:h-[240px] overflow-hidden">
                {post.categories?.length ? (
                    <div className="flex gap-2 overflow-x-auto no-scrollbar max-w-full">
                        {post.categories.map((cat) => (
                            <span
                                key={cat}
                                className="flex-shrink-0 bg-gray-200 text-gray-800 text-xs font-medium
                   px-3 py-1 rounded-full whitespace-nowrap
                   group-hover:bg-[#009999] group-hover:text-white transition"
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

            {/* картинка справа — даже на мобилке */}
            <div
                className="relative w-[50%] sm:w-[40%] md:w-[430px]
                   h-[180px] sm:h-[200px] md:h-[360px] flex-shrink-0 overflow-hidden"
            >
                <SafeImage src={post.image} alt={post.alt || post.title}/>
            </div>
        </Link>
    );
}