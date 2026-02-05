"use client";

import { Card, Badge } from "@/components/ui";
import {
    Calendar,
    Users,
    DollarSign,
    TrendingUp,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react";

// Mock data for dashboard
const stats = [
    {
        title: "Today's Appointments",
        value: "12",
        change: "+2",
        trend: "up",
        icon: Calendar,
        color: "primary",
    },
    {
        title: "Total Patients",
        value: "1,234",
        change: "+48",
        trend: "up",
        icon: Users,
        color: "secondary",
    },
    {
        title: "Revenue (Month)",
        value: "$24,590",
        change: "+12%",
        trend: "up",
        icon: DollarSign,
        color: "accent",
    },
    {
        title: "Completed Today",
        value: "8",
        change: "-1",
        trend: "down",
        icon: CheckCircle,
        color: "green",
    },
];

const todaysAppointments = [
    {
        id: 1,
        patient: "Jennifer Adams",
        service: "Teeth Whitening",
        time: "09:00 AM",
        doctor: "Dr. Sarah Mitchell",
        status: "completed",
    },
    {
        id: 2,
        patient: "Robert Martinez",
        service: "General Checkup",
        time: "10:30 AM",
        doctor: "Dr. Sarah Mitchell",
        status: "completed",
    },
    {
        id: 3,
        patient: "Sarah Kim",
        service: "Dental Cleaning",
        time: "11:30 AM",
        doctor: "Dr. Emily Rodriguez",
        status: "in-progress",
    },
    {
        id: 4,
        patient: "David Wilson",
        service: "Root Canal",
        time: "02:00 PM",
        doctor: "Dr. Michael Thompson",
        status: "pending",
    },
    {
        id: 5,
        patient: "Emily Chen",
        service: "Orthodontics Consultation",
        time: "03:30 PM",
        doctor: "Dr. James Chen",
        status: "pending",
    },
];

const recentPatients = [
    { id: 1, name: "Jennifer Adams", email: "jennifer@example.com", lastVisit: "Today" },
    { id: 2, name: "Robert Martinez", email: "robert@example.com", lastVisit: "Today" },
    { id: 3, name: "Sarah Kim", email: "sarah@example.com", lastVisit: "Yesterday" },
    { id: 4, name: "David Wilson", email: "david@example.com", lastVisit: "2 days ago" },
];

const getStatusBadge = (status: string) => {
    switch (status) {
        case "completed":
            return <Badge variant="success">Completed</Badge>;
        case "in-progress":
            return <Badge variant="primary">In Progress</Badge>;
        case "pending":
            return <Badge variant="warning">Pending</Badge>;
        case "cancelled":
            return <Badge variant="error">Cancelled</Badge>;
        default:
            return <Badge variant="default">{status}</Badge>;
    }
};

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
                <p className="text-neutral-500">
                    Welcome back! Here&apos;s what&apos;s happening today.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index} className="p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-neutral-500 mb-1">{stat.title}</p>
                                <p className="text-3xl font-bold text-neutral-900">
                                    {stat.value}
                                </p>
                                <div
                                    className={`flex items-center gap-1 mt-2 text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"
                                        }`}
                                >
                                    {stat.trend === "up" ? (
                                        <ArrowUpRight className="h-4 w-4" />
                                    ) : (
                                        <ArrowDownRight className="h-4 w-4" />
                                    )}
                                    <span>{stat.change} from yesterday</span>
                                </div>
                            </div>
                            <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color === "primary"
                                        ? "bg-primary-100 text-primary-600"
                                        : stat.color === "secondary"
                                            ? "bg-secondary-100 text-secondary-600"
                                            : stat.color === "accent"
                                                ? "bg-accent-100 text-accent-600"
                                                : "bg-green-100 text-green-600"
                                    }`}
                            >
                                <stat.icon className="h-6 w-6" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Today's Appointments */}
                <div className="lg:col-span-2">
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-neutral-900">
                                Today&apos;s Appointments
                            </h2>
                            <a
                                href="/admin/appointments"
                                className="text-sm text-primary-600 hover:underline"
                            >
                                View all
                            </a>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-neutral-200">
                                        <th className="text-left py-3 px-4 text-sm font-medium text-neutral-500">
                                            Patient
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-neutral-500">
                                            Service
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-neutral-500">
                                            Time
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-neutral-500">
                                            Doctor
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-neutral-500">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {todaysAppointments.map((appointment) => (
                                        <tr
                                            key={appointment.id}
                                            className="border-b border-neutral-100 hover:bg-neutral-50"
                                        >
                                            <td className="py-4 px-4">
                                                <p className="font-medium text-neutral-900">
                                                    {appointment.patient}
                                                </p>
                                            </td>
                                            <td className="py-4 px-4 text-neutral-600">
                                                {appointment.service}
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2 text-neutral-600">
                                                    <Clock className="h-4 w-4" />
                                                    {appointment.time}
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-neutral-600">
                                                {appointment.doctor}
                                            </td>
                                            <td className="py-4 px-4">
                                                {getStatusBadge(appointment.status)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                {/* Recent Patients */}
                <div>
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-neutral-900">
                                Recent Patients
                            </h2>
                            <a
                                href="/admin/patients"
                                className="text-sm text-primary-600 hover:underline"
                            >
                                View all
                            </a>
                        </div>
                        <div className="space-y-4">
                            {recentPatients.map((patient) => (
                                <div
                                    key={patient.id}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                                >
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-200 to-secondary-200 flex items-center justify-center text-primary-700 font-bold">
                                        {patient.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-neutral-900 truncate">
                                            {patient.name}
                                        </p>
                                        <p className="text-sm text-neutral-500 truncate">
                                            {patient.email}
                                        </p>
                                    </div>
                                    <span className="text-xs text-neutral-400">
                                        {patient.lastVisit}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Quick Stats */}
                    <Card className="p-6 mt-6">
                        <h2 className="text-lg font-bold text-neutral-900 mb-6">
                            This Week
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-neutral-600">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span>Completed</span>
                                </div>
                                <span className="font-bold text-neutral-900">34</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-neutral-600">
                                    <Clock className="h-5 w-5 text-yellow-500" />
                                    <span>Pending</span>
                                </div>
                                <span className="font-bold text-neutral-900">12</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-neutral-600">
                                    <XCircle className="h-5 w-5 text-red-500" />
                                    <span>Cancelled</span>
                                </div>
                                <span className="font-bold text-neutral-900">3</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-neutral-600">
                                    <Users className="h-5 w-5 text-primary-500" />
                                    <span>New Patients</span>
                                </div>
                                <span className="font-bold text-neutral-900">8</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
