import {wpRequest} from "@/lib/wp-client";
import {GET_SERVICES} from "@/lib/queries/services";
import ServicesClient from "@/components/home/Services.client";
import type {ServiceNode} from "@/lib/queries/services";

export default async function Services() {
    const data = await wpRequest<{ services: { nodes: ServiceNode[] } }>(GET_SERVICES, {
        first: 100,
    });

    const nodes = data?.services?.nodes ?? [];

    // фильтрация по группам (slug должен совпадать с WP)
    const filterByGroup = (slug: string) =>
        nodes.filter((n) =>
            n.serviceGroups?.nodes?.some((group) => group.slug === slug)
        );

    const groups = [
        {
            title: "Услуги в сфере энергетики и автоматизации",
            items: filterByGroup("energy-automation"),
        },
        {
            title: "Услуги по созданию объектов обустройства месторождений с нулевого цикла «Под ключ»",
            items: filterByGroup("turnkey"),
        },
        {
            title: "Услуги по реконструкции и техническому перевооружению действующих объектов",
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
        <>
            <ServicesClient groups={groups}/>

        </>
    );
}