import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContactForm from '@/components/features/ContactForm'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Contact Us - Remitone | Get in Touch',
    description: 'Have questions? Contact Remitone support 24/7. We\'re here to help with your international money transfer needs.',
}

export default function ContactPage() {
    const contactInfo = [
        {
            icon: Mail,
            title: 'Email',
            content: 'support@remitone.com',
            link: 'mailto:support@remitone.com',
        },
        {
            icon: Phone,
            title: 'Phone',
            content: '+1 (800) 123-4567',
            link: 'tel:+18001234567',
        },
        {
            icon: Clock,
            title: 'Support Hours',
            content: '24/7 Customer Support',
            link: null,
        },
        {
            icon: MapPin,
            title: 'Address',
            content: 'Coming Soon',
            link: null,
        },
    ]

    return (
        <main className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-50 via-accent-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Get in <span className="text-gradient">Touch</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
                            We&apos;re here to help with any questions or concerns
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
                        {contactInfo.map((info) => (
                            <div
                                key={info.title}
                                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center"
                            >
                                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-primary rounded-xl flex items-center justify-center">
                                    <info.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                                {info.link ? (
                                    <a
                                        href={info.link}
                                        className="text-primary-600 hover:text-primary-700 transition-colors"
                                    >
                                        {info.content}
                                    </a>
                                ) : (
                                    <p className="text-gray-600 dark:text-gray-400">{info.content}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12">
                            <h2 className="text-3xl font-bold mb-6 text-center">
                                Send us a Message
                            </h2>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
