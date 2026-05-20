'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowUpDown, TrendingUp, Tag, Clock, Loader2, AlertCircle, CheckCircle, RefreshCw, CreditCard } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

// payment_method and service_level IDs confirmed from getTransactionUISettings API response
const TRANSFER_TYPES = [
  { label: 'Account',          trans_type: 'Account',          payment_method: '11', service_level: '1' },
  { label: 'Cash Collection',  trans_type: 'Cash Collection',  payment_method: '11', service_level: '1' },
  { label: 'Card Transfer',    trans_type: 'Card Transfer',    payment_method: '7',  service_level: '1' },
  { label: 'Home Delivery',    trans_type: 'Home Delivery',    payment_method: '11', service_level: '1' },
  { label: 'Utility Bill',     trans_type: 'Utility Bill',     payment_method: '11', service_level: '1' },
  { label: 'Mobile Transfer',  trans_type: 'Mobile Transfer',  payment_method: '11', service_level: '1' },
]

const CURRENCIES = [
  { code: 'INR', flag: '🇮🇳', name: 'India',         countryId: '999' },
  { code: 'PKR', flag: '🇵🇰', name: 'Pakistan',      countryId: '2' },
  { code: 'BDT', flag: '🇧🇩', name: 'Bangladesh',    countryId: '3' },
  { code: 'PHP', flag: '🇵🇭', name: 'Philippines',   countryId: '4' },
  { code: 'NGN', flag: '🇳🇬', name: 'Nigeria',       countryId: '5' },
  { code: 'GHS', flag: '🇬🇭', name: 'Ghana',         countryId: '6' },
  { code: 'KES', flag: '🇰🇪', name: 'Kenya',         countryId: '7' },
  { code: 'LKR', flag: '🇱🇰', name: 'Sri Lanka',     countryId: '8' },
  { code: 'NPR', flag: '🇳🇵', name: 'Nepal',         countryId: '9' },
  { code: 'USD', flag: '🇺🇸', name: 'United States', countryId: '10' },
  { code: 'EUR', flag: '🇪🇺', name: 'Europe',        countryId: '11' },
]

type Step = 'details' | 'review' | 'success'

interface TxResult {
  trans_session_id: string
  ref: string
  status: string
  trans_type: string
  send_amount: string
  receive_amount: string
  commission: string
  total_to_pay: string
  source_currency: string
  destination_currency: string
  rate: string
  beneficiary_name: string
}

export default function SendMoneyPage() {
  const { auth, isLoggedIn } = useAuth()
  const router = useRouter()
  const params = useSearchParams()

  const prefillBeneficiaryId = params.get('beneficiary_id') ?? ''
  const prefillName = params.get('name') ?? ''

  // Form state
  const [amount, setAmount] = useState('100')
  const [toCurrency, setToCurrency] = useState('INR')
  const [transferType, setTransferType] = useState<typeof TRANSFER_TYPES[0]>(TRANSFER_TYPES[0])
  const [beneficiaryId, setBeneficiaryId] = useState(prefillBeneficiaryId)
  const [cardNumber, setCardNumber] = useState('')
  const [step, setStep] = useState<Step>('details')

  // Rates state
  const [rate, setRate] = useState<number | null>(null)
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null)
  const [isLoadingRate, setIsLoadingRate] = useState(false)

  // Transaction state
  const [pendingTx, setPendingTx] = useState<TxResult | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const toCur = CURRENCIES.find((c) => c.code === toCurrency) ?? CURRENCIES[0]
  const isCardTransfer = transferType.payment_method === '7'

  useEffect(() => {
    if (!isLoggedIn) router.replace('/login')
  }, [isLoggedIn, router])

  const fetchRate = useCallback(async () => {
    setIsLoadingRate(true)
    try {
      const res = await fetch(`/api/exchange-rates?from=GBP&to=${toCurrency}&amount=${parseFloat(amount) || 100}`)
      const data = await res.json()
      setRate(data.rate ?? null)
      setConvertedAmount(data.convertedAmount ?? null)
    } catch { /* keep existing */ }
    finally { setIsLoadingRate(false) }
  }, [toCurrency, amount])

  useEffect(() => { fetchRate() }, [toCurrency])

  useEffect(() => {
    if (rate !== null) {
      setConvertedAmount(parseFloat((parseFloat(amount || '0') * rate).toFixed(2)))
    }
  }, [amount, rate])

  function handleReview() {
    if (!beneficiaryId.trim()) { setError('Please enter a beneficiary ID'); return }
    if (!amount || parseFloat(amount) <= 0) { setError('Please enter a valid amount'); return }
    if (isCardTransfer && !cardNumber.trim()) { setError('Please enter the card number for Card Transfer'); return }
    setError(null)
    setStep('review')
  }

  async function handleCreate() {
    if (!auth) return
    setIsSubmitting(true)
    setError(null)
    try {
      const body: Record<string, string> = {
        action: 'create',
        username: auth.username,
        session_token: auth.session_token,
        beneficiary_id: beneficiaryId.trim(),
        amount,
        amount_type: 'source',
        source_currency: 'GBP',
        destination_currency: toCurrency,
        trans_type: transferType.trans_type,
        payment_method: transferType.payment_method,
        service_level: transferType.service_level,
      }
      if (isCardTransfer && cardNumber.trim()) body.card_number = cardNumber.trim()

      const res = await fetch('/api/remitone/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (data.status === 'SUCCESS') {
        setPendingTx(data.data)
        setStep('success')
      } else {
        setError(data.message ?? 'Failed to create transaction. Please try again.')
        setStep('details')
      }
    } catch {
      setError('Unable to connect. Please try again.')
      setStep('details')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleConfirm() {
    if (!auth || !pendingTx?.trans_session_id) return
    setIsConfirming(true)
    setError(null)
    try {
      const res = await fetch('/api/remitone/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'confirm',
          username: auth.username,
          session_token: auth.session_token,
          trans_session_id: pendingTx.trans_session_id,
        }),
      })
      const data = await res.json()
      if (data.status === 'SUCCESS') {
        setPendingTx((prev) => prev ? { ...prev, ...(data.data ?? {}), status: data.data?.status || 'ENTERED' } : prev)
      } else {
        setError(data.message ?? 'Confirmation failed.')
      }
    } catch {
      setError('Unable to confirm. Please check Transactions.')
    } finally {
      setIsConfirming(false)
    }
  }

  if (!auth) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-brand-red-deep">
        <div className="max-w-lg mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Link>
          <span className="text-white font-semibold text-sm">Send Money</span>
          <div className="w-20" />
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8">

        {/* ── Success ── */}
        {step === 'success' && pendingTx && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center space-y-4">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Transfer Created!</h2>
            <p className="text-gray-500 text-sm">Review the details and confirm to complete.</p>
            <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-2 text-left">
              {pendingTx.beneficiary_name && (
                <div className="flex justify-between"><span className="text-gray-500">Recipient</span><span className="font-semibold">{pendingTx.beneficiary_name}</span></div>
              )}
              <div className="flex justify-between"><span className="text-gray-500">Transfer type</span><span className="font-semibold">{pendingTx.trans_type}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">You send</span><span className="font-semibold">{pendingTx.send_amount} {pendingTx.source_currency}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Fee</span><span className="font-semibold">£{pendingTx.commission}</span></div>
              <div className="flex justify-between border-t pt-2"><span className="text-gray-500">Total to pay</span><span className="font-bold text-brand-red">£{pendingTx.total_to_pay}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Recipient gets</span><span className="font-bold text-green-600">{parseFloat(pendingTx.receive_amount).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {pendingTx.destination_currency}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Rate</span><span className="text-gray-700">1 GBP = {parseFloat(pendingTx.rate).toFixed(4)} {pendingTx.destination_currency}</span></div>
              {pendingTx.ref && (
                <div className="flex justify-between border-t pt-2"><span className="text-gray-500">Reference</span><span className="font-bold font-mono text-xs">{pendingTx.ref}</span></div>
              )}
            </div>

            {error && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 text-sm text-red-700 text-left">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" /> {error}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Link href="/dashboard/transactions"
                className="flex-1 h-11 rounded-xl border-2 border-gray-200 text-sm font-bold text-gray-700 flex items-center justify-center hover:border-brand-red transition-colors">
                Transactions
              </Link>
              <button
                onClick={handleConfirm}
                disabled={isConfirming}
                className="flex-1 h-11 rounded-xl bg-brand-red text-white text-sm font-bold hover:bg-brand-red-deep transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isConfirming ? <><Loader2 className="h-4 w-4 animate-spin" /> Confirming…</> : 'Confirm Transfer'}
              </button>
            </div>
            <button onClick={() => { setStep('details'); setPendingTx(null); setError(null) }}
              className="flex items-center justify-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mx-auto transition-colors">
              <RefreshCw className="h-3.5 w-3.5" /> Send Again
            </button>
          </div>
        )}

        {/* ── Details / Review ── */}
        {step !== 'success' && (
          <div className="rounded-3xl bg-brand-red-deep p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-bold text-lg">
                {step === 'review' ? 'Review Transfer' : 'Send Money'}
              </h2>
              <div className="flex items-center gap-1.5 bg-white/10 border border-gold/40 text-gold text-xs font-semibold px-3 py-1.5 rounded-full">
                <TrendingUp className="h-3.5 w-3.5" />
                Live Rates
              </div>
            </div>

            {error && (
              <div className="mb-4 rounded-xl overflow-hidden">
                <div className="flex items-start gap-2 bg-red-900/40 border border-red-400/30 px-3 py-2.5 text-sm text-red-200">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" /> {error}
                </div>
                {/verif|pending|await/i.test(error) && (
                  <div className="bg-white/5 border border-white/10 border-t-0 px-3 py-2.5 text-xs text-white/50">
                    Account pending verification. Contact{' '}
                    <a href="mailto:narisa@kogopay.com" className="text-gold underline">narisa@kogopay.com</a>
                  </div>
                )}
              </div>
            )}

            {/* You Send */}
            <div className="bg-brand-red/60 border border-white/10 rounded-2xl p-4 mb-3">
              <p className="text-white/60 text-sm mb-2">You send</p>
              <div className="flex items-center gap-3">
                <input
                  type="number" min="1" value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={step === 'review'}
                  className="flex-1 bg-transparent text-white text-3xl font-bold outline-none w-0 min-w-0 disabled:opacity-70"
                />
                <div className="bg-white/15 border border-white/20 text-white text-sm font-semibold rounded-xl px-3 py-2 shrink-0">
                  🇬🇧 GBP
                </div>
              </div>
            </div>

            <div className="flex justify-center my-1 -my-1.5 relative z-10">
              <div className="h-10 w-10 rounded-full bg-gold flex items-center justify-center shadow-lg">
                <ArrowUpDown className="h-4 w-4 text-brand-red-deep" />
              </div>
            </div>

            {/* Recipient Gets */}
            <div className="bg-brand-red/40 border border-white/10 rounded-2xl p-4 mt-1 mb-4">
              <p className="text-white/60 text-sm mb-2">Recipient gets (est.)</p>
              <div className="flex items-center gap-3">
                <p className="flex-1 text-gold text-3xl font-bold">
                  {isLoadingRate
                    ? <span className="text-white/40 text-2xl animate-pulse">…</span>
                    : convertedAmount !== null
                      ? convertedAmount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      : '—'}
                </p>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  disabled={step === 'review'}
                  className="bg-white/15 border border-white/20 text-white text-sm font-semibold rounded-xl px-3 py-2 outline-none shrink-0 cursor-pointer disabled:opacity-70"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code} className="text-gray-900 bg-white">
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Transfer Type */}
            <div className="mb-4">
              <label className="block text-white/70 text-sm mb-1.5">Transfer Type</label>
              <select
                value={transferType.label}
                onChange={(e) => {
                  const t = TRANSFER_TYPES.find((t) => t.label === e.target.value)
                  if (t) { setTransferType(t); setCardNumber('') }
                }}
                disabled={step === 'review'}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-gold cursor-pointer disabled:opacity-70"
              >
                {TRANSFER_TYPES.map((t) => (
                  <option key={t.label} value={t.label} className="text-gray-900 bg-white">{t.label}</option>
                ))}
              </select>
            </div>

            {/* Card Number — only for Card Transfer */}
            {isCardTransfer && (
              <div className="mb-4">
                <label className="block text-white/70 text-sm mb-1.5">
                  <CreditCard className="inline h-3.5 w-3.5 mr-1" />
                  Recipient Card Number <span className="text-red-300">*</span>
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                  disabled={step === 'review'}
                  placeholder="1234 5678 9012 3456"
                  maxLength={16}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-gold placeholder:text-white/30 disabled:opacity-70 font-mono tracking-widest"
                />
              </div>
            )}

            {/* Rate info */}
            <div className="bg-white/5 border border-white/10 rounded-2xl divide-y divide-white/10 mb-4">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="flex items-center gap-2 text-white/60 text-sm"><TrendingUp className="h-4 w-4" /> Rate</span>
                <span className="text-white text-sm font-semibold">
                  {rate !== null ? `1 GBP = ${rate.toFixed(4)} ${toCurrency}` : '—'}
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="flex items-center gap-2 text-white/60 text-sm"><Tag className="h-4 w-4" /> Fee</span>
                <span className="text-gold text-sm font-semibold">From £0.00</span>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="flex items-center gap-2 text-white/60 text-sm"><Clock className="h-4 w-4" /> Arrives</span>
                <span className="text-white text-sm font-semibold">In minutes</span>
              </div>
            </div>

            {/* Beneficiary */}
            <div className="mb-6">
              <label className="block text-white/70 text-sm mb-1.5">
                Beneficiary ID <span className="text-red-300">*</span>
              </label>
              {prefillName && beneficiaryId ? (
                <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm">
                  {prefillName} <span className="text-white/40 ml-1">ID: {beneficiaryId}</span>
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    value={beneficiaryId}
                    onChange={(e) => { setBeneficiaryId(e.target.value); setError(null) }}
                    disabled={step === 'review'}
                    placeholder="Enter beneficiary ID"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-gold placeholder:text-white/30 disabled:opacity-70"
                  />
                  {prefillName && <p className="mt-1.5 text-white/50 text-xs">Sending to: {prefillName}</p>}
                </>
              )}
              {!prefillName && (
                <p className="mt-1.5 text-white/40 text-xs">
                  Go to <Link href="/dashboard/beneficiaries" className="text-gold underline">Beneficiaries</Link> to find IDs
                </p>
              )}
            </div>

            {/* Actions */}
            {step === 'details' && (
              <button
                onClick={handleReview}
                className="w-full flex items-center justify-center h-13 rounded-2xl bg-white text-brand-red font-bold text-base hover:bg-gold hover:text-brand-red-deep transition-colors py-3.5"
              >
                Review Transfer
              </button>
            )}

            {step === 'review' && (
              <div className="flex gap-3">
                <button
                  onClick={() => { setStep('details'); setError(null) }}
                  className="flex-1 h-13 rounded-2xl border border-white/30 text-white text-sm font-bold hover:bg-white/10 transition-colors py-3.5"
                >
                  Back
                </button>
                <button
                  onClick={handleCreate}
                  disabled={isSubmitting}
                  className="flex-1 h-13 rounded-2xl bg-white text-brand-red font-bold text-sm hover:bg-gold hover:text-brand-red-deep transition-colors disabled:opacity-60 flex items-center justify-center gap-2 py-3.5"
                >
                  {isSubmitting
                    ? <><Loader2 className="h-4 w-4 animate-spin" /> Processing…</>
                    : 'Confirm & Send'}
                </button>
              </div>
            )}
          </div>
        )}

        {step !== 'success' && (
          <p className="mt-4 text-center text-xs text-gray-400">
            Rates are indicative. Final rate confirmed at time of transfer.
          </p>
        )}
      </main>
    </div>
  )
}
