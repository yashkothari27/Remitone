import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { FileText, Mail, Phone, Clock } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Complaints Procedure - Remitone | How to File a Complaint',
    description: 'Learn about Remitone\'s complaints procedure and how to submit a complaint if you\'re not satisfied with our service.',
}

export default function ComplaintsPage() {
    return (
        <main className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-12 bg-gradient-to-br from-primary-50 via-accent-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Complaints <span className="text-gradient">Procedure</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            We take your concerns seriously and are committed to resolving them
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Introduction */}
                        <div className="prose dark:prose-invert prose-lg mb-12">
                            <p>
                                At Remitone, we strive to provide excellent service. However, if you&apos;re not satisfied with any aspect of our service, we want to hear from you. This complaints procedure outlines how to submit a complaint and what to expect during the resolution process.
                            </p>
                        </div>

                        {/* How to Submit a Complaint */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-6">How to Submit a Complaint</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
                                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-primary rounded-xl flex items-center justify-center">
                                        <Mail className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">Email</h3>
                                    <a
                                        href="mailto:complaints@remitone.com"
                                        className="text-primary-600 hover:text-primary-700 transition-colors"
                                    >
                                        complaints@remitone.com
                                    </a>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
                                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-primary rounded-xl flex items-center justify-center">
                                        <Phone className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">Phone</h3>
                                    <a
                                        href="tel:+18001234567"
                                        className="text-primary-600 hover:text-primary-700 transition-colors"
                                    >
                                        +1 (800) 123-4567
                                    </a>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
                                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-primary rounded-xl flex items-center justify-center">
                                        <FileText className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">Written</h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        [Address to be provided]
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* What to Include */}
                        <div className="prose dark:prose-invert prose-lg mb-12">
                            <h2>What to Include in Your Complaint</h2>
                            <p>To help us resolve your complaint quickly and effectively, please provide:</p>
                            <ul>
                                <li>Your full name and contact information</li>
                                <li>Your account number or transaction reference</li>
                                <li>Details of the issue, including dates and amounts</li>
                                <li>What you would like us to do to resolve the issue</li>
                                <li>Any supporting documentation (receipts, screenshots, emails)</li>
                            </ul>
                        </div>

                        {/* Resolution Process */}
                        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-8 mb-12">
                            <h2 className="text-3xl font-bold mb-6">Resolution Process</h2>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                                            1
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">Acknowledgment</h3>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            We will acknowledge receipt of your complaint within 2 business days.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                                            2
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">Investigation</h3>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            We will investigate your complaint thoroughly and may contact you for additional information.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                                            3
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">Resolution</h3>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            We aim to resolve most complaints within 15 business days. Complex cases may take up to 30 days.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                                            4
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">Response</h3>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            We will provide you with a written response explaining our findings and any actions taken.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Escalation */}
                        <div className="prose dark:prose-invert prose-lg mb-12">
                            <h2>If You&apos;re Not Satisfied</h2>
                            <p>
                                If you&apos;re not satisfied with our response, you can:
                            </p>
                            <ul>
                                <li>Request escalation to a senior manager by contacting us at the details above</li>
                                <li>Contact the relevant financial regulatory authority in your jurisdiction</li>
                                <li>Use alternative dispute resolution services (where available)</li>
                            </ul>
                        </div>

                        {/* Regulatory Information */}
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
                            <h2 className="text-2xl font-bold mb-4">Regulatory Information</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Remitone is regulated by [Regulatory body to be specified]. If you believe we have not handled your complaint appropriately, you can contact the regulator:
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">
                                [Regulator contact information to be provided]
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
