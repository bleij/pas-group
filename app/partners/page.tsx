import {wpRequest} from "@/lib/wp-client";
import {GET_PARTNERS, PartnerNode} from "@/lib/queries/partners";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PartnersClient from "./PartnersClient";

export const revalidate = 60;

export default async function PartnersPage() {
    const data = await wpRequest<{ partners: { nodes: PartnerNode[] } }>(GET_PARTNERS);
    const partners = data.partners?.nodes ?? [];

    return (
        <main className="flex flex-col min-h-screen bg-white">
            <Header/>
            <PartnersClient partners={partners}/>
            <Footer/>
        </main>
    );
}