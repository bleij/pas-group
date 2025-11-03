"use client";

import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import SubscribeCard from "@/components/shared/SubscribeCard";

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

    const handleLoadMore = () => setVisible((prev) => prev + 6);

    return (
        <section className="w-full bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10">
                {/* левая колонка */}
                <div>
                    <div className="space-y-10">
                        {posts.slice(0, visible).map((p) => (
                            <Card key={p.id} post={p}/>
                        ))}
                    </div>

                    {visible < posts.length && (
                        <div className="mt-12 flex justify-center">
                            <button
                                onClick={handleLoadMore}
                                className="px-6 py-3 rounded-md text-sm font-medium border border-gray-300 hover:bg-gray-100 text-gray-700 disabled:opacity-40"
                            >
                                Показать больше
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

/* ---------- безопасное изображение ---------- */
function SafeImage({src, alt}: { src?: string; alt?: string }) {
    const [fallback, setFallback] = useState(false);
    if (!src) {
        return <div className="absolute inset-0 bg-slate-200"/>;
    }

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
                priority={false}
            />
            {fallback && <div className="absolute inset-0 bg-slate-200"/>}
        </div>
    );
}

/* ---------- карточка ---------- */
function Card({ post }: { post: CardPost }) {
    return (
        <Link
            href={`/solutions/${post.slug}`}
            className="group flex flex-row items-stretch rounded-2xl bg-gray-50
                 hover:bg-gray-100 transition overflow-hidden"
        >
            {/* текстовая часть */}
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

            {/* картинка справа — стиль как у новостей */}
            <div
                className="relative w-[50%] sm:w-[40%] md:w-[430px]
                   h-[180px] sm:h-[200px] md:h-[360px] flex-shrink-0 overflow-hidden"
            >
                <SafeImage src={post.image} alt={post.alt || post.title} />
            </div>
        </Link>
    );
}