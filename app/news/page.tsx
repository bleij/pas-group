import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { wpRequest } from "@/lib/wp-client";
import { GET_NEWS_INDEX, type NewsIndexNode } from "@/lib/queries/news";
import NewsIndexClient from "@/components/news/NewsIndex.client";

export const revalidate = 60;

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
    }>(GET_NEWS_INDEX, { first: 6 });

    const nodes = data?.allNews?.nodes ?? [];
    const pageInfo = data?.allNews?.pageInfo ?? {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: null,
        endCursor: null,
    };

    const posts = nodes.map((p) => {
        const raw = p.featuredImage?.node?.sourceUrl || "";
        const image =
            raw && !raw.includes("%") ? encodeURI(raw) : raw || undefined;
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
            <Header />

            <section className="w-full bg-white py-10 md:py-14">
                <div className="max-w-7xl mx-auto px-6">
                    {/* теперь здесь только список */}
                    <NewsIndexClient posts={posts} initialPageInfo={pageInfo} />
                </div>
            </section>

            <Footer />
        </main>
    );
}