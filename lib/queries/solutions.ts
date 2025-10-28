// lib/queries/solutions.ts

export const GET_SOLUTIONS = /* GraphQL */ `
  query GetSolutions($first: Int = 6, $after: String) {
    solutions(
      first: $first
      after: $after
      where: { orderby: { field: DATE, order: DESC }, status: PUBLISH }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        slug
        title
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        solutionFields {
          shortDescription
          fullDescription
          mainImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  }
`;

export type SolutionNode = {
    id: string;
    slug: string;
    title: string;
    featuredImage?: {
        node?: {
            sourceUrl?: string | null;
            altText?: string | null;
        } | null;
    } | null;
    solutionFields?: {
        shortDescription?: string | null;
        fullDescription?: string | null;
        mainImage?: {
            node?: { sourceUrl?: string | null; altText?: string | null } | null;
        } | null;
    } | null;
};

export const GET_SOLUTION_BY_SLUG = /* GraphQL */ `
  query GetSolutionBySlug($slug: String!) {
    solutions(where: { name: $slug }) {
      nodes {
        id
        slug
        title
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        solutionFields {
          shortDescription
          fullDescription
          mainImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  }
`;