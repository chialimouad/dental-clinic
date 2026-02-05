import Link from "next/link";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";
import {
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
    Phone,
    Mail,
    MapPin,
    Clock,
    ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-neutral-900 text-white">
            {/* CTA Section */}
            <div className="bg-gradient-to-r from-primary-600 to-secondary-500">
                <div className="container mx-auto px-4 py-16">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">
                                Ready for Your Best Smile?
                            </h2>
                            <p className="text-white/90 text-lg">
                                Schedule your appointment today and experience exceptional dental care.
                            </p>
                        </div>
                        <Link href="/booking">
                            <Button
                                variant="accent"
                                size="xl"
                                rightIcon={<ArrowRight className="h-5 w-5" />}
                            >
                                Book Your Appointment
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* About */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                                <svg
                                    className="w-8 h-8 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2C8.5 2 6 4.5 6 7.5c0 2 1 3.5 2 4.5v8c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-8c1-1 2-2.5 2-4.5C18 4.5 15.5 2 12 2zm0 2c2.5 0 4 2 4 3.5 0 1.5-1 2.5-1.5 3l-.5.5V20h-4v-9l-.5-.5c-.5-.5-1.5-1.5-1.5-3C8 6 9.5 4 12 4z" />
                                </svg>
                            </div>
                            <div>
                                <span className="text-xl font-bold">SmileCare</span>
                                <span className="block text-xs text-neutral-400">
                                    Dental Clinic
                                </span>
                            </div>
                        </div>
                        <p className="text-neutral-400 mb-6 leading-relaxed">
                            {SITE_CONFIG.description}
                        </p>
                        <div className="flex gap-4">
                            <a
                                href={SITE_CONFIG.social.facebook}
                                className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-primary-600 hover:text-white transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a
                                href={SITE_CONFIG.social.instagram}
                                className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-primary-600 hover:text-white transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a
                                href={SITE_CONFIG.social.twitter}
                                className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-primary-600 hover:text-white transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href={SITE_CONFIG.social.linkedin}
                                className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-primary-600 hover:text-white transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Quick Links</h3>
                        <nav className="flex flex-col gap-3">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-neutral-400 hover:text-primary-400 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href="/privacy"
                                className="text-neutral-400 hover:text-primary-400 transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-neutral-400 hover:text-primary-400 transition-colors"
                            >
                                Terms of Service
                            </Link>
                        </nav>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Our Services</h3>
                        <nav className="flex flex-col gap-3">
                            <Link
                                href="/services#general"
                                className="text-neutral-400 hover:text-primary-400 transition-colors"
                            >
                                General Dentistry
                            </Link>
                            <Link
                                href="/services#whitening"
                                className="text-neutral-400 hover:text-primary-400 transition-colors"
                            >
                                Teeth Whitening
                            </Link>
                            <Link
                                href="/services#implants"
                                className="text-neutral-400 hover:text-primary-400 transition-colors"
                            >
                                Dental Implants
                            </Link>
                            <Link
                                href="/services#orthodontics"
                                className="text-neutral-400 hover:text-primary-400 transition-colors"
                            >
                                Orthodontics
                            </Link>
                            <Link
                                href="/services#cosmetic"
                                className="text-neutral-400 hover:text-primary-400 transition-colors"
                            >
                                Cosmetic Dentistry
                            </Link>
                            <Link
                                href="/services#pediatric"
                                className="text-neutral-400 hover:text-primary-400 transition-colors"
                            >
                                Pediatric Dentistry
                            </Link>
                        </nav>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Contact Us</h3>
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-3">
                                <MapPin className="h-5 w-5 text-primary-400 flex-shrink-0 mt-0.5" />
                                <p className="text-neutral-400">
                                    {SITE_CONFIG.address.street}
                                    <br />
                                    {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}{" "}
                                    {SITE_CONFIG.address.zip}
                                </p>
                            </div>
                            <a
                                href={`tel:${SITE_CONFIG.phone}`}
                                className="flex items-center gap-3 text-neutral-400 hover:text-primary-400 transition-colors"
                            >
                                <Phone className="h-5 w-5 text-primary-400 flex-shrink-0" />
                                {SITE_CONFIG.phone}
                            </a>
                            <a
                                href={`mailto:${SITE_CONFIG.email}`}
                                className="flex items-center gap-3 text-neutral-400 hover:text-primary-400 transition-colors"
                            >
                                <Mail className="h-5 w-5 text-primary-400 flex-shrink-0" />
                                {SITE_CONFIG.email}
                            </a>
                            <div className="flex gap-3">
                                <Clock className="h-5 w-5 text-primary-400 flex-shrink-0 mt-0.5" />
                                <div className="text-neutral-400">
                                    <p>Mon-Fri: {SITE_CONFIG.hours.weekdays}</p>
                                    <p>Saturday: {SITE_CONFIG.hours.saturday}</p>
                                    <p>Sunday: {SITE_CONFIG.hours.sunday}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-neutral-800">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
                        <p>
                            © {currentYear} {SITE_CONFIG.name}. All rights reserved.
                        </p>
                        <p>Designed with care for your perfect smile.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
