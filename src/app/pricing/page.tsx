import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import { ArrowRight, DollarSign, TrendingDown, Calculator } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Pricing & Fees - Remitone | Transparent Exchange Rates',
    description: 'Send money globally with competitive exchange rates and low fees. No hidden charges. See exactly what you pay.',
}

export default function PricingPage() {
    // TODO: Replace with actual Remitone platform URL
    const REMITONE_PLATFORM_URL = 'https://app.remitone.com'

    return (
        <main className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-50 via-accent-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Transparent <span className="text-gradient">Pricing</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
                            No hidden fees. No surprises. Just honest, competitive rates.
                        </p>
                    </div>
                </div>
            </section>

            {/* Key Benefits */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-2xl flex items-center justify-center">
                                <DollarSign className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Low Fees</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Starting from just $2.99 per transfer
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-accent rounded-2xl flex items-center justify-center">
                                <TrendingDown className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Best Rates</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Competitive exchange rates, updated in real-time
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-2xl flex items-center justify-center">
                                <Calculator className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Easy Calculation</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Know exactly what you'll pay before you send
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fee Structure */}
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                            Fee Structure
                        </h2>

                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 mb-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-semibold mb-4">Transfer Fees</h3>
                                    <ul className="space-y-3">
                                        <li className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">$0 - $500</span>
                                            <span className="font-semibold">$2.99</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">$501 - $2,000</span>
                                            <span className="font-semibold">$4.99</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">$2,001 - $10,000</span>
                                            <span className="font-semibold">$9.99</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">$10,001+</span>
                                            <span className="font-semibold">$14.99</span>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-4">Delivery Speed</h3>
                                    <ul className="space-y-3">
                                        <li className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Instant (minutes)</span>
                                            <span className="font-semibold">Standard fee</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Same day</span>
                                            <span className="font-semibold">Standard fee</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Bank transfer (1-3 days)</span>
                                            <span className="font-semibold">Standard fee</span>
                                        </li>
                                    </ul>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                                        * Delivery speed may vary by destination country
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Example Transfer */}
                        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-8">
                            <h3 className="text-2xl font-semibold mb-4 text-center">Example Transfer</h3>
                            <div className="max-w-md mx-auto">
                                <div className="space-y-4">
                                    <div className="flex justify-between text-lg">
                                        <span>You send</span>
                                        <span className="font-semibold">$1,000.00 USD</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Transfer fee</span>
                                        <span>- $4.99</span>
                                    </div>
                                    <div className="border-t border-gray-300 dark:border-gray-600 my-4"></div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Amount we&apos;ll convert</span>
                                        <span>$995.01</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                                        <span>Exchange rate</span>
                                        <span>1 USD = 83.12 INR</span>
                                    </div>
                                    <div className="border-t border-gray-300 dark:border-gray-600 my-4"></div>
                                    <div className="flex justify-between text-xl font-bold text-primary-600">
                                        <span>Recipient gets</span>
                                        <span>₹82,712.63 INR</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Live Calculator Placeholder */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Calculate Your Transfer
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                            Use our live calculator to see exactly how much your recipient will receive
                        </p>
                        {/* TODO: Integrate actual Remitone API for FX calculator */}
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-12 mb-8">
                            <p className="text-gray-500 dark:text-gray-400">
                                Live FX Calculator - Coming Soon
                            </p>
                            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                                This will integrate with the Remitone API for real-time exchange rates
                            </p>
                        </div>
                        <a
                            href={REMITONE_PLATFORM_URL}
                            className="inline-flex items-center gap-2 bg-gradient-primary text-white px-7 py-3.5 rounded-xl font-semibold hover:shadow-glow transition-all"
                        >
                            Start Sending Money
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
