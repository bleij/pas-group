// app/news/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { wpRequest } from "@/lib/wp-client";
import { GET_POST_BY_SLUG } from "@/lib/queries/news";

interface Params { slug: string }

export default async function PostPage({ params }: { params: Promise<Params> }) {
    // ✅ ожидаем params
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);

    const data = await wpRequest(GET_POST_BY_SLUG, { slug: decodedSlug });
    const post = data?.allNews?.nodes?.[0];

    if (!post) return notFound();

    const cover =
        post.newsFields?.mainImage?.node?.sourceUrl ||
        post.featuredImage?.node?.sourceUrl ||
        null;

    const coverAlt =
        post.newsFields?.mainImage?.node?.altText ||
        post.featuredImage?.node?.altText ||
        post.title;

    return (
        <>
            <Header />

            <main className="w-[90%] mx-auto py-12">
                {/* хлебные крошки — без className, чтобы не падало если компонент его не принимает */}
                <nav className="text-sm text-gray-500 mb-5">
                    Главная <span className="mx-1">/</span>
                    <a href="/news" className="hover:underline">Новости</a>
                    <span className="mx-1">/</span>
                    <span dangerouslySetInnerHTML={{ __html: post.title }} />
                </nav>

                {/* заголовок */}
                <h1
                    className="text-3xl md:text-4xl font-bold leading-tight mb-4"
                    dangerouslySetInnerHTML={{ __html: post.title }}
                />

                {/* дата */}
                <div className="text-sm text-gray-500 mb-8">
                    {new Date(post.date).toLocaleDateString("ru-RU", {
                        day: "2-digit", month: "2-digit", year: "numeric",
                    })}
                </div>

                {/* две колонки */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* контент */}
                    <div className="lg:col-span-2">
                        {/* картинка */}
                        {cover && (
                            <div className="mb-10 w-full max-h-[30vh] bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">
                                <Image
                                    src={cover}
                                    alt={coverAlt}
                                    width={1400}
                                    height={700}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        )}

                        {/* текст статьи */}
                        <div
                            className="prose max-w-none mb-16"
                            dangerouslySetInnerHTML={{ __html: post.newsFields?.contentFull || "" }}
                        />
                    </div>

                    {/* правая колонка — плейсхолдер формы */}
                    <aside className="rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/20 p-6 h-fit sticky top-28">
                        <h3 className="text-lg font-semibold mb-3">
                            Будьте в курсе наших новостей и акций!
                        </h3>
                        <div className="text-sm text-gray-700">
                            Здесь будет форма подписки (жёлтая).
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
        </>
    );
}