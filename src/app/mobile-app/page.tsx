import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import { Smartphone, Shield, Zap, Globe, Bell, ArrowRight, QrCode } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Mobile Apps - Remitone | Send Money on the Go',
    description: 'Download the Remitone mobile app for iOS and Android. Send money securely from your smartphone anytime, anywhere.',
}

export default function MobileAppPage() {
    const REMITONE_PLATFORM_URL = 'https://app.remitone.com'

    const features = [
        {
            icon: Smartphone,
            title: 'Send on the Go',
            description: 'Transfer money anytime, anywhere from your mobile device',
        },
        {
            icon: Shield,
            title: 'Secure & Safe',
            description: 'Biometric authentication and bank-level encryption',
        },
        {
            icon: Zap,
            title: 'Lightning Fast',
            description: 'Complete transfers in minutes with our optimized mobile app',
        },
        {
            icon: Globe,
            title: 'Track Transfers',
            description: 'Real-time notifications and status updates',
        },
        {
            icon: Bell,
            title: 'Smart Alerts',
            description: 'Get notified about exchange rate changes and transfer updates',
        },
        {
            icon: QrCode,
            title: 'QR Code Payments',
            description: 'Quick recipient addition via QR code scanning',
        },
    ]

    return (
        <main className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-cny-red">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                            Send Money from <span className="text-cny-gold">Your Phone</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 mb-8">
                            Download the Remitone app and send money securely on the go
                        </p>

                        {/* Download Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                            {/* TODO: Replace with actual App Store/Google Play URLs when available */}
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-8 py-4 text-gray-500 dark:text-gray-400">
                                <p>📱 App Store - Coming Soon</p>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-8 py-4 text-gray-500 dark:text-gray-400">
                                <p>📱 Google Play - Coming Soon</p>
                            </div>
                        </div>

                        {/* QR Code Placeholder */}
                        <div className="inline-block bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                            <div className="w-48 h-48 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                    <QrCode className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                                    <p className="text-sm text-gray-500 dark:text-gray-400">QR Code</p>
                                    <p className="text-xs text-gray-400">Coming Soon</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                                Scan to download
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        App Features
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {features.map((feature) => (
                            <div key={feature.title} className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-2xl flex items-center justify-center">
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Screenshots Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        App Screenshots
                    </h2>

                    {/* Placeholder for screenshots */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-3xl aspect-[9/19] flex items-center justify-center">
                                <p className="text-gray-500 dark:text-gray-400">Screenshot {i}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
                        Screenshots will be added once the app is available
                    </p>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Try Remitone on Web
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                        While our mobile apps are being finalized, you can start sending money using our web platform
                    </p>
                    <a
                        href={REMITONE_PLATFORM_URL}
                        className="inline-flex items-center gap-2 bg-cny-gold-gradient text-black px-7 py-3.5 rounded-xl font-semibold hover:shadow-glow transition-all"
                    >
                        Go to Web Platform
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    )
}
