import {NextResponse} from "next/server";
import {wpRequest} from "@/lib/wp-client";
import {GET_NEWS_INDEX, type NewsIndexNode} from "@/lib/queries/news";

export async function POST(req: Request) {
    try {
        const {after, first = 6} = await req.json();

        const data = await wpRequest<{
            allNews: {
                nodes: NewsIndexNode[];
                pageInfo: { hasNextPage: boolean; endCursor: string | null };
            };
        }>(GET_NEWS_INDEX, {first, after});

        const nodes = data?.allNews?.nodes ?? [];
        const pageInfo = data?.allNews?.pageInfo ?? {hasNextPage: false, endCursor: null};

        const posts = nodes.map((p) => ({
            id: p.id,
            slug: p.slug,
            title: p.title,
            date: new Date(p.date).toLocaleDateString("ru-RU"),
            image: p.featuredImage?.node?.sourceUrl ?? undefined,
            alt: p.featuredImage?.node?.altText ?? p.title,
            excerpt: p.newsFields?.shortDescription ?? "",
            categories: p.newsCategories?.nodes?.map((c) => c.name) ?? [],
        }));

        return NextResponse.json({posts, pageInfo});
    } catch (error) {
        console.error("API /api/news error:", error);
        return NextResponse.json({posts: [], pageInfo: null}, {status: 500});
    }
}