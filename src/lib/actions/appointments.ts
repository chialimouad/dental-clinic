"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createAppointment(data: {
    patient_name: string;
    patient_email: string;
    patient_phone: string;
    service_id: string;
    doctor_id?: string;
    appointment_date: string;
    appointment_time: string;
    notes?: string;
}) {
    const supabase = await createClient();

    try {
        const { data: result, error } = await supabase
            .from("appointments")
            .insert([
                {
                    patient_name: data.patient_name,
                    patient_email: data.patient_email,
                    patient_phone: data.patient_phone,
                    service_id: data.service_id,
                    doctor_id: data.doctor_id || null,
                    appointment_date: data.appointment_date,
                    appointment_time: data.appointment_time,
                    notes: data.notes,
                    status: "pending",
                },
            ])
            .select()
            .single();

        if (error) {
            console.error("Error creating appointment:", error);
            return { success: false, error: error.message };
        }

        return { success: true, data: result };
    } catch (error) {
        console.error("Unexpected error:", error);
        return { success: false, error: "Failed to create appointment" };
    }
}

export async function getAppointments() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("appointments")
        .select(`
            *,
            service:services(title),
            doctor:doctors(name)
        `)
        .order("appointment_date", { ascending: false })
        .order("appointment_time", { ascending: true });

    if (error) {
        console.error("Error fetching appointments:", error);
        return [];
    }

    return data;
}

export async function getTodaysAppointments() {
    const supabase = await createClient();
    const today = new Date().toISOString().split("T")[0];

    // Note: This relies on server timezone. Ideally use client timezone or UTC handling.
    // For simplicity, fetching directly.

    const { data, error } = await supabase
        .from("appointments")
        .select(`
            *,
            service:services(title),
            doctor:doctors(name)
        `)
        .eq("appointment_date", today)
        .order("appointment_time", { ascending: true });

    if (error) {
        console.error("Error fetching today's appointments:", error);
        return [];
    }

    return data;
}

export async function updateAppointmentStatus(id: string, status: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("appointments")
        .update({ status })
        .eq("id", id);

    if (error) {
        console.error("Error updating appointment:", error);
        return { success: false, error: error.message };
    }

    revalidatePath("/admin");
    revalidatePath("/admin/appointments");
    return { success: true };
}

export async function getDashboardStats() {
    const supabase = await createClient();
    const today = new Date().toISOString().split("T")[0];

    // Parallel fetch for efficiency
    const [
        { count: todayCount, error: todayError },
        { count: totalPatients, error: patientError },
        { data: completedToday, error: completedError }
    ] = await Promise.all([
        supabase
            .from("appointments")
            .select("*", { count: "exact", head: true })
            .eq("appointment_date", today),

        supabase
            .from("appointments") // Approximating patients by unique appointments for now or use patients table if sync
            .select("patient_email", { count: "exact", head: true }),
        // Better: select count from patients table if used. 
        // The booking creates an appointment, not necessarily a patient record in 'patients' table automatically unless triggered.
        // But let's assume 'stats' usually come from the main tables.

        supabase
            .from("appointments")
            .select("id")
            .eq("appointment_date", today)
            .eq("status", "completed")
    ]);

    // Simple revenue calc (mock logic for now as we don't sum price yet easily without aggregation function or fetching all)
    // We can fetch all completed appointments for month and sum price.
    // For now, let's return basic counts.

    return {
        todayAppointments: todayCount || 0,
        totalPatients: totalPatients || 0,
        completedToday: completedToday?.length || 0,
    };
}
