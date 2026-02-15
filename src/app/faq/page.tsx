import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FAQItem from '@/components/features/FAQItem'
import { MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
    title: 'FAQ - Remitone | Frequently Asked Questions',
    description: 'Find answers to common questions about Remitone money transfers, fees, delivery times, security, and more.',
}

export default function FAQPage() {
    const faqs = [
        {
            question: 'How do I send money with Remitone?',
            answer: 'Sending money is easy! Simply sign up for a free account, verify your identity, enter your recipient details and transfer amount, choose your payment method, and confirm the transfer. Your recipient will receive the money within minutes to a few business days depending on the delivery method.',
        },
        {
            question: 'How long does a transfer take?',
            answer: 'Transfer times vary by destination and delivery method. Most transfers are completed within minutes for instant delivery. Bank transfers typically take 1-3 business days. You\'ll see the estimated delivery time before confirming your transfer.',
        },
        {
            question: 'What fees does Remitone charge?',
            answer: 'Our fees start from just $2.99 per transfer and vary based on the amount you send, destination country, and delivery method. We always show you the exact fee upfront before you confirm your transfer - no hidden charges.',
        },
        {
            question: 'How do I know my money is safe?',
            answer: 'Your security is our top priority. We use bank-level encryption to protect your data and funds. We\'re also regulated and licensed in multiple jurisdictions. All transfers are monitored for fraud, and we never share your personal information.',
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept bank transfers, debit cards, credit cards, and various digital payment methods depending on your location. You\'ll see all available payment options when setting up your transfer.',
        },
        {
            question: 'How can my recipient receive money?',
            answer: 'Recipients can receive money through bank deposit, cash pickup at thousands of locations worldwide, mobile wallet transfer, or home delivery in select countries. The available options depend on the destination country.',
        },
        {
            question: 'Do I need to verify my identity?',
            answer: 'Yes, for security and regulatory compliance, we require identity verification. You\'ll need to provide a valid government-issued ID. The verification process usually takes just a few minutes.',
        },
        {
            question: 'What countries can I send money to?',
            answer: 'You can send money to over 200 countries and territories worldwide. Check our Supported Countries page for the complete list and specific corridor information.',
        },
        {
            question: 'Can I cancel or modify a transfer?',
            answer: 'You may be able to cancel a transfer if it hasn\'t been processed yet. Contact our support team immediately if you need to cancel or modify a transfer. Please note that once a transfer is completed, it cannot be reversed.',
        },
        {
            question: 'How do I track my transfer?',
            answer: 'You can track your transfer in real-time through your Remitone account or mobile app. You\'ll also receive email and SMS notifications with status updates. Each transfer has a unique tracking number.',
        },
        {
            question: 'What if my transfer is delayed?',
            answer: 'While most transfers are completed quickly, delays can occasionally occur due to banking hours, public holidays, or verification requirements. If your transfer is delayed, check your account for notifications or contact our 24/7 support team.',
        },
        {
            question: 'Is there a limit on how much I can send?',
            answer: 'Transfer limits vary by country, verification level, and payment method. You\'ll see your specific limits in your account. Contact support if you need to send larger amounts.',
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
                            Frequently Asked <span className="text-gradient">Questions</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
                            Find answers to common questions about Remitone
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                            {faqs.map((faq, index) => (
                                <FAQItem key={index} question={faq.question} answer={faq.answer} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-2xl flex items-center justify-center">
                        <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">
                        Still have questions?
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                        Our support team is available 24/7 to help you
                    </p>
                    <a
                        href="/contact"
                        className="inline-block bg-gradient-primary text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                        Contact Support
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    )
}
