import { Metadata } from "next";
import Link from "next/link";
import { Button, Card, CardContent, Badge } from "@/components/ui";
import { getDoctors } from "@/lib/actions/doctors";
import { Calendar, GraduationCap, Award, Users } from "lucide-react";

export const metadata: Metadata = {
    title: "Our Team",
    description:
        "Meet our team of experienced dental professionals at SmileCare Dental Clinic. Our board-certified dentists are dedicated to providing exceptional care.",
};

export const dynamic = "force-dynamic";

export default async function TeamPage() {
    const allDoctors = await getDoctors();
    const doctors = allDoctors.filter(d => d.isActive);

    return (
        <>
            {/* Hero Section */}
            <section className="pt-32 pb-16 hero-gradient text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        <Badge variant="accent" className="mb-4">
                            Our Team
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Meet Our Expert Dental Team
                        </h1>
                        <p className="text-xl text-white/90">
                            Our team of experienced, compassionate dental professionals is
                            dedicated to providing you with the highest standard of care in a
                            comfortable environment.
                        </p>
                    </div>
                </div>
            </section>

            {/* Team Grid */}
            <section className="section-padding">
                <div className="container mx-auto px-4">
                    {doctors.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-8">
                            {doctors.map((doctor) => (
                                <Card key={doctor.id} className="overflow-hidden">
                                    <div className="grid md:grid-cols-2 h-full">
                                        <div className="h-80 md:h-auto bg-neutral-200 flex items-center justify-center relative overflow-hidden">
                                            {doctor.image ? (
                                                <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <Users className="h-32 w-32 text-primary-600 opacity-50" />
                                            )}
                                        </div>
                                        <CardContent className="p-6 flex flex-col justify-center">
                                            <h3 className="text-2xl font-bold text-neutral-900 mb-1">
                                                {doctor.name}
                                            </h3>
                                            <p className="text-primary-600 font-medium mb-4">
                                                {doctor.title}
                                            </p>
                                            <p className="text-neutral-600 mb-4 text-sm leading-relaxed line-clamp-4">
                                                {doctor.bio}
                                            </p>
                                            <div className="mb-4">
                                                <div className="flex items-center gap-2 text-sm text-neutral-600 mb-2">
                                                    <GraduationCap className="h-4 w-4 text-primary-500" />
                                                    <span>{doctor.education}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {doctor.specializations.slice(0, 3).map((spec) => (
                                                    <Badge key={spec} variant="outline" className="text-xs">
                                                        {spec}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <div className="mt-auto">
                                                <Link href="/booking">
                                                    <Button variant="primary" size="sm" className="w-full">
                                                        Book with {doctor.name.split(" ")[1] || doctor.name}
                                                    </Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-neutral-500 py-12">
                            <p>No team members found.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Why Our Team */}
            <section className="section-padding bg-neutral-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <Badge variant="primary" className="mb-4">
                            Why Choose Our Team
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                            Excellence in Every Smile
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: GraduationCap,
                                title: "Continuous Education",
                                description:
                                    "Our team regularly attends conferences and training to stay current with the latest dental advancements.",
                            },
                            {
                                icon: Award,
                                title: "Board Certified",
                                description:
                                    "All our dentists are board-certified with years of experience in their respective specialties.",
                            },
                            {
                                icon: Users,
                                title: "Collaborative Care",
                                description:
                                    "We work together as a team to ensure you receive comprehensive, coordinated care.",
                            },
                        ].map((item, index) => (
                            <Card key={index} hover className="text-center p-8">
                                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
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

            {/* Join Our Team CTA */}
            <section className="section-padding">
                <div className="container mx-auto px-4">
                    <div className="bg-gradient-to-r from-primary-600 to-secondary-500 rounded-3xl p-8 md:p-12 text-white text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Join Our Team
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            We&apos;re always looking for talented dental professionals who
                            share our passion for exceptional patient care.
                        </p>
                        <Link href="/contact">
                            <Button variant="accent" size="xl">
                                View Career Opportunities
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-neutral-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                        Ready to Meet Our Team?
                    </h2>
                    <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
                        Schedule your appointment today and experience the care and
                        expertise of our dental professionals.
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
