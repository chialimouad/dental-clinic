"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { Menu, X, Phone, Calendar } from "lucide-react";

export function Header() {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    React.useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
                isScrolled
                    ? "bg-white/95 backdrop-blur-md shadow-lg"
                    : "bg-transparent"
            )}
        >
            {/* Top Bar */}
            <div className="hidden md:block bg-primary-700 text-white py-2">
                <div className="container mx-auto px-4 flex justify-between items-center text-sm">
                    <div className="flex items-center gap-6">
                        <a
                            href={`tel:${SITE_CONFIG.phone}`}
                            className="flex items-center gap-2 hover:text-primary-200 transition-colors"
                        >
                            <Phone className="h-4 w-4" />
                            {SITE_CONFIG.phone}
                        </a>
                        <span>{SITE_CONFIG.hours.weekdays}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span>Emergency? Call us 24/7</span>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2C8.5 2 6 4.5 6 7.5c0 2 1 3.5 2 4.5v8c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-8c1-1 2-2.5 2-4.5C18 4.5 15.5 2 12 2zm0 2c2.5 0 4 2 4 3.5 0 1.5-1 2.5-1.5 3l-.5.5V20h-4v-9l-.5-.5c-.5-.5-1.5-1.5-1.5-3C8 6 9.5 4 12 4z" />
                            </svg>
                        </div>
                        <div>
                            <span
                                className={cn(
                                    "text-xl font-bold transition-colors",
                                    isScrolled ? "text-neutral-900" : "text-white"
                                )}
                            >
                                SmileCare
                            </span>
                            <span
                                className={cn(
                                    "block text-xs font-medium transition-colors",
                                    isScrolled ? "text-neutral-500" : "text-white/80"
                                )}
                            >
                                Dental Clinic
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary-500",
                                    isScrolled ? "text-neutral-700" : "text-white"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden lg:flex items-center gap-4">
                        <Link href="/booking">
                            <Button variant="accent" size="lg" leftIcon={<Calendar className="h-5 w-5" />}>
                                Book Appointment
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={cn(
                            "lg:hidden p-2 rounded-lg transition-colors",
                            isScrolled
                                ? "text-neutral-700 hover:bg-neutral-100"
                                : "text-white hover:bg-white/10"
                        )}
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 top-20 bg-white z-50 animate-slide-down">
                    <div className="container mx-auto px-4 py-8">
                        <nav className="flex flex-col gap-4">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-medium text-neutral-700 hover:text-primary-500 py-3 border-b border-neutral-100 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="pt-4">
                                <Link href="/booking" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button
                                        variant="accent"
                                        size="lg"
                                        className="w-full"
                                        leftIcon={<Calendar className="h-5 w-5" />}
                                    >
                                        Book Appointment
                                    </Button>
                                </Link>
                            </div>
                            <div className="pt-4 text-center">
                                <a
                                    href={`tel:${SITE_CONFIG.phone}`}
                                    className="flex items-center justify-center gap-2 text-primary-600 font-medium"
                                >
                                    <Phone className="h-5 w-5" />
                                    {SITE_CONFIG.phone}
                                </a>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}
