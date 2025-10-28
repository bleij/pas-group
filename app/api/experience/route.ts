import {NextResponse} from "next/server";
import {wpRequest} from "@/lib/wp-client";
import {GET_CASES, type CaseNode} from "@/lib/queries/experience";

export async function POST(req: Request) {
    try {
        const {after} = await req.json();

        const data = await wpRequest<{
            cases: { nodes: CaseNode[]; pageInfo: { hasNextPage: boolean; endCursor: string | null } };
        }>(GET_CASES, {first: 6, after});

        const nodes = data?.cases?.nodes ?? [];
        const info = data?.cases?.pageInfo ?? {hasNextPage: false, endCursor: null};

        const posts = nodes.map((p) => ({
            id: p.id,
            slug: p.slug,
            title: p.title,
            date: "", // если нет даты — можно убрать или позже добавить
            image: p.featuredImage?.node?.sourceUrl ?? undefined,
            alt: p.featuredImage?.node?.altText ?? p.title,
            excerpt: p.caseFields?.shortDescription ?? "",
        }));

        return NextResponse.json({posts, pageInfo: info});
    } catch (error) {
        console.error("API /api/experience error:", error);
        return NextResponse.json({posts: [], pageInfo: null}, {status: 500});
    }
}