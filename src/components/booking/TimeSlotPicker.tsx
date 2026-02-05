"use client";

import { cn } from "@/lib/utils";
import { formatTime } from "@/lib/utils";
import { Clock } from "lucide-react";

interface TimeSlotPickerProps {
    slots: string[];
    selectedTime: string | null;
    onTimeSelect: (time: string) => void;
    bookedSlots?: string[];
}

export function TimeSlotPicker({
    slots,
    selectedTime,
    onTimeSelect,
    bookedSlots = [],
}: TimeSlotPickerProps) {
    const morningSlots = slots.filter((slot) => {
        const hour = parseInt(slot.split(":")[0], 10);
        return hour < 12;
    });

    const afternoonSlots = slots.filter((slot) => {
        const hour = parseInt(slot.split(":")[0], 10);
        return hour >= 12;
    });

    const renderSlots = (slotList: string[], title: string) => (
        <div>
            <h4 className="text-sm font-medium text-neutral-500 mb-3">{title}</h4>
            <div className="grid grid-cols-3 gap-2">
                {slotList.map((slot) => {
                    const isBooked = bookedSlots.includes(slot);
                    const isSelected = selectedTime === slot;

                    return (
                        <button
                            key={slot}
                            onClick={() => !isBooked && onTimeSelect(slot)}
                            disabled={isBooked}
                            className={cn(
                                "py-3 px-4 rounded-lg text-sm font-medium transition-all",
                                "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                                isBooked
                                    ? "bg-neutral-100 text-neutral-400 cursor-not-allowed line-through"
                                    : isSelected
                                        ? "bg-primary-600 text-white shadow-lg"
                                        : "bg-white border border-neutral-200 text-neutral-700 hover:border-primary-500 hover:bg-primary-50"
                            )}
                        >
                            {formatTime(slot)}
                        </button>
                    );
                })}
            </div>
        </div>
    );

    if (slots.length === 0) {
        return (
            <div className="text-center py-8 text-neutral-500">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No available time slots for this date.</p>
                <p className="text-sm">Please select another date.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-lg font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary-600" />
                Select a Time
            </h3>

            <div className="space-y-6">
                {morningSlots.length > 0 && renderSlots(morningSlots, "Morning")}
                {afternoonSlots.length > 0 && renderSlots(afternoonSlots, "Afternoon")}
            </div>
        </div>
    );
}
