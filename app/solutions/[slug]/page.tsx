import {notFound} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SubscribeCard from "@/components/shared/SubscribeCard";
import {wpRequest} from "@/lib/wp-client";
import {GET_SOLUTION_BY_SLUG, GET_SOLUTIONS} from "@/lib/queries/solutions";
import type {SolutionNode} from "@/lib/queries/solutions";

interface Params {
    slug: string;
}

export default async function SolutionPage({params}: { params: Promise<Params> }) {
    const {slug} = await params;
    const decodedSlug = decodeURIComponent(slug);

    // получаем основную запись
    const data = await wpRequest<{ solutions: { nodes: SolutionNode[] } }>(GET_SOLUTION_BY_SLUG, {slug: decodedSlug});
    const post = data?.solutions?.nodes?.[0];
    if (!post) return notFound();

    // fallback на mainImage
    const cover =
        post.solutionFields?.mainImage?.node?.sourceUrl ||
        post.featuredImage?.node?.sourceUrl ||
        null;
    const coverAlt =
        post.solutionFields?.mainImage?.node?.altText ||
        post.featuredImage?.node?.altText ||
        post.title;

    // получаем похожие решения
    const moreData = await wpRequest<{ solutions: { nodes: SolutionNode[] } }>(GET_SOLUTIONS, {first: 3});
    const moreSolutions = moreData?.solutions?.nodes || [];

    return (
        <>
            <Header/>

            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* хлебные крошки */}
                <nav className="text-sm text-gray-500 mb-5">
                    Главная <span className="mx-1">/</span>
                    <Link href="/solutions" className="hover:underline">
                        Решения
                    </Link>
                    <span className="mx-1">/</span>
                    <span dangerouslySetInnerHTML={{__html: post.title || ""}}/>
                </nav>

                {/* заголовок */}
                <h1
                    className="text-3xl md:text-4xl font-bold leading-tight mb-4"
                    dangerouslySetInnerHTML={{__html: post.title || ""}}
                />

                {/* основное изображение */}
                {cover && (
                    <div className="mb-12 w-full flex justify-center bg-gray-100 rounded-2xl overflow-hidden">
                        <Image
                            src={cover}
                            alt={coverAlt || ""}
                            width={1400}
                            height={700}
                            className="w-auto max-h-[70vh] object-contain"
                            priority
                        />
                    </div>
                )}

                {/* контент + форма справа */}
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10 mb-12">
                    <div className="prose max-w-none">
                        {post.solutionFields?.shortDescription && (
                            <p className="text-lg text-gray-700 mb-6">
                                {post.solutionFields.shortDescription}
                            </p>
                        )}
                        <div
                            dangerouslySetInnerHTML={{
                                __html: post.solutionFields?.fullDescription || "",
                            }}
                        />
                    </div>

                    {/* форма подписки справа (только на десктопе) */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-24">
                            <SubscribeCard/>
                        </div>
                    </aside>
                </div>

                {/* 💌 форма только на мобилке перед “Смотреть больше” */}
                <div className="mb-10 lg:hidden">
                    <SubscribeCard/>
                </div>

                {/* блок “Смотреть больше” */}
                <section className="w-full bg-white py-16">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">
                            Смотреть больше
                        </h2>
                        <div className="h-1 w-16 bg-[#009999] mb-8"></div>

                        {/* карточки */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {moreSolutions.map((s) => (
                                <Link
                                    href={`/solutions/${s.slug}`}
                                    key={s.id}
                                    className="group bg-[#F3F4F6] rounded-2xl p-4 flex flex-col transition-all hover:bg-[#E5E7EB]"
                                >
                                    <div className="relative w-full overflow-hidden rounded-lg mb-4">
                                        {s.solutionFields?.mainImage?.node?.sourceUrl ? (
                                            <Image
                                                src={s.solutionFields.mainImage.node.sourceUrl}
                                                alt={s.title || ""}
                                                width={400}
                                                height={250}
                                                className="rounded-lg object-cover w-full h-48 group-hover:scale-105 transition-transform"
                                            />
                                        ) : s.featuredImage?.node?.sourceUrl ? (
                                            <Image
                                                src={s.featuredImage.node.sourceUrl}
                                                alt={s.title || ""}
                                                width={400}
                                                height={250}
                                                className="rounded-lg object-cover w-full h-48 group-hover:scale-105 transition-transform"
                                            />
                                        ) : null}
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
                                        {s.title}
                                    </h3>
                                    {s.solutionFields?.shortDescription && (
                                        <p className="text-sm text-gray-600 line-clamp-3 mb-2">
                                            {s.solutionFields.shortDescription}
                                        </p>
                                    )}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-10">
                            <Link
                                href="/solutions"
                                className="inline-block px-6 py-3 bg-[#E5E7EB] text-[#374151] rounded-md hover:bg-[#A5A7AA] transition text-md font-medium"
                            >
                                Все решения →
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer/>
        </>
    );
}