'use client'

import { motion } from 'framer-motion'

const CTASection = () => {
    return (
        <section className="relative py-20 overflow-hidden bg-white">
            <div className="absolute inset-0 bg-slate-50/50" />

            <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-extrabold text-slate-900 sm:text-5xl mb-6"
                >
                    Start your global payment journey today
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-slate-600 mb-10"
                >
                    Join thousands of users who save on every transfer. Safe, fast, and simple.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button className="w-full sm:w-auto flex h-14 items-center justify-center gap-2 rounded-xl bg-brand-red px-8 text-lg font-bold text-white transition-all hover:bg-brand-red-light shadow-lg shadow-brand-red/25 hover:scale-105">
                        Create Free Account
                    </button>
                    <button className="w-full sm:w-auto flex h-14 items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 text-slate-900 px-8 text-lg font-bold transition-all hover:bg-slate-50">
                        Contact Sales
                    </button>
                </motion.div>
            </div>
        </section>
    )
}

export default CTASection
