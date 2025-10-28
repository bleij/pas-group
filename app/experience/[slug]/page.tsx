import {notFound} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SubscribeCard from "@/components/shared/SubscribeCard";
import {wpRequest} from "@/lib/wp-client";
import {GET_CASE_BY_SLUG, GET_CASES} from "@/lib/queries/experience";

interface Params {
    slug: string;
}

export default async function CasePage({params}: { params: Promise<Params> }) {
    const {slug} = await params;
    const decodedSlug = decodeURIComponent(slug);

    const data = await wpRequest(GET_CASE_BY_SLUG, {slug: decodedSlug});
    const post = data?.cases?.nodes?.[0];
    if (!post) return notFound();

    const cover = post.featuredImage?.node?.sourceUrl || null;
    const coverAlt = post.featuredImage?.node?.altText || post.title;

    const moreData = await wpRequest(GET_CASES, {first: 3});
    const moreCases = moreData?.cases?.nodes || [];

    return (
        <>
            <Header/>

            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* хлебные крошки */}
                <nav className="text-sm text-gray-500 mb-5">
                    Главная <span className="mx-1">/</span>
                    <a href="/experience" className="hover:underline">
                        Наш опыт
                    </a>
                    <span className="mx-1">/</span>
                    <span dangerouslySetInnerHTML={{__html: post.title}}/>
                </nav>

                {/* заголовок */}
                <h1
                    className="text-3xl md:text-4xl font-bold leading-tight mb-4"
                    dangerouslySetInnerHTML={{__html: post.title}}
                />

                {/* обложка */}
                {cover && (
                    <div
                        className="mb-12 w-full flex items-center justify-center rounded-2xl overflow-hidden bg-gray-100"
                        style={{aspectRatio: "16/9", maxHeight: "70vh"}}
                    >
                        <div className="relative w-full h-full flex items-center justify-center">
                            <Image
                                src={cover}
                                alt={coverAlt}
                                width={1400}
                                height={700}
                                className="max-h-[70vh] w-auto object-contain rounded-2xl"
                                priority
                            />
                        </div>
                    </div>
                )}

                {/* две колонки */}
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10 mb-12">
                    {/* контент */}
                    <div className="lg:col-span-1">
                        {post.caseFields?.shortDescription && (
                            <p className="text-lg text-gray-700 mb-6">
                                {post.caseFields.shortDescription}
                            </p>
                        )}

                        <article
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{
                                __html: post.caseFields?.fullDescription || "",
                            }}
                        />
                    </div>

                    {/* форма справа */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-24">
                            <SubscribeCard/>
                        </div>
                    </aside>
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
                            {moreCases.map((p: any) => (
                                <Link
                                    href={`/experience/${p.slug}`}
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
                                    {p.caseFields?.shortDescription && (
                                        <p className="text-sm text-gray-600 line-clamp-3 mb-2">
                                            {p.caseFields.shortDescription}
                                        </p>
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* кнопка */}
                        <div className="mt-10">
                            <Link
                                href="/experience"
                                className="inline-block px-6 py-3 bg-[#E5E7EB] text-[#374151] rounded-md hover:bg-[#A5A7AA] transition text-md font-medium"
                            >
                                Все кейсы →
                            </Link>
                        </div>

                        {/* форма подписки на мобилке */}
                        <div className="mt-10 lg:hidden">
                            <SubscribeCard/>
                        </div>
                    </div>
                </section>
            </main>

            <Footer/>
        </>
    );
}