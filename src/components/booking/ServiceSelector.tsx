"use client";

import { Service } from "@/types";
import { cn } from "@/lib/utils";
import { Clock, DollarSign, Check } from "lucide-react";

interface ServiceSelectorProps {
    services: Service[];
    selectedServiceId: string | null;
    onServiceSelect: (serviceId: string) => void;
}

export function ServiceSelector({
    services,
    selectedServiceId,
    onServiceSelect,
}: ServiceSelectorProps) {
    return (
        <div className="space-y-3">
            {services.map((service) => {
                const isSelected = selectedServiceId === service.id;

                return (
                    <button
                        key={service.id}
                        onClick={() => onServiceSelect(service.id)}
                        className={cn(
                            "w-full p-4 rounded-xl border-2 text-left transition-all",
                            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                            isSelected
                                ? "border-primary-600 bg-primary-50"
                                : "border-neutral-200 bg-white hover:border-primary-300 hover:bg-neutral-50"
                        )}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h4 className="font-bold text-neutral-900">{service.title}</h4>
                                    {isSelected && (
                                        <div className="w-5 h-5 rounded-full bg-primary-600 flex items-center justify-center">
                                            <Check className="h-3 w-3 text-white" />
                                        </div>
                                    )}
                                </div>
                                <p className="text-sm text-neutral-500 mt-1 line-clamp-2">
                                    {service.description}
                                </p>
                                <div className="flex items-center gap-4 mt-3">
                                    <div className="flex items-center gap-1 text-sm text-neutral-600">
                                        <Clock className="h-4 w-4 text-primary-500" />
                                        <span>{service.duration} min</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm font-medium text-primary-600">
                                        <DollarSign className="h-4 w-4" />
                                        <span>${service.price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
