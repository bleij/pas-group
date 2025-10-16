"use server";

import {wpRequest} from "@/lib/wp-client";
import {GET_SOLUTIONS, SolutionNode} from "@/lib/queries/solutions";
import SolutionsClient from "./Solutions.client";

export default async function Solutions() {
    const data = await wpRequest<{ solutions: { nodes: SolutionNode[] } }>(
        GET_SOLUTIONS
    );

    const items = data?.solutions?.nodes ?? [];

    return <SolutionsClient solutions={items}/>;
}
