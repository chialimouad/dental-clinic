import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: `Privacy Policy for ${SITE_CONFIG.name}. Learn how we collect, use, and protect your personal information.`,
};

export default function PrivacyPage() {
    return (
        <>
            <section className="pt-32 pb-16 hero-gradient text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Privacy Policy
                        </h1>
                        <p className="text-xl text-white/90">
                            Last updated: February 5, 2024
                        </p>
                    </div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto prose prose-lg prose-neutral">
                        <h2>Introduction</h2>
                        <p>
                            At {SITE_CONFIG.name}, we are committed to protecting your privacy
                            and ensuring the security of your personal health information.
                            This Privacy Policy explains how we collect, use, disclose, and
                            safeguard your information when you visit our website or use our
                            dental services.
                        </p>

                        <h2>Information We Collect</h2>
                        <h3>Personal Information</h3>
                        <p>We may collect personal information that you provide directly to us, including:</p>
                        <ul>
                            <li>Name, email address, phone number, and mailing address</li>
                            <li>Date of birth and gender</li>
                            <li>Insurance information</li>
                            <li>Medical and dental history</li>
                            <li>Payment and billing information</li>
                        </ul>

                        <h3>Automatically Collected Information</h3>
                        <p>When you visit our website, we may automatically collect:</p>
                        <ul>
                            <li>IP address and browser type</li>
                            <li>Pages visited and time spent on pages</li>
                            <li>Referring website addresses</li>
                            <li>Device information</li>
                        </ul>

                        <h2>How We Use Your Information</h2>
                        <p>We use the information we collect to:</p>
                        <ul>
                            <li>Provide, maintain, and improve our dental services</li>
                            <li>Schedule and manage appointments</li>
                            <li>Process payments and insurance claims</li>
                            <li>Send appointment reminders and follow-up communications</li>
                            <li>Respond to your inquiries and provide customer support</li>
                            <li>Comply with legal and regulatory requirements</li>
                        </ul>

                        <h2>HIPAA Compliance</h2>
                        <p>
                            As a dental healthcare provider, we are subject to the Health
                            Insurance Portability and Accountability Act (HIPAA). We maintain
                            strict protocols to protect your Protected Health Information
                            (PHI) and comply with all applicable HIPAA requirements.
                        </p>

                        <h2>Information Sharing</h2>
                        <p>We may share your information with:</p>
                        <ul>
                            <li>Healthcare providers involved in your care</li>
                            <li>Insurance companies for claims processing</li>
                            <li>Service providers who assist in our operations</li>
                            <li>Law enforcement when required by law</li>
                        </ul>
                        <p>
                            We do not sell your personal information to third parties for
                            marketing purposes.
                        </p>

                        <h2>Data Security</h2>
                        <p>
                            We implement appropriate technical and organizational measures to
                            protect your personal information against unauthorized access,
                            alteration, disclosure, or destruction. This includes encryption,
                            secure servers, and regular security assessments.
                        </p>

                        <h2>Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul>
                            <li>Access your personal and health information</li>
                            <li>Request corrections to inaccurate information</li>
                            <li>Request restrictions on certain uses of your information</li>
                            <li>Receive a copy of your health records</li>
                            <li>File a complaint if you believe your privacy rights have been violated</li>
                        </ul>

                        <h2>Cookies and Tracking</h2>
                        <p>
                            Our website uses cookies and similar tracking technologies to
                            enhance your browsing experience. You can control cookie settings
                            through your browser preferences.
                        </p>

                        <h2>Children&apos;s Privacy</h2>
                        <p>
                            We collect information about minor patients only with parental
                            consent and in accordance with applicable laws. Parents or
                            guardians may access and manage their child&apos;s health
                            information.
                        </p>

                        <h2>Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. We will
                            notify you of any changes by posting the new policy on this page
                            and updating the &quot;Last updated&quot; date.
                        </p>

                        <h2>Contact Us</h2>
                        <p>
                            If you have questions about this Privacy Policy or our privacy
                            practices, please contact us at:
                        </p>
                        <p>
                            {SITE_CONFIG.name}
                            <br />
                            {SITE_CONFIG.address.street}
                            <br />
                            {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}{" "}
                            {SITE_CONFIG.address.zip}
                            <br />
                            Email: {SITE_CONFIG.email}
                            <br />
                            Phone: {SITE_CONFIG.phone}
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
