'use client'

import { motion } from 'framer-motion'

const trustItems = [
    { icon: 'verified_user', label: 'FCA Regulated' },
    { icon: 'lock', label: '256-bit Encryption' },
    { icon: 'security', label: 'Fraud Protection' },
    { icon: 'public', label: 'Global Network' },
]

const TrustIndicators = () => {
    return (
        <section className="border-y border-white/5 bg-deep-red py-10">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <p className="text-lg font-medium text-white/80 max-w-sm">
                        Trusted by professionals globally. Regulated and secure.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 opacity-80 text-white transition-all hover:opacity-100">
                        {trustItems.map((item, index) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                <span className="text-xl font-bold">{item.label}</span>
                                {index < trustItems.length - 1 && (
                                    <div className="hidden md:block h-6 w-px bg-white/30 ml-8" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TrustIndicators
