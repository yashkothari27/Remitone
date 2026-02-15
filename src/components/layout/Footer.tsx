'use client'

import Link from 'next/link'
import { Facebook, Linkedin, Twitter, Youtube } from 'lucide-react'

const Footer = () => {
    const columns = [
        {
            title: 'Legal',
            links: [
                { label: 'Terms and Conditions', href: '/terms' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Cookie Policy', href: '/cookies' },
            ],
        },
        {
            title: 'Our Services',
            links: [
                { label: 'About Us', href: '/about' },
                { label: 'Pricing', href: '/pricing' },
                { label: 'How It Works', href: '/how-it-works' },
                { label: 'FAQ', href: '/faq' },
            ],
        },
        {
            title: 'Support',
            links: [
                { label: 'Contact Us', href: '/contact' },
                { label: 'Supported Countries', href: '/countries' },
                { label: 'Complaints', href: '/complaints' },
            ],
        },
    ]

    return (
        <footer className="bg-dark-700 text-white relative">
            {/* Gradient strip divider */}
            <div className="h-1 bg-gradient-section-divider" />

            {/* Dot pattern background */}
            <div className="bg-dot-pattern">
                {/* Main Footer */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        {/* Brand Column */}
                        <div className="lg:col-span-1">
                            <Link href="/" className="inline-flex items-center gap-2.5 mb-5">
                                <div className="w-9 h-9 bg-gradient-orange rounded-lg flex items-center justify-center shadow-glow">
                                    <span className="text-white font-bold text-lg leading-none">R</span>
                                </div>
                                <span className="text-xl font-bold text-white tracking-tight">
                                    Remitone
                                </span>
                            </Link>
                            <p className="text-base font-semibold text-white mb-2">
                                Accelerate Your Money Transfer Experience To The Next Level
                            </p>
                            <p className="text-sm text-foreground-secondary leading-relaxed mb-6 max-w-sm">
                                Remitone is a renowned global financial service with a robust, seamless platform to provide
                                fast, secure international money transfers to 200+ countries. Trusted by millions for
                                competitive rates and instant delivery.
                            </p>
                            <div className="flex items-center gap-3">
                                {[
                                    { Icon: Facebook, href: '#', label: 'Facebook' },
                                    { Icon: Linkedin, href: '#', label: 'LinkedIn' },
                                    { Icon: Twitter, href: '#', label: 'Twitter' },
                                    { Icon: Youtube, href: '#', label: 'YouTube' },
                                ].map(({ Icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        aria-label={label}
                                        className="w-9 h-9 rounded-full bg-white/10 hover:bg-orange-500 flex items-center justify-center transition-all hover:scale-110"
                                    >
                                        <Icon className="w-4 h-4" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Link Columns */}
                        {columns.map((col) => (
                            <div key={col.title}>
                                <h4 className="text-base font-semibold text-white mb-4">
                                    {col.title}
                                </h4>
                                <ul className="space-y-2.5">
                                    {col.links.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className="text-sm text-foreground-secondary hover:text-white transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-sm text-foreground-muted">
                                © {new Date().getFullYear()} Remitone. All rights reserved.
                            </p>
                            <div className="flex items-center gap-6">
                                <Link
                                    href="/privacy"
                                    className="text-sm text-foreground-muted hover:text-white transition-colors"
                                >
                                    Privacy
                                </Link>
                                <Link
                                    href="/terms"
                                    className="text-sm text-foreground-muted hover:text-white transition-colors"
                                >
                                    Terms
                                </Link>
                                <Link
                                    href="/cookies"
                                    className="text-sm text-foreground-muted hover:text-white transition-colors"
                                >
                                    Cookies
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
