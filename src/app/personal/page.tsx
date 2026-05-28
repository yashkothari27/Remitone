'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useAuth } from '@/contexts/AuthContext'

const benefits = [
    {
        icon: 'bolt',
        title: 'Instant Transfers',
        description: 'Send money to family and friends in minutes, not days. Our real-time payment network ensures your money arrives fast.',
    },
    {
        icon: 'account_balance_wallet',
        title: 'Multi-Currency Wallet',
        description: 'Hold and manage multiple currencies in one account. Convert when rates are best for you.',
    },
    {
        icon: 'credit_card',
        title: 'Virtual & Physical Cards',
        description: 'Spend abroad or online with KogoPAY cards. No hidden fees, real exchange rates.',
    },
    {
        icon: 'savings',
        title: 'Low Fees',
        description: 'Pay less than traditional banks. Transparent pricing with no surprises — what you see is what you pay.',
    },
    {
        icon: 'track_changes',
        title: 'Real-Time Tracking',
        description: 'Know exactly where your money is at every step. Get instant notifications when your transfer is complete.',
    },
    {
        icon: 'lock',
        title: 'Bank-Grade Security',
        description: 'Your money and data are protected with 256-bit encryption and FCA-regulated safeguards.',
    },
]

export default function PersonalPage() {
    const { isLoggedIn } = useAuth()
    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Hero */}
            <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 bg-deep-red overflow-hidden">
                <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-gold/10 blur-[120px]" />
                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <div className="badge badge-gold mb-6">
                            <span className="material-symbols-outlined text-sm">person</span>
                            Personal Account
                        </div>
                        <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl leading-[1.1] mb-6">
                            Your money, <span className="text-gradient-gold">your way</span>
                        </h1>
                        <p className="text-lg text-white/80 max-w-2xl mb-10">
                            International transfers for everyday users. Send money home, pay tuition,
                            or manage multiple currencies — all from one beautiful app.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            {isLoggedIn ? (
                                <>
                                    <Link href="/dashboard/send" className="flex h-14 items-center gap-2 rounded-xl bg-white px-8 text-base font-bold text-brand-red transition-all hover:bg-gray-100 hover:scale-105 shadow-lg">
                                        Send Money
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </Link>
                                    <Link href="/dashboard" className="flex h-14 items-center gap-2 rounded-xl border border-white/20 px-8 text-base font-bold text-white transition-all hover:bg-white/5">
                                        Go to Dashboard
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/register" className="flex h-14 items-center gap-2 rounded-xl bg-white px-8 text-base font-bold text-brand-red transition-all hover:bg-gray-100 hover:scale-105 shadow-lg">
                                        Open Free Account
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </Link>
                                    <Link href="/login" className="flex h-14 items-center gap-2 rounded-xl border border-white/20 px-8 text-base font-bold text-white transition-all hover:bg-white/5">
                                        Sign In
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                            Everything you need for global payments
                        </h2>
                        <p className="mt-4 text-lg text-slate-600">
                            Simple, powerful tools to manage your international money needs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-white rounded-2xl border border-slate-100 p-8 hover:border-brand-red/20 hover:shadow-lg transition-all"
                            >
                                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-3xl">{benefit.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{benefit.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA — only shown to logged-out users */}
            {!isLoggedIn && (
            <section className="py-20 bg-slate-50">
                <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-6">
                        Ready to start sending?
                    </h2>
                    <p className="text-lg text-slate-600 mb-10">
                        Join 50,000+ users who trust KogoPAY for their international payments.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/register" className="w-full sm:w-auto flex h-14 items-center justify-center gap-2 rounded-xl bg-brand-red px-8 text-lg font-bold text-white transition-all hover:bg-brand-red-light shadow-lg shadow-brand-red/25 hover:scale-105">
                            Create Free Account
                        </Link>
                        <Link href="/pricing" className="w-full sm:w-auto flex h-14 items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 text-slate-900 px-8 text-lg font-bold transition-all hover:bg-slate-50">
                            View Pricing
                        </Link>
                    </div>
                </div>
            </section>
            )}

            <Footer />
        </main>
    )
}
