"use client";

import { useState } from "react";
import { Metadata } from "next";
import { Button, Input, Textarea, Card, Badge } from "@/components/ui";
import { SITE_CONFIG } from "@/lib/constants";
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Send,
    CheckCircle,
    MessageSquare,
} from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    };

    return (
        <>
            {/* Hero Section */}
            <section className="pt-32 pb-16 hero-gradient text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        <Badge variant="accent" className="mb-4">
                            Contact Us
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            We&apos;d Love to Hear From You
                        </h1>
                        <p className="text-xl text-white/90">
                            Have questions about our services or want to schedule an
                            appointment? Get in touch with us today.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Info & Form */}
            <section className="section-padding">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Contact Info */}
                        <div className="lg:col-span-1 space-y-6">
                            <Card className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                                        <Phone className="h-6 w-6 text-primary-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-neutral-900 mb-1">Phone</h3>
                                        <a
                                            href={`tel:${SITE_CONFIG.phone}`}
                                            className="text-primary-600 hover:underline"
                                        >
                                            {SITE_CONFIG.phone}
                                        </a>
                                        <p className="text-sm text-neutral-500 mt-1">
                                            Mon-Fri 8am-6pm
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-secondary-100 flex items-center justify-center flex-shrink-0">
                                        <Mail className="h-6 w-6 text-secondary-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-neutral-900 mb-1">Email</h3>
                                        <a
                                            href={`mailto:${SITE_CONFIG.email}`}
                                            className="text-primary-600 hover:underline"
                                        >
                                            {SITE_CONFIG.email}
                                        </a>
                                        <p className="text-sm text-neutral-500 mt-1">
                                            We reply within 24 hours
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="h-6 w-6 text-accent-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-neutral-900 mb-1">Address</h3>
                                        <p className="text-neutral-600">
                                            {SITE_CONFIG.address.street}
                                            <br />
                                            {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}{" "}
                                            {SITE_CONFIG.address.zip}
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                                        <Clock className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-neutral-900 mb-1">
                                            Office Hours
                                        </h3>
                                        <div className="text-neutral-600 space-y-1 text-sm">
                                            <p>Mon-Fri: {SITE_CONFIG.hours.weekdays}</p>
                                            <p>Saturday: {SITE_CONFIG.hours.saturday}</p>
                                            <p>Sunday: {SITE_CONFIG.hours.sunday}</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <Card className="p-8">
                                {isSubmitted ? (
                                    <div className="text-center py-12">
                                        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle className="h-10 w-10 text-green-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                                            Message Sent!
                                        </h3>
                                        <p className="text-neutral-600 mb-6">
                                            Thank you for contacting us. We&apos;ll get back to you
                                            within 24 hours.
                                        </p>
                                        <Button
                                            variant="primary"
                                            onClick={() => setIsSubmitted(false)}
                                        >
                                            Send Another Message
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex items-center gap-3 mb-6">
                                            <MessageSquare className="h-6 w-6 text-primary-600" />
                                            <h2 className="text-2xl font-bold text-neutral-900">
                                                Send Us a Message
                                            </h2>
                                        </div>
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <Input
                                                    label="Your Name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="John Doe"
                                                    required
                                                />
                                                <Input
                                                    label="Email Address"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="john@example.com"
                                                    required
                                                />
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <Input
                                                    label="Phone Number"
                                                    name="phone"
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="(555) 123-4567"
                                                />
                                                <Input
                                                    label="Subject"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    placeholder="How can we help?"
                                                    required
                                                />
                                            </div>
                                            <Textarea
                                                label="Your Message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Tell us more about your inquiry..."
                                                rows={5}
                                                required
                                            />
                                            <Button
                                                type="submit"
                                                variant="primary"
                                                size="lg"
                                                isLoading={isSubmitting}
                                                leftIcon={<Send className="h-5 w-5" />}
                                            >
                                                Send Message
                                            </Button>
                                        </form>
                                    </>
                                )}
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="h-96 bg-neutral-200">
                <div className="w-full h-full flex items-center justify-center text-neutral-500">
                    <div className="text-center">
                        <MapPin className="h-16 w-16 mx-auto mb-4" />
                        <p className="text-lg font-medium">Interactive Map</p>
                        <p className="text-sm">
                            Google Maps integration would go here
                        </p>
                    </div>
                </div>
            </section>

            {/* Emergency CTA */}
            <section className="section-padding bg-red-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
                        Dental Emergency?
                    </h2>
                    <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
                        If you&apos;re experiencing severe pain, swelling, or have had a
                        dental injury, please call us immediately. We offer same-day
                        emergency appointments.
                    </p>
                    <a href={`tel:${SITE_CONFIG.phone}`}>
                        <Button
                            variant="destructive"
                            size="xl"
                            leftIcon={<Phone className="h-5 w-5" />}
                        >
                            Call Emergency Line
                        </Button>
                    </a>
                </div>
            </section>
        </>
    );
}
