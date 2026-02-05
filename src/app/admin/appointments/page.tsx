"use client";

import { useState } from "react";
import { Card, Button, Badge, Input, Select, Modal } from "@/components/ui";
import { format } from "date-fns";
import {
    Search,
    Filter,
    Calendar,
    Clock,
    User,
    MoreVertical,
    CheckCircle,
    XCircle,
    Eye,
    Trash2,
} from "lucide-react";

// Mock appointments data
const mockAppointments = [
    {
        id: "1",
        patient: { name: "Jennifer Adams", email: "jennifer@example.com", phone: "(555) 123-4567" },
        service: "Teeth Whitening",
        doctor: "Dr. Sarah Mitchell",
        date: "2024-02-05",
        time: "09:00",
        status: "confirmed",
        notes: "First-time patient, requested gentle treatment",
    },
    {
        id: "2",
        patient: { name: "Robert Martinez", email: "robert@example.com", phone: "(555) 234-5678" },
        service: "General Checkup",
        doctor: "Dr. Sarah Mitchell",
        date: "2024-02-05",
        time: "10:30",
        status: "completed",
        notes: "",
    },
    {
        id: "3",
        patient: { name: "Sarah Kim", email: "sarah@example.com", phone: "(555) 345-6789" },
        service: "Dental Cleaning",
        doctor: "Dr. Emily Rodriguez",
        date: "2024-02-05",
        time: "11:30",
        status: "pending",
        notes: "Pediatric patient - child is 8 years old",
    },
    {
        id: "4",
        patient: { name: "David Wilson", email: "david@example.com", phone: "(555) 456-7890" },
        service: "Root Canal",
        doctor: "Dr. Michael Thompson",
        date: "2024-02-06",
        time: "14:00",
        status: "confirmed",
        notes: "Has dental anxiety, may need sedation",
    },
    {
        id: "5",
        patient: { name: "Emily Chen", email: "emily@example.com", phone: "(555) 567-8901" },
        service: "Orthodontics Consultation",
        doctor: "Dr. James Chen",
        date: "2024-02-06",
        time: "15:30",
        status: "pending",
        notes: "Interested in Invisalign",
    },
    {
        id: "6",
        patient: { name: "Michael Brown", email: "michael@example.com", phone: "(555) 678-9012" },
        service: "Dental Implant",
        doctor: "Dr. Michael Thompson",
        date: "2024-02-07",
        time: "09:30",
        status: "confirmed",
        notes: "Follow-up from initial consultation",
    },
    {
        id: "7",
        patient: { name: "Lisa Anderson", email: "lisa@example.com", phone: "(555) 789-0123" },
        service: "Cosmetic Consultation",
        doctor: "Dr. Sarah Mitchell",
        date: "2024-02-07",
        time: "11:00",
        status: "cancelled",
        notes: "Patient rescheduled due to work conflict",
    },
];

const statusColors: Record<string, "success" | "primary" | "warning" | "error" | "default"> = {
    completed: "success",
    confirmed: "primary",
    pending: "warning",
    cancelled: "error",
};

