import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
    title: 'Cookie Policy - Remitone | How We Use Cookies',
    description: 'Learn about how Remitone uses cookies and similar tracking technologies to improve your experience.',
}

export default function CookiesPage() {
    return (
        <main className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-12 bg-gradient-to-br from-primary-50 via-accent-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Cookie <span className="text-gradient">Policy</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            Last Updated: February 13, 2026
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto prose dark:prose-invert prose-lg">
                        <h2>What Are Cookies?</h2>
                        <p>
                            Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
                        </p>

                        <h2>How We Use Cookies</h2>
                        <p>Remitone uses cookies and similar technologies to:</p>
                        <ul>
                            <li>Enable essential website functionality</li>
                            <li>Remember your preferences and settings</li>
                            <li>Understand how you use our website</li>
                            <li>Improve our services and user experience</li>
                            <li>Provide personalized content and features</li>
                            <li>Analyze website traffic and performance</li>
                        </ul>

                        <h2>Types of Cookies We Use</h2>

                        <h3>Essential Cookies</h3>
                        <p>
                            These cookies are necessary for the website to function properly. They enable core functionality such as security, authentication, and accessibility. The website cannot function properly without these cookies.
                        </p>

                        <h3>Performance Cookies</h3>
                        <p>
                            These cookies collect information about how visitors use our website, such as which pages are visited most often and if visitors receive error messages. This helps us improve how our website works.
                        </p>

                        <h3>Functionality Cookies</h3>
                        <p>
                            These cookies allow the website to remember choices you make (such as your language preference) and provide enhanced, more personalized features.
                        </p>

                        <h3>Targeting/Advertising Cookies</h3>
                        <p>
                            These cookies are used to deliver advertisements that are relevant to you and your interests. They also limit the number of times you see an ad and help measure the effectiveness of advertising campaigns.
                        </p>

                        <h2>Third-Party Cookies</h2>
                        <p>
                            We may use third-party services that place cookies on your device. These may include:
                        </p>
                        <ul>
                            <li>Google Analytics for website analytics</li>
                            <li>Payment processors for transaction security</li>
                            <li>Social media platforms for content sharing</li>
                            <li>Advertising networks for marketing purposes</li>
                        </ul>

                        <h2>Managing Cookies</h2>
                        <p>
                            You can control and manage cookies in various ways:
                        </p>

                        <h3>Browser Settings</h3>
                        <p>
                            Most web browsers allow you to refuse cookies, delete existing cookies, or alert you when cookies are being sent. Check your browser&apos;s help section for instructions.
                        </p>

                        <h3>Cookie Preferences</h3>
                        <p>
                            You can manage your cookie preferences through our cookie consent banner, which appears when you first visit our website.
                        </p>

                        <h3>Opt-Out Tools</h3>
                        <p>
                            You can opt out of certain third-party cookies using tools like:
                        </p>
                        <ul>
                            <li>Network Advertising Initiative (NAI) opt-out tool</li>
                            <li>Digital Advertising Alliance (DAA) opt-out tool</li>
                            <li>Your Online Choices (for EU visitors)</li>
                        </ul>

                        <p className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 my-6">
                            <strong>Note:</strong> Blocking or deleting cookies may impact your experience on our website. Some features may not function properly without cookies enabled.
                        </p>

                        <h2>Mobile Devices</h2>
                        <p>
                            Mobile devices use technologies similar to cookies, such as:
                        </p>
                        <ul>
                            <li>Device identifiers (IDFA for iOS, Advertising ID for Android)</li>
                            <li>App analytics SDKs</li>
                            <li>Local storage</li>
                        </ul>
                        <p>
                            You can manage these through your device settings.
                        </p>

                        <h2>Do Not Track Signals</h2>
                        <p>
                            Some browsers include a &quot;Do Not Track&quot; feature. Currently, there is no industry standard for how to respond to these signals, and we do not currently respond to Do Not Track browser signals.
                        </p>

                        <h2>Updates to This Policy</h2>
                        <p>
                            We may update this Cookie Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by updating the &quot;Last Updated&quot; date.
                        </p>

                        <h2>Contact Us</h2>
                        <p>
                            If you have questions about our use of cookies, please contact us at:
                        </p>
                        <p>
                            Email: <a href="mailto:privacy@remitone.com">privacy@remitone.com</a>
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
