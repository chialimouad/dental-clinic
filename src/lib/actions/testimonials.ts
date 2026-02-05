"use server";

import { createClient } from "@/lib/supabase/server";
import { Testimonial } from "@/types";
import { revalidatePath } from "next/cache";

function mapTestimonial(item: any): Testimonial {
    return {
        id: item.id,
        name: item.name,
        text: item.text,
        rating: item.rating,
        treatment: item.treatment,
        image: item.image_url,
        isActive: item.is_active,
        date: item.created_at,
    };
}

export async function getTestimonials(): Promise<Testimonial[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching testimonials:", error);
        return [];
    }

    return data.map(mapTestimonial);
}

export async function createTestimonial(testimonial: Omit<Testimonial, "id" | "date">) {
    const supabase = await createClient();
    const { error } = await supabase.from("testimonials").insert({
        name: testimonial.name,
        text: testimonial.text,
        rating: testimonial.rating,
        treatment: testimonial.treatment,
        image_url: testimonial.image,
        is_active: testimonial.isActive ?? true,
    });

    if (error) throw new Error(error.message);
    revalidatePath("/", "layout");
}

export async function updateTestimonial(id: string, testimonial: Partial<Testimonial>) {
    const supabase = await createClient();
    const updates: any = {};
    if (testimonial.name !== undefined) updates.name = testimonial.name;
    if (testimonial.text !== undefined) updates.text = testimonial.text;
    if (testimonial.rating !== undefined) updates.rating = testimonial.rating;
    if (testimonial.treatment !== undefined) updates.treatment = testimonial.treatment;
    if (testimonial.image !== undefined) updates.image_url = testimonial.image;
    if (testimonial.isActive !== undefined) updates.is_active = testimonial.isActive;

    const { error } = await supabase.from("testimonials").update(updates).eq("id", id);
    if (error) throw new Error(error.message);
    revalidatePath("/", "layout");
}

export async function deleteTestimonial(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) throw new Error(error.message);
    revalidatePath("/", "layout");
}
