'use client'

import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const values = [
    {
        icon: 'public',
        title: 'Global Inclusion',
        description: 'We believe everyone deserves access to affordable, transparent financial services — regardless of where they live.',
    },
    {
        icon: 'favorite',
        title: 'Social Impact',
        description: 'A portion of every transaction supports communities in need. We are building a payments platform with purpose.',
    },
    {
        icon: 'handshake',
        title: 'Transparency',
        description: 'No hidden fees, no surprises. We show you exactly what you pay and what your recipient receives before you send.',
    },
    {
        icon: 'rocket_launch',
        title: 'Innovation',
        description: 'We leverage cutting-edge technology to make cross-border payments faster, cheaper, and more accessible.',
    },
]

const stats = [
    { value: '100+', label: 'Countries Served' },
    { value: '50K+', label: 'Active Users' },
    { value: '$500M+', label: 'Transferred' },
    { value: '<30 min', label: 'Avg. Transfer Time' },
]

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Hero */}
            <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 bg-deep-red overflow-hidden">
                <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-gold/10 blur-[120px]" />
                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl leading-[1.1] mb-6">
                            Connecting the world through <span className="text-gradient-gold">better payments</span>
                        </h1>
                        <p className="text-lg text-white/80 max-w-2xl">
                            KogoPay Group is on a mission to make international payments accessible, affordable,
                            and socially conscious for everyone.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-white border-b border-slate-100">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <p className="text-4xl font-extrabold text-brand-red mb-2">{stat.value}</p>
                                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-deep-red rounded-3xl p-10 text-white"
                        >
                            <span className="material-symbols-outlined text-gold text-4xl mb-6 block">visibility</span>
                            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                            <p className="text-white/80 leading-relaxed text-lg">
                                To become the world&apos;s most trusted and socially conscious cross-border payments platform,
                                connecting communities and empowering individuals across every continent.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-slate-900 rounded-3xl p-10 text-white"
                        >
                            <span className="material-symbols-outlined text-gold text-4xl mb-6 block">flag</span>
                            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                            <p className="text-slate-300 leading-relaxed text-lg">
                                To deliver instant, affordable, and transparent money transfers while giving back
                                to communities worldwide. Every transfer makes a difference.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 bg-slate-50">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Our Values</h2>
                        <p className="mt-4 text-lg text-slate-600">
                            The principles that guide everything we do at KogoPay.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl border border-slate-100 p-8 hover:shadow-lg transition-all flex gap-6"
                            >
                                <div className="flex-shrink-0 h-14 w-14 rounded-2xl bg-brand-red/10 flex items-center justify-center text-brand-red">
                                    <span className="material-symbols-outlined text-3xl">{value.icon}</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{value.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{value.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Global Ambition */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-6">
                        A global fintech with a <span className="text-brand-red">heart</span>
                    </h2>
                    <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                        Listed on the Aquis Stock Exchange, KogoPay Group is positioned among the next generation
                        of fintech companies reshaping how the world moves money. With operations spanning
                        Europe, Asia, and beyond, we are building the infrastructure for a more connected financial world.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="flex h-14 items-center justify-center gap-2 rounded-xl bg-brand-red px-8 text-lg font-bold text-white transition-all hover:bg-brand-red-light shadow-lg shadow-brand-red/25 hover:scale-105">
                            Join KogoPay
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
