export interface Testimonial {
  /** Keep it under ~40 words; quotes that name an outcome read strongest. */
  quote: string;
  name: string;
  /** e.g. "Engineering Manager" */
  role: string;
  /** e.g. "Ramco Systems" */
  company: string;
  /** How they know you, e.g. "Managed me, 2023–25" or "Client on Freelancer.com" */
  relationship: string;
  /** Optional link to the original LinkedIn recommendation or Freelancer review */
  url?: string;
}

// Add entries by hand. The Testimonials section stays hidden until this has at least one item.
// Order: managers and colleagues first, freelance clients last.
export const testimonials: Testimonial[] = [];
