import {wpRequest} from "@/lib/wp-client";
import {GET_LETTERS} from "@/lib/queries/letters";
import LettersClient from "@/components/home/Letters.client";

export default async function Letters() {
    const data = await wpRequest<{ letters: { nodes: any[] } }>(GET_LETTERS);
    const letters = data?.letters?.nodes ?? [];

    return <LettersClient letters={letters}/>;
}