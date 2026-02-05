export interface Patient {
    id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: string;
}

export interface Service {
    id: string;
    title: string;
    description: string;
    duration: number;
    price: number;
    image?: string;
    icon?: string;
    isActive?: boolean;
    sortOrder?: number;
}

export interface Doctor {
    id: string;
    name: string;
    title: string;
    bio: string;
    image?: string;
    specializations: string[];
    education?: string;
    isActive?: boolean;
    sortOrder?: number;
}

export interface AvailabilitySlot {
    id: string;
    doctorId: string;
    slotDate: string;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
}

export interface Appointment {
    id: string;
    patientId: string;
    serviceId: string;
    doctorId?: string;
    appointmentDate: string;
    appointmentTime: string;
    status: AppointmentStatus;
    notes?: string;
    createdAt: string;
    // Joined data
    patient?: Patient;
    service?: Service;
    doctor?: Doctor;
}

export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featuredImage?: string;
    tags: string[];
    isPublished: boolean;
    publishedAt?: string;
    author?: string;
    createdAt: string;
}

export interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}

export interface BookingFormData {
    serviceId: string;
    doctorId?: string;
    date: string;
    time: string;
    patientName: string;
    patientEmail: string;
    patientPhone: string;
    notes?: string;
}

export interface AdminUser {
    id: string;
    email: string;
    role: "admin" | "staff";
    createdAt: string;
}

export interface TimeSlot {
    time: string;
    available: boolean;
}

export interface DayAvailability {
    date: string;
    slots: TimeSlot[];
}
