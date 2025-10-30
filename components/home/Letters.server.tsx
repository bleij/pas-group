import {wpRequest} from "@/lib/wp-client";
import {GET_LETTERS} from "@/lib/queries/letters";
import LettersClient from "@/components/home/Letters.client";

// типизация одной записи письма
interface LetterNode {
    id: string;
    title: string;
    content?: string;
    excerpt?: string;
    date?: string;
    featuredImage?: {
        node?: {
            sourceUrl?: string;
            altText?: string;
        };
    };
}

export default async function Letters() {
    const data = await wpRequest<{ letters: { nodes: LetterNode[] } }>(GET_LETTERS);
    const letters = data?.letters?.nodes ?? [];

    return <LettersClient letters={letters}/>;
}