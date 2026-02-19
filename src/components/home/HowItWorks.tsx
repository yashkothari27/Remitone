'use client'

import { motion } from 'framer-motion'

const steps = [
    {
        icon: 'person_add',
        title: '1. Create Account',
        description: 'Sign up for free in minutes. Verify your identity securely with our streamlined process.',
    },
    {
        icon: 'currency_exchange',
        title: '2. Enter Details',
        description: 'Choose the amount, currency, and recipient. See our transparent low fees upfront.',
    },
    {
        icon: 'send',
        title: '3. Money Sent',
        description: 'Track your transfer in real-time. Funds arrive instantly or within 24 hours.',
    },
]

const HowItWorks = () => {
    return (
        <section className="py-24 bg-deep-red relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-white mb-12 text-center sm:text-4xl"
                >
                    How it works
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting line */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-white/5 via-white/30 to-white/5 z-0" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="relative z-10 flex flex-col items-center text-center"
                        >
                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white border-4 border-white/20 shadow-xl mb-6 text-brand-red">
                                <span className="material-symbols-outlined text-4xl">{step.icon}</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                            <p className="text-white/70 text-sm max-w-xs">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HowItWorks
