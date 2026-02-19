'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const useCases = [
    {
        icon: 'payments',
        title: 'Mass Payouts',
        description: 'Pay hundreds of contractors, suppliers, or employees across the globe in a single batch.',
    },
    {
        icon: 'api',
        title: 'Payment API',
        description: 'Integrate KogoPay directly into your platform with our RESTful API. Full documentation included.',
    },
    {
        icon: 'account_balance',
        title: 'Global Treasury',
        description: 'Manage multiple currency accounts, optimize FX exposure, and streamline your cash flow.',
    },
    {
        icon: 'handshake',
        title: 'Supplier Payments',
        description: 'Pay suppliers in their local currency with competitive rates and transparent fees.',
    },
    {
        icon: 'groups',
        title: 'Payroll',
        description: 'Run international payroll seamlessly. Pay your global team on time, every time.',
    },
    {
        icon: 'trending_up',
        title: 'Forward Contracts',
        description: 'Lock in exchange rates for future payments and protect your margins from currency volatility.',
    },
]

export default function BusinessPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        message: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        alert('Thank you! Our sales team will be in touch shortly.')
    }

    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Hero */}
            <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 bg-slate-900 overflow-hidden">
                <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-gold/10 blur-[120px]" />
                <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-brand-red/10 blur-[120px]" />
                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <div className="badge badge-gold mb-6">
                            <span className="material-symbols-outlined text-sm">business_center</span>
                            Business Account
                        </div>
                        <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl leading-[1.1] mb-6">
                            Scale globally with <span className="text-gradient-gold">KogoPay Business</span>
                        </h1>
                        <p className="text-lg text-slate-300 max-w-2xl mb-10">
                            Mass payouts, global treasury management, and seamless API integration.
                            Everything your business needs to move money across borders.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a href="#contact-sales" className="flex h-14 items-center gap-2 rounded-xl bg-gold px-8 text-base font-bold text-brand-red-deep transition-all hover:bg-white hover:scale-105 shadow-lg">
                                Contact Sales
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </a>
                            <button className="flex h-14 items-center gap-2 rounded-xl border border-white/20 px-8 text-base font-bold text-white transition-all hover:bg-white/5">
                                View API Docs
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                            Built for modern businesses
                        </h2>
                        <p className="mt-4 text-lg text-slate-600">
                            From startups to enterprises, KogoPay powers global payments at every scale.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {useCases.map((useCase, index) => (
                            <motion.div
                                key={useCase.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-white rounded-2xl border border-slate-100 p-8 hover:border-gold/30 hover:shadow-lg transition-all"
                            >
                                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-brand-red-deep transition-colors">
                                    <span className="material-symbols-outlined text-3xl">{useCase.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{useCase.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{useCase.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* API Capabilities */}
            <section className="py-24 bg-slate-50">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-6">
                                Powerful API for <span className="text-brand-red">developers</span>
                            </h2>
                            <p className="text-lg text-slate-600 mb-8">
                                Integrate cross-border payments into your platform with our well-documented RESTful API.
                                Webhook support, sandbox environment, and dedicated developer support.
                            </p>
                            <div className="space-y-4">
                                {['RESTful API with full documentation', 'Sandbox testing environment', 'Webhook notifications', 'SDKs for Node.js, Python, PHP'].map((item) => (
                                    <div key={item} className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-gold text-sm">check_circle</span>
                                        <span className="text-slate-700 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Code preview */}
                        <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <span className="text-slate-400 text-xs ml-2">payment.ts</span>
                            </div>
                            <pre className="text-sm text-slate-300 overflow-x-auto">
                                <code>{`const payment = await kogopay.transfers.create({
  amount: 10000,
  currency: 'GBP',
  recipient: {
    currency: 'INR',
    bankAccount: 'XXXX-XXXX-1234',
    name: 'Supplier Co.'
  },
  reference: 'INV-2024-001'
});

console.log(payment.status); // 'processing'
console.log(payment.eta); // '< 30 minutes'`}</code>
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Sales Form */}
            <section id="contact-sales" className="py-24 bg-white">
                <div className="mx-auto max-w-2xl px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Contact Sales</h2>
                        <p className="mt-4 text-lg text-slate-600">
                            Tell us about your business and we&apos;ll find the right solution for you.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-colors"
                                    placeholder="John"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-colors"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Work Email</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-colors"
                                placeholder="john@company.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
                            <input
                                type="text"
                                required
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-colors"
                                placeholder="Company Ltd."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                            <textarea
                                rows={4}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-colors resize-none"
                                placeholder="Tell us about your payment needs..."
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full h-14 rounded-xl bg-brand-red text-white font-bold text-lg transition-all hover:bg-brand-red-light shadow-lg shadow-brand-red/25 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Get in Touch
                        </button>
                    </form>
                </div>
            </section>

            <Footer />
        </main>
    )
}
