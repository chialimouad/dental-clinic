"use server";

import { createClient } from "@/lib/supabase/server";
import { Service } from "@/types";
import { revalidatePath } from "next/cache";

export async function getServices(): Promise<Service[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("sort_order", { ascending: true });

    if (error) {
        console.error("Error fetching services:", error);
        return [];
    }

    return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        duration: item.duration,
        price: item.price,
        image: item.image_url,
        icon: item.icon,
        isActive: item.is_active,
        sortOrder: item.sort_order,
    }));
}

export async function createService(service: Omit<Service, "id">) {
    const supabase = await createClient();
    const { error } = await supabase.from("services").insert({
        title: service.title,
        description: service.description,
        duration: service.duration,
        price: service.price,
        image_url: service.image,
        icon: service.icon,
        is_active: service.isActive ?? true,
        sort_order: service.sortOrder ?? 0,
    });

    if (error) throw new Error(error.message);
    revalidatePath("/", "layout");
}

export async function updateService(id: string, service: Partial<Service>) {
    const supabase = await createClient();
    const updates: any = {};
    if (service.title !== undefined) updates.title = service.title;
    if (service.description !== undefined) updates.description = service.description;
    if (service.duration !== undefined) updates.duration = service.duration;
    if (service.price !== undefined) updates.price = service.price;
    if (service.image !== undefined) updates.image_url = service.image;
    if (service.icon !== undefined) updates.icon = service.icon;
    if (service.isActive !== undefined) updates.is_active = service.isActive;
    if (service.sortOrder !== undefined) updates.sort_order = service.sortOrder;

    const { error } = await supabase.from("services").update(updates).eq("id", id);
    if (error) throw new Error(error.message);
    revalidatePath("/", "layout");
}

export async function deleteService(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) throw new Error(error.message);
    revalidatePath("/", "layout");
}
