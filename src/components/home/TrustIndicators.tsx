'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Award, CheckCircle } from 'lucide-react'

const TrustIndicators = () => {
    const stats = [
        { value: '$0', label: 'Transfer Fees', sublabel: 'On select corridors' },
        { value: '200+', label: 'Countries', sublabel: 'Global coverage' },
        { value: '24/7', label: 'Support', sublabel: 'Always available' },
    ]

    const safetyFeatures = [
        {
            icon: Shield,
            title: 'Segregated Accounts',
            description: 'Your funds are kept separate and secure',
        },
        {
            icon: Lock,
            title: 'Bank-Level Encryption',
            description: '256-bit SSL protection on every transaction',
        },
        {
            icon: Award,
            title: 'Fully Licensed',
            description: 'Regulated in multiple jurisdictions',
        },
        {
            icon: CheckCircle,
            title: 'Verified Platform',
            description: 'Trusted by millions of users worldwide',
        },
    ]

    return (
        <>
            {/* Stats Banner */}
            <section className="relative bg-dark-600 py-12 border-t border-white/5">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: index * 0.1,
                                    duration: 0.4,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                <div className="text-5xl md:text-6xl font-extrabold text-white mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-base font-medium text-white/90 mb-1">
                                    {stat.label}
                                </div>
                                <div className="text-sm text-white/60">
                                    {stat.sublabel}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Safety Section */}
            <section className="relative bg-dark-500 py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Heading */}
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="text-4xl md:text-5xl font-bold text-white mb-4"
                            >
                                <span className="text-gradient">Safety</span> of Your Money Is Our Top Priority
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-lg text-white/70 mb-8"
                            >
                                Your funds are fully secured when you transfer with Remitone. We use industry-leading
                                security measures to protect your money and personal information.
                            </motion.p>
                            <motion.a
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                href="https://app.remitone.com"
                                className="inline-flex items-center gap-2 text-base font-semibold text-white bg-gradient-orange px-6 py-3 rounded-lg hover:shadow-glow transition-all hover:scale-[1.02]"
                            >
                                Start Transferring
                            </motion.a>
                        </div>

                        {/* Right: Icon Cards Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {safetyFeatures.map((feature, index) => (
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
                                    className="bg-dark-400 border border-dark-300 rounded-xl p-6 hover:border-orange-500/30 transition-all card-hover"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                                        <feature.icon className="w-6 h-6 text-orange-500" />
                                    </div>
                                    <h3 className="text-base font-semibold text-white mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-white/60 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TrustIndicators
