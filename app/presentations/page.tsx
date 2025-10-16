import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { wpRequest } from "@/lib/wp-client";
import { GET_PRESENTATIONS } from "@/lib/queries/presentations";
import PresentationsClient from "@/components/home/Presentations.client";

export const revalidate = 60;

type WpNode = {
    id: string;
    title: string;
    featuredImage?: { node?: { sourceUrl?: string | null; altText?: string | null } | null } | null;
    presentationFields?: { pdfFile?: { node?: { mediaItemUrl?: string | null } | null } | null } | null;
};

export default async function PresentationsPage() {
    const data = await wpRequest<{ presentations: { nodes: WpNode[] } }>(GET_PRESENTATIONS, { first: 50 });
    const nodes = data.presentations?.nodes ?? [];

    const items = nodes.map((n) => ({
        id: n.id,
        title: n.title,
        cover: n.featuredImage?.node?.sourceUrl ?? undefined,
        alt: n.featuredImage?.node?.altText ?? "",
        pdf: n.presentationFields?.pdfFile?.node?.mediaItemUrl ?? undefined,
    }));

    return (
        <main className="flex flex-col min-h-screen bg-white">
            <Header />
            <section className="flex-1 py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-3xl font-bold mb-8">Все презентации</h1>
                    <PresentationsClient items={items} />
                </div>
            </section>
            <Footer />
        </main>
    );
}
