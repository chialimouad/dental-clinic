"use client";

import { useState } from "react";
import { format, addDays, startOfWeek, addWeeks, subWeeks, isSameDay, startOfToday } from "date-fns";
import { Card, Button, Select } from "@/components/ui";
import { DOCTORS_DATA } from "@/lib/constants";
import { generateTimeSlots, cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Check, X } from "lucide-react";

export default function AvailabilityPage() {
    const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
    const [selectedDoctor, setSelectedDoctor] = useState("all");
    const [availability, setAvailability] = useState<Record<string, Record<string, boolean>>>({});

    const timeSlots = generateTimeSlots(9, 17, 30);
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));

    const toggleSlot = (dateStr: string, time: string) => {
        setAvailability((prev) => ({
            ...prev,
            [dateStr]: { ...prev[dateStr], [time]: !prev[dateStr]?.[time] },
        }));
    };

    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(":");
        const hour = parseInt(hours, 10);
        return `${hour % 12 || 12}:${minutes} ${hour >= 12 ? "PM" : "AM"}`;
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Availability</h1>
                    <p className="text-neutral-500">Manage appointment slots</p>
                </div>
                <Button variant="primary">Save Changes</Button>
            </div>

            <Card className="p-4">
                <div className="flex items-center justify-between gap-4">
                    <Select
                        options={[{ value: "all", label: "All Doctors" }, ...DOCTORS_DATA.map((d) => ({ value: d.id, label: d.name }))]}
                        value={selectedDoctor}
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                    />
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => setCurrentWeekStart(subWeeks(currentWeekStart, 1))}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm font-medium min-w-[180px] text-center">
                            {format(weekDays[0], "MMM d")} - {format(weekDays[6], "MMM d, yyyy")}
                        </span>
                        <Button variant="outline" size="sm" onClick={() => setCurrentWeekStart(addWeeks(currentWeekStart, 1))}>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </Card>

            <Card className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                    <thead>
                        <tr className="bg-neutral-50">
                            <th className="py-3 px-3 text-left text-sm font-medium">Time</th>
                            {weekDays.map((day) => (
                                <th key={day.toString()} className={cn("py-3 px-2 text-center text-sm", isSameDay(day, new Date()) && "bg-primary-50")}>
                                    <div>{format(day, "EEE")}</div>
                                    <div className="text-lg">{format(day, "d")}</div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {timeSlots.map((slot) => (
                            <tr key={slot} className="border-t">
                                <td className="py-1 px-3 text-sm">{formatTime(slot)}</td>
                                {weekDays.map((day) => {
                                    const dateStr = format(day, "yyyy-MM-dd");
                                    const isAvailable = availability[dateStr]?.[slot] ?? true;
                                    const isPast = day < startOfToday();
                                    return (
                                        <td key={day.toString()} className="py-1 px-1">
                                            <button
                                                onClick={() => !isPast && toggleSlot(dateStr, slot)}
                                                disabled={isPast}
                                                className={cn("w-full h-7 rounded flex items-center justify-center", isPast ? "bg-neutral-100" : isAvailable ? "bg-green-100 hover:bg-green-200" : "bg-red-100 hover:bg-red-200")}
                                            >
                                                {!isPast && (isAvailable ? <Check className="h-3 w-3 text-green-600" /> : <X className="h-3 w-3 text-red-600" />)}
                                            </button>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}
