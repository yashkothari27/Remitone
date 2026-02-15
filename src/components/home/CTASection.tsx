'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const CTASection = () => {
    const REMITONE_PLATFORM_URL = 'https://app.remitone.com'

    return (
        <section className="relative py-24 overflow-hidden bg-dark-600">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-dark-600 to-blue-900/10" />

            {/* Radial glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-600/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
                        Start <span className="text-gradient">Transferring</span> with Remitone
                    </h2>
                    <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto leading-relaxed">
                        Join millions who trust Remitone for fast, secure, and affordable
                        international transfers.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <a
                            href={REMITONE_PLATFORM_URL}
                            className="inline-flex items-center justify-center gap-2 bg-gradient-orange text-white px-8 py-4 rounded-lg font-semibold hover:shadow-glow transition-all hover:scale-[1.02]"
                        >
                            Open Live Account
                            <ArrowRight className="w-5 h-5" />
                        </a>
                        <a
                            href="/pricing"
                            className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-4 rounded-lg font-medium hover:bg-white/5 hover:border-white/50 transition-all"
                        >
                            View Pricing
                        </a>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12">
                        {[
                            { stat: '200+', label: 'Countries' },
                            { stat: '5M+', label: 'Users' },
                            { stat: '$10B+', label: 'Transferred' },
                            { stat: '4.9', label: 'App Rating' },
                        ].map((item) => (
                            <div key={item.label} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                                    {item.stat}
                                </div>
                                <div className="text-sm text-white/60">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default CTASection
