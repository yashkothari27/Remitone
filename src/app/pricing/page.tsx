'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const tiers = [
    {
        name: 'Personal',
        description: 'For individuals sending money globally',
        price: 'Free',
        priceNote: 'No monthly fees',
        features: [
            'Send up to £25,000 per transfer',
            'Competitive mid-market rates',
            'Transfers from £0.99',
            'Multi-currency wallet',
            'Virtual debit card',
            'Real-time tracking',
            'Email & chat support',
        ],
        cta: 'Open Free Account',
        popular: false,
        variant: 'light' as const,
    },
    {
        name: 'Business',
        description: 'For companies with global payment needs',
        price: '£29',
        priceNote: '/month',
        features: [
            'Unlimited transfer amounts',
            'Best available rates',
            'Batch payments API',
            'Dedicated account manager',
            'Forward contracts',
            'Multi-user access',
            'Priority phone support',
            'Custom integrations',
        ],
        cta: 'Contact Sales',
        popular: true,
        variant: 'dark' as const,
    },
    {
        name: 'Enterprise',
        description: 'Custom solutions for large organisations',
        price: 'Custom',
        priceNote: 'tailored pricing',
        features: [
            'Everything in Business',
            'Volume-based pricing',
            'SLA guarantees',
            'Dedicated infrastructure',
            'Custom API limits',
            'On-premise deployment options',
            'Compliance & audit support',
            '24/7 dedicated support',
        ],
        cta: 'Get in Touch',
        popular: false,
        variant: 'light' as const,
    },
]

const corridorPricing = [
    { route: 'GBP → INR', rate: '₹106.50', fee: '£0.99', time: '< 30 min' },
    { route: 'GBP → CNY', rate: '¥9.25', fee: '£0.99', time: '< 1 hour' },
    { route: 'GBP → AED', rate: 'د.إ4.65', fee: '£0.99', time: '< 30 min' },
    { route: 'GBP → SGD', rate: 'S$1.69', fee: '£0.99', time: '< 1 hour' },
    { route: 'USD → INR', rate: '₹84.20', fee: '$1.49', time: '< 30 min' },
    { route: 'EUR → GBP', rate: '£0.85', fee: '€0.99', time: '< 30 min' },
]

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Hero */}
            <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 bg-deep-red overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-red-deep to-brand-red-deep/80" />
                <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-gold/10 blur-[120px]" />
                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl leading-[1.1] mb-6">
                            Transparent <span className="text-gradient-gold">pricing</span>
                        </h1>
                        <p className="text-lg text-white/80 max-w-2xl mx-auto">
                            No hidden fees. No surprises. Just honest, competitive pricing for every transfer.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Pricing Tiers */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {tiers.map((tier, index) => (
                            <motion.div
                                key={tier.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative rounded-3xl p-8 transition-all ${tier.popular
                                        ? 'bg-slate-900 text-white border-2 border-gold shadow-2xl scale-105'
                                        : 'bg-white text-slate-900 border border-slate-200 hover:shadow-lg'
                                    }`}
                            >
                                {tier.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-brand-red-deep text-xs font-bold px-4 py-1 rounded-full">
                                        Most Popular
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold mb-1">{tier.name}</h3>
                                <p className={`text-sm mb-6 ${tier.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                                    {tier.description}
                                </p>
                                <div className="mb-8">
                                    <span className="text-4xl font-extrabold">{tier.price}</span>
                                    <span className={`text-sm ml-1 ${tier.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                                        {tier.priceNote}
                                    </span>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3 text-sm">
                                            <span className="material-symbols-outlined text-gold text-sm">check_circle</span>
                                            <span className={tier.popular ? 'text-slate-300' : 'text-slate-600'}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/register"
                                    className={`w-full h-12 rounded-xl font-bold transition-all flex items-center justify-center ${tier.popular
                                            ? 'bg-gold text-brand-red-deep hover:bg-white'
                                            : 'bg-brand-red text-white hover:bg-brand-red-light'
                                        }`}
                                >
                                    {tier.cta}
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Corridor Pricing Table */}
            <section className="py-24 bg-slate-50">
                <div className="mx-auto max-w-4xl px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                            Popular corridor rates
                        </h2>
                        <p className="mt-4 text-lg text-slate-600">
                            Indicative rates for our most popular transfer routes.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                        <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-200 text-sm font-bold text-slate-500">
                            <span>Route</span>
                            <span>Rate</span>
                            <span>Fee</span>
                            <span>Speed</span>
                        </div>
                        {corridorPricing.map((corridor) => (
                            <div
                                key={corridor.route}
                                className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-slate-100 last:border-0 text-sm hover:bg-slate-50 transition-colors"
                            >
                                <span className="font-medium text-slate-900">{corridor.route}</span>
                                <span className="text-brand-red font-bold">{corridor.rate}</span>
                                <span className="text-slate-600">{corridor.fee}</span>
                                <span className="text-slate-600">{corridor.time}</span>
                            </div>
                        ))}
                    </div>

                    <p className="mt-6 text-xs text-slate-400 text-center">
                        * Rates are indicative and may vary at the time of transfer. Fees shown are for standard personal transfers.
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    )
}
