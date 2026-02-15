'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const HeroSection = () => {
    return (
        <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-[72px] bg-gradient-hero">
            {/* Background overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />

            {/* Background image/pattern */}
            <div className="absolute inset-0 bg-mesh-gradient opacity-40" />

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-3xl">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="badge badge-orange mb-6 inline-flex">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                            Trusted by millions worldwide
                        </div>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] mb-6 text-white"
                    >
                        Send Money{' '}
                        <span className="text-gradient">Worldwide,</span>
                        <br />
                        <span className="text-gradient">Instantly</span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl leading-relaxed"
                    >
                        Fast, secure, and affordable international money transfers to over 200 countries.
                        Competitive exchange rates and low fees.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-wrap gap-4"
                    >
                        <a
                            href="https://app.remitone.com"
                            className="inline-flex items-center gap-2 text-base font-semibold text-white bg-gradient-orange px-8 py-4 rounded-lg hover:shadow-glow transition-all hover:scale-[1.02]"
                        >
                            Get Started
                            <ArrowRight className="w-5 h-5" />
                        </a>
                        <a
                            href="/how-it-works"
                            className="inline-flex items-center gap-2 text-base font-semibold text-white px-8 py-4 rounded-lg border border-white/30 hover:border-white/50 hover:bg-white/5 transition-all"
                        >
                            Learn More
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Wave divider at bottom */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg
                    viewBox="0 0 1440 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                >
                    <path
                        d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
                        fill="#0D0D0D"
                    />
                </svg>
            </div>
        </section>
    )
}

export default HeroSection
