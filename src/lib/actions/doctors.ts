"use server";

import { createClient } from "@/lib/supabase/server";
import { Doctor, DoctorVacation } from "@/types";
import { revalidatePath } from "next/cache";

export async function getDoctors(): Promise<Doctor[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("doctors")
        .select("*")
        .order("sort_order", { ascending: true });

    if (error) {
        console.error("Error fetching doctors:", error);
        return [];
    }

    return data.map((item: any) => ({
        id: item.id,
        name: item.name,
        title: item.title,
        bio: item.bio,
        image: item.image_url,
        specializations: item.specializations || [],
        education: item.education,
        isActive: item.is_active,
        sortOrder: item.sort_order,
    }));
}

export async function createDoctor(doctor: Omit<Doctor, "id">) {
    const supabase = await createClient();
    const { error } = await supabase.from("doctors").insert({
        name: doctor.name,
        title: doctor.title,
        bio: doctor.bio,
        image_url: doctor.image,
        specializations: doctor.specializations,
        education: doctor.education,
        is_active: doctor.isActive ?? true,
        sort_order: doctor.sortOrder ?? 0,
    });

    if (error) throw new Error(error.message);
    revalidatePath("/", "layout");
}

export async function updateDoctor(id: string, doctor: Partial<Doctor>) {
    const supabase = await createClient();
    const updates: any = {};
    if (doctor.name !== undefined) updates.name = doctor.name;
    if (doctor.title !== undefined) updates.title = doctor.title;
    if (doctor.bio !== undefined) updates.bio = doctor.bio;
    if (doctor.image !== undefined) updates.image_url = doctor.image;
    if (doctor.specializations !== undefined) updates.specializations = doctor.specializations;
    if (doctor.education !== undefined) updates.education = doctor.education;
    if (doctor.isActive !== undefined) updates.is_active = doctor.isActive;
    if (doctor.sortOrder !== undefined) updates.sort_order = doctor.sortOrder;

    const { error } = await supabase.from("doctors").update(updates).eq("id", id);
    if (error) throw new Error(error.message);
    revalidatePath("/", "layout");
}

export async function deleteDoctor(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("doctors").delete().eq("id", id);
    if (error) throw new Error(error.message);
    revalidatePath("/", "layout");
}

// Vacation Management

export async function getDoctorVacations(doctorId: string): Promise<DoctorVacation[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("doctor_vacations")
        .select("*")
        .eq("doctor_id", doctorId)
        .order("start_date", { ascending: true });

    if (error) {
        console.error("Error fetching vacations:", error);
        return [];
    }

    return data.map((item: any) => ({
        id: item.id,
        doctorId: item.doctor_id,
        startDate: item.start_date,
        endDate: item.end_date,
        reason: item.reason,
    }));
}

export async function addDoctorVacation(vacation: Omit<DoctorVacation, "id">) {
    const supabase = await createClient();

    // 1. Insert Vacation
    const { error } = await supabase.from("doctor_vacations").insert({
        doctor_id: vacation.doctorId,
        start_date: vacation.startDate,
        end_date: vacation.endDate,
        reason: vacation.reason,
    });

    if (error) throw new Error(error.message);

    // 2. Remove availability slots during vacation
    const { error: slotError } = await supabase
        .from("availability_slots")
        .delete()
        .eq("doctor_id", vacation.doctorId)
        .gte("slot_date", vacation.startDate)
        .lte("slot_date", vacation.endDate);

    if (slotError) {
        console.error("Error removing slots for vacation:", slotError);
        // We don't throw here to avoid rolling back vacation if slots fail (though transaction would be better)
    }

    revalidatePath("/", "layout");
}

export async function deleteDoctorVacation(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("doctor_vacations").delete().eq("id", id);
    if (error) throw new Error(error.message);
    revalidatePath("/", "layout");
}
