// lib/queries/news.ts

export type NewsIndexNode = {
    id: string;
    slug: string;
    title: string;
    date: string;
    featuredImage?: {
        node?: { sourceUrl?: string | null; altText?: string | null } | null;
    } | null;
    newsCategories?: { nodes: { name: string; slug: string }[] } | null;
    newsFields?: {
        shortDescription?: string | null;
        mainImage?: { node?: { sourceUrl?: string | null; altText?: string | null } | null } | null;
        contentFull?: string | null;
    } | null;
};

/* для ГЛАВНОЙ (3 карточки). Есть fallback на mainImage */
export const GET_NEWS = /* GraphQL */ `
  query GetNews($first: Int = 3) {
    allNews(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        slug
        title
        date
        featuredImage { node { sourceUrl altText } }
        newsFields {
          shortDescription
          mainImage { node { sourceUrl altText } }
        }
        newsCategories { nodes { name slug } }
      }
    }
  }
`;

/* для СТРАНИЦЫ /news (лента). Берём только featuredImage в карточку */
export const GET_NEWS_INDEX = /* GraphQL */ `
  query GetNewsIndex($first: Int = 6, $after: String) {
    allNews(
      first: $first
      after: $after
      where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        slug
        title
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        newsFields {
          shortDescription
        }
        newsCategories {
          nodes {
            name
          }
        }
      }
    }
  }
`;

/* для ДЕТАЛЬНОЙ страницы /news/[slug] */
export const GET_POST_BY_SLUG = /* GraphQL */ `
  query GetPostBySlug($slug: String!) {
    allNews(where: { name: $slug }) {
      nodes {
        id
        slug
        title
        date
        featuredImage { node { sourceUrl altText } }
        newsFields {
          shortDescription
          contentFull
          mainImage { node { sourceUrl altText } }
        }
        newsCategories { nodes { name slug } }
      }
    }
  }
`;