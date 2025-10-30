import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SubscribeCard from "@/components/shared/SubscribeCard";
import {wpRequest} from "@/lib/wp-client";
import {GET_NEWS_INDEX, type NewsIndexNode} from "@/lib/queries/news";
import NewsIndexClient from "@/components/news/NewsIndex.client";

export const revalidate = 60;

// типизация pageInfo, чтобы убрать any
interface PageInfo {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string | null;
    endCursor: string | null;
}

function formatDate(d: string) {
    const date = new Date(d);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
}

export default async function NewsPage() {
    const data = await wpRequest<{
        allNews: { nodes: NewsIndexNode[]; pageInfo?: PageInfo };
    }>(GET_NEWS_INDEX, {first: 6});

    const nodes = data?.allNews?.nodes ?? [];
    const pageInfo = data?.allNews?.pageInfo ?? {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: null,
        endCursor: null,
    };

    const posts = nodes.map((p) => {
        const raw = p.featuredImage?.node?.sourceUrl || "";
        const image = raw && !raw.includes("%") ? encodeURI(raw) : raw || undefined;
        return {
            id: p.id,
            slug: p.slug,
            title: p.title,
            date: formatDate(p.date),
            image,
            alt: p.featuredImage?.node?.altText || p.title,
            excerpt: p.newsFields?.shortDescription || "",
            categories: p.newsCategories?.nodes?.map((c) => c.name) || [],
        };
    });

    return (
        <main className="flex min-h-screen flex-col">
            <Header/>

            <section className="w-full bg-white py-10 md:py-14">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-sm text-gray-500 mb-5">
                        Главная <span className="mx-1">/</span> Новости
                    </div>

                    <h1 className="text-2xl md:text-3xl font-bold mb-6">Новости</h1>

                    {/* ✅ передаём обязательный initialPageInfo */}
                    <NewsIndexClient posts={posts} initialPageInfo={pageInfo}/>
                </div>
            </section>

            {/* 🔹 форма подписки внизу — только на мобильных */}
            <div className="block lg:hidden max-w-7xl mx-auto px-6 mb-12">
                <SubscribeCard/>
            </div>

            <Footer/>
        </main>
    );
}