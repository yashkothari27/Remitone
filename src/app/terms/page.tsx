import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
    title: 'Terms of Service - Remitone | User Agreement',
    description: 'Read Remitone\'s terms of service to understand the terms and conditions governing the use of our money transfer services.',
}

export default function TermsPage() {
    return (
        <main className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-12 bg-cny-red">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                            Terms of <span className="text-cny-gold">Service</span>
                        </h1>
                        <p className="text-xl text-white/90">
                            Last Updated: February 13, 2026
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto prose dark:prose-invert prose-lg">
                        <h2>Agreement to Terms</h2>
                        <p>
                            By accessing and using Remitone&apos;s money transfer services (&quot;Services&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use our Services.
                        </p>

                        <h2>Eligibility</h2>
                        <p>To use our Services, you must:</p>
                        <ul>
                            <li>Be at least 18 years of age</li>
                            <li>Have the legal capacity to enter into binding contracts</li>
                            <li>Provide accurate and complete information during registration</li>
                            <li>Not be prohibited from using our Services under applicable laws</li>
                        </ul>

                        <h2>Account Registration</h2>
                        <p>
                            To use our Services, you must create an account. You agree to:
                        </p>
                        <ul>
                            <li>Provide accurate, current, and complete information</li>
                            <li>Maintain and update your information as necessary</li>
                            <li>Keep your password secure and confidential</li>
                            <li>Notify us immediately of any unauthorized use of your account</li>
                            <li>Be responsible for all activities under your account</li>
                        </ul>

                        <h2>Money Transfer Services</h2>
                        <h3>Processing Transfers</h3>
                        <p>
                            We will process your transfer requests based on the information you provide. Delivery times vary by destination, delivery method, and other factors. While we strive to meet estimated delivery times, we cannot guarantee exact delivery times.
                        </p>

                        <h3>Fees and Exchange Rates</h3>
                        <p>
                            Transfer fees and exchange rates are disclosed before you complete a transaction. Fees and rates may vary based on:
                        </p>
                        <ul>
                            <li>Transfer amount</li>
                            <li>Destination country</li>
                            <li>Delivery method</li>
                            <li>Payment method</li>
                        </ul>
                        <p>Exchange rates are locked in when you complete your transfer and may differ from rates shown during browsing.</p>

                        <h3>Transfer Limits</h3>
                        <p>
                            Transfer limits may apply based on regulatory requirements, your verification status, and risk assessment. We reserve the right to adjust limits at any time.
                        </p>

                        <h2>Prohibited Uses</h2>
                        <p>You may not use our Services to:</p>
                        <ul>
                            <li>Engage in illegal activities or money laundering</li>
                            <li>Finance terrorist activities</li>
                            <li>Violate any applicable laws or regulations</li>
                            <li>Send funds to sanctioned countries or individuals</li>
                            <li>Provide false or misleading information</li>
                            <li>Interfere with or disrupt our Services</li>
                        </ul>

                        <h2>Identity Verification</h2>
                        <p>
                            We are required by law to verify your identity. You agree to provide government-issued identification and other documents as requested. We may use third-party services for identity verification.
                        </p>

                        <h2>Cancellations and Refunds</h2>
                        <p>
                            You may be able to cancel a transfer before it has been processed. Cancellation policies and refund timeframes vary based on the transfer status and payment method. Transfer fees may be non-refundable in certain circumstances.
                        </p>

                        <h2>Liability and Disclaimers</h2>
                        <p>
                            Our Services are provided &quot;as is&quot; without warranties of any kind. To the maximum extent permitted by law:
                        </p>
                        <ul>
                            <li>We are not liable for delays caused by third parties, banks, or factors beyond our control</li>
                            <li>We are not responsible for errors in recipient information you provide</li>
                            <li>Our total liability is limited to the amount of your transfer</li>
                        </ul>

                        <h2>Dispute Resolution</h2>
                        <p>
                            If you have a dispute, please contact our customer support first. We aim to resolve issues promptly and fairly. For unresolved disputes, arbitration or mediation may be required depending on your jurisdiction.
                        </p>

                        <h2>Modifications to Terms</h2>
                        <p>
                            We reserve the right to modify these Terms at any time. Material changes will be communicated to you via email or through our Services. Continued use of our Services after changes constitutes acceptance of the modified Terms.
                        </p>

                        <h2>Termination</h2>
                        <p>
                            We may suspend or terminate your access to our Services at any time for:
                        </p>
                        <ul>
                            <li>Violation of these Terms</li>
                            <li>Suspected fraudulent activity</li>
                            <li>Compliance with legal requirements</li>
                            <li>Other legitimate business reasons</li>
                        </ul>

                        <h2>Governing Law</h2>
                        <p>
                            These Terms are governed by the laws of [Jurisdiction to be specified]. Any disputes shall be resolved in the courts of [Jurisdiction to be specified].
                        </p>

                        <h2>Contact Information</h2>
                        <p>
                            For questions about these Terms, please contact us at:
                        </p>
                        <p>
                            Email: <a href="mailto:legal@remitone.com">legal@remitone.com</a><br />
                            Address: [To be provided]
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
