import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {wpRequest} from "@/lib/wp-client";
import {GET_SOLUTIONS} from "@/lib/queries/solutions";
import SolutionsIndexClient from "@/components/solutions/SolutionsIndex.client";

// описываем типы для данных с бэка
interface SolutionNode {
    id: string;
    slug: string;
    title: string;
    featuredImage?: {
        node?: {
            sourceUrl?: string;
            altText?: string;
        };
    };
    solutionFields?: {
        shortDescription?: string;
    };
}

interface SolutionsQueryResponse {
    solutions?: {
        nodes?: SolutionNode[];
    };
}

export default async function SolutionsPage() {
    const data: SolutionsQueryResponse = await wpRequest(GET_SOLUTIONS, {first: 12});
    const nodes = data?.solutions?.nodes ?? [];

    // типизированное преобразование
    const posts = nodes.map((n) => ({
        id: n.id,
        slug: n.slug,
        title: n.title,
        image: n.featuredImage?.node?.sourceUrl,
        alt: n.featuredImage?.node?.altText,
        excerpt: n.solutionFields?.shortDescription,
    }));

    return (
        <>
            <Header/>

            <main className="max-w-7xl mx-auto px-6 py-12">
                <nav className="text-sm text-gray-500 mb-5">
                    Главная <span className="mx-1">/</span> Решения
                </nav>

                <h1 className="text-2xl md:text-3xl font-bold mb-10">Отраслевые решения</h1>

                <SolutionsIndexClient posts={posts}/>
            </main>

            <Footer/>
        </>
    );
}