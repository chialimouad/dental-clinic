import { Metadata } from "next";
import { Button, Card, Badge } from "@/components/ui";
import { SITE_CONFIG } from "@/lib/constants";
import Link from "next/link";
import {
    Calendar,
    Award,
    Heart,
    Users,
    Target,
    Lightbulb,
    Shield,
    Clock,
} from "lucide-react";

export const metadata: Metadata = {
    title: "About Us",
    description:
        "Learn about SmileCare Dental Clinic, our mission, values, and commitment to exceptional dental care in Los Angeles.",
};

export default function AboutPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="pt-32 pb-16 hero-gradient text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        <Badge variant="accent" className="mb-4">
                            About Us
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Your Trusted Partner in Dental Health
                        </h1>
                        <p className="text-xl text-white/90">
                            For over 15 years, SmileCare Dental Clinic has been providing
                            exceptional dental care to families in Los Angeles. Our commitment
                            to excellence and patient satisfaction has made us one of the most
                            trusted dental practices in the region.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="section-padding">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <Badge variant="primary" className="mb-4">
                                Our Story
                            </Badge>
                            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                                A Legacy of Excellence in Dental Care
                            </h2>
                            <div className="space-y-4 text-neutral-600">
                                <p>
                                    SmileCare Dental Clinic was founded in 2009 by Dr. Sarah
                                    Mitchell with a simple vision: to create a dental practice
                                    where patients feel comfortable, valued, and receive the
                                    highest quality care possible.
                                </p>
                                <p>
                                    What started as a small practice has grown into a
                                    comprehensive dental center with a team of specialists
                                    covering every aspect of dental care. Throughout our growth,
                                    we&apos;ve never lost sight of our founding principles:
                                    patient-centered care, cutting-edge technology, and a warm,
                                    welcoming environment.
                                </p>
                                <p>
                                    Today, we&apos;re proud to serve over 5,000 patients and
                                    counting, helping them achieve and maintain beautiful, healthy
                                    smiles. Our state-of-the-art facility is equipped with the
                                    latest dental technology, ensuring you receive the most
                                    advanced and effective treatments available.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="w-full h-[500px] rounded-3xl bg-gradient-to-br from-primary-200 to-secondary-200 flex items-center justify-center">
                                <Users className="h-48 w-48 text-primary-500" />
                            </div>
                            <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-xl">
                                <div className="text-4xl font-bold text-primary-600">15+</div>
                                <div className="text-neutral-600">Years of Excellence</div>
                            </div>
                            <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-6 shadow-xl">
                                <div className="text-4xl font-bold text-secondary-600">
                                    5000+
                                </div>
                                <div className="text-neutral-600">Happy Patients</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section-padding bg-neutral-50">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="p-8">
                            <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mb-6">
                                <Target className="h-8 w-8 text-primary-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                                Our Mission
                            </h3>
                            <p className="text-neutral-600 leading-relaxed">
                                To provide exceptional, comprehensive dental care in a
                                comfortable and caring environment. We are committed to helping
                                our patients achieve optimal oral health through prevention,
                                education, and state-of-the-art treatment options.
                            </p>
                        </Card>
                        <Card className="p-8">
                            <div className="w-16 h-16 rounded-2xl bg-secondary-100 flex items-center justify-center mb-6">
                                <Lightbulb className="h-8 w-8 text-secondary-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                                Our Vision
                            </h3>
                            <p className="text-neutral-600 leading-relaxed">
                                To be the leading dental practice in Los Angeles, recognized for
                                our commitment to excellence, innovation, and patient
                                satisfaction. We envision a community where everyone has access
                                to quality dental care and can smile with confidence.
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="section-padding">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <Badge variant="primary" className="mb-4">
                            Our Values
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                            The Principles That Guide Us
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: Heart,
                                title: "Compassion",
                                description:
                                    "We treat every patient with kindness, empathy, and respect, understanding that dental visits can be stressful.",
                            },
                            {
                                icon: Award,
                                title: "Excellence",
                                description:
                                    "We strive for excellence in everything we do, from patient care to continuing education for our team.",
                            },
                            {
                                icon: Shield,
                                title: "Integrity",
                                description:
                                    "We maintain the highest ethical standards, providing honest recommendations and transparent pricing.",
                            },
                            {
                                icon: Clock,
                                title: "Accessibility",
                                description:
                                    "We believe everyone deserves quality dental care, offering flexible scheduling and payment options.",
                            },
                        ].map((value, index) => (
                            <Card key={index} hover className="text-center p-6">
                                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                                    <value.icon className="h-8 w-8 text-primary-600" />
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-neutral-600">{value.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="section-padding bg-gradient-to-r from-primary-600 to-secondary-500 text-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { number: "15+", label: "Years of Experience" },
                            { number: "5000+", label: "Happy Patients" },
                            { number: "4", label: "Expert Dentists" },
                            { number: "8+", label: "Services Offered" },
                        ].map((stat, index) => (
                            <div key={index}>
                                <div className="text-4xl md:text-5xl font-bold mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-white/80">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                        Experience the SmileCare Difference
                    </h2>
                    <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
                        Join thousands of satisfied patients who have trusted us with their
                        dental care. Schedule your consultation today.
                    </p>
                    <Link href="/booking">
                        <Button
                            variant="primary"
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
