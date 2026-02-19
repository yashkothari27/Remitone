'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const FeaturesSection = () => {
    return (
        <section className="py-24 bg-white relative">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
                    >
                        One platform, endless possibilities
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 text-lg text-slate-600"
                    >
                        Whether you are an individual sending money home or a business paying suppliers, we have you covered.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Personal Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <Link href="/personal" className="group relative overflow-hidden rounded-3xl bg-deep-red border border-transparent p-8 transition-all hover:shadow-2xl hover:shadow-brand-red/20 block h-full">
                            <div className="absolute top-0 right-0 p-8 opacity-10 transition-transform group-hover:scale-110 group-hover:opacity-20">
                                <span className="material-symbols-outlined text-[150px] text-white">person</span>
                            </div>
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white">
                                    <span className="material-symbols-outlined text-3xl">person</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">KogoPay Personal</h3>
                                <p className="text-white/70 mb-8 flex-grow">
                                    Send money home to family, pay for tuition, or spend abroad with low fees and real-time rates.
                                </p>
                                <ul className="space-y-3 mb-8 text-white/80">
                                    <li className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-gold text-sm">check_circle</span>
                                        Instant transfers
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-gold text-sm">check_circle</span>
                                        Multi-currency wallet
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-gold text-sm">check_circle</span>
                                        Virtual & Physical cards
                                    </li>
                                </ul>
                                <span className="inline-flex items-center text-white font-bold hover:text-gold transition-colors group-hover:text-gold">
                                    Get Started <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
                                </span>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Business Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link href="/business" className="group relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 transition-all hover:shadow-2xl block h-full">
                            <div className="absolute top-0 right-0 p-8 opacity-10 transition-transform group-hover:scale-110 group-hover:opacity-20">
                                <span className="material-symbols-outlined text-[150px] text-gold">business_center</span>
                            </div>
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                                    <span className="material-symbols-outlined text-3xl">business_center</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">KogoPay Business</h3>
                                <p className="text-slate-400 mb-8 flex-grow">
                                    Empower your business with global accounts, bulk payments, and seamless payroll management.
                                </p>
                                <ul className="space-y-3 mb-8 text-slate-300">
                                    <li className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-gold text-sm">check_circle</span>
                                        Batch payments API
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-gold text-sm">check_circle</span>
                                        Dedicated account manager
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-gold text-sm">check_circle</span>
                                        Forward contracts
                                    </li>
                                </ul>
                                <span className="inline-flex items-center text-gold font-bold hover:text-yellow-200 transition-colors group-hover:text-yellow-200">
                                    Contact Sales <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
                                </span>
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default FeaturesSection
