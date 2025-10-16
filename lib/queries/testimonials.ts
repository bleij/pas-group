export const GET_TESTIMONIALS = `
  query GetTestimonials($first: Int = 3) {
    testimonials(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
        testimonialFields {
          reviewBody
        }
      }
    }
  }
`;

export type TestimonialNode = {
    id: string;
    title: string;
    testimonialFields?: {
        reviewBody?: string | null;
    } | null;
};
