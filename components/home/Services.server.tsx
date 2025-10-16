// components/home/Services.server.tsx
import {wpRequest} from "@/lib/wp-client";
import {GET_ALL_SERVICES} from "@/lib/queries/services";
import ServicesClient from "./Services.client";

export default async function Services() {
    const result = await wpRequest<{ services: { nodes: any[] } }>(GET_ALL_SERVICES);
    const nodes = result?.services?.nodes ?? [];

    const groups = [
        {
            title: "Услуги в сфере энергетики и автоматизации",
            items: nodes.filter((s) =>
                s.serviceGroups?.nodes?.some((g: any) => g.slug === "energy-automation")
            ),
        },
        {
            title:
                "Услуги по созданию объектов обустройства месторождений с нулевого цикла «Под ключ»",
            items: nodes.filter((s) =>
                s.serviceGroups?.nodes?.some((g: any) => g.slug === "turnkey")
            ),
        },
    ];

    return <ServicesClient groups={groups}/>;
}
