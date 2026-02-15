import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Building2, Handshake, CreditCard } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Our Partners - Remitone | Payout Partners & Providers',
    description: 'Learn about Remitone\'s trusted network of payout partners, BAAS providers, and payment processors ensuring fast, reliable transfers worldwide.',
}

export default function PartnersPage() {
    const partnerCategories = [
        {
            title: 'Payout Partners',
            icon: Building2,
            description: 'Global network of trusted partners ensuring your money reaches its destination',
            partners: [
                'Western Union',
                'MoneyGram',
                'Ria Money Transfer',
                'WorldRemit',
                'And 100+ more locations worldwide',
            ],
        },
        {
            title: 'Banking as a Service (BAAS) Providers',
            icon: Handshake,
            description: 'Leading financial technology providers powering our infrastructure',
            partners: [
                'Stripe',
                'Plaid',
                'Dwolla',
                'Synapse',
                'And other certified providers',
            ],
        },
        {
            title: 'Payment Processors',
            icon: CreditCard,
            description: 'Secure payment processing partners ensuring safe transactions',
            partners: [
                'Visa',
                'Mastercard',
                'PayPal',
                'Apple Pay',
                'Google Pay',
            ],
        },
    ]

    return (
        <main className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-50 via-accent-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Our <span className="text-gradient">Partners</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
                            Working with leading financial services to deliver the best transfer experience
                        </p>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Trusted Network
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            Remitone partners with industry-leading companies to provide secure, reliable, and fast money transfers to over 200 countries worldwide.
                        </p>
                    </div>

                    {/* Partner Categories */}
                    <div className="space-y-16 max-w-6xl mx-auto">
                        {partnerCategories.map((category, index) => (
                            <div
                                key={category.title}
                                className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                            >
                                <div className="flex-shrink-0">
                                    <div className="w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center shadow-glow">
                                        <category.icon className="w-12 h-12 text-white" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl md:text-3xl font-bold mb-3">
                                        {category.title}
                                    </h3>
                                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                                        {category.description}
                                    </p>
                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                                        <ul className="space-y-2">
                                            {category.partners.map((partner) => (
                                                <li key={partner} className="flex items-center gap-2">
                                                    <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                                                    <span className="text-gray-700 dark:text-gray-300">{partner}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Partnership CTA */}
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Interested in Partnering?
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                        If you&apos;re a financial institution or service provider interested in partnering with Remitone, we&apos;d love to hear from you.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block bg-gradient-primary text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                        Contact Partnerships Team
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    )
}
