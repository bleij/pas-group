export const GET_PARTNERS = `
  query GetPartners {
    partners(first: 100, where: {orderby: {field: TITLE, order: ASC}}) {
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

export type PartnerNode = {
    id: string;
    title: string;
    featuredImage?: {
        node?: {
            sourceUrl?: string | null;
            altText?: string | null;
        } | null;
    } | null;
};
