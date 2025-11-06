import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { wpRequest } from "@/lib/wp-client";
import { GET_CASES, type CaseNode } from "@/lib/queries/experience";
import ExperienceIndexClient from "@/components/experience/ExperienceIndex.client";

export const revalidate = 60;

export default async function ExperiencePage() {
    const data = await wpRequest<{ cases: { nodes: CaseNode[] } }>(GET_CASES, { first: 50 });
    const nodes = data?.cases?.nodes ?? [];

    const posts = nodes.map((n) => {
        const raw = n.featuredImage?.node?.sourceUrl || "";
        const image = raw && !raw.includes("%") ? encodeURI(raw) : raw || undefined;

        return {
            id: n.id,
            slug: n.slug,
            title: n.title,
            image,
            alt: n.featuredImage?.node?.altText || n.title,
            excerpt: n.caseFields?.shortDescription || "",
        };
    });

    return (
        <>
            <Header />

            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* хлебные крошки и заголовок теперь внутри ExperienceIndexClient */}
                <ExperienceIndexClient posts={posts} />
            </main>

            <Footer />
        </>
    );
}