// lib/queries/services.ts

export const GET_ALL_SERVICES = `
  query GetAllServices {
    services(first: 100) {
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
            slug
            name
          }
        }
        serviceFields {
          shortDescription
          fullDescription
        }
      }
    }
  }
`;
