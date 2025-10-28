export const GET_SERVICES = /* GraphQL */ `
  query GetServices($first: Int = 100) {
    services(
      first: $first
      where: { orderby: { field: DATE, order: DESC }, status: PUBLISH }
    ) {
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
        serviceGroups {
          nodes {
            id
            name
            slug
          }
        }
        serviceFields {
          shortDescription
          fullDescription
          serviceIcon {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

export const GET_SERVICE_BY_SLUG = /* GraphQL */ `
  query GetServiceBySlug($slug: String!) {
    services(where: { name: $slug }) {
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
        serviceFields {
          shortDescription
          fullDescription
          serviceIcon {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

export type ServiceNode = {
    id: string;
    slug: string;
    title: string;
    featuredImage?: {
        node?: { sourceUrl?: string | null; altText?: string | null } | null;
    } | null;
    serviceGroups?: {
        nodes?: { id: string; name: string; slug: string }[];
    } | null;
    serviceFields?: {
        shortDescription?: string | null;
        fullDescription?: string | null;
        serviceIcon?: {
            node?: { sourceUrl?: string | null } | null;
        } | null;
    } | null;
};