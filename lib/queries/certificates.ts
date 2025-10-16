// lib/queries/certificates.ts
export const GET_CERTIFICATES = `
  query GetCertificates($first: Int = 4, $after: String) {
    certificates(
      first: $first
      after: $after
      where: { orderby: { field: DATE, order: DESC } }
    ) {
      nodes {
        id
        title
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails { width height }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export type CertificateNode = {
    id: string;
    title?: string | null;
    featuredImage?: {
        node?: {
            sourceUrl?: string | null;
            altText?: string | null;
            mediaDetails?: { width?: number | null; height?: number | null } | null;
        } | null;
    } | null;
};

export type CertificatesResp = {
    certificates: {
        nodes: CertificateNode[];
        pageInfo: { endCursor?: string | null; hasNextPage: boolean };
    };
};
