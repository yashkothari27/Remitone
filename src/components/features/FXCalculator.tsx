'use client'

import { useState } from 'react'
import Link from 'next/link'

const currencies = [
    { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
    { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
    { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
    { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },
    { code: 'AED', name: 'UAE Dirham', flag: '🇦🇪' },
    { code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬' },
    { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
]

// Marketing-only indicative rates (no backend)
const indicativeRates: Record<string, Record<string, number>> = {
    GBP: { CNY: 9.2505, INR: 106.50, USD: 1.2650, EUR: 1.1710, AED: 4.6450, SGD: 1.6920, JPY: 190.25, GBP: 1 },
    USD: { CNY: 7.3125, INR: 84.20, GBP: 0.7905, EUR: 0.9258, AED: 3.6725, SGD: 1.3380, JPY: 150.35, USD: 1 },
    EUR: { CNY: 7.8950, INR: 90.95, GBP: 0.8540, USD: 1.0801, AED: 3.9670, SGD: 1.4450, JPY: 162.40, EUR: 1 },
    CNY: { GBP: 0.1081, USD: 0.1368, EUR: 0.1267, INR: 11.51, AED: 0.5024, SGD: 0.1830, JPY: 20.58, CNY: 1 },
    INR: { GBP: 0.0094, USD: 0.0119, EUR: 0.0110, CNY: 0.0869, AED: 0.0436, SGD: 0.0159, JPY: 1.786, INR: 1 },
    AED: { GBP: 0.2153, USD: 0.2723, EUR: 0.2521, CNY: 1.9905, INR: 22.93, SGD: 0.3645, JPY: 40.94, AED: 1 },
    SGD: { GBP: 0.5910, USD: 0.7474, EUR: 0.6920, CNY: 5.4645, INR: 62.90, AED: 2.7435, JPY: 112.35, SGD: 1 },
    JPY: { GBP: 0.00526, USD: 0.00665, EUR: 0.00616, CNY: 0.04859, INR: 0.5599, AED: 0.02443, SGD: 0.00890, JPY: 1 },
}

const FXCalculator = () => {
    const [sendAmount, setSendAmount] = useState(1000)
    const [fromCurrency, setFromCurrency] = useState('GBP')
    const [toCurrency, setToCurrency] = useState('CNY')

    const rate = indicativeRates[fromCurrency]?.[toCurrency] || 1
    const fee = 0
    const receiveAmount = (sendAmount * rate).toFixed(2)

    const fromCurrencyData = currencies.find((c) => c.code === fromCurrency)
    const toCurrencyData = currencies.find((c) => c.code === toCurrency)

    const swapCurrencies = () => {
        setFromCurrency(toCurrency)
        setToCurrency(fromCurrency)
    }

    return (
        <div className="relative">
            {/* Glow effect behind card */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/20 to-gold/10 blur-2xl transform rotate-3 scale-95 rounded-3xl" />

            <div className="bg-deep-red shadow-2xl relative flex flex-col gap-6 rounded-3xl p-6 sm:p-8 border border-white/10 text-white">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <h3 className="text-lg font-bold text-white">Currency Converter</h3>
                    <span className="flex items-center gap-1 text-xs font-medium text-gold bg-gold/10 px-2 py-1 rounded-full border border-gold/20">
                        <span className="material-symbols-outlined text-sm">trending_up</span>
                        Live Rates
                    </span>
                </div>

                {/* You Send */}
                <div className="group relative rounded-2xl bg-black/20 p-4 border border-white/5 transition-colors focus-within:border-gold/50 focus-within:ring-1 focus-within:ring-gold/50">
                    <label className="block text-xs font-medium text-white/60 mb-1">You send</label>
                    <div className="flex items-center justify-between">
                        <input
                            className="block w-full bg-transparent border-none p-0 text-2xl font-bold text-white focus:ring-0 focus:outline-none placeholder-white/30"
                            placeholder="0.00"
                            type="number"
                            value={sendAmount}
                            onChange={(e) => setSendAmount(parseFloat(e.target.value) || 0)}
                        />
                        <div className="relative">
                            <select
                                value={fromCurrency}
                                onChange={(e) => setFromCurrency(e.target.value)}
                                className="appearance-none flex items-center gap-2 rounded-lg bg-white/10 pl-3 pr-8 py-2 border border-white/10 text-white font-bold text-sm cursor-pointer hover:bg-white/20 transition-colors focus:outline-none focus:ring-0"
                            >
                                {currencies.map((c) => (
                                    <option key={c.code} value={c.code} className="bg-gray-900 text-white">
                                        {c.flag} {c.code}
                                    </option>
                                ))}
                            </select>
                            <span className="material-symbols-outlined text-white/60 text-sm absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">expand_more</span>
                        </div>
                    </div>
                </div>

                {/* Swap Button */}
                <div className="relative flex h-8 items-center justify-center -my-3 z-10">
                    <button
                        onClick={swapCurrencies}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-brand-red-deep shadow-lg shadow-black/20 border-2 border-brand-red-deep hover:scale-110 transition-transform"
                    >
                        <span className="material-symbols-outlined text-lg font-bold">swap_vert</span>
                    </button>
                </div>

                {/* Recipient Gets */}
                <div className="group relative rounded-2xl bg-black/20 p-4 border border-white/5 transition-colors focus-within:border-gold/50 focus-within:ring-1 focus-within:ring-gold/50">
                    <label className="block text-xs font-medium text-white/60 mb-1">Recipient gets</label>
                    <div className="flex items-center justify-between">
                        <input
                            className="block w-full bg-transparent border-none p-0 text-2xl font-bold text-gold focus:ring-0 focus:outline-none placeholder-white/30"
                            placeholder="0.00"
                            readOnly
                            type="text"
                            value={receiveAmount}
                        />
                        <div className="relative">
                            <select
                                value={toCurrency}
                                onChange={(e) => setToCurrency(e.target.value)}
                                className="appearance-none flex items-center gap-2 rounded-lg bg-white/10 pl-3 pr-8 py-2 border border-white/10 text-white font-bold text-sm cursor-pointer hover:bg-white/20 transition-colors focus:outline-none focus:ring-0"
                            >
                                {currencies.map((c) => (
                                    <option key={c.code} value={c.code} className="bg-gray-900 text-white">
                                        {c.flag} {c.code}
                                    </option>
                                ))}
                            </select>
                            <span className="material-symbols-outlined text-white/60 text-sm absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">expand_more</span>
                        </div>
                    </div>
                </div>

                {/* Rate Info */}
                <div className="flex flex-col gap-3 rounded-xl bg-white/5 p-4 text-sm border border-white/5">
                    <div className="flex justify-between items-center text-white/60">
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-base">info</span>
                            <span>Rate</span>
                        </div>
                        <span className="text-white font-medium">1 {fromCurrency} = {rate} {toCurrency}</span>
                    </div>
                    <div className="flex justify-between items-center text-white/60">
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-base">local_offer</span>
                            <span>Fee</span>
                        </div>
                        <span className="text-gold font-bold">{fee.toFixed(2)} {fromCurrency}</span>
                    </div>
                    <div className="flex justify-between items-center text-white/60">
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-base">schedule</span>
                            <span>Arrives</span>
                        </div>
                        <span className="text-white font-medium">In minutes</span>
                    </div>
                </div>

                {/* CTA */}
                <Link href="/register" className="mt-2 w-full rounded-xl bg-white py-4 text-base font-bold text-brand-red shadow-lg shadow-black/10 transition-all hover:bg-gray-100 active:scale-[0.98] flex items-center justify-center">
                    Send Money Now
                </Link>
            </div>
        </div>
    )
}

export default FXCalculator
