import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Terms of Service",
    description: `Terms of Service for ${SITE_CONFIG.name}. Read our terms and conditions for using our dental services.`,
};

export default function TermsPage() {
    return (
        <>
            <section className="pt-32 pb-16 hero-gradient text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Terms of Service
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
                        <h2>Agreement to Terms</h2>
                        <p>
                            By accessing or using the services of {SITE_CONFIG.name}, you
                            agree to be bound by these Terms of Service. If you do not agree
                            to these terms, please do not use our services.
                        </p>

                        <h2>Services Provided</h2>
                        <p>
                            {SITE_CONFIG.name} provides dental care services including but not
                            limited to:
                        </p>
                        <ul>
                            <li>General dentistry and preventive care</li>
                            <li>Cosmetic dentistry procedures</li>
                            <li>Restorative dental treatments</li>
                            <li>Orthodontic services</li>
                            <li>Oral surgery</li>
                            <li>Pediatric dentistry</li>
                            <li>Emergency dental care</li>
                        </ul>

                        <h2>Appointments</h2>
                        <h3>Scheduling</h3>
                        <p>
                            Appointments can be scheduled through our website, by phone, or in
                            person. We will make reasonable efforts to accommodate your
                            preferred times but cannot guarantee specific appointment slots.
                        </p>

                        <h3>Cancellation Policy</h3>
                        <p>
                            We require at least 24 hours notice for appointment cancellations
                            or rescheduling. Missed appointments or late cancellations may
                            result in a fee of up to $50. Repeated missed appointments may
                            affect your ability to schedule future appointments.
                        </p>

                        <h3>Late Arrivals</h3>
                        <p>
                            Please arrive 10-15 minutes before your scheduled appointment. If
                            you arrive more than 15 minutes late, we may need to reschedule
                            your appointment to avoid delays for other patients.
                        </p>

                        <h2>Payment Terms</h2>
                        <h3>Payment Methods</h3>
                        <p>
                            We accept cash, credit cards, debit cards, and personal checks.
                            Payment is due at the time of service unless other arrangements
                            have been made.
                        </p>

                        <h3>Insurance</h3>
                        <p>
                            We accept most major dental insurance plans. We will submit claims
                            on your behalf, but you are responsible for any amounts not
                            covered by insurance. Please verify your coverage before your
                            appointment.
                        </p>

                        <h3>Payment Plans</h3>
                        <p>
                            For extensive treatments, we offer payment plans through
                            third-party financing. Please ask our staff for more information.
                        </p>

                        <h2>Patient Responsibilities</h2>
                        <p>As a patient, you agree to:</p>
                        <ul>
                            <li>Provide accurate and complete health information</li>
                            <li>Notify us of any changes to your health status</li>
                            <li>Follow treatment recommendations and post-care instructions</li>
                            <li>Arrive on time for scheduled appointments</li>
                            <li>Pay for services in a timely manner</li>
                            <li>Treat our staff with respect and courtesy</li>
                        </ul>

                        <h2>Consent to Treatment</h2>
                        <p>
                            Before receiving treatment, you will be asked to sign an informed
                            consent form. This form acknowledges that you understand the
                            proposed treatment, its risks and benefits, and alternative
                            options. You have the right to refuse any treatment.
                        </p>

                        <h2>Medical Records</h2>
                        <p>
                            We maintain dental records in accordance with applicable laws. You
                            may request copies of your records by submitting a written
                            request. A reasonable fee may apply for copying and processing.
                        </p>

                        <h2>Website Use</h2>
                        <h3>Accuracy of Information</h3>
                        <p>
                            We strive to provide accurate information on our website, but we
                            do not guarantee the completeness or accuracy of all content. The
                            information provided is for general purposes and should not
                            replace professional dental advice.
                        </p>

                        <h3>Intellectual Property</h3>
                        <p>
                            All content on our website, including text, images, logos, and
                            graphics, is our property and protected by copyright laws. You may
                            not use, reproduce, or distribute our content without written
                            permission.
                        </p>

                        <h2>Limitation of Liability</h2>
                        <p>
                            To the fullest extent permitted by law, {SITE_CONFIG.name} shall
                            not be liable for any indirect, incidental, special, or
                            consequential damages arising from your use of our services or
                            website.
                        </p>

                        <h2>Dispute Resolution</h2>
                        <p>
                            Any disputes arising from these terms or our services shall be
                            resolved through good-faith negotiation. If negotiation fails,
                            disputes may be submitted to binding arbitration in accordance
                            with California law.
                        </p>

                        <h2>Changes to Terms</h2>
                        <p>
                            We reserve the right to modify these Terms of Service at any time.
                            Changes will be posted on this page with an updated effective
                            date. Continued use of our services after changes constitutes
                            acceptance of the new terms.
                        </p>

                        <h2>Contact Information</h2>
                        <p>
                            For questions about these Terms of Service, please contact us:
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
