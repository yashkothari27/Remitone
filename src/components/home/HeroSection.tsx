'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Send } from 'lucide-react'
import Link from 'next/link'
import FXCalculator from '@/components/features/FXCalculator'
import { useAuth } from '@/contexts/AuthContext'

const HeroSection = () => {
    const { isLoggedIn } = useAuth()

    return (
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32 bg-white">
            {/* Background glows */}
            <div className="absolute -top-24 -left-24 h-[500px] w-[500px] rounded-full bg-brand-red/5 blur-[100px]" />
            <div className="absolute top-1/2 -right-24 h-[400px] w-[400px] rounded-full bg-gold/10 blur-[120px]" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
                    {/* Left Content */}
                    <div className="flex flex-col gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-red/10 bg-brand-red/5 px-3 py-1 text-xs font-medium text-brand-red backdrop-blur-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red" />
                                </span>
                                New: Instant transfers to Asia
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-[4rem] leading-[1.1]"
                        >
                            Global payments <br />
                            <span className="text-brand-red">made simple.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="max-w-xl text-lg text-slate-600 sm:text-xl leading-relaxed"
                        >
                            Fast, transparent and secure cross-border payments for individuals and businesses.
                            Send money globally with competitive rates.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-wrap gap-4"
                        >
                            {isLoggedIn ? (
                                <>
                                    <Link href="/dashboard/send" className="flex h-14 items-center gap-2 rounded-xl bg-brand-red px-8 text-base font-bold text-white transition-all hover:bg-brand-red-light hover:scale-105 shadow-lg shadow-brand-red/25">
                                        <Send className="w-4 h-4" />
                                        <span>Send Money</span>
                                    </Link>
                                    <Link href="/dashboard" className="flex h-14 items-center gap-2 rounded-xl border border-slate-200 bg-white px-8 text-base font-bold text-slate-900 transition-all hover:bg-slate-50 hover:border-slate-300">
                                        <span>Go to Dashboard</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/register" className="flex h-14 items-center gap-2 rounded-xl bg-brand-red px-8 text-base font-bold text-white transition-all hover:bg-brand-red-light hover:scale-105 shadow-lg shadow-brand-red/25">
                                        <span>Open Free Account</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <Link href="/login" className="flex h-14 items-center gap-2 rounded-xl border border-slate-200 bg-white px-8 text-base font-bold text-slate-900 transition-all hover:bg-slate-50 hover:border-slate-300">
                                        <span>Sign In</span>
                                    </Link>
                                </>
                            )}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="flex items-center gap-4 text-sm text-slate-500"
                        >
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="inline-flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-white bg-gradient-to-br from-brand-red to-gold text-white text-xs font-bold"
                                    >
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <p>Trusted by <span className="font-bold text-brand-red">50,000+</span> global users</p>
                        </motion.div>
                    </div>

                    {/* Right: FX Calculator */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <FXCalculator />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
