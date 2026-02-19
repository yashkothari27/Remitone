'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
    { name: 'Personal', href: '/personal' },
    { name: 'Business', href: '/business' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Security', href: '/security' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
]

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header
            className={cn(
                'sticky top-0 z-50 w-full border-b transition-all duration-300',
                isScrolled
                    ? 'bg-deep-red/95 backdrop-blur-md border-white/10 shadow-lg'
                    : 'bg-deep-red border-white/10'
            )}
        >
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <img
                        src="/Kogo Flower.jpeg"
                        alt="KogoPay Logo"
                        className="h-10 w-10 object-contain transition-transform group-hover:scale-105"
                    />
                    <span className="text-xl font-bold tracking-tight text-white uppercase italic">KogoPay</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-white/80 transition-colors hover:text-gold"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* CTA */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/contact"
                        className="hidden text-sm font-semibold text-white transition-colors hover:text-gold sm:block"
                    >
                        Log in
                    </Link>
                    <Link
                        href="/contact"
                        className="hidden sm:flex h-10 items-center justify-center rounded-lg bg-gold px-5 text-sm font-bold text-brand-red-deep transition-all hover:bg-white hover:shadow-lg hover:shadow-gold/20"
                    >
                        Sign Up
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                        className="md:hidden bg-brand-red-deep border-t border-white/10 overflow-hidden"
                    >
                        <div className="px-6 py-6 space-y-4">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block text-base font-medium text-white/80 hover:text-gold transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-white/10 space-y-3">
                                <Link
                                    href="/contact"
                                    className="block text-base font-medium text-white hover:text-gold"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Log in
                                </Link>
                                <Link
                                    href="/contact"
                                    className="flex h-12 items-center justify-center rounded-lg bg-gold px-6 text-base font-bold text-brand-red-deep"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

export default Header
