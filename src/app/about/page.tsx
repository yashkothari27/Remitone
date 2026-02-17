import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Users, Target, Heart, Award } from 'lucide-react'

export const metadata: Metadata = {
    title: 'About Us - Remitone | Trusted International Money Transfers',
    description: 'Learn about Remitone, our mission to make international money transfers simple, secure, and affordable for everyone.',
}

export default function AboutPage() {
    const values = [
        {
            icon: Users,
            title: 'Customer First',
            description: 'Our customers are at the heart of everything we do. We prioritize your needs and work tirelessly to exceed your expectations.',
        },
        {
            icon: Target,
            title: 'Transparency',
            description: 'No hidden fees, no surprises. We believe in clear, upfront pricing and honest communication.',
        },
        {
            icon: Heart,
            title: 'Trust & Security',
            description: 'Your money and data are protected with bank-level security and regulatory compliance.',
        },
        {
            icon: Award,
            title: 'Excellence',
            description: 'We continuously innovate and improve our services to provide the best transfer experience.',
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
                            About <span className="text-cny-gold">Remitone</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90">
                            Making international money transfers simple, secure, and affordable
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                            Our Mission
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12">
                            To empower people around the world to send money to their loved ones quickly, securely, and affordably.
                        </p>

                        <div className="prose dark:prose-invert max-w-none">
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                Remitone was founded with a simple belief: sending money internationally shouldn&apos;t be complicated or expensive. Every day, millions of people work hard to support their families across borders, and they deserve a service that respects their effort.
                            </p>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                We built Remitone to remove the barriers that traditional money transfer services have created. Our platform combines cutting-edge technology with a customer-first approach to deliver fast, secure, and transparent international transfers.
                            </p>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                Whether you&apos;re supporting family, paying for education, or managing international business, Remitone is here to make your transfers seamless and reliable.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                        Our Values
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {values.map((value) => (
                            <div key={value.title} className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-800 hover:border-cny-gold-secondary transition-colors">
                                <div className="w-16 h-16 mb-4 bg-cny-gold-gradient rounded-2xl flex items-center justify-center">
                                    <value.icon className="w-8 h-8 text-black" />
                                </div>
                                <h3 className="text-2xl font-semibold mb-3">{value.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">200+</div>
                            <div className="text-gray-600 dark:text-gray-400">Countries</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">24/7</div>
                            <div className="text-gray-600 dark:text-gray-400">Support</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">100%</div>
                            <div className="text-gray-600 dark:text-gray-400">Secure</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">Fast</div>
                            <div className="text-gray-600 dark:text-gray-400">Transfers</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="py-20 bg-cny-red text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Trusted by Thousands
                    </h2>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Join the growing community of customers who trust Remitone for their international money transfers
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    )
}
