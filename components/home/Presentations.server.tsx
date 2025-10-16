import {wpRequest} from "@/lib/wp-client";
import {GET_PRESENTATIONS} from "@/lib/queries/presentations";
import PresentationsClient from "./Presentations.client";

type WpNode = {
    id: string;
    title: string;
    featuredImage?: { node?: { sourceUrl?: string | null; altText?: string | null } | null } | null;
    presentationFields?: { pdfFile?: { node?: { mediaItemUrl?: string | null } | null } | null } | null;
};

export default async function PresentationsServer({limit = 3}: { limit?: number }) {
    const data = await wpRequest<{ presentations: { nodes: WpNode[] } }>(GET_PRESENTATIONS, {first: limit});
    const nodes = data.presentations?.nodes ?? [];

    const items = nodes.map((n) => ({
        id: n.id,
        title: n.title,
        cover: n.featuredImage?.node?.sourceUrl ?? undefined,
        alt: n.featuredImage?.node?.altText ?? "",
        pdf: n.presentationFields?.pdfFile?.node?.mediaItemUrl ?? undefined,
    }));

    return <PresentationsClient items={items} showMoreHref="/presentations"/>;
}
