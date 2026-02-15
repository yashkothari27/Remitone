import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
    title: 'Privacy Policy - Remitone | Your Privacy Matters',
    description: 'Read Remitone\'s privacy policy to understand how we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
    return (
        <main className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-12 bg-gradient-to-br from-primary-50 via-accent-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Privacy <span className="text-gradient">Policy</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            Last Updated: February 13, 2026
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto prose dark:prose-invert prose-lg">
                        <h2>Introduction</h2>
                        <p>
                            Remitone (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our money transfer services.
                        </p>

                        <h2>Information We Collect</h2>
                        <h3>Personal Information</h3>
                        <p>We collect personal information that you provide to us, including:</p>
                        <ul>
                            <li>Name, address, date of birth, and contact information</li>
                            <li>Government-issued identification documents</li>
                            <li>Bank account and payment card information</li>
                            <li>Transaction history and transfer details</li>
                            <li>Information about recipients of your transfers</li>
                        </ul>

                        <h3>Automatically Collected Information</h3>
                        <p>When you use our services, we automatically collect:</p>
                        <ul>
                            <li>Device information (IP address, browser type, operating system)</li>
                            <li>Usage data (pages visited, features used, time spent)</li>
                            <li>Location data (with your permission)</li>
                            <li>Cookies and similar tracking technologies</li>
                        </ul>

                        <h2>How We Use Your Information</h2>
                        <p>We use your information to:</p>
                        <ul>
                            <li>Process your money transfer transactions</li>
                            <li>Verify your identity and prevent fraud</li>
                            <li>Comply with legal and regulatory requirements</li>
                            <li>Improve our services and customer experience</li>
                            <li>Send you service updates and promotional materials (with your consent)</li>
                            <li>Provide customer support</li>
                        </ul>

                        <h2>Information Sharing and Disclosure</h2>
                        <p>We may share your information with:</p>
                        <ul>
                            <li><strong>Service Providers:</strong> Third parties who perform services on our behalf (payment processors, identity verification, customer support)</li>
                            <li><strong>Financial Partners:</strong> Banks and financial institutions that facilitate transfers</li>
                            <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
                            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                        </ul>
                        <p>We do not sell your personal information to third parties.</p>

                        <h2>Data Security</h2>
                        <p>
                            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These include:
                        </p>
                        <ul>
                            <li>Encryption of data in transit and at rest</li>
                            <li>Regular security assessments and audits</li>
                            <li>Access controls and authentication requirements</li>
                            <li>Employee training on data protection</li>
                        </ul>

                        <h2>Your Rights</h2>
                        <p>Depending on your location, you may have the right to:</p>
                        <ul>
                            <li>Access and receive a copy of your personal information</li>
                            <li>Correct inaccurate or incomplete information</li>
                            <li>Request deletion of your information</li>
                            <li>Object to or restrict certain processing activities</li>
                            <li>Data portability</li>
                            <li>Withdraw consent (where applicable)</li>
                        </ul>

                        <h2>Data Retention</h2>
                        <p>
                            We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements. Typically, we retain transaction data for at least 5 years as required by financial regulations.
                        </p>

                        <h2>International Transfers</h2>
                        <p>
                            Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. We ensure appropriate safeguards are in place to protect your information.
                        </p>

                        <h2>Children&apos;s Privacy</h2>
                        <p>
                            Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.
                        </p>

                        <h2>Updates to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the &quot;Last Updated&quot; date.
                        </p>

                        <h2>Contact Us</h2>
                        <p>
                            If you have questions about this Privacy Policy or our privacy practices, please contact us at:
                        </p>
                        <p>
                            Email: <a href="mailto:privacy@remitone.com">privacy@remitone.com</a><br />
                            Address: [To be provided]
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
