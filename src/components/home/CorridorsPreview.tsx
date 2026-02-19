'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const corridors = [
    { country: 'India', flag: '🇮🇳', currency: 'INR', rate: '106.50', color: 'from-orange-500 to-orange-600' },
    { country: 'UAE', flag: '🇦🇪', currency: 'AED', rate: '4.645', color: 'from-emerald-500 to-emerald-600' },
    { country: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', rate: '1.265', color: 'from-blue-500 to-blue-600' },
    { country: 'Singapore', flag: '🇸🇬', currency: 'SGD', rate: '1.692', color: 'from-red-500 to-red-600' },
]

const countries = [
    '🇺🇸 United States', '🇬🇧 United Kingdom', '🇮🇳 India', '🇨🇳 China',
    '🇦🇪 UAE', '🇸🇬 Singapore', '🇯🇵 Japan', '🇪🇺 Europe',
    '🇨🇦 Canada', '🇦🇺 Australia', '🇲🇽 Mexico', '🇧🇷 Brazil',
    '🇵🇭 Philippines', '🇳🇬 Nigeria', '🇵🇰 Pakistan', '🇧🇩 Bangladesh',
]

const CorridorsPreview = () => {
    return (
        <section className="py-24 bg-slate-50 relative">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Global Reach */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto mb-12"
                >
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Send money to <span className="text-brand-red">100+ countries</span>
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Connecting people across borders with fast, affordable transfers.
                    </p>
                </motion.div>

                {/* Countries Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-16"
                >
                    {countries.map((country) => (
                        <div
                            key={country}
                            className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 text-sm font-medium text-slate-700 border border-slate-100 hover:border-brand-red/20 hover:shadow-sm transition-all"
                        >
                            {country}
                        </div>
                    ))}
                </motion.div>

                {/* Corridor Cards */}
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-slate-900">Popular corridors</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {corridors.map((corridor, index) => (
                        <motion.div
                            key={corridor.country}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                href="/pricing"
                                className="group block rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:shadow-lg hover:border-brand-red/20 hover:-translate-y-1"
                            >
                                <div className="text-4xl mb-4">{corridor.flag}</div>
                                <h4 className="font-bold text-slate-900 mb-1">Send to {corridor.country}</h4>
                                <p className="text-sm text-slate-500 mb-4">GBP → {corridor.currency}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-400">Rate</span>
                                    <span className="text-sm font-bold text-brand-red">{corridor.rate}</span>
                                </div>
                                <div className="mt-4 text-sm font-semibold text-brand-red opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                    View details
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CorridorsPreview
