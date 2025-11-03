import {NextResponse} from "next/server";
import {wpRequest} from "@/lib/wp-client";

export async function GET() {
    try {
        const query = /* GraphQL */ `
      query GetNewsCategories {
        newsCategories {
          nodes {
            name
          }
        }
      }
    `;

        const data = await wpRequest<{ newsCategories?: { nodes?: { name: string }[] } }>(query);
        const categories = data?.newsCategories?.nodes?.map((n) => n.name) ?? [];

        // добавляем "Все" в начало
        return NextResponse.json(["Все", ...categories]);
    } catch (error) {
        console.error("API /api/news-categories error:", error);
        return NextResponse.json(["Все"], {status: 500});
    }
}