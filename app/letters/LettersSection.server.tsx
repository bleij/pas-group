import {wpRequest} from "@/lib/wp-client";
import {GET_LETTERS} from "@/lib/queries/letters";
import type {LetterNode} from "@/lib/queries/letters";
import LettersModal from "./LettersModal.client";

export const revalidate = 60;

export default async function LettersSection() {
    const data = await wpRequest<{ letters: { nodes: LetterNode[] } }>(
        GET_LETTERS,
        {first: 40}
    );
    const letters = data?.letters?.nodes ?? [];

    return (
        <section className="w-full py-16">
            <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Отзывы</h1>
                <div className="h-1 w-16 bg-[#009999] mb-8"></div>

                <LettersModal letters={letters}/>
            </div>
        </section>
    );
}