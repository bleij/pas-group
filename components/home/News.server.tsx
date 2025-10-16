import { wpRequest } from "@/lib/wp-client";
import { GET_NEWS } from "@/lib/queries/news";
import NewsClient from "./News.client";

type NewsNode = {
    id: string;
    slug: string;
    title: string;
    date: string;
    featuredImage?: { node?: { sourceUrl?: string | null; altText?: string | null } | null } | null;
    newsCategories?: { nodes: { name: string; slug: string }[] } | null;
    newsFields?: {
        shortDescription?: string | null;
        contentFull?: string | null;
        mainImage?: { node?: { sourceUrl?: string | null; altText?: string | null } | null } | null;
    } | null;
};

function formatDate(d: string) {
    const date = new Date(d);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
}

export default async function NewsServer() {
    let data:
        | { allNews?: { nodes?: NewsNode[] } }
        | undefined;

    try {
        data = await wpRequest<{ allNews?: { nodes?: NewsNode[] } }>(GET_NEWS, { first: 3 });
    } catch (e) {
        // На случай 429/HTML от WP — не падаем всю страницу
        console.error("NewsServer: failed to fetch news:", e);
        data = undefined;
    }

    const nodes = data?.allNews?.nodes ?? [];

    const posts = nodes.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        date: formatDate(p.date),
        image: p.featuredImage?.node?.sourceUrl
            ?? p.newsFields?.mainImage?.node?.sourceUrl
            ?? undefined,
        excerpt: p.newsFields?.shortDescription ?? "",
    }));

    return <NewsClient posts={posts} />;
}