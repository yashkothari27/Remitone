'use client'

import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const securityFeatures = [
    {
        icon: 'account_balance',
        title: 'Safeguarding Funds',
        description: 'Your money is held in segregated accounts with tier-one banking partners. Client funds are never used for operational purposes and are fully protected.',
    },
    {
        icon: 'verified_user',
        title: 'FCA Regulated',
        description: 'KogoPay is authorised and regulated by the Financial Conduct Authority (FCA). We maintain the highest standards of compliance and governance.',
    },
    {
        icon: 'lock',
        title: '256-bit Encryption',
        description: 'All data in transit and at rest is protected with AES-256 encryption — the same standard used by banks and military organisations worldwide.',
    },
    {
        icon: 'fingerprint',
        title: 'Biometric Authentication',
        description: 'Protect your account with Face ID, Touch ID, or fingerprint scanning. Multi-factor authentication ensures only you can access your funds.',
    },
    {
        icon: 'shield',
        title: 'Fraud Detection',
        description: 'Our AI-powered fraud monitoring system analyses transactions 24/7 to detect and prevent suspicious activity before it affects your account.',
    },
    {
        icon: 'gavel',
        title: 'AML & KYC Compliance',
        description: 'We implement robust Anti-Money Laundering and Know Your Customer procedures to ensure the safety and integrity of every transaction.',
    },
]

const certifications = [
    { icon: 'security', label: 'PCI DSS Compliant' },
    { icon: 'verified', label: 'ISO 27001' },
    { icon: 'policy', label: 'GDPR Compliant' },
    { icon: 'admin_panel_settings', label: 'SOC 2 Type II' },
]

export default function SecurityPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Hero */}
            <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.08),transparent_50%)]" />
                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 text-gold text-sm font-medium mb-6">
                            <span className="material-symbols-outlined text-sm">shield</span>
                            Bank-Grade Security
                        </div>
                        <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl leading-[1.1] mb-6">
                            Your security is our <span className="text-gradient-gold">top priority</span>
                        </h1>
                        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                            We safeguard your funds and data with enterprise-grade security, regulatory compliance,
                            and cutting-edge fraud protection.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Security Features */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {securityFeatures.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl border border-slate-100 p-8 hover:border-gold/30 hover:shadow-lg transition-all group"
                            >
                                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-gold group-hover:bg-gold group-hover:text-slate-900 transition-colors">
                                    <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certifications */}
            <section className="py-20 bg-slate-50">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-12">
                        Certified & Compliant
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {certifications.map((cert) => (
                            <div
                                key={cert.label}
                                className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col items-center gap-4 hover:shadow-md transition-shadow"
                            >
                                <div className="h-16 w-16 rounded-full bg-slate-900 flex items-center justify-center text-gold">
                                    <span className="material-symbols-outlined text-3xl">{cert.icon}</span>
                                </div>
                                <span className="font-bold text-slate-900 text-sm">{cert.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Data Protection */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-6">
                        Data Protection
                    </h2>
                    <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
                        We are fully compliant with GDPR and the UK Data Protection Act 2018. Your personal data
                        is processed lawfully, stored securely, and never shared without your explicit consent.
                    </p>
                    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 text-left space-y-4">
                        {[
                            'Your data is encrypted at rest and in transit',
                            'We never sell or share your personal information',
                            'You can request data export or deletion at any time',
                            'Regular independent security audits',
                            'Strict access controls and audit logging',
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-gold text-sm">check_circle</span>
                                <span className="text-slate-700">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
