'use client'

import { motion } from 'framer-motion'
import { UserPlus, CreditCard, Send, CheckCircle } from 'lucide-react'

const HowItWorks = () => {
    const steps = [
        {
            icon: UserPlus,
            title: 'Create Account',
            description:
                'Sign up in minutes with your email. Quick, simple, no paperwork.',
        },
        {
            icon: CreditCard,
            title: 'Add Payment',
            description:
                'Link your bank account, debit card, or credit card securely.',
        },
        {
            icon: Send,
            title: 'Send Money',
            description:
                'Enter recipient details and amount. Confirm and send instantly.',
        },
        {
            icon: CheckCircle,
            title: 'Track & Confirm',
            description:
                'Monitor in real-time. Get notified when your money arrives.',
        },
    ]

    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-800/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">
                        Simple Process
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        How It Works
                    </h2>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                        Four straightforward steps to send money anywhere in the world.
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Connecting line (desktop only) */}
                    <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-px bg-gradient-to-r from-primary-200 via-primary-300 to-primary-200 dark:from-primary-800 dark:via-primary-700 dark:to-primary-800" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: index * 0.1,
                                    duration: 0.4,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="text-center relative"
                            >
                                {/* Step circle */}
                                <div className="relative inline-flex mb-6">
                                    <div className="w-24 h-24 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/40 shadow-glass flex items-center justify-center relative z-10">
                                        <step.icon className="w-8 h-8 text-primary-600" />
                                    </div>
                                    <span className="absolute -top-2 -right-2 w-7 h-7 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center justify-center z-20">
                                        {index + 1}
                                    </span>
                                </div>

                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-[200px] mx-auto">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HowItWorks
