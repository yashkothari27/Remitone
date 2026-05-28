'use client'

import { motion } from 'framer-motion'

const AppPromotion = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-brand-red/5 blur-[100px]" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left — Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="badge badge-red mb-6">
                            <span className="material-symbols-outlined text-sm">smartphone</span>
                            Mobile App
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
                            Your money, always <span className="text-brand-red">at hand</span>
                        </h2>
                        <p className="text-lg text-slate-600 mb-8 max-w-lg">
                            Download the KogoPAY app and manage your international transfers on the go.
                            Track rates, send money, and receive notifications — all from your pocket.
                        </p>

                        <div className="space-y-4 mb-10">
                            {[
                                { icon: 'speed', text: 'Instant transfers with live rate alerts' },
                                { icon: 'fingerprint', text: 'Biometric security for every transaction' },
                                { icon: 'notifications', text: 'Real-time push notifications' },
                            ].map((feature) => (
                                <div key={feature.text} className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
                                        <span className="material-symbols-outlined">{feature.icon}</span>
                                    </div>
                                    <span className="text-slate-700 font-medium">{feature.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Store Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="https://apps.apple.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-slate-900 text-white rounded-xl px-6 py-3 hover:bg-slate-800 transition-colors"
                            >
                                <span className="material-symbols-outlined text-2xl">phone_iphone</span>
                                <div className="text-left">
                                    <div className="text-[10px] text-white/60 uppercase tracking-wider">Download on the</div>
                                    <div className="text-sm font-bold">App Store</div>
                                </div>
                            </a>
                            <a
                                href="https://play.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-slate-900 text-white rounded-xl px-6 py-3 hover:bg-slate-800 transition-colors"
                            >
                                <span className="material-symbols-outlined text-2xl">android</span>
                                <div className="text-left">
                                    <div className="text-[10px] text-white/60 uppercase tracking-wider">Get it on</div>
                                    <div className="text-sm font-bold">Google Play</div>
                                </div>
                            </a>
                        </div>
                    </motion.div>

                    {/* Right — App Mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative flex justify-center"
                    >
                        <div className="relative">
                            {/* Phone frame */}
                            <div className="w-[280px] h-[560px] bg-slate-900 rounded-[40px] border-4 border-slate-700 p-3 shadow-2xl">
                                <div className="w-full h-full bg-deep-red rounded-[30px] overflow-hidden flex flex-col">
                                    {/* Status bar */}
                                    <div className="flex items-center justify-between px-6 pt-4 pb-2">
                                        <span className="text-white text-xs font-medium">9:41</span>
                                        <div className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-white text-sm">signal_cellular_alt</span>
                                            <span className="material-symbols-outlined text-white text-sm">battery_full</span>
                                        </div>
                                    </div>
                                    {/* App content */}
                                    <div className="flex-1 px-5 py-4">
                                        <div className="flex items-center gap-2 mb-6">
                                            <img src="/kogo-logo-black.png" alt="Logo" className="h-6 w-6 object-contain bg-white rounded-md p-0.5" />
                                            <span className="text-white text-sm font-bold">KogoPAY</span>
                                        </div>
                                        <p className="text-white/60 text-xs mb-2">Your balance</p>
                                        <p className="text-white text-2xl font-bold mb-6">£12,450.00</p>

                                        <div className="flex gap-3 mb-6">
                                            <button className="flex-1 bg-gold text-brand-red-deep text-xs font-bold py-2.5 rounded-lg">Send</button>
                                            <button className="flex-1 bg-white/10 text-white text-xs font-bold py-2.5 rounded-lg border border-white/10">Receive</button>
                                        </div>

                                        <p className="text-white/60 text-xs mb-3">Recent</p>
                                        {[
                                            { name: 'Sarah K.', amount: '-£250.00', cur: 'INR' },
                                            { name: 'Chen W.', amount: '-£1,000.00', cur: 'CNY' },
                                            { name: 'Top Up', amount: '+£5,000.00', cur: 'GBP' },
                                        ].map((tx) => (
                                            <div key={tx.name} className="flex items-center justify-between py-2.5 border-b border-white/5">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white text-xs font-bold">
                                                        {tx.name[0]}
                                                    </div>
                                                    <div>
                                                        <p className="text-white text-xs font-medium">{tx.name}</p>
                                                        <p className="text-white/40 text-[10px]">{tx.cur}</p>
                                                    </div>
                                                </div>
                                                <span className={`text-xs font-bold ${tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-white/80'}`}>
                                                    {tx.amount}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* Glow behind phone */}
                            <div className="absolute -inset-8 bg-gradient-to-tr from-brand-red/20 to-gold/10 blur-2xl rounded-full -z-10" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default AppPromotion
