import Link from "next/link";
import { Button, Card, CardContent, Badge } from "@/components/ui";
import { SITE_CONFIG } from "@/lib/constants";
import { getServices } from "@/lib/actions/services";
import { getDoctors } from "@/lib/actions/doctors";
import { getTestimonials } from "@/lib/actions/testimonials";
import {
    Calendar,
    Phone,
    Star,
    Shield,
    Clock,
    Award,
    Heart,
    Users,
    CheckCircle,
    ArrowRight,
    Stethoscope,
    Sparkles,
    Quote,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
    const [services, doctors, testimonials] = await Promise.all([
        getServices(),
        getDoctors(),
        getTestimonials()
    ]);

    const activeServices = services.filter(s => s.isActive).slice(0, 8);
    const activeDoctors = doctors.filter(d => d.isActive).slice(0, 4);
    const activeTestimonials = testimonials.filter(t => t.isActive).slice(0, 4);

    return (
        <>
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-4 py-32 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Hero Content */}
                        <div className="text-white animate-fade-in">
                            <Badge variant="accent" className="mb-6 text-sm">
                                ✨ #1 Rated Dental Clinic in Ahmedabad
                            </Badge>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                                Your Perfect Smile{" "}
                                <span className="text-accent-300">Starts Here</span>
                            </h1>
                            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                                Experience exceptional dental care in a comfortable,
                                state-of-the-art environment. Our expert team is dedicated to
                                giving you the healthy, beautiful smile you deserve.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                <Link href="/booking">
                                    <Button
                                        variant="accent"
                                        size="xl"
                                        leftIcon={<Calendar className="h-5 w-5" />}
                                    >
                                        Book Appointment
                                    </Button>
                                </Link>
                                <a href={`tel:${SITE_CONFIG.phone}`}>
                                    <Button
                                        variant="outline"
                                        size="xl"
                                        leftIcon={<Phone className="h-5 w-5" />}
                                        className="border-white text-white hover:bg-white/10"
                                    >
                                        Call Us Now
                                    </Button>
                                </a>
                            </div>

                            {/* Trust Indicators */}
                            <div className="flex flex-wrap gap-8">
                                <div className="flex items-center gap-2">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div
                                                key={i}
                                                className="w-10 h-10 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-sm font-bold"
                                            >
                                                {String.fromCharCode(64 + i)}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="ml-2">
                                        <div className="flex items-center gap-1 text-yellow-300">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <Star key={i} className="h-4 w-4 fill-current" />
                                            ))}
                                        </div>
                                        <p className="text-sm text-white/80">500+ Happy Patients</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Shield className="h-8 w-8 text-accent-300" />
                                    <div>
                                        <p className="font-semibold">Certified Experts</p>
                                        <p className="text-sm text-white/80">ADA Approved</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="relative hidden lg:block">
                            <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent z-10" />
                                <div className="w-full h-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center">
                                    {/* Placeholder SVG or maybe a hero image from logic? For now Keep SVG */}
                                    <svg
                                        className="w-48 h-48 text-white/50"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2C8.5 2 6 4.5 6 7.5c0 2 1 3.5 2 4.5v8c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-8c1-1 2-2.5 2-4.5C18 4.5 15.5 2 12 2zm0 2c2.5 0 4 2 4 3.5 0 1.5-1 2.5-1.5 3l-.5.5V20h-4v-9l-.5-.5c-.5-.5-1.5-1.5-1.5-3C8 6 9.5 4 12 4z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Floating Cards */}
                            <div className="absolute -left-8 top-20 bg-white rounded-2xl p-4 shadow-xl animate-slide-up">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                        <CheckCircle className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-neutral-900">
                                            Easy Booking
                                        </p>
                                        <p className="text-sm text-neutral-500">
                                            Schedule in 60 seconds
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -right-8 bottom-32 bg-white rounded-2xl p-4 shadow-xl animate-slide-up delay-150">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                                        <Clock className="h-6 w-6 text-primary-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-neutral-900">
                                            Same Day Appointments
                                        </p>
                                        <p className="text-sm text-neutral-500">When you need us</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-8 h-12 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
                        <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse" />
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section-padding bg-neutral-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <Badge variant="primary" className="mb-4">
                            Why Choose Us
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                            Experience the{" "}
                            <span className="gradient-text">SmileCare Difference</span>
                        </h2>
                        <p className="text-lg text-neutral-600">
                            We combine advanced technology with compassionate care to deliver
                            exceptional results for every patient.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: Award,
                                title: "Expert Team",
                                description:
                                    "Board-certified dentists with years of experience and continuous education.",
                            },
                            {
                                icon: Sparkles,
                                title: "Latest Technology",
                                description:
                                    "State-of-the-art equipment for precise, comfortable treatments.",
                            },
                            {
                                icon: Heart,
                                title: "Patient-Centered",
                                description:
                                    "Your comfort and satisfaction are our top priorities.",
                            },
                            {
                                icon: Clock,
                                title: "Flexible Hours",
                                description:
                                    "Evening and weekend appointments available to fit your schedule.",
                            },
                        ].map((item, index) => (
                            <Card key={index} hover className="text-center p-6">
                                <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
                                    <item.icon className="h-8 w-8 text-primary-600" />
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-neutral-600">{item.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="section-padding">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <Badge variant="secondary" className="mb-4">
                            Our Services
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                            Comprehensive Dental Care
                        </h2>
                        <p className="text-lg text-neutral-600">
                            From routine checkups to advanced cosmetic procedures, we offer a
                            full range of dental services.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {activeServices.length > 0 ? (
                            activeServices.map((service) => (
                                <Card key={service.id} hover className="group">
                                    <div className="h-48 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center overflow-hidden">
                                        {service.image ? (
                                            <img src={service.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" alt={service.title} />
                                        ) : (
                                            <Stethoscope className="h-16 w-16 text-primary-600 group-hover:scale-110 transition-transform" />
                                        )}
                                    </div>
                                    <CardContent className="pt-6">
                                        <h3 className="text-lg font-bold text-neutral-900 mb-2">
                                            {service.title}
                                        </h3>
                                        <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                                            {service.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-primary-600 font-bold">
                                                From ₹{service.price}
                                            </span>
                                            <Link
                                                href={`/services#${service.id}`}
                                                className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1"
                                            >
                                                Learn more
                                                <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <p className="text-center col-span-4 text-neutral-500">No services available.</p>
                        )}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/services">
                            <Button variant="outline" size="lg">
                                View All Services
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Meet Our Team */}
            <section className="section-padding bg-neutral-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <Badge variant="primary" className="mb-4">
                            Our Team
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                            Meet Our Expert Dentists
                        </h2>
                        <p className="text-lg text-neutral-600">
                            Our skilled team of dental professionals is here to provide you
                            with exceptional care.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {activeDoctors.length > 0 ? (
                            activeDoctors.map((doctor) => (
                                <Card key={doctor.id} hover className="text-center overflow-hidden">
                                    <div className="h-64 bg-neutral-200 flex items-center justify-center relative">
                                        {doctor.image ? (
                                            <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <Users className="h-24 w-24 text-primary-600 opacity-50" />
                                        )}
                                    </div>
                                    <CardContent className="pt-6">
                                        <h3 className="text-xl font-bold text-neutral-900">
                                            {doctor.name}
                                        </h3>
                                        <p className="text-primary-600 font-medium mb-3">
                                            {doctor.title}
                                        </p>
                                        <div className="flex flex-wrap gap-2 justify-center">
                                            {doctor.specializations.slice(0, 2).map((spec) => (
                                                <Badge key={spec} variant="outline" className="text-xs">
                                                    {spec}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <p className="text-center col-span-4 text-neutral-500">Meet our team soon.</p>
                        )}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/team">
                            <Button variant="outline" size="lg">
                                Meet the Full Team
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section-padding">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <Badge variant="accent" className="mb-4">
                            Testimonials
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                            What Our Patients Say
                        </h2>
                        <p className="text-lg text-neutral-600">
                            Don&apos;t just take our word for it - hear from our satisfied
                            patients.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {activeTestimonials.length > 0 ? (
                            activeTestimonials.map((testimonial) => (
                                <Card key={testimonial.id} className="p-6">
                                    <Quote className="h-10 w-10 text-primary-200 mb-4" />
                                    <p className="text-neutral-700 mb-6 italic line-clamp-4">
                                        &ldquo;{testimonial.text}&rdquo;
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-primary-600 font-bold overflow-hidden">
                                            {testimonial.image ? (
                                                <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span>{testimonial.name.charAt(0)}</span>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-bold text-neutral-900 text-sm">
                                                {testimonial.name}
                                            </p>
                                            <p className="text-xs text-neutral-500">
                                                {testimonial.treatment}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 mt-4 text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? "fill-current" : "text-gray-300 fill-none"}`} />
                                        ))}
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <p className="text-center col-span-4 text-neutral-500">No reviews yet.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-gradient-to-r from-primary-600 to-secondary-500 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Transform Your Smile?
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Schedule your consultation today and take the first step towards a
                        healthier, more confident smile.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/booking">
                            <Button
                                variant="accent"
                                size="xl"
                                leftIcon={<Calendar className="h-5 w-5" />}
                            >
                                Book Your Appointment
                            </Button>
                        </Link>
                        <a href={`tel:${SITE_CONFIG.phone}`}>
                            <Button
                                variant="outline"
                                size="xl"
                                leftIcon={<Phone className="h-5 w-5" />}
                                className="border-white text-white hover:bg-white/10"
                            >
                                {SITE_CONFIG.phone}
                            </Button>
                        </a>
                    </div>
                </div>
            </section>

            {/* Schema Markup for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Dentist",
                        name: SITE_CONFIG.name,
                        description: SITE_CONFIG.description,
                        url: SITE_CONFIG.url,
                        telephone: SITE_CONFIG.phone,
                        email: SITE_CONFIG.email,
                        address: {
                            "@type": "PostalAddress",
                            streetAddress: SITE_CONFIG.address.street,
                            addressLocality: SITE_CONFIG.address.city,
                            addressRegion: SITE_CONFIG.address.state,
                            postalCode: SITE_CONFIG.address.zip,
                            addressCountry: SITE_CONFIG.address.country,
                        },
                        priceRange: "₹₹",
                        medicalSpecialty: "Dentistry",
                        availableService: activeServices.map((service) => ({
                            "@type": "MedicalProcedure",
                            name: service.title,
                            description: service.description,
                        })),
                    }),
                }}
            />
        </>
    );
}
