import { getTestimonials } from "@/lib/actions/testimonials";
import TestimonialsClient from "./testimonials-client";

export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
    const testimonials = await getTestimonials();
    return <TestimonialsClient initialTestimonials={testimonials} />;
}
