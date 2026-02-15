'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const corridors = [
    { from: '🇬🇧', fromName: 'UK', to: '🇮🇳', toName: 'India' },
    { from: '🇺🇸', fromName: 'USA', to: '🇳🇬', toName: 'Nigeria' },
    { from: '🇬🇧', fromName: 'UK', to: '🇵🇰', toName: 'Pakistan' },
    { from: '🇺🇸', fromName: 'USA', to: '🇲🇽', toName: 'Mexico' },
    { from: '🇬🇧', fromName: 'UK', to: '🇬🇭', toName: 'Ghana' },
    { from: '🇺🇸', fromName: 'USA', to: '🇵🇭', toName: 'Philippines' },
]

const CorridorsPreview = () => {
    return (
        <section className="py-24 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                    <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">
                        Popular Routes
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        Most Popular Corridors
                    </h2>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                        Fast, reliable transfers on the world&apos;s most popular money transfer routes.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10">
                    {corridors.map((corridor, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: index * 0.06,
                                duration: 0.35,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200/40 dark:border-slate-700/30 rounded-xl px-5 py-4 hover:shadow-glass hover:-translate-y-0.5 transition-all duration-200"
                        >
                            <span className="text-2xl">{corridor.from}</span>
                            <div className="flex-1">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    {corridor.fromName}
                                </span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-300" />
                            <span className="text-2xl">{corridor.to}</span>
                            <div className="flex-1">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    {corridor.toName}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        href="/countries"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                    >
                        View all supported countries
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default CorridorsPreview
