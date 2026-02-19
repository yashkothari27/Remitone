'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const contactInfo = [
    { icon: 'mail', label: 'Email', value: 'support@kogopay.com' },
    { icon: 'call', label: 'Phone', value: '+44 (0) 20 7946 0958' },
    { icon: 'location_on', label: 'Office', value: 'London, United Kingdom' },
]

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        alert('Thank you for your message! We will get back to you shortly.')
    }

    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Hero */}
            <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 bg-deep-red overflow-hidden">
                <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-gold/10 blur-[120px]" />
                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl leading-[1.1] mb-6">
                            Get in <span className="text-gradient-gold">touch</span>
                        </h1>
                        <p className="text-lg text-white/80 max-w-2xl mx-auto">
                            Have questions about KogoPay? We&apos;d love to hear from you.
                            Our team is ready to help.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">
                                Let&apos;s start a conversation
                            </h2>
                            <p className="text-lg text-slate-600 mb-10">
                                Whether you are looking into personal transfers, business solutions, or partnership
                                opportunities, we are here to help you every step of the way.
                            </p>

                            <div className="space-y-6 mb-12">
                                {contactInfo.map((info) => (
                                    <div key={info.label} className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-2xl bg-brand-red/10 flex items-center justify-center text-brand-red">
                                            <span className="material-symbols-outlined">{info.icon}</span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-500">{info.label}</p>
                                            <p className="font-medium text-slate-900">{info.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Office hours */}
                            <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6">
                                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-gold">schedule</span>
                                    Office Hours
                                </h3>
                                <div className="space-y-2 text-sm text-slate-600">
                                    <div className="flex justify-between">
                                        <span>Monday — Friday</span>
                                        <span className="font-medium text-slate-900">9:00 AM — 6:00 PM GMT</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Saturday — Sunday</span>
                                        <span className="font-medium text-slate-900">Closed</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-colors"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-colors"
                                        placeholder="you@email.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Company <span className="text-slate-400">(optional)</span></label>
                                    <input
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-colors"
                                        placeholder="Company name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                                    <textarea
                                        rows={5}
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none transition-colors resize-none"
                                        placeholder="How can we help you?"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full h-14 rounded-xl bg-brand-red text-white font-bold text-lg transition-all hover:bg-brand-red-light shadow-lg shadow-brand-red/25 hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    Send Message
                                </button>
                                <p className="text-xs text-slate-400 text-center">
                                    We typically respond within 24 hours during business days.
                                </p>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
