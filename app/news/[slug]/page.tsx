import {notFound} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {wpRequest} from "@/lib/wp-client";
import {GET_POST_BY_SLUG, GET_NEWS} from "@/lib/queries/news";
import SubscribeCard from "@/components/shared/SubscribeCard";
import ResponsiveNewsImage from "@/components/news/ResponsiveNewsImage";

interface Params {
    slug: string;
}

// ✅ аккуратная типизация результатов
interface WPPost {
    id: string;
    slug: string;
    title: string;
    date: string;
    author?: {
        node?: {
            name?: string;
        };
    };
    featuredImage?: {
        node?: {
            sourceUrl?: string;
            altText?: string;
        };
    };
    newsFields?: {
        mainImage?: { node?: { sourceUrl?: string; altText?: string } };
        shortDescription?: string;
        contentFull?: string;
    };
}

interface WPResponse {
    allNews?: {
        nodes?: WPPost[];
    };
}

export default async function PostPage({
                                           params,
                                       }: {
    params: Promise<Params>;
}) {
    const {slug} = await params;
    const decodedSlug = decodeURIComponent(slug);

    // ✅ строгие типы
    const data: WPResponse = await wpRequest(GET_POST_BY_SLUG, {
        slug: decodedSlug,
    });

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

    const moreData: WPResponse = await wpRequest(GET_NEWS, {first: 3});
    const morePosts = moreData?.allNews?.nodes || [];

    return (
        <>
            <Header/>

            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* хлебные крошки */}
                <nav className="text-sm text-gray-500 mb-5">
                    Главная <span className="mx-1">/</span>
                    {/* ✅ заменено <a> → <Link> */}
                    <Link href="/news" className="hover:underline">
                        Новости
                    </Link>
                    <span className="mx-1">/</span>
                    <span dangerouslySetInnerHTML={{__html: post.title}}/>
                </nav>

                {/* заголовок */}
                <h1
                    className="text-3xl md:text-4xl font-bold leading-tight mb-3"
                    dangerouslySetInnerHTML={{__html: post.title}}
                />

                {/* дата */}
                <div className="text-sm text-gray-500 mb-8">
                    {new Date(post.date).toLocaleDateString("ru-RU", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    })}
                </div>

                {/* картинка */}
                {cover && <ResponsiveNewsImage src={cover} alt={coverAlt}/>}

                {/* контент + подписка */}
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10 mb-12">
                    <article
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{
                            __html: post.newsFields?.contentFull || "",
                        }}
                    />
                    <aside className="hidden lg:block">
                        <SubscribeCard/>
                    </aside>
                </div>

                {/* автор */}
                {post.author?.node?.name && (
                    <div
                        className="rounded-xl bg-gray-100 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-20">
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
                    </div>
                )}

                {/* ✅ блок “Смотреть больше” */}
                <section className="w-full bg-white py-16">
                    <div className="max-w-7xl mx-auto px-auto md:px-0">

                        {/* 💌 только на мобилке перед заголовком */}
                        <div className="mb-10 lg:hidden">
                            <SubscribeCard/>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold mb-4">
                            Смотреть больше
                        </h2>
                        <div className="h-1 w-16 bg-[#009999] mb-8"></div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {morePosts.map((p) => (
                                <Link
                                    href={`/news/${p.slug}`}
                                    key={p.id}
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
                                                <path d="M7 17L17 7M7 7h10v10"/>
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
                </section>
            </main>

            <Footer/>
        </>
    );
}