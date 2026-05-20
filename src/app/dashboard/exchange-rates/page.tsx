'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowUpDown, TrendingUp, RefreshCw, Clock, Tag } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const CURRENCIES = [
  { code: 'GBP', flag: '🇬🇧', name: 'British Pound' },
  { code: 'INR', flag: '🇮🇳', name: 'Indian Rupee' },
  { code: 'PKR', flag: '🇵🇰', name: 'Pakistani Rupee' },
  { code: 'BDT', flag: '🇧🇩', name: 'Bangladeshi Taka' },
  { code: 'NGN', flag: '🇳🇬', name: 'Nigerian Naira' },
  { code: 'GHS', flag: '🇬🇭', name: 'Ghanaian Cedi' },
  { code: 'KES', flag: '🇰🇪', name: 'Kenyan Shilling' },
  { code: 'PHP', flag: '🇵🇭', name: 'Philippine Peso' },
  { code: 'USD', flag: '🇺🇸', name: 'US Dollar' },
  { code: 'EUR', flag: '🇪🇺', name: 'Euro' },
  { code: 'LKR', flag: '🇱🇰', name: 'Sri Lankan Rupee' },
  { code: 'NPR', flag: '🇳🇵', name: 'Nepalese Rupee' },
]

export default function ExchangeRatesPage() {
  const { isLoggedIn } = useAuth()
  const router = useRouter()

  const [amount, setAmount] = useState('1000')
  const [fromCurrency, setFromCurrency] = useState('GBP')
  const [toCurrency, setToCurrency] = useState('INR')
  const [rate, setRate] = useState<number | null>(null)
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    if (!isLoggedIn) { router.replace('/login'); return }
  }, [isLoggedIn, router])

  useEffect(() => {
    fetchRate()
  }, [fromCurrency, toCurrency])

  useEffect(() => {
    if (rate !== null) {
      const amt = parseFloat(amount) || 0
      setConvertedAmount(parseFloat((amt * rate).toFixed(2)))
    }
  }, [amount, rate])

  async function fetchRate() {
    setIsLoading(true)
    try {
      const res = await fetch(
        `/api/exchange-rates?from=${fromCurrency}&to=${toCurrency}&amount=${parseFloat(amount) || 1000}`
      )
      const data = await res.json()
      setRate(data.rate ?? null)
      setConvertedAmount(data.convertedAmount ?? null)
      setLastUpdated(new Date())
    } catch {
      // keep existing rate
    } finally {
      setIsLoading(false)
    }
  }

  function handleSwap() {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const fromCur = CURRENCIES.find((c) => c.code === fromCurrency)
  const toCur = CURRENCIES.find((c) => c.code === toCurrency)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-brand-red-deep">
        <div className="max-w-lg mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Link>
          <span className="text-white font-semibold text-sm">Exchange Rates</span>
          <div className="w-20" />
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8">
        {/* Currency Converter Card */}
        <div className="rounded-3xl bg-brand-red-deep p-6 shadow-xl">
          {/* Title row */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white font-bold text-lg">Currency Converter</h2>
            <div className="flex items-center gap-1.5 bg-white/10 border border-gold/40 text-gold text-xs font-semibold px-3 py-1.5 rounded-full">
              <TrendingUp className="h-3.5 w-3.5" />
              Live Rates
            </div>
          </div>

          {/* You Send */}
          <div className="bg-brand-red/60 border border-white/10 rounded-2xl p-4 mb-3">
            <p className="text-white/60 text-sm mb-2">You send</p>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 bg-transparent text-white text-3xl font-bold outline-none w-0 min-w-0"
                placeholder="0"
              />
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="bg-white/15 border border-white/20 text-white text-sm font-semibold rounded-xl px-3 py-2 outline-none shrink-0 cursor-pointer"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code} className="text-gray-900 bg-white">
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap button */}
          <div className="flex justify-center my-1 -my-1.5 relative z-10">
            <button
              onClick={handleSwap}
              className="h-10 w-10 rounded-full bg-gold flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
              <ArrowUpDown className="h-4 w-4 text-brand-red-deep" />
            </button>
          </div>

          {/* Recipient Gets */}
          <div className="bg-brand-red/40 border border-white/10 rounded-2xl p-4 mt-1">
            <p className="text-white/60 text-sm mb-2">Recipient gets</p>
            <div className="flex items-center gap-3">
              <p className="flex-1 text-gold text-3xl font-bold">
                {isLoading ? (
                  <span className="text-white/40 text-2xl">…</span>
                ) : convertedAmount !== null ? (
                  convertedAmount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                ) : '—'}
              </p>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="bg-white/15 border border-white/20 text-white text-sm font-semibold rounded-xl px-3 py-2 outline-none shrink-0 cursor-pointer"
              >
                {CURRENCIES.filter((c) => c.code !== fromCurrency).map((c) => (
                  <option key={c.code} value={c.code} className="text-gray-900 bg-white">
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Rate info */}
          <div className="mt-4 bg-white/5 border border-white/10 rounded-2xl divide-y divide-white/10">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="flex items-center gap-2 text-white/60 text-sm">
                <TrendingUp className="h-4 w-4" /> Rate
              </span>
              <span className="text-white text-sm font-semibold">
                {rate !== null
                  ? `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`
                  : '—'}
              </span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <span className="flex items-center gap-2 text-white/60 text-sm">
                <Tag className="h-4 w-4" /> Fee
              </span>
              <span className="text-gold text-sm font-semibold">From £0.00</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <span className="flex items-center gap-2 text-white/60 text-sm">
                <Clock className="h-4 w-4" /> Arrives
              </span>
              <span className="text-white text-sm font-semibold">In minutes</span>
            </div>
          </div>

          {/* Refresh + timestamp */}
          <div className="flex items-center justify-between mt-3 px-1">
            <button
              onClick={fetchRate}
              disabled={isLoading}
              className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-xs transition-colors"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh rate
            </button>
            {lastUpdated && (
              <span className="text-white/30 text-xs">
                Updated {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>

          {/* CTA */}
          <Link
            href="/dashboard/send"
            className="mt-5 flex w-full items-center justify-center h-13 rounded-2xl bg-white text-brand-red font-bold text-base hover:bg-gold hover:text-brand-red-deep transition-colors py-3.5"
          >
            Send Money Now
          </Link>
        </div>

        {/* Indicative note */}
        <p className="mt-4 text-center text-xs text-gray-400">
          Rates are indicative. Final rate confirmed at time of transfer.
        </p>
      </main>
    </div>
  )
}
