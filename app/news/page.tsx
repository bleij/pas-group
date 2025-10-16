// app/news/page.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {wpRequest} from "@/lib/wp-client";
import {GET_NEWS_INDEX, type NewsIndexNode} from "@/lib/queries/news";
import NewsIndexClient from "@/components/news/NewsIndex.client";

export const revalidate = 60;

function formatDate(d: string) {
    const date = new Date(d);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
}

export default async function NewsPage() {
    const data = await wpRequest<{ allNews: { nodes: NewsIndexNode[] } }>(
        GET_NEWS_INDEX,
        {first: 50}
    );

    const nodes = data?.allNews?.nodes ?? [];

    const posts = nodes.map((p) => {
        // Берём только featuredImage для карточки
        const raw = p.featuredImage?.node?.sourceUrl || "";
        // Аккуратно кодируем URL с кириллицей, но не «двойным» энкодом
        const image =
            raw && !raw.includes("%") ? encodeURI(raw) : raw || undefined;

        return {
            id: p.id,
            slug: p.slug,
            title: p.title,
            date: formatDate(p.date),
            image, // <= ВАЖНО: именно "image"
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

                    <NewsIndexClient posts={posts}/>
                </div>
            </section>

            <Footer/>
        </main>
    );
}