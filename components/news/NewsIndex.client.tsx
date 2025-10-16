// components/news/NewsIndex.client.tsx
"use client";

import {useState, useMemo} from "react";
import Image from "next/image";
import Link from "next/link";

type CardPost = {
    id: string;
    slug: string;
    title: string;
    date: string;
    image?: string;   // <= ожидаем image (featuredImage)
    alt?: string;
    excerpt?: string;
    categories?: string[];
};

export default function NewsIndexClient({posts}: { posts: CardPost[] }) {
    const allCats = useMemo(() => {
        const set = new Set<string>();
        posts.forEach((p) => (p.categories || []).forEach((c) => set.add(c)));
        return ["Все", ...Array.from(set)];
    }, [posts]);

    const [active, setActive] = useState("Все");
    const filtered =
        active === "Все"
            ? posts
            : posts.filter((p) => p.categories?.includes(active));

    return (
        <section className="w-full bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-8">
                <div>
                    {/* фильтры-чипы */}
                    <div className="mb-6 -mx-2 overflow-x-auto scrollbar-hide">
                        <div className="flex gap-3 px-2">
                            {allCats.map((name) => (
                                <button
                                    key={name}
                                    onClick={() => setActive(name)}
                                    className={[
                                        "whitespace-nowrap rounded-full px-4 py-2 text-sm",
                                        active === name
                                            ? "bg-gray-900 text-white"
                                            : "bg-gray-200 text-gray-900 hover:bg-gray-300",
                                    ].join(" ")}
                                >
                                    {name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* лента */}
                    <div className="space-y-6">
                        {filtered.map((p) => (
                            <Card key={p.id} post={p}/>
                        ))}
                    </div>
                </div>

                {/* плейсхолдер под форму справа */}
                <aside className="hidden lg:block">
                    <div className="sticky top-24">
                        <div className="rounded-2xl bg-[#D4AF37] text-white p-6">
                            <h3 className="font-semibold leading-snug">
                                Будьте в курсе наших <br/> новостей и акций!
                            </h3>
                            <div className="mt-4 h-10 rounded-md bg-white/20"/>
                            <p className="mt-3 text-xs opacity-80">
                                Нажимая кнопку, вы даёте согласие <br/> на обработку персональных данных
                            </p>
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    );
}

function SafeImage({src, alt}: { src?: string; alt?: string }) {
    const [fallback, setFallback] = useState(false);
    if (!src) return <div className="absolute inset-0 bg-slate-300"/>;

    const safe = src.includes("%") ? src : encodeURI(src);

    return fallback ? (
        <img src={safe} alt={alt || ""} className="w-full h-full object-cover"/>
    ) : (
        <Image
            src={safe}
            alt={alt || ""}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
            sizes="(max-width:768px) 100vw, 370px"
            unoptimized
            onError={() => setFallback(true)}
        />
    );
}

function Card({post}: { post: CardPost }) {
    return (
        <Link
            href={`/news/${post.slug}`}
            className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_370px] gap-4 rounded-2xl bg-gray-100 p-4 pr-2 md:pr-4 hover:shadow transition"
        >
            <div className="flex flex-col gap-3">
                {post.categories?.[0] && (
                    <span className="inline-block w-fit rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-700">
            {post.categories[0]}
          </span>
                )}
                <h3 className="text-lg md:text-xl font-semibold leading-tight">
                    {post.title}
                </h3>
                {!!post.excerpt && (
                    <p className="text-sm text-gray-700 line-clamp-3">{post.excerpt}</p>
                )}
                <span className="mt-2 text-xs text-gray-500">{post.date}</span>
            </div>

            <div className="relative h-[190px] md:h-full rounded-xl overflow-hidden">
                <SafeImage src={post.image} alt={post.alt || post.title}/>
            </div>
        </Link>
    );
}