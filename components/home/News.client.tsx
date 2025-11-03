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

function formatDate(dateString: string): string {
    if (!dateString) return "";

    // если ISO (2025-05-20T00:00:00Z)
    if (!isNaN(Date.parse(dateString))) {
        return new Date(dateString).toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }

    // если формат DD.MM.YYYY или DD/MM/YYYY
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

export default function NewsClient({posts}: { posts: NewsItem[] }) {
    return (
        <section id="news" className="w-full bg-[#F3F4F6] py-8 sm:py-10 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* заголовок */}
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 md:mb-4">
                    Новости
                </h2>

                {/* линия */}
                <div className="h-1 w-24 sm:w-32 bg-[#009999] mb-6 sm:mb-8"></div>

                {/* сетка карточек */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {posts.map((post) => (
                        <Link
                            href={`/news/${post.slug}`}
                            key={post.id}
                            className="group bg-white rounded-xl p-3 sm:p-4 flex flex-col transition-all"
                        >
                            <div className="relative w-full overflow-hidden rounded-lg mb-3 sm:mb-4">
                                {post.image && (
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        width={400}
                                        height={250}
                                        className="rounded-lg object-cover w-full h-44 sm:h-48 group-hover:scale-105 transition-transform"
                                        style={{objectPosition: "center 10%"}}
                                    />
                                )}

                                {/* стрелочка */}
                                <div className="absolute top-2 right-2 bg-white rounded-md p-1.5 shadow-sm">
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

                            <h3 className="font-semibold text-sm sm:text-base mb-1 sm:mb-2 line-clamp-2">
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
                    ))}
                </div>

                {/* кнопка */}
                <div className="mt-6 sm:mt-8 md:mt-10 flex justify-start">
                    <Link
                        href="/news"
                        className="inline-block px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-[#E5E7EB] rounded-md hover:bg-[#A5A7AA] transition font-medium text-sm md:text-base text-[#374151]"
                    >
                        Все новости →
                    </Link>
                </div>
            </div>
        </section>
    );
}