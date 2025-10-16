import {wpRequest} from "@/lib/wp-client";
import {GET_PARTNERS, PartnerNode} from "@/lib/queries/partners";
import PartnersClient from "./Partners.client";

export default async function Partners() {
    const data = await wpRequest<{ partners: { nodes: PartnerNode[] } }>(GET_PARTNERS);
    const partners = data.partners?.nodes ?? [];

    return <PartnersClient partners={partners}/>;
}
