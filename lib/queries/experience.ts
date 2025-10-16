// lib/queries/experience.ts
export const GET_CASES = /* GraphQL */ `
  query GetCases {
    cases(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
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
