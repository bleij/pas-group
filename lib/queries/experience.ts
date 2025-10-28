export const GET_CASES = /* GraphQL */ `
  query GetCases($first: Int = 6, $after: String) {
    cases(
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
          node { sourceUrl altText }
        }
        caseFields {
          shortDescription
          fullDescription
        }
      }
    }
  }
`;

export type CaseNode = {
    id: string;
    slug: string;
    title: string;
    featuredImage?: {
        node?: { sourceUrl?: string | null; altText?: string | null } | null;
    } | null;
    caseFields?: {
        shortDescription?: string | null;
        fullDescription?: string | null;
    } | null;
};

export const GET_CASE_BY_SLUG = /* GraphQL */ `
  query GetCaseBySlug($slug: String!) {
    cases(where: { name: $slug }) {
      nodes {
        id
        slug
        title
        featuredImage {
          node { sourceUrl altText }
        }
        caseFields {
          shortDescription
          fullDescription
        }
      }
    }
  }
`;