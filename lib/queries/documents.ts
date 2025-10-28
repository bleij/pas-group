export const GET_DOCUMENTS = `
  query GetDocuments($first: Int = 100) {
    documents(first: $first) {
      nodes {
        id
        title
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export type DocumentNode = {
    id: string;
    title: string;
    featuredImage?: {
        node?: { sourceUrl?: string | null; altText?: string | null } | null;
    } | null;
};