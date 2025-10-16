import {wpRequest} from "@/lib/wp-client";
import {GET_PARTNERS, PartnerNode} from "@/lib/queries/partners";
import Image from "next/image";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const revalidate = 60;

export default async function PartnersPage() {
    const data = await wpRequest<{ partners: { nodes: PartnerNode[] } }>(GET_PARTNERS);
    const partners = data.partners?.nodes ?? [];

    return (
        <main className="flex flex-col min-h-screen bg-white">
            <Header/>

            <section className="flex-1 py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-3xl font-bold mb-8">Наши партнёры</h1>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
                        {partners.map((p) =>
                            p.featuredImage?.node?.sourceUrl ? (
                                <div key={p.id} className="flex items-center justify-center">
                                    <Image
                                        src={p.featuredImage.node.sourceUrl}
                                        alt={p.featuredImage.node.altText || p.title}
                                        width={200}
                                        height={100}
                                        className="object-contain max-h-24"
                                    />
                                </div>
                            ) : null
                        )}
                    </div>
                </div>
            </section>

            <Footer/>
        </main>
    );
}
