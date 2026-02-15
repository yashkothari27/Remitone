'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        {
            label: 'Services',
            href: '/pricing',
            submenu: [
                { href: '/pricing', label: 'Pricing' },
                { href: '/how-it-works', label: 'How It Works' },
                { href: '/countries', label: 'Countries' },
            ]
        },
        {
            label: 'Resources',
            href: '/faq',
            submenu: [
                { href: '/faq', label: 'FAQ' },
                { href: '/contact', label: 'Contact' },
            ]
        },
        { href: '/about', label: 'About Us' },
    ]

    const REMITONE_PLATFORM_URL = 'https://app.remitone.com'

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                isScrolled
                    ? 'bg-black/95 backdrop-blur-xl shadow-[0_1px_0_rgba(232,101,45,0.1)]'
                    : 'bg-black/80 backdrop-blur-sm'
            )}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-[72px]">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 bg-gradient-orange rounded-lg flex items-center justify-center group-hover:shadow-glow transition-shadow">
                            <span className="text-white font-bold text-lg leading-none">R</span>
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">
                            Remitone
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <div key={link.href} className="relative group">
                                <Link
                                    href={link.href}
                                    className="px-4 py-2 text-[0.9rem] font-medium text-white/90 hover:text-white rounded-lg hover:bg-white/5 transition-all flex items-center gap-1"
                                >
                                    {link.label}
                                    {link.submenu && <ChevronDown className="w-4 h-4" />}
                                </Link>
                                {link.submenu && (
                                    <div className="absolute top-full left-0 mt-1 w-48 bg-dark-500 border border-dark-300 rounded-lg shadow-elevated opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                        <div className="py-2">
                                            {link.submenu.map((sublink) => (
                                                <Link
                                                    key={sublink.href}
                                                    href={sublink.href}
                                                    className="block px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                                                >
                                                    {sublink.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Auth Buttons */}
                    <div className="hidden lg:flex items-center gap-3">
                        <a
                            href={REMITONE_PLATFORM_URL}
                            className="text-[0.9rem] font-medium text-white px-5 py-2.5 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all"
                        >
                            LOGIN
                        </a>
                        <a
                            href={REMITONE_PLATFORM_URL}
                            className="inline-flex items-center gap-2 text-[0.9rem] font-semibold text-white bg-gradient-orange px-6 py-2.5 rounded-lg hover:shadow-glow transition-all hover:scale-[1.02]"
                        >
                            REGISTER
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden bg-dark-600/98 backdrop-blur-xl border-t border-white/10"
                    >
                        <div className="container mx-auto px-4 py-4">
                            <nav className="space-y-1">
                                {navLinks.map((link) => (
                                    <div key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="block py-2.5 px-3 text-white/90 hover:text-white hover:bg-white/5 font-medium rounded-lg transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                        {link.submenu && (
                                            <div className="ml-4 mt-1 space-y-1">
                                                {link.submenu.map((sublink) => (
                                                    <Link
                                                        key={sublink.href}
                                                        href={sublink.href}
                                                        className="block py-2 px-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        {sublink.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </nav>
                            <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                                <a
                                    href={REMITONE_PLATFORM_URL}
                                    className="block w-full text-center py-2.5 px-4 text-white font-medium rounded-lg border border-white/20 hover:bg-white/5 transition-colors"
                                >
                                    LOGIN
                                </a>
                                <a
                                    href={REMITONE_PLATFORM_URL}
                                    className="block w-full text-center py-2.5 px-4 text-white font-semibold bg-gradient-orange rounded-lg hover:shadow-glow transition-all"
                                >
                                    REGISTER
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

export default Header
