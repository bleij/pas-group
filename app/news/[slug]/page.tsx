import {notFound} from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {wpRequest} from "@/lib/wp-client";
import {GET_POST_BY_SLUG, GET_NEWS} from "@/lib/queries/news";
import PostClient from "@/components/news/PostClient";

export const revalidate = 60;

interface NewsNode {
    id: string;
    title: string;
    slug: string;
    content?: string;
    featuredImage?: {
        node?: {
            sourceUrl?: string;
            altText?: string;
        };
    };
}

interface NewsData {
    allNews?: {
        nodes?: NewsNode[];
    };
}

export default async function PostPage({
                                           params,
                                       }: {
    params: Promise<{ slug: string }>;
}) {
    const {slug} = await params;
    const decodedSlug = decodeURIComponent(slug);

    const data = await wpRequest<NewsData>(GET_POST_BY_SLUG, {slug: decodedSlug});
    const post = data?.allNews?.nodes?.[0];
    if (!post) return notFound();

    const moreData = await wpRequest<NewsData>(GET_NEWS, {first: 3});
    const morePosts = moreData?.allNews?.nodes || [];

    return (
        <>
            <Header/>
            <PostClient post={post} morePosts={morePosts}/>
            <Footer/>
        </>
    );
}