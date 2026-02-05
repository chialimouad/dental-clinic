"use client";

import { useState, useMemo } from "react";
import {
    format,
    addDays,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    isToday,
    isBefore,
    startOfToday,
} from "date-fns";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarProps {
    selectedDate: Date | null;
    onDateSelect: (date: Date) => void;
    disabledDates?: Date[];
}

export function Calendar({
    selectedDate,
    onDateSelect,
    disabledDates = [],
}: CalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const today = startOfToday();

    const days = useMemo(() => {
        const start = startOfMonth(currentMonth);
        const end = endOfMonth(currentMonth);
        return eachDayOfInterval({ start, end });
    }, [currentMonth]);

    const startingDayIndex = useMemo(() => {
        return startOfMonth(currentMonth).getDay();
    }, [currentMonth]);

    const previousMonth = () => {
        setCurrentMonth(
            new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
        );
    };

    const nextMonth = () => {
        setCurrentMonth(
            new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
        );
    };

    const isDateDisabled = (date: Date) => {
        // Disable past dates
        if (isBefore(date, today)) return true;
        // Disable Sundays
        if (date.getDay() === 0) return true;
        // Disable specific dates
        return disabledDates.some((d) => isSameDay(d, date));
    };

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-neutral-900">
                    {format(currentMonth, "MMMM yyyy")}
                </h3>
                <div className="flex gap-2">
                    <button
                        onClick={previousMonth}
                        disabled={isSameMonth(currentMonth, today)}
                        className="p-2 rounded-lg hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Previous month"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        onClick={nextMonth}
                        className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
                        aria-label="Next month"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Week days header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map((day) => (
                    <div
                        key={day}
                        className="text-center text-sm font-medium text-neutral-500 py-2"
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before the first of the month */}
                {Array.from({ length: startingDayIndex }).map((_, index) => (
                    <div key={`empty-${index}`} className="h-12" />
                ))}

                {/* Days */}
                {days.map((day) => {
                    const disabled = isDateDisabled(day);
                    const selected = selectedDate && isSameDay(day, selectedDate);
                    const todayDate = isToday(day);

                    return (
                        <button
                            key={day.toString()}
                            onClick={() => !disabled && onDateSelect(day)}
                            disabled={disabled}
                            className={cn(
                                "h-12 rounded-lg text-sm font-medium transition-all",
                                "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                                disabled
                                    ? "text-neutral-300 cursor-not-allowed"
                                    : "hover:bg-primary-50 cursor-pointer",
                                selected
                                    ? "bg-primary-600 text-white hover:bg-primary-700"
                                    : todayDate
                                        ? "bg-primary-100 text-primary-700"
                                        : "text-neutral-700"
                            )}
                        >
                            {format(day, "d")}
                        </button>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-neutral-100">
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <div className="w-4 h-4 rounded bg-primary-100" />
                    <span>Today</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <div className="w-4 h-4 rounded bg-primary-600" />
                    <span>Selected</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <div className="w-4 h-4 rounded bg-neutral-100" />
                    <span>Unavailable</span>
                </div>
            </div>
        </div>
    );
}
