export const GET_PRESENTATIONS = `
  query GetPresentations($first: Int = 10) {
    presentations(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
        featuredImage {
          node { sourceUrl altText }
        }
        presentationFields {
          pdfFile {
            node { mediaItemUrl }
          }
        }
      }
    }
  }
`;
