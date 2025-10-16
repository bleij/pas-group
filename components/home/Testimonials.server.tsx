import {wpRequest} from "@/lib/wp-client";
import TestimonialsClient from "./Testimonials.client";
import {GET_TESTIMONIALS, TestimonialNode} from "@/lib/queries/testimonials";
import {GET_LETTERS, LetterNode} from "@/lib/queries/letters";

export default async function Testimonials() {
    const [{testimonials}, {letters}] = await Promise.all([
        wpRequest<{ testimonials: { nodes: TestimonialNode[] } }>(GET_TESTIMONIALS),
        wpRequest<{ letters: { nodes: LetterNode[] } }>(GET_LETTERS),
    ]);

    return (
        <TestimonialsClient
            testimonials={testimonials?.nodes ?? []}
            letters={letters?.nodes ?? []}
        />
    );
}
