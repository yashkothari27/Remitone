'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Check, Smartphone } from 'lucide-react'

const AppPromotion = () => {
    const features = [
        'Send money on the go',
        'Track transfers in real-time',
        'Biometric security',
        'Instant notifications',
        'Save favorite recipients',
        'Multi-currency support',
    ]

    return (
        <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">
                            Mobile Experience
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-5">
                            Transfer Money from{' '}
                            <span className="text-gradient">Your Pocket</span>
                        </h2>
                        <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-md leading-relaxed">
                            Download the Remitone app for seamless transfers anywhere, anytime.
                            Available for iOS and Android.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2.5">
                                    <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                                        <Check className="w-3 h-3 text-emerald-600" />
                                    </div>
                                    <span className="text-sm text-slate-600 dark:text-slate-300">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <a
                                href="#"
                                className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                </svg>
                                App Store
                            </a>
                            <a
                                href="#"
                                className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.4l2.857 1.652a1 1 0 010 1.73L17.7 16.34l-2.514-2.514 2.512-2.52zM5.864 2.658L16.8 8.99l-2.303 2.303-8.633-8.636z" />
                                </svg>
                                Google Play
                            </a>
                        </div>
                    </motion.div>

                    {/* Phone Mockup */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="relative flex justify-center"
                    >
                        <div className="relative">
                            {/* Phone frame */}
                            <div className="w-[280px] h-[560px] bg-slate-900 rounded-[40px] p-3 shadow-elevated">
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-slate-900 rounded-b-2xl z-20" />

                                {/* Screen */}
                                <div className="w-full h-full bg-white rounded-[32px] overflow-hidden relative">
                                    {/* Status bar */}
                                    <div className="flex items-center justify-between px-6 pt-10 pb-2">
                                        <span className="text-[11px] font-semibold text-slate-900">9:41</span>
                                        <div className="flex items-center gap-1">
                                            <div className="w-4 h-2 border border-slate-400 rounded-sm relative">
                                                <div className="absolute inset-0.5 bg-slate-900 rounded-[1px]" style={{ width: '70%' }} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* App content mockup */}
                                    <div className="px-5 pt-4">
                                        <div className="flex items-center gap-2 mb-6">
                                            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                                                <span className="text-white text-xs font-bold">R</span>
                                            </div>
                                            <span className="text-sm font-bold text-slate-900">Remitone</span>
                                        </div>

                                        <p className="text-[11px] text-slate-400 mb-1">Available balance</p>
                                        <p className="text-2xl font-bold text-slate-900 mb-6">$12,450.00</p>

                                        <div className="flex gap-2 mb-6">
                                            <div className="flex-1 bg-primary-600 text-white text-[11px] font-semibold py-2.5 rounded-lg text-center">
                                                Send Money
                                            </div>
                                            <div className="flex-1 bg-slate-100 text-slate-700 text-[11px] font-semibold py-2.5 rounded-lg text-center">
                                                Request
                                            </div>
                                        </div>

                                        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3">
                                            Recent Transfers
                                        </p>

                                        {[
                                            { name: 'Sarah K.', amount: '-$500.00', flag: '🇬🇧' },
                                            { name: 'James O.', amount: '-$1,200.00', flag: '🇳🇬' },
                                            { name: 'Priya S.', amount: '-$800.00', flag: '🇮🇳' },
                                        ].map((txn) => (
                                            <div key={txn.name} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                                                <div className="flex items-center gap-2.5">
                                                    <span className="text-lg">{txn.flag}</span>
                                                    <span className="text-xs font-medium text-slate-700">{txn.name}</span>
                                                </div>
                                                <span className="text-xs font-semibold text-slate-900">{txn.amount}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Subtle glow behind phone */}
                            <div className="absolute -inset-8 bg-primary-400/10 rounded-full blur-3xl -z-10" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default AppPromotion
