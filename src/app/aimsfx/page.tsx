import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import { ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
    title: 'AIMSFX - Remitone Partner | Foreign Exchange Services',
    description: 'Learn about AIMSFX, our trusted partner for foreign exchange services and international money transfers.',
}

export default function AIMSFXPage() {
    return (
        <main className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-cny-red">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            <span className="text-cny-gold">AIMSFX</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90">
                            Our Trusted Partner for Foreign Exchange Services
                        </p>
                    </div>
                </div>
            </section>

            {/* About AIMSFX */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="prose dark:prose-invert prose-lg mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                About AIMSFX
                            </h2>
                            <p>
                                Remitone partners with AIMSFX to provide enhanced foreign exchange services and competitive rates for international money transfers. This partnership allows us to offer you better value and more options when sending money abroad.
                            </p>
                            <p>
                                AIMSFX is a leading foreign exchange and payment solutions provider, specializing in international money transfers and currency exchange services. Their expertise and global network enable Remitone to deliver fast, secure, and cost-effective transfers to destinations worldwide.
                            </p>
                        </div>

                        {/* Benefits */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-2xl p-8">
                                <h3 className="text-2xl font-bold mb-4">Competitive Rates</h3>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Access to wholesale foreign exchange rates, ensuring you get more value for your money.
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-900/20 dark:to-accent-800/20 rounded-2xl p-8">
                                <h3 className="text-2xl font-bold mb-4">Global Reach</h3>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Expanded network of payout options and corridors through AIMSFX&apos;s partnerships.
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-8">
                                <h3 className="text-2xl font-bold mb-4">Security</h3>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Fully regulated and compliant with international financial standards and regulations.
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-2xl p-8">
                                <h3 className="text-2xl font-bold mb-4">Expertise</h3>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Years of experience in foreign exchange and payment processing services.
                                </p>
                            </div>
                        </div>

                        {/* Partnership Details */}
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-12">
                            <h2 className="text-3xl font-bold mb-6">Partnership Details</h2>
                            <div className="space-y-4 text-gray-700 dark:text-gray-300">
                                <p>
                                    Through our partnership with AIMSFX, Remitone customers benefit from:
                                </p>
                                <ul className="space-y-2 ml-6">
                                    <li className="flex items-start gap-2">
                                        <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Enhanced exchange rate margins for better value transfers</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Faster processing times for select corridors</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Additional payout options including bank transfers and cash pickup locations</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Dedicated compliance and fraud prevention measures</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="text-center">
                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                                Learn more about AIMSFX and their services
                            </p>
                            {/* TODO: Replace with actual AIMSFX website URL when provided */}
                            <a
                                href="https://aimsfx.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-cny-gold-gradient text-black px-7 py-3.5 rounded-xl font-semibold hover:shadow-glow transition-all"
                            >
                                Visit AIMSFX Website
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
