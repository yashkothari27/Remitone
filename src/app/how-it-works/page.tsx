import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import { UserPlus, Shield, Send, CheckCircle, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
    title: 'How It Works - Remitone | Simple Money Transfers in 4 Steps',
    description: 'Send money internationally in 4 easy steps: Sign up, verify your account, send money, and your recipient receives funds. Fast and secure.',
}

export default function HowItWorksPage() {
    const REMITONE_PLATFORM_URL = 'https://app.remitone.com'

    const steps = [
        {
            number: 1,
            icon: UserPlus,
            title: 'Sign Up',
            description: 'Create your free Remitone account in minutes. Just provide basic information to get started.',
            details: [
                'Quick registration process',
                'No setup fees or hidden charges',
                'Available on web and mobile',
            ],
        },
        {
            number: 2,
            icon: Shield,
            title: 'Verify Account',
            description: 'Complete a simple verification process to keep your transfers secure and compliant.',
            details: [
                'Upload a valid ID document',
                'Verification usually takes minutes',
                'Bank-level security protocols',
            ],
        },
        {
            number: 3,
            icon: Send,
            title: 'Send Money',
            description: 'Choose your recipient, enter the amount, and select your payment method.',
            details: [
                'Multiple payment options',
                'Live exchange rates',
                'Transparent fees upfront',
            ],
        },
        {
            number: 4,
            icon: CheckCircle,
            title: 'Recipient Receives Funds',
            description: 'Your recipient gets the money quickly through their preferred method.',
            details: [
                'Bank transfers worldwide',
                'Cash pickup locations',
                'Mobile wallet delivery',
            ],
        },
    ]

    return (
        <main className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-cny-red">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                            How <span className="text-cny-gold">Remitone</span> Works
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 mb-8">
                            Send money internationally in 4 simple steps
                        </p>
                    </div>
                </div>
            </section>

            {/* Steps Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto">
                        {steps.map((step, index) => (
                            <div key={step.number} className="mb-16 last:mb-0">
                                <div className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                                    {/* Icon and Number */}
                                    <div className="flex-shrink-0">
                                        <div className="relative">
                                            <div className="w-32 h-32 bg-cny-gold-gradient rounded-3xl flex items-center justify-center shadow-glow">
                                                <step.icon className="w-16 h-16 text-black" />
                                            </div>
                                            <div className="absolute -top-3 -right-3 w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                                {step.number}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                            {step.title}
                                        </h2>
                                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                                            {step.description}
                                        </p>
                                        <ul className="space-y-2">
                                            {step.details.map((detail, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                                                    <span className="text-gray-700 dark:text-gray-300">{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Connector Line */}
                                {index < steps.length - 1 && (
                                    <div className="flex justify-center my-8">
                                        <div className="w-1 h-16 bg-gradient-primary rounded-full"></div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-cny-red text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Send Money?
                    </h2>
                    <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                        Join thousands of customers who trust Remitone for their international money transfers
                    </p>
                    <a
                        href={REMITONE_PLATFORM_URL}
                        className="inline-flex items-center gap-2 bg-cny-gold-gradient text-black px-7 py-3.5 rounded-xl font-semibold hover:bg-slate-100 transition-colors"
                    >
                        Get Started Now
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    )
}
