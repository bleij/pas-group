export const GET_SOLUTIONS = `
  query GetSolutions {
    solutions {
      nodes {
        id
        slug
        title
        featuredImage {
          node { sourceUrl altText }
        }
        solutionFields {
          shortDescription
          fullDescription
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
        node?: { sourceUrl?: string | null; altText?: string | null } | null;
    } | null;
    solutionFields?: {
        shortDescription?: string | null;
        fullDescription?: string | null;
    } | null;
};
