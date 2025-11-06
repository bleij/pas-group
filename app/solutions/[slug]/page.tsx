import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { wpRequest } from "@/lib/wp-client";
import { GET_SOLUTION_BY_SLUG, GET_SOLUTIONS } from "@/lib/queries/solutions";
import type { SolutionNode } from "@/lib/queries/solutions";
import SolutionClient from "@/components/solutions/SolutionClient";

interface Params { slug: string }

export default async function SolutionPage({ params }: { params: Promise<Params> }) {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);

    const data = await wpRequest<{ solutions: { nodes: SolutionNode[] } }>(
        GET_SOLUTION_BY_SLUG,
        { slug: decodedSlug }
    );
    const post = data?.solutions?.nodes?.[0];
    if (!post) return notFound();

    const moreData = await wpRequest<{ solutions: { nodes: SolutionNode[] } }>(
        GET_SOLUTIONS,
        { first: 3 }
    );
    const moreSolutions = moreData?.solutions?.nodes || [];

    return (
        <>
            <Header />
            <SolutionClient post={post} moreSolutions={moreSolutions} />
            <Footer />
        </>
    );
}