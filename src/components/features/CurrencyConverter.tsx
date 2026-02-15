'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, RefreshCw } from 'lucide-react'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { countries } from '@/lib/constants/countries'
import { useExchangeRate } from '@/hooks/useExchangeRate'
import { formatCurrency } from '@/lib/utils/currency'
import { cn } from '@/lib/utils'

const CurrencyConverter = () => {
    const [sendAmount, setSendAmount] = useState('1000')
    const [fromCountry, setFromCountry] = useState('US')
    const [toCountry, setToCountry] = useState('IN')

    const { rate, convertedAmount, isLoading, refetch } = useExchangeRate({
        from: fromCountry,
        to: toCountry,
        amount: parseFloat(sendAmount) || 0,
    })

    const countryOptions = countries.map((country) => ({
        value: country.code,
        label: `${country.name} (${country.currency})`,
        icon: country.flag,
    }))

    return (
        <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200/60 dark:border-slate-700/40 shadow-elevated p-6 md:p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Send Money
                </h2>
                <span className="badge badge-accent text-xs">Live Rates</span>
            </div>

            <div className="space-y-5">
                {/* Send Amount */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                        label="You Send"
                        type="number"
                        value={sendAmount}
                        onChange={(e) => setSendAmount(e.target.value)}
                        placeholder="1000"
                        className="text-xl font-semibold"
                    />
                    <Select
                        label="From"
                        value={fromCountry}
                        onChange={(e) => setFromCountry(e.target.value)}
                        options={countryOptions}
                    />
                </div>

                {/* Exchange Rate Pill */}
                <div className="flex items-center justify-center">
                    <div className="inline-flex items-center gap-3 bg-slate-50 dark:bg-slate-700/50 px-4 py-2 rounded-full text-sm">
                        <span className="text-slate-600 dark:text-slate-300 font-medium">
                            1 {countries.find((c) => c.code === fromCountry)?.currency} ={' '}
                            {rate?.toFixed(4)}{' '}
                            {countries.find((c) => c.code === toCountry)?.currency}
                        </span>
                        <button
                            onClick={() => refetch()}
                            className="text-primary-600 hover:text-primary-700 transition-colors p-0.5"
                            aria-label="Refresh rate"
                        >
                            <RefreshCw
                                className={cn('w-3.5 h-3.5', isLoading && 'animate-spin')}
                            />
                        </button>
                    </div>
                </div>

                {/* Receive Amount */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                            Recipient Gets
                        </label>
                        <div className="w-full px-4 py-3 rounded-xl border border-primary-200 dark:border-primary-700/50 bg-primary-50/50 dark:bg-primary-900/15 text-xl font-bold text-primary-700 dark:text-primary-400">
                            {isLoading
                                ? '...'
                                : formatCurrency(
                                    convertedAmount,
                                    countries.find((c) => c.code === toCountry)
                                        ?.currency
                                )}
                        </div>
                    </div>
                    <Select
                        label="To"
                        value={toCountry}
                        onChange={(e) => setToCountry(e.target.value)}
                        options={countryOptions}
                    />
                </div>

                {/* CTA */}
                <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    onClick={() =>
                        (window.location.href = 'https://app.remitone.com')
                    }
                >
                    Continue to Send
                </Button>

                <p className="text-xs text-slate-400 text-center">
                    Delivery within minutes · Fee from $2.99 · Bank-level security
                </p>
            </div>
        </div>
    )
}

export default CurrencyConverter
