"use client";

import { useState, useEffect } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { Button, Input, Card, Badge } from "@/components/ui";
import { Calendar, TimeSlotPicker, ServiceSelector } from "@/components/booking";
import { SERVICES_DATA, DOCTORS_DATA, SITE_CONFIG } from "@/lib/constants";
import { generateTimeSlots, formatTime } from "@/lib/utils";
import { Service, Doctor, BookingFormData } from "@/types";
import {
    ArrowLeft,
    ArrowRight,
    Calendar as CalendarIcon,
    Clock,
    User,
    Mail,
    Phone,
    FileText,
    CheckCircle,
    Stethoscope,
    Users,
} from "lucide-react";

const STEPS = [
    { id: 1, title: "Service", icon: Stethoscope },
    { id: 2, title: "Date & Time", icon: CalendarIcon },
    { id: 3, title: "Your Details", icon: User },
    { id: 4, title: "Confirmation", icon: CheckCircle },
];

export default function BookingPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [bookedSlots, setBookedSlots] = useState<string[]>([]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        notes: "",
    });

    // Simulate fetching booked slots when date changes
    useEffect(() => {
        if (selectedDate) {
            // Simulate some booked slots
            const simulatedBookedSlots = ["10:00", "14:30", "15:00"];
            setBookedSlots(simulatedBookedSlots);
        }
    }, [selectedDate]);

    const timeSlots = generateTimeSlots(9, 17, 30);

    const services: Service[] = SERVICES_DATA.map((s) => ({
        id: s.id,
        title: s.title,
        description: s.description,
        duration: s.duration,
        price: s.price,
    }));

    const doctors: Doctor[] = DOCTORS_DATA.map((d) => ({
        id: d.id,
        name: d.name,
        title: d.title,
        bio: d.bio,
        specializations: d.specializations,
    }));

    const selectedServiceData = services.find((s) => s.id === selectedService);
    const selectedDoctorData = doctors.find((d) => d.id === selectedDoctor);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const canProceed = () => {
        switch (currentStep) {
            case 1:
                return selectedService !== null;
            case 2:
                return selectedDate !== null && selectedTime !== null;
            case 3:
                return formData.name && formData.email && formData.phone;
            default:
                return true;
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setIsSuccess(true);
        setCurrentStep(4);
    };

    const resetBooking = () => {
        setCurrentStep(1);
        setSelectedService(null);
        setSelectedDoctor(null);
        setSelectedDate(null);
        setSelectedTime(null);
        setFormData({ name: "", email: "", phone: "", notes: "" });
        setIsSuccess(false);
    };

    return (
        <>
            {/* Hero Section */}
            <section className="pt-32 pb-8 hero-gradient text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        <Badge variant="accent" className="mb-4">
                            Book Appointment
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Schedule Your Visit
                        </h1>
                        <p className="text-xl text-white/90">
                            Book your appointment in just a few simple steps. We&apos;ll
                            confirm your booking via email.
                        </p>
                    </div>
                </div>
            </section>

            {/* Progress Steps */}
            <section className="bg-white border-b border-neutral-200 sticky top-0 z-30">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between max-w-3xl mx-auto">
                        {STEPS.map((step, index) => (
                            <div
                                key={step.id}
                                className="flex items-center"
                            >
                                <div
                                    className={`flex items-center gap-2 ${currentStep >= step.id
                                        ? "text-primary-600"
                                        : "text-neutral-400"
                                        }`}
                                >
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep > step.id
                                            ? "bg-primary-600 text-white"
                                            : currentStep === step.id
                                                ? "bg-primary-100 text-primary-600 border-2 border-primary-600"
                                                : "bg-neutral-100 text-neutral-400"
                                            }`}
                                    >
                                        {currentStep > step.id ? (
                                            <CheckCircle className="h-5 w-5" />
                                        ) : (
                                            <step.icon className="h-5 w-5" />
                                        )}
                                    </div>
                                    <span className="hidden md:block font-medium">
                                        {step.title}
                                    </span>
                                </div>
                                {index < STEPS.length - 1 && (
                                    <div
                                        className={`w-12 md:w-24 h-0.5 mx-2 ${currentStep > step.id ? "bg-primary-600" : "bg-neutral-200"
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Booking Content */}
            <section className="section-padding bg-neutral-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Step 1: Select Service */}
                        {currentStep === 1 && (
                            <div className="animate-fade-in">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                                    Select a Service
                                </h2>
                                <ServiceSelector
                                    services={services}
                                    selectedServiceId={selectedService}
                                    onServiceSelect={setSelectedService}
                                />

                                {selectedService && (
                                    <div className="mt-8">
                                        <h3 className="text-lg font-bold text-neutral-900 mb-4">
                                            Choose a Doctor (Optional)
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <button
                                                onClick={() => setSelectedDoctor(null)}
                                                className={`p-4 rounded-xl border-2 text-left transition-all ${selectedDoctor === null
                                                    ? "border-primary-600 bg-primary-50"
                                                    : "border-neutral-200 bg-white hover:border-primary-300"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center">
                                                        <Users className="h-6 w-6 text-neutral-500" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-neutral-900">
                                                            Any Available Doctor
                                                        </h4>
                                                        <p className="text-sm text-neutral-500">
                                                            First available appointment
                                                        </p>
                                                    </div>
                                                </div>
                                            </button>
                                            {doctors.map((doctor) => (
                                                <button
                                                    key={doctor.id}
                                                    onClick={() => setSelectedDoctor(doctor.id)}
                                                    className={`p-4 rounded-xl border-2 text-left transition-all ${selectedDoctor === doctor.id
                                                        ? "border-primary-600 bg-primary-50"
                                                        : "border-neutral-200 bg-white hover:border-primary-300"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-200 to-secondary-200 flex items-center justify-center">
                                                            <User className="h-6 w-6 text-primary-600" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-neutral-900">
                                                                {doctor.name}
                                                            </h4>
                                                            <p className="text-sm text-neutral-500">
                                                                {doctor.title}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 2: Select Date & Time */}
                        {currentStep === 2 && (
                            <div className="animate-fade-in">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                                    Select Date & Time
                                </h2>
                                <div className="grid lg:grid-cols-2 gap-8">
                                    <Calendar
                                        selectedDate={selectedDate}
                                        onDateSelect={(date) => {
                                            setSelectedDate(date);
                                            setSelectedTime(null);
                                        }}
                                    />
                                    {selectedDate && (
                                        <TimeSlotPicker
                                            slots={timeSlots}
                                            selectedTime={selectedTime}
                                            onTimeSelect={setSelectedTime}
                                            bookedSlots={bookedSlots}
                                        />
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Your Details */}
                        {currentStep === 3 && (
                            <div className="animate-fade-in">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                                    Your Details
                                </h2>
                                <div className="grid lg:grid-cols-2 gap-8">
                                    <Card className="p-6">
                                        <h3 className="text-lg font-bold text-neutral-900 mb-6">
                                            Contact Information
                                        </h3>
                                        <div className="space-y-4">
                                            <Input
                                                label="Full Name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="John Doe"
                                                leftIcon={<User className="h-5 w-5" />}
                                                required
                                            />
                                            <Input
                                                label="Email Address"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="john@example.com"
                                                leftIcon={<Mail className="h-5 w-5" />}
                                                required
                                            />
                                            <Input
                                                label="Phone Number"
                                                name="phone"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="(555) 123-4567"
                                                leftIcon={<Phone className="h-5 w-5" />}
                                                required
                                            />
                                            <Input
                                                label="Additional Notes (Optional)"
                                                name="notes"
                                                value={formData.notes}
                                                onChange={handleInputChange}
                                                placeholder="Any special requirements or concerns..."
                                                leftIcon={<FileText className="h-5 w-5" />}
                                            />
                                        </div>
                                    </Card>

                                    <Card className="p-6 h-fit">
                                        <h3 className="text-lg font-bold text-neutral-900 mb-6">
                                            Appointment Summary
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3 pb-4 border-b border-neutral-100">
                                                <Stethoscope className="h-5 w-5 text-primary-600 mt-0.5" />
                                                <div>
                                                    <p className="text-sm text-neutral-500">Service</p>
                                                    <p className="font-medium text-neutral-900">
                                                        {selectedServiceData?.title}
                                                    </p>
                                                </div>
                                            </div>
                                            {selectedDoctorData && (
                                                <div className="flex items-start gap-3 pb-4 border-b border-neutral-100">
                                                    <User className="h-5 w-5 text-primary-600 mt-0.5" />
                                                    <div>
                                                        <p className="text-sm text-neutral-500">Doctor</p>
                                                        <p className="font-medium text-neutral-900">
                                                            {selectedDoctorData.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="flex items-start gap-3 pb-4 border-b border-neutral-100">
                                                <CalendarIcon className="h-5 w-5 text-primary-600 mt-0.5" />
                                                <div>
                                                    <p className="text-sm text-neutral-500">Date</p>
                                                    <p className="font-medium text-neutral-900">
                                                        {selectedDate &&
                                                            format(selectedDate, "EEEE, MMMM d, yyyy")}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3 pb-4 border-b border-neutral-100">
                                                <Clock className="h-5 w-5 text-primary-600 mt-0.5" />
                                                <div>
                                                    <p className="text-sm text-neutral-500">Time</p>
                                                    <p className="font-medium text-neutral-900">
                                                        {selectedTime && formatTime(selectedTime)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="pt-4">
                                                <div className="flex items-center justify-between text-lg">
                                                    <span className="font-medium text-neutral-700">
                                                        Estimated Cost:
                                                    </span>
                                                    <span className="font-bold text-primary-600">
                                                        ₹{selectedServiceData?.price}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-neutral-500 mt-2">
                                                    Final cost may vary based on treatment requirements.
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Confirmation */}
                        {currentStep === 4 && isSuccess && (
                            <div className="animate-fade-in text-center py-12">
                                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="h-12 w-12 text-green-600" />
                                </div>
                                <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                                    Appointment Booked!
                                </h2>
                                <p className="text-lg text-neutral-600 mb-8 max-w-md mx-auto">
                                    Your appointment has been successfully scheduled. We&apos;ve
                                    sent a confirmation email to{" "}
                                    <strong>{formData.email}</strong>.
                                </p>

                                <Card className="max-w-md mx-auto p-6 text-left mb-8">
                                    <h3 className="text-lg font-bold text-neutral-900 mb-4">
                                        Appointment Details
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-neutral-500">Service:</span>
                                            <span className="font-medium">
                                                {selectedServiceData?.title}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-neutral-500">Date:</span>
                                            <span className="font-medium">
                                                {selectedDate &&
                                                    format(selectedDate, "MMMM d, yyyy")}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-neutral-500">Time:</span>
                                            <span className="font-medium">
                                                {selectedTime && formatTime(selectedTime)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-neutral-500">Location:</span>
                                            <span className="font-medium">
                                                {SITE_CONFIG.address.street}
                                            </span>
                                        </div>
                                    </div>
                                </Card>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button variant="primary" size="lg" onClick={resetBooking}>
                                        Book Another Appointment
                                    </Button>
                                    <Link href="/">
                                        <Button variant="outline" size="lg">
                                            Return to Home
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        {currentStep < 4 && (
                            <div className="flex items-center justify-between mt-12 pt-6 border-t border-neutral-200">
                                <Button
                                    variant="ghost"
                                    onClick={() => setCurrentStep(currentStep - 1)}
                                    disabled={currentStep === 1}
                                    leftIcon={<ArrowLeft className="h-5 w-5" />}
                                >
                                    Back
                                </Button>

                                {currentStep < 3 ? (
                                    <Button
                                        variant="primary"
                                        onClick={() => setCurrentStep(currentStep + 1)}
                                        disabled={!canProceed()}
                                        rightIcon={<ArrowRight className="h-5 w-5" />}
                                    >
                                        Continue
                                    </Button>
                                ) : (
                                    <Button
                                        variant="accent"
                                        onClick={handleSubmit}
                                        disabled={!canProceed()}
                                        isLoading={isSubmitting}
                                        leftIcon={<CheckCircle className="h-5 w-5" />}
                                    >
                                        Confirm Booking
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
