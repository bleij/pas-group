"use client";

import Image from "next/image";
import Link from "next/link";

type NewsItem = {
    id: string;
    slug: string;
    title: string;
    date: string;
    image?: string;
    excerpt?: string;
};

export default function NewsClient({posts}: { posts: NewsItem[] }) {
    return (
        <section className="w-full bg-gray-100 py-16">
            <div className="max-w-7xl mx-auto px-6">
                {/* заголовок */}
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Новости</h2>
                {/* полоска */}
                <div className="h-1 w-16 bg-blue-900 mb-8"></div>

                {/* сетка */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Link
                            href={`/news/${post.slug}`}
                            key={post.id}
                            className="group flex flex-col"
                        >
                            <div className="relative h-48 w-full overflow-hidden rounded-lg bg-gray-100">
                                {post.image && (
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform"
                                    />
                                )}
                            </div>
                            <div className="mt-4 flex flex-col flex-grow">
                                <span className="text-xs text-gray-500 mb-2">
                                    {post.date}
                                </span>
                                <h3 className="font-semibold text-lg mb-2">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-gray-600 line-clamp-3">
                                    {post.excerpt}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* кнопка снизу слева */}
                <div className="mt-8">
                    <Link
                        href="/news"
                        className="inline-block px-6 py-3 bg-gray-200 rounded-md hover:bg-gray-300 transition text-md"
                    >
                        Все статьи →
                    </Link>
                </div>
            </div>
        </section>
    );
}