'use client'

import { motion } from 'framer-motion'
import { Zap, Shield, Globe, CreditCard, ArrowRight } from 'lucide-react'

const FeaturesSection = () => {
    const features = [
        {
            icon: Zap,
            title: 'Lightning Fast Transfers',
            description:
                'Most transfers arrive within minutes. No more waiting days for your money to clear.',
        },
        {
            icon: Shield,
            title: 'Bank-Level Security',
            description:
                '256-bit encryption protects every transaction. Your money and data are always safe.',
        },
        {
            icon: Globe,
            title: 'Global Coverage',
            description:
                'Send to 200+ countries with competitive exchange rates. Your money goes further.',
        },
        {
            icon: CreditCard,
            title: 'Transparent Pricing',
            description:
                'Low fees from $0. No hidden charges — what you see is what you pay.',
        },
    ]

    return (
        <section className="py-24 bg-dark-600 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-semibold text-orange-500 uppercase tracking-wider mb-3"
                    >
                        Why Remitone
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
                    >
                        We Take Your <span className="text-gradient">Transfer Experience</span>
                        <br />
                        To The Next Level
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-white/70 max-w-2xl mx-auto"
                    >
                        Every feature designed to make international transfers simple, safe, and affordable.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: index * 0.08,
                                duration: 0.4,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="group relative bg-dark-500 border border-dark-300 rounded-xl p-6 transition-all duration-200 card-hover"
                        >
                            <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center mb-5">
                                <feature.icon className="w-7 h-7 text-orange-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-white/60 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <a
                        href="/pricing"
                        className="inline-flex items-center gap-2 text-base font-semibold text-white bg-gradient-orange px-6 py-3 rounded-lg hover:shadow-glow transition-all hover:scale-[1.02]"
                    >
                        Learn More
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </motion.div>
            </div>
        </section>
    )
}

export default FeaturesSection
