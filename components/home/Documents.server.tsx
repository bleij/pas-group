// components/home/Documents.server.tsx
import {wpRequest} from "@/lib/wp-client";
import {GET_DOCUMENTS} from "@/lib/queries/documents";
import type {DocumentNode} from "@/lib/queries/documents";
import DocumentsClient from "./Documents.client";

export default async function Documents() {
    const data = await wpRequest<{ documents: { nodes: DocumentNode[] } }>(
        GET_DOCUMENTS,
        {first: 16}
    );

    const items = data?.documents?.nodes ?? [];
    return <DocumentsClient items={items}/>;
}