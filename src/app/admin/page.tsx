import { Card, Badge } from "@/components/ui";
import {
    Calendar,
    Users,
    IndianRupee,
    TrendingUp,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react";
import { getDashboardStats, getTodaysAppointments } from "@/lib/actions/appointments";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    const statsData = await getDashboardStats();
    const todaysAppointments = await getTodaysAppointments();

    const stats = [
        {
            title: "Today's Appointments",
            value: statsData.todayAppointments.toString(),
            change: "Live",
            trend: "up", // dynamic trend not implemented yet
            icon: Calendar,
            color: "primary",
        },
        {
            title: "Total Patients",
            value: statsData.totalPatients.toString(), // Approximated by appointments for now
            change: "Total",
            trend: "up",
            icon: Users,
            color: "secondary",
        },
        {
            title: "Completed Today",
            value: statsData.completedToday.toString(),
            change: "Today",
            trend: "up",
            icon: CheckCircle,
            color: "green",
        },
        // Remove Revenue for now as it's not calculated
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index} className="p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-neutral-500 mb-1">{stat.title}</p>
                                <p className="text-3xl font-bold text-neutral-900">
                                    {stat.value}
                                </p>
                                <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                                    <ArrowUpRight className="h-4 w-4" />
                                    <span>{stat.change}</span>
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
                <div className="lg:col-span-3">
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
                            {todaysAppointments.length > 0 ? (
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
                                        {todaysAppointments.map((appointment: any) => (
                                            <tr
                                                key={appointment.id}
                                                className="border-b border-neutral-100 hover:bg-neutral-50"
                                            >
                                                <td className="py-4 px-4">
                                                    <p className="font-medium text-neutral-900">
                                                        {appointment.patient_name}
                                                    </p>
                                                    <p className="text-xs text-neutral-500">
                                                        {appointment.patient_phone}
                                                    </p>
                                                </td>
                                                <td className="py-4 px-4 text-neutral-600">
                                                    {appointment.service?.title || "Unknown"}
                                                </td>
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-2 text-neutral-600">
                                                        <Clock className="h-4 w-4" />
                                                        {appointment.appointment_time}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-neutral-600">
                                                    {appointment.doctor?.name || "Any Doctor"}
                                                </td>
                                                <td className="py-4 px-4">
                                                    {getStatusBadge(appointment.status)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-center text-neutral-500 py-8">
                                    No appointments scheduled for today.
                                </p>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
