import Link from 'next/link'

const Footer = () => {
    return (
        <footer className="bg-deep-red border-t border-white/10 pt-16 pb-8">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <img
                                src="/kogo-logo.png"
                                alt="KogoPay Logo"
                                className="h-10 w-10 object-contain"
                            />
                            <span className="text-xl font-bold text-white uppercase italic">KogoPay</span>
                        </div>
                        <p className="text-white/70 text-sm mb-6 max-w-sm">
                            KogoPay Group offers a socially conscious mobile payments platform, enabling instant,
                            affordable money transfers worldwide.
                        </p>
                        <div className="flex gap-4">
                            <a className="text-white/60 hover:text-white transition-colors" href="#" aria-label="Website">
                                <span className="material-symbols-outlined">public</span>
                            </a>
                            <a className="text-white/60 hover:text-white transition-colors" href="#" aria-label="Email">
                                <span className="material-symbols-outlined">alternate_email</span>
                            </a>
                            <a className="text-white/60 hover:text-white transition-colors" href="#" aria-label="Chat">
                                <span className="material-symbols-outlined">chat</span>
                            </a>
                        </div>
                    </div>

                    {/* Product */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-white font-bold">Product</h4>
                        <Link className="text-white/70 text-sm hover:text-white transition-colors" href="/personal">Personal Account</Link>
                        <Link className="text-white/70 text-sm hover:text-white transition-colors" href="/business">Business Account</Link>
                        <Link className="text-white/70 text-sm hover:text-white transition-colors" href="/pricing">Pricing</Link>
                    </div>

                    {/* Company */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-white font-bold">Company</h4>
                        <Link className="text-white/70 text-sm hover:text-white transition-colors" href="/about">About Us</Link>
                        <Link className="text-white/70 text-sm hover:text-white transition-colors" href="/security">Security</Link>
                        <Link className="text-white/70 text-sm hover:text-white transition-colors" href="/contact">Contact Us</Link>
                    </div>

                    {/* Support */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-white font-bold">Support</h4>
                        <Link className="text-white/70 text-sm hover:text-white transition-colors" href="/contact">Help Center</Link>
                        <Link className="text-white/70 text-sm hover:text-white transition-colors" href="/security">Security</Link>
                        <Link className="text-white/70 text-sm hover:text-white transition-colors" href="/contact">System Status</Link>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/50 text-xs text-center md:text-left">
                        © 2025 KogoPay Limited. All rights reserved. KogoPay is authorised by the Financial Conduct Authority (FCA).
                    </p>
                    <div className="flex gap-6">
                        <a className="text-white/50 text-xs hover:text-white transition-colors" href="#">Privacy Policy</a>
                        <a className="text-white/50 text-xs hover:text-white transition-colors" href="#">Terms of Service</a>
                        <a className="text-white/50 text-xs hover:text-white transition-colors" href="#">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
