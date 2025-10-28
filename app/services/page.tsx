// app/services/page.tsx
import Header from "@/components/layout/Header";
import {wpRequest} from "@/lib/wp-client";
import {GET_SERVICES} from "@/lib/queries/services";
import type {ServiceNode} from "@/lib/queries/services";

// основной блок услуг
import ServicesClient from "@/components/home/Services.client";

// секции как на лендинге
import Solutions from "@/components/home/Solutions.server";
import Experience from "@/components/home/Experience.server";
import Letters from "@/components/home/Letters.server";
import Documents from "@/components/home/Documents.server";
import Contact from "@/components/home/Contact";
import Footer from "@/components/layout/Footer";

export const metadata = {
    title: "Услуги | PAS Group",
    description:
        "Полный спектр услуг в области энергетики, автоматизации и проектирования. PAS Group — 29+ лет опыта и надёжности.",
};

export default async function ServicesPage() {
    // получаем услуги из WP
    const data = await wpRequest<{ services: { nodes: ServiceNode[] } }>(
        GET_SERVICES,
        {first: 100}
    );
    const nodes = data?.services?.nodes ?? [];

    // фильтрация по slug
    const filterByGroup = (slug: string) =>
        nodes.filter((n) =>
            n.serviceGroups?.nodes?.some((group) => group.slug === slug)
        );

    // категории услуг
    const groups = [
        {
            title: "Услуги в сфере энергетики и автоматизации",
            items: filterByGroup("energy-automation"),
        },
        {
            title:
                "Услуги по созданию объектов обустройства месторождений с нулевого цикла «Под ключ»",
            items: filterByGroup("turnkey"),
        },
        {
            title:
                "Услуги по реконструкции и техническому перевооружению действующих объектов, обустройства месторождений и производственных объектов",
            items: filterByGroup("reconstruction"),
        },
        {
            title: "Услуги по техническому обслуживанию",
            items: filterByGroup("maintenance"),
        },
        {
            title: "Другие услуги",
            items: filterByGroup("other-services"),
        },
    ];

    return (
        <main className="flex min-h-screen flex-col">
            {/* стандартный хедер (не прозрачный) */}
            <Header/>

            {/* блок услуг */}
            <ServicesClient groups={groups}/>

            {/* остальные секции из лендинга */}
            <Solutions/>
            <Experience/>
            <Letters/>
            <Documents/>
            <Contact/>
            <Footer/>
        </main>
    );
}