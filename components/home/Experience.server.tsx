// components/home/Experience.server.tsx
import {wpRequest} from "@/lib/wp-client";
import {GET_CASES, CaseNode} from "@/lib/queries/experience";
import ExperienceClient from "./Experience.client";

export const revalidate = 60;

export default async function Experience() {
    const data = await wpRequest<{ cases: { nodes: CaseNode[] } }>(GET_CASES);
    const items = data.cases?.nodes ?? [];

    return <ExperienceClient items={items}/>;
}