export default function AppointmentsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedAppointment, setSelectedAppointment] = useState<typeof mockAppointments[0] | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const filteredAppointments = mockAppointments.filter((apt) => {
        const matchesSearch =
            apt.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            apt.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
            apt.doctor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || apt.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleViewDetails = (appointment: typeof mockAppointments[0]) => {
        setSelectedAppointment(appointment);
        setShowDetailsModal(true);
    };

    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(":");
        const hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? "PM" : "AM";
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Appointments</h1>
                    <p className="text-neutral-500">
                        Manage and view all patient appointments
                    </p>
                </div>
                <Button variant="primary">+ New Appointment</Button>
            </div>

            {/* Filters */}
            <Card className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <Input
                            placeholder="Search by patient, service, or doctor..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            leftIcon={<Search className="h-5 w-5" />}
                        />
                    </div>
                    <Select
                        options={[
                            { value: "all", label: "All Status" },
                            { value: "pending", label: "Pending" },
                            { value: "confirmed", label: "Confirmed" },
                            { value: "completed", label: "Completed" },
                            { value: "cancelled", label: "Cancelled" },
                        ]}
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    />
                </div>
            </Card>

            {/* Appointments Table */}
            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-neutral-50">
                            <tr className="border-b border-neutral-200">
                                <th className="text-left py-4 px-6 text-sm font-medium text-neutral-500">
                                    Patient
                                </th>
                                <th className="text-left py-4 px-6 text-sm font-medium text-neutral-500">
                                    Service
                                </th>
                                <th className="text-left py-4 px-6 text-sm font-medium text-neutral-500">
                                    Date & Time
                                </th>
                                <th className="text-left py-4 px-6 text-sm font-medium text-neutral-500">
                                    Doctor
                                </th>
                                <th className="text-left py-4 px-6 text-sm font-medium text-neutral-500">
                                    Status
                                </th>
                                <th className="text-right py-4 px-6 text-sm font-medium text-neutral-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAppointments.map((appointment) => (
                                <tr
                                    key={appointment.id}
                                    className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors"
                                >
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-200 to-secondary-200 flex items-center justify-center text-primary-700 font-bold">
                                                {appointment.patient.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-neutral-900">
                                                    {appointment.patient.name}
                                                </p>
                                                <p className="text-sm text-neutral-500">
                                                    {appointment.patient.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-neutral-700">
                                        {appointment.service}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex flex-col">
                                            <span className="text-neutral-900">
                                                {format(new Date(appointment.date), "MMM d, yyyy")}
                                            </span>
                                            <span className="text-sm text-neutral-500">
                                                {formatTime(appointment.time)}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-neutral-700">
                                        {appointment.doctor}
                                    </td>
                                    <td className="py-4 px-6">
                                        <Badge variant={statusColors[appointment.status]}>
                                            {appointment.status.charAt(0).toUpperCase() +
                                                appointment.status.slice(1)}
                                        </Badge>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleViewDetails(appointment)}
                                                className="p-2 rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 transition-colors"
                                                title="View details"
                                            >
                                                <Eye className="h-5 w-5" />
                                            </button>
                                            {appointment.status === "pending" && (
                                                <button
                                                    className="p-2 rounded-lg text-green-500 hover:bg-green-50 transition-colors"
                                                    title="Confirm"
                                                >
                                                    <CheckCircle className="h-5 w-5" />
                                                </button>
                                            )}
                                            <button
                                                className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                                                title="Cancel"
                                            >
                                                <XCircle className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredAppointments.length === 0 && (
                    <div className="text-center py-12 text-neutral-500">
                        <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No appointments found matching your criteria.</p>
                    </div>
                )}
            </Card>

            {/* Details Modal */}
            <Modal
                isOpen={showDetailsModal}
                onClose={() => setShowDetailsModal(false)}
                title="Appointment Details"
                size="lg"
            >
                {selectedAppointment && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-200 to-secondary-200 flex items-center justify-center text-primary-700 text-2xl font-bold">
                                {selectedAppointment.patient.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-neutral-900">
                                    {selectedAppointment.patient.name}
                                </h3>
                                <p className="text-neutral-500">
                                    {selectedAppointment.patient.email}
                                </p>
                                <p className="text-neutral-500">
                                    {selectedAppointment.patient.phone}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-neutral-50 rounded-lg">
                                <p className="text-sm text-neutral-500 mb-1">Service</p>
                                <p className="font-medium text-neutral-900">
                                    {selectedAppointment.service}
                                </p>
                            </div>
                            <div className="p-4 bg-neutral-50 rounded-lg">
                                <p className="text-sm text-neutral-500 mb-1">Doctor</p>
                                <p className="font-medium text-neutral-900">
                                    {selectedAppointment.doctor}
                                </p>
                            </div>
                            <div className="p-4 bg-neutral-50 rounded-lg">
                                <p className="text-sm text-neutral-500 mb-1">Date</p>
                                <p className="font-medium text-neutral-900">
                                    {format(new Date(selectedAppointment.date), "MMMM d, yyyy")}
                                </p>
                            </div>
                            <div className="p-4 bg-neutral-50 rounded-lg">
                                <p className="text-sm text-neutral-500 mb-1">Time</p>
                                <p className="font-medium text-neutral-900">
                                    {formatTime(selectedAppointment.time)}
                                </p>
                            </div>
                        </div>

                        {selectedAppointment.notes && (
                            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                                <p className="text-sm text-yellow-700 font-medium mb-1">Notes</p>
                                <p className="text-yellow-800">{selectedAppointment.notes}</p>
                            </div>
                        )}

                        <div className="flex gap-3">
                            {selectedAppointment.status === "pending" && (
                                <Button variant="primary" className="flex-1">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Confirm Appointment
                                </Button>
                            )}
                            {selectedAppointment.status !== "cancelled" &&
                                selectedAppointment.status !== "completed" && (
                                    <Button variant="destructive" className="flex-1">
                                        <XCircle className="h-4 w-4 mr-2" />
                                        Cancel Appointment
                                    </Button>
                                )}
                            {selectedAppointment.status === "confirmed" && (
                                <Button variant="secondary" className="flex-1">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Mark as Completed
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
