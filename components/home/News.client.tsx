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
        <section id="news" className="w-full bg-[#F3F4F6] py-16">
            <div className="max-w-7xl mx-auto px-6">
                {/* заголовок */}
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Новости</h2>
                {/* линия */}
                <div className="h-1 w-32 bg-[#009999] mb-8"></div>

                {/* сетка карточек */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Link
                            href={`/news/${post.slug}`}
                            key={post.id}
                            className="group bg-white rounded-2xl p-4 flex flex-col transition-all"
                        >
                            <div className="relative w-full overflow-hidden rounded-lg mb-4">
                                {post.image && (
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        width={400}
                                        height={250}
                                        className="rounded-lg object-cover w-full h-48 group-hover:scale-105 transition-transform"
                                    />
                                )}
                                {/* стрелочка */}
                                <div className="absolute top-3 right-3 bg-white rounded-md p-1.5">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-4 h-4 text-gray-700"
                                    >
                                        <path d="M7 17L17 7M7 7h10v10"/>
                                    </svg>
                                </div>
                            </div>

                            <h3 className="font-semibold text-base mb-2 line-clamp-2">
                                {post.title}
                            </h3>
                            <p className="text-sm text-gray-500 mb-2">
                                {new Date(post.date).toLocaleDateString("ru-RU")}
                            </p>
                            {post.excerpt && (
                                <p className="text-sm text-gray-600 line-clamp-3">
                                    {post.excerpt}
                                </p>
                            )}
                        </Link>
                    ))}
                </div>

                {/* кнопка */}
                <div className="mt-10">
                    <Link
                        href="/news"
                        className="inline-block px-6 py-3 bg-[#E5E7EB] rounded-md hover:bg-[#A5A7AA] transition font-medium text-xl text-[#374151]"
                    >
                        Все новости →
                    </Link>
                </div>
            </div>
        </section>
    );
}