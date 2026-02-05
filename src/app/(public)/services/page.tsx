import { Metadata } from "next";
import Link from "next/link";
import { Button, Card, CardContent, Badge } from "@/components/ui";
import { SERVICES_DATA } from "@/lib/constants";
import {
    Calendar,
    Clock,
    IndianRupee,
    ArrowRight,
    Stethoscope,
    Sparkles,
    Component,
    AlignCenter,
    Heart,
    Gem,
    Baby,
    AlertCircle,
    CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
    title: "Our Services",
    description:
        "Explore our comprehensive dental services including general dentistry, teeth whitening, dental implants, orthodontics, and more at SmileCare Dental Clinic.",
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Stethoscope,
    Sparkles,
    Component,
    AlignCenter,
    Heart,
    Gem,
    Baby,
    AlertCircle,
};

export default function ServicesPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="pt-32 pb-16 hero-gradient text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        <Badge variant="accent" className="mb-4">
                            Our Services
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Comprehensive Dental Care for Your Whole Family
                        </h1>
                        <p className="text-xl text-white/90">
                            From routine checkups to advanced cosmetic procedures, we offer a
                            full range of dental services to meet all your oral health needs.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section-padding">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8">
                        {SERVICES_DATA.map((service) => {
                            const IconComponent = iconMap[service.icon || "Stethoscope"];
                            return (
                                <Card
                                    key={service.id}
                                    id={service.id}
                                    className="overflow-hidden group"
                                >
                                    <div className="grid md:grid-cols-2 h-full">
                                        <div className="h-64 md:h-auto bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                                            <IconComponent className="h-24 w-24 text-primary-600 group-hover:scale-110 transition-transform" />
                                        </div>
                                        <CardContent className="p-6 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                                                    {service.title}
                                                </h3>
                                                <p className="text-neutral-600 mb-4">
                                                    {service.description}
                                                </p>
                                                <div className="space-y-2 mb-6">
                                                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                                                        <Clock className="h-4 w-4 text-primary-500" />
                                                        <span>{service.duration} minutes</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                                                        <IndianRupee className="h-4 w-4 text-primary-500" />
                                                        <span>Starting from ₹{service.price}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Link href="/booking">
                                                <Button
                                                    variant="primary"
                                                    className="w-full"
                                                    rightIcon={<ArrowRight className="h-4 w-4" />}
                                                >
                                                    Book This Service
                                                </Button>
                                            </Link>
                                        </CardContent>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* What to Expect */}
            <section className="section-padding bg-neutral-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <Badge variant="primary" className="mb-4">
                            What to Expect
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                            Your Visit Experience
                        </h2>
                        <p className="text-lg text-neutral-600">
                            We strive to make every visit comfortable and stress-free.
                            Here&apos;s what you can expect when you visit SmileCare.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            {
                                step: "1",
                                title: "Schedule",
                                description:
                                    "Book your appointment online or by phone. We offer flexible scheduling to fit your lifestyle.",
                            },
                            {
                                step: "2",
                                title: "Welcome",
                                description:
                                    "Our friendly staff will greet you and ensure you're comfortable before your treatment.",
                            },
                            {
                                step: "3",
                                title: "Treatment",
                                description:
                                    "Your dentist will discuss your options and provide personalized care tailored to your needs.",
                            },
                            {
                                step: "4",
                                title: "Follow-Up",
                                description:
                                    "We'll schedule any necessary follow-up visits and provide care instructions for home.",
                            },
                        ].map((item, index) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 rounded-full bg-primary-600 text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-neutral-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Insurance & Payment */}
            <section className="section-padding">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <Badge variant="secondary" className="mb-4">
                                Insurance & Payment
                            </Badge>
                            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                                Affordable Care for Everyone
                            </h2>
                            <p className="text-neutral-600 mb-6">
                                We believe everyone deserves access to quality dental care.
                                That&apos;s why we accept most major insurance plans and offer
                                flexible payment options.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Most major dental insurance plans accepted",
                                    "Flexible payment plans available",
                                    "Credit cards and financing options",
                                    "Discount for uninsured patients",
                                    "Transparent pricing with no hidden fees",
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span className="text-neutral-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-3xl p-8 text-center">
                            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                                New Patient Special
                            </h3>
                            <div className="text-5xl font-bold text-primary-600 mb-2">
                                ₹999
                            </div>
                            <p className="text-neutral-600 mb-6">
                                Comprehensive exam, X-rays, and cleaning
                                <br />
                                <span className="text-sm">(Regular value ₹3000)</span>
                            </p>
                            <Link href="/booking">
                                <Button variant="primary" size="lg">
                                    Claim This Offer
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-gradient-to-r from-primary-600 to-secondary-500 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Book your appointment today and take the first step towards a
                        healthier, more confident smile.
                    </p>
                    <Link href="/booking">
                        <Button
                            variant="accent"
                            size="xl"
                            leftIcon={<Calendar className="h-5 w-5" />}
                        >
                            Book Your Appointment
                        </Button>
                    </Link>
                </div>
            </section>
        </>
    );
}
