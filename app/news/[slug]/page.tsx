import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { wpRequest } from "@/lib/wp-client";
import { GET_POST_BY_SLUG, GET_NEWS } from "@/lib/queries/news";
import PostClient from "@/components/news/PostClient";

export const revalidate = 60;

// ⚡ правильная сигнатура
export default async function PostPage({
                                           params,
                                       }: {
    params: Promise<{ slug: string }>;
}) {
    // ✅ ждём params тут
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);

    const data = await wpRequest(GET_POST_BY_SLUG, { slug: decodedSlug });
    const post = data?.allNews?.nodes?.[0];
    if (!post) return notFound();

    const moreData = await wpRequest(GET_NEWS, { first: 3 });
    const morePosts = moreData?.allNews?.nodes || [];

    return (
        <>
            <Header />
            <PostClient post={post} morePosts={morePosts} />
            <Footer />
        </>
    );
}