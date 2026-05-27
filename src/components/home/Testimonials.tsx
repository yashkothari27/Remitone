'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

const testimonials = [
    {
        name: 'Priya Sharma',
        role: 'Teacher, London',
        text: 'KogoPAY makes sending money to my family in India so easy. The rates are always better than my bank and transfers arrive within minutes.',
        rating: 5,
    },
    {
        name: 'Chen Wei',
        role: 'Student, Manchester',
        text: 'I use KogoPAY to receive tuition payments from China. The fees are incredibly low and the process is seamless.',
        rating: 5,
    },
    {
        name: 'Ahmed Al-Rashid',
        role: 'Business Owner, Dubai',
        text: 'As a business owner, I rely on KogoPAY for supplier payments. Their batch payment API saved us hours every month.',
        rating: 5,
    },
    {
        name: 'Sarah Johnson',
        role: 'Freelancer, Singapore',
        text: 'The multi-currency wallet is a game changer. I can hold multiple currencies and convert when the rates are best.',
        rating: 5,
    },
    {
        name: 'David Okonkwo',
        role: 'Engineer, Lagos',
        text: 'Fast, reliable, and transparent. KogoPAY is the best service I have found for sending money back home to my family.',
        rating: 5,
    },
    {
        name: 'Maria Garcia',
        role: 'Nurse, Birmingham',
        text: 'I switched from Western Union to KogoPAY and immediately noticed the savings. The app is also beautiful and easy to use.',
        rating: 5,
    },
]

const Testimonials = () => {
    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto mb-12"
                >
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Loved by <span className="text-brand-red">thousands</span> worldwide
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        See what our users say about their KogoPAY experience.
                    </p>
                </motion.div>

                {/* Scrolling carousel */}
                <div className="relative overflow-hidden">
                    <div className="flex gap-6 animate-[scroll_30s_linear_infinite]" style={{ width: 'max-content' }}>
                        {[...testimonials, ...testimonials].map((testimonial, index) => (
                            <div
                                key={`${testimonial.name}-${index}`}
                                className="w-[350px] flex-shrink-0 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center gap-1 mb-4">
                                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                                        <span key={i} className="material-symbols-outlined text-gold text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                                            star
                                        </span>
                                    ))}
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                    &ldquo;{testimonial.text}&rdquo;
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-red to-gold flex items-center justify-center text-white font-bold text-sm">
                                        {testimonial.name.split(' ').map((n) => n[0]).join('')}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">{testimonial.name}</p>
                                        <p className="text-xs text-slate-500">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonials
