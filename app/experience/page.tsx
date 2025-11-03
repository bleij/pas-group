import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {wpRequest} from "@/lib/wp-client";
import {GET_CASES, type CaseNode} from "@/lib/queries/experience";
import ExperienceIndexClient from "@/components/experience/ExperienceIndex.client";
import SubscribeCard from "@/components/shared/SubscribeCard";

export const revalidate = 60;

export default async function ExperiencePage() {
    const data = await wpRequest<{ cases: { nodes: CaseNode[] } }>(GET_CASES, {first: 50});
    const nodes = data?.cases?.nodes ?? [];

    const posts = nodes.map((p) => {
        const raw = p.featuredImage?.node?.sourceUrl || "";
        const image = raw && !raw.includes("%") ? encodeURI(raw) : raw || undefined;

        return {
            id: p.id,
            slug: p.slug,
            title: p.title,
            image,
            alt: p.featuredImage?.node?.altText || p.title,
            excerpt: p.caseFields?.shortDescription || "",
        };
    });

    return (
        <main className="flex min-h-screen flex-col">
            <Header/>

            <section className="w-full bg-white py-10 md:py-12">
                <div className="max-w-7xl mx-auto px-6">
                    {/* хлебные крошки */}
                    <div className="text-sm text-gray-500 mb-5">
                        Главная <span className="mx-1">/</span> Наш опыт
                    </div>

                    <h1 className="text-2xl md:text-3xl font-bold mb-6">Наш опыт</h1>

                    {/* клиентская часть */}
                    <ExperienceIndexClient posts={posts}/>
                </div>
            </section>

            {/* 🔹 форма подписки внизу — только на мобильных */}
            <div className="block lg:hidden max-w-7xl mx-auto px-6 mb-12">
                <SubscribeCard/>
            </div>

            <Footer/>
        </main>
    );
}