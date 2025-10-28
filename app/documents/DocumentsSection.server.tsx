import {wpRequest} from "@/lib/wp-client";
import {GET_DOCUMENTS} from "@/lib/queries/documents";
import type {DocumentNode} from "@/lib/queries/documents";
import DocumentsModal from "./DocumentsModal.client";

export const revalidate = 60;

export default async function DocumentsSection() {
    const data = await wpRequest<{ documents: { nodes: DocumentNode[] } }>(
        GET_DOCUMENTS,
        {first: 40}
    );
    const documents = data?.documents?.nodes ?? [];

    return (
        <section className="w-full py-16">
            <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Документация</h1>
                <div className="h-1 w-16 bg-[#009999] mb-8"></div>

                <DocumentsModal documents={documents}/>
            </div>
        </section>
    );
}