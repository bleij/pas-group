import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { wpRequest } from "@/lib/wp-client";
import { GET_CASE_BY_SLUG, GET_CASES } from "@/lib/queries/experience";
import CaseClient from "@/components/experience/CaseClient";

interface Params {
    slug: string;
}

export default async function CasePage({ params }: { params: Promise<Params> }) {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);

    const data = await wpRequest<{ cases: { nodes: any[] } }>(GET_CASE_BY_SLUG, {
        slug: decodedSlug,
    });
    const post = data?.cases?.nodes?.[0];
    if (!post) return notFound();

    const moreData = await wpRequest<{ cases: { nodes: any[] } }>(GET_CASES, { first: 3 });
    const moreCases = moreData?.cases?.nodes || [];

    return (
        <>
            <Header />
            <CaseClient post={post} moreCases={moreCases} />
            <Footer />
        </>
    );
}