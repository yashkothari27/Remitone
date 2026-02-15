import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Search } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Supported Countries - Remitone | Send Money Worldwide',
    description: 'Send money to over 200 countries and territories worldwide. Fast, secure, and reliable money transfers with Remitone.',
}

export default function CountriesPage() {
    // Expanded list of supported corridors
    const corridors = [
        { from: 'GB', fromName: 'United Kingdom', fromFlag: '🇬🇧', to: 'IN', toName: 'India', toFlag: '🇮🇳' },
        { from: 'GB', fromName: 'United Kingdom', fromFlag: '🇬🇧', to: 'PK', toName: 'Pakistan', toFlag: '🇵🇰' },
        { from: 'GB', fromName: 'United Kingdom', fromFlag: '🇬🇧', to: 'BD', toName: 'Bangladesh', toFlag: '🇧🇩' },
        { from: 'GB', fromName: 'United Kingdom', fromFlag: '🇬🇧', to: 'PH', toName: 'Philippines', toFlag: '🇵🇭' },
        { from: 'AE', fromName: 'UAE', fromFlag: '🇦🇪', to: 'IN', toName: 'India', toFlag: '🇮🇳' },
        { from: 'AE', fromName: 'UAE', fromFlag: '🇦🇪', to: 'PH', toName: 'Philippines', toFlag: '🇵🇭' },
        { from: 'AE', fromName: 'UAE', fromFlag: '🇦🇪', to: 'PK', toName: 'Pakistan', toFlag: '🇵🇰' },
        { from: 'AE', fromName: 'UAE', fromFlag: '🇦🇪', to: 'BD', toName: 'Bangladesh', toFlag: '🇧🇩' },
        { from: 'US', fromName: 'United States', fromFlag: '🇺🇸', to: 'MX', toName: 'Mexico', toFlag: '🇲🇽' },
        { from: 'US', fromName: 'United States', fromFlag: '🇺🇸', to: 'IN', toName: 'India', toFlag: '🇮🇳' },
        { from: 'US', fromName: 'United States', fromFlag: '🇺🇸', to: 'CN', toName: 'China', toFlag: '🇨🇳' },
        { from: 'US', fromName: 'United States', fromFlag: '🇺🇸', to: 'PH', toName: 'Philippines', toFlag: '🇵🇭' },
        { from: 'CA', fromName: 'Canada', fromFlag: '🇨🇦', to: 'IN', toName: 'India', toFlag: '🇮🇳' },
        { from: 'CA', fromName: 'Canada', fromFlag: '🇨🇦', to: 'PH', toName: 'Philippines', toFlag: '🇵🇭' },
        { from: 'CA', fromName: 'Canada', fromFlag: '🇨🇦', to: 'CN', toName: 'China', toFlag: '🇨🇳' },
        { from: 'CA', fromName: 'Canada', fromFlag: '🇨🇦', to: 'PK', toName: 'Pakistan', toFlag: '🇵🇰' },
        { from: 'AU', fromName: 'Australia', fromFlag: '🇦🇺', to: 'IN', toName: 'India', toFlag: '🇮🇳' },
        { from: 'AU', fromName: 'Australia', fromFlag: '🇦🇺', to: 'PH', toName: 'Philippines', toFlag: '🇵🇭' },
        { from: 'AU', fromName: 'Australia', fromFlag: '🇦🇺', to: 'CN', toName: 'China', toFlag: '🇨🇳' },
        { from: 'AU', fromName: 'Australia', fromFlag: '🇦🇺', to: 'VN', toName: 'Vietnam', toFlag: '🇻🇳' },
        { from: 'SG', fromName: 'Singapore', fromFlag: '🇸🇬', to: 'IN', toName: 'India', toFlag: '🇮🇳' },
        { from: 'SG', fromName: 'Singapore', fromFlag: '🇸🇬', to: 'PH', toName: 'Philippines', toFlag: '🇵🇭' },
        { from: 'SG', fromName: 'Singapore', fromFlag: '🇸🇬', to: 'CN', toName: 'China', toFlag: '🇨🇳' },
        { from: 'SG', fromName: 'Singapore', fromFlag: '🇸🇬', to: 'MY', toName: 'Malaysia', toFlag: '🇲🇾' },
    ]

    return (
        <main className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-50 via-accent-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Send Money to <span className="text-gradient">200+ Countries</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
                            Fast, secure international money transfers to your loved ones worldwide
                        </p>
                    </div>
                </div>
            </section>

            {/* Search Bar (Optional Enhancement) */}
            <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search for a country..."
                                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Supported Corridors */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        Popular Transfer Corridors
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {corridors.map((corridor, index) => (
                            <div
                                key={`${corridor.from}-${corridor.to}-${index}`}
                                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3 flex-1">
                                        <span className="text-3xl">{corridor.fromFlag}</span>
                                        <span className="font-medium text-gray-900 dark:text-white truncate">
                                            {corridor.fromName}
                                        </span>
                                    </div>
                                    <span className="text-primary-600 font-bold mx-2">→</span>
                                    <div className="flex items-center space-x-3 flex-1">
                                        <span className="text-3xl">{corridor.toFlag}</span>
                                        <span className="font-medium text-gray-900 dark:text-white truncate">
                                            {corridor.toName}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                            Don&apos;t see your corridor?
                        </p>
                        <a
                            href="/contact"
                            className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                        >
                            Contact us to learn more
                        </a>
                    </div>
                </div>
            </section>

            {/* Regional Coverage */}
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        Global Coverage by Region
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        <div className="text-center">
                            <div className="text-4xl mb-3">🌏</div>
                            <h3 className="text-xl font-semibold mb-2">Asia Pacific</h3>
                            <p className="text-gray-600 dark:text-gray-400">45+ countries</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl mb-3">🌍</div>
                            <h3 className="text-xl font-semibold mb-2">Africa</h3>
                            <p className="text-gray-600 dark:text-gray-400">40+ countries</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl mb-3">🌎</div>
                            <h3 className="text-xl font-semibold mb-2">Americas</h3>
                            <p className="text-gray-600 dark:text-gray-400">35+ countries</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl mb-3">🌍</div>
                            <h3 className="text-xl font-semibold mb-2">Europe</h3>
                            <p className="text-gray-600 dark:text-gray-400">50+ countries</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
