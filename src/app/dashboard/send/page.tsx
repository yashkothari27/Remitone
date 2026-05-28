'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, ArrowUpDown, TrendingUp, Tag, Clock,
  Loader2, AlertCircle, CheckCircle, RefreshCw, CreditCard, ChevronDown,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface DestCountry { id: string; name: string; iso_code: string }
interface Beneficiary { id: string; fname: string; lname: string; country_name?: string; country_id?: string }
interface RateInfo {
  destination_country_id: string
  destination_currency: string
  rate_account: string
  rate_cash_collection: string
  rate_card: string
  rate_home_delivery: string
  rate_mobile_transfer: string
  payment_method_code: string
  service_level_code: string
}
interface Charges {
  send_amount: string; receive_amount: string; commission: string
  total_to_pay: string; source_currency: string; destination_currency: string; rate: string
}
interface TxResult extends Charges {
  trans_session_id: string; ref: string; status: string
  trans_type: string; beneficiary_name: string
}

const TRANSFER_TYPES = [
  { label: 'Account',         trans_type: 'Account',         pmCode: 'BT',  slCode: 'STD' },
  { label: 'Cash Collection', trans_type: 'Cash Collection', pmCode: 'CC',  slCode: 'STD' },
  { label: 'Card Transfer',   trans_type: 'Card Transfer',   pmCode: 'CT',  slCode: 'STD' },
  { label: 'Home Delivery',   trans_type: 'Home Delivery',   pmCode: 'HD',  slCode: 'STD' },
  { label: 'Mobile Transfer', trans_type: 'Mobile Transfer', pmCode: 'MW',  slCode: 'STD' },
]

type Step = 'details' | 'review' | 'confirmed'

export default function SendMoneyPage() {
  const { auth, isLoggedIn } = useAuth()
  const router = useRouter()
  const params = useSearchParams()

  const prefillBeneficiaryId = params.get('beneficiary_id') ?? ''
  const prefillName           = params.get('name') ?? ''

  // Loaded data
  const [countries, setCountries]       = useState<DestCountry[]>([])
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([])
  const [rateInfo, setRateInfo]         = useState<RateInfo | null>(null)
  const [charges, setCharges]           = useState<Charges | null>(null)

  // Form
  const [countryId, setCountryId]       = useState('')
  const [amount, setAmount]             = useState('100')
  const [transferType, setTransferType] = useState(TRANSFER_TYPES[0])
  const [beneficiaryId, setBeneficiaryId] = useState(prefillBeneficiaryId)
  const [cardNumber, setCardNumber]     = useState('')
  const [step, setStep]                 = useState<Step>('details')

  // State
  const [loadingCountries, setLoadingCountries] = useState(true)
  const [loadingBeneficiaries, setLoadingBeneficiaries] = useState(true)
  const [loadingCharges, setLoadingCharges]     = useState(false)
  const [isSubmitting, setIsSubmitting]         = useState(false)
  const [isConfirming, setIsConfirming]         = useState(false)
  const [error, setError]                       = useState<string | null>(null)
  const [pendingTx, setPendingTx]               = useState<TxResult | null>(null)
  const [accountPending, setAccountPending]     = useState(false)

  const isCardTransfer = transferType.pmCode === 'CT'
  const selectedCountry = countries.find(c => c.id === countryId)

  useEffect(() => {
    if (!isLoggedIn) { router.replace('/login'); return }
    fetchCountries()
    fetchBeneficiaries()
  }, [isLoggedIn])

  // Fetch destination countries
  async function fetchCountries() {
    if (!auth) return
    setLoadingCountries(true)
    try {
      const res = await fetch(
        `/api/remitone/countries?username=${encodeURIComponent(auth.username)}&session_token=${encodeURIComponent(auth.session_token)}`
      )
      const data = await res.json()
      if (data.status === 'SUCCESS' && Array.isArray(data.data)) {
        setCountries(data.data)
        if (data.data.length > 0) setCountryId(data.data[0].id)
      }
    } catch { /* keep empty */ }
    finally { setLoadingCountries(false) }
  }

  // Fetch beneficiaries
  async function fetchBeneficiaries() {
    if (!auth) return
    setLoadingBeneficiaries(true)
    try {
      const res = await fetch(
        `/api/remitone/beneficiaries?username=${encodeURIComponent(auth.username)}&session_token=${encodeURIComponent(auth.session_token)}`
      )
      const data = await res.json()
      if (data.status === 'SUCCESS' && Array.isArray(data.data)) {
        setBeneficiaries(data.data)
        if (prefillBeneficiaryId) {
          setBeneficiaryId(prefillBeneficiaryId)
        } else if (data.data.length > 0) {
          setBeneficiaryId(data.data[0].id)
        }
      }
    } catch { /* keep empty */ }
    finally { setLoadingBeneficiaries(false) }
  }

  // Fetch rates for selected country to get payment_method_code / service_level_code
  const fetchRates = useCallback(async () => {
    if (!auth || !countryId) return
    try {
      const res = await fetch(
        `/api/remitone/rates?username=${encodeURIComponent(auth.username)}&session_token=${encodeURIComponent(auth.session_token)}&destination_country_id=${countryId}`
      )
      const data = await res.json()
      if (data.status === 'SUCCESS' && Array.isArray(data.data) && data.data.length > 0) {
        setRateInfo(data.data[0])
      }
    } catch { /* keep existing */ }
  }, [auth, countryId])

  useEffect(() => { if (countryId) fetchRates() }, [countryId])

  // Fetch charges whenever amount / country / transfer type changes
  const fetchCharges = useCallback(async () => {
    if (!auth || !countryId || !amount || parseFloat(amount) <= 0) {
      setCharges(null); return
    }
    setLoadingCharges(true)
    try {
      const pmCode = rateInfo?.payment_method_code || transferType.pmCode
      const slCode = rateInfo?.service_level_code  || transferType.slCode
      const res = await fetch(
        `/api/remitone/charges?username=${encodeURIComponent(auth.username)}&session_token=${encodeURIComponent(auth.session_token)}&destination_country_id=${countryId}&payment_method_code=${pmCode}&service_level_code=${slCode}&send_amount=${amount}`
      )
      const data = await res.json()
      if (data.status === 'SUCCESS' && data.data) {
        setCharges(data.data)
        setAccountPending(false)
      } else {
        setCharges(null)
        if (/verif|pending|await|approved/i.test(data.message ?? '')) setAccountPending(true)
      }
    } catch { setCharges(null) }
    finally { setLoadingCharges(false) }
  }, [auth, countryId, amount, transferType, rateInfo])

  useEffect(() => {
    const t = setTimeout(() => { if (countryId) fetchCharges() }, 600)
    return () => clearTimeout(t)
  }, [amount, countryId, transferType])

  function handleReview() {
    if (!beneficiaryId) { setError('Please select a beneficiary'); return }
    if (!countryId)     { setError('Please select a destination country'); return }
    if (!amount || parseFloat(amount) <= 0) { setError('Please enter a valid amount'); return }
    if (isCardTransfer && !cardNumber.trim()) { setError('Please enter the recipient card number'); return }
    setError(null)
    setStep('review')
  }

  async function handleCreate() {
    if (!auth) return
    setIsSubmitting(true)
    setError(null)
    try {
      const pmCode = rateInfo?.payment_method_code || transferType.pmCode
      const slCode = rateInfo?.service_level_code  || transferType.slCode
      const destCurrency = charges?.destination_currency || rateInfo?.destination_currency || ''

      const body: Record<string, string> = {
        action: 'create',
        username: auth.username,
        session_token: auth.session_token,
        beneficiary_id: beneficiaryId,
        amount,
        amount_type: 'source',
        source_currency: 'GBP',
        destination_currency: destCurrency,
        destination_country: countryId,
        trans_type: transferType.trans_type,
        payment_method: pmCode,
        service_level: slCode,
      }
      if (isCardTransfer && cardNumber.trim()) body.card_number = cardNumber.trim()

      const res = await fetch('/api/remitone/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (data.status === 'SUCCESS') {
        const bene = beneficiaries.find(b => b.id === beneficiaryId)
        setPendingTx({
          ...data.data,
          beneficiary_name: bene ? `${bene.fname} ${bene.lname}` : data.data?.beneficiary_name ?? '',
        })
        setStep('confirmed')
      } else {
        setError(data.message ?? 'Failed to create transfer. Please try again.')
        setStep('details')
      }
    } catch {
      setError('Unable to connect. Please try again.')
      setStep('details')
    } finally { setIsSubmitting(false) }
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
        setPendingTx(prev => prev ? { ...prev, status: data.data?.status || 'ENTERED' } : prev)
      } else {
        setError(data.message ?? 'Confirmation failed.')
      }
    } catch {
      setError('Unable to confirm. Please check your Transactions page.')
    } finally { setIsConfirming(false) }
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

        {/* ── Confirmed / Success ── */}
        {step === 'confirmed' && pendingTx && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center space-y-4">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Transfer Created!</h2>
            <p className="text-gray-500 text-sm">Review the details below and confirm to complete.</p>

            <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-2 text-left">
              {pendingTx.beneficiary_name && (
                <div className="flex justify-between"><span className="text-gray-500">Recipient</span><span className="font-semibold">{pendingTx.beneficiary_name}</span></div>
              )}
              <div className="flex justify-between"><span className="text-gray-500">Transfer type</span><span className="font-semibold">{pendingTx.trans_type || transferType.label}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">You send</span><span className="font-semibold">{pendingTx.send_amount} {pendingTx.source_currency}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Fee</span><span className="font-semibold">£{pendingTx.commission}</span></div>
              <div className="flex justify-between border-t pt-2"><span className="text-gray-500">Total to pay</span><span className="font-bold text-brand-red">£{pendingTx.total_to_pay}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Recipient gets</span><span className="font-bold text-green-600">{parseFloat(pendingTx.receive_amount || '0').toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {pendingTx.destination_currency}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Rate</span><span className="text-gray-700">1 GBP = {parseFloat(pendingTx.rate || '0').toFixed(4)} {pendingTx.destination_currency}</span></div>
              {pendingTx.ref && (
                <div className="flex justify-between border-t pt-2"><span className="text-gray-500">Reference</span><span className="font-bold font-mono text-xs">{pendingTx.ref}</span></div>
              )}
            </div>

            {error && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 text-sm text-red-700 text-left">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />{error}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Link href="/dashboard/transactions"
                className="flex-1 h-11 rounded-xl border-2 border-gray-200 text-sm font-bold text-gray-700 flex items-center justify-center hover:border-brand-red transition-colors">
                View Transactions
              </Link>
              <button onClick={handleConfirm} disabled={isConfirming}
                className="flex-1 h-11 rounded-xl bg-brand-red text-white text-sm font-bold hover:bg-brand-red-deep transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                {isConfirming ? <><Loader2 className="h-4 w-4 animate-spin" /> Confirming…</> : 'Confirm Transfer'}
              </button>
            </div>
            <button onClick={() => { setStep('details'); setPendingTx(null); setError(null) }}
              className="flex items-center justify-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mx-auto transition-colors">
              <RefreshCw className="h-3.5 w-3.5" /> Send Again
            </button>
          </div>
        )}

        {/* ── Details / Review form ── */}
        {step !== 'confirmed' && (
          <div className="rounded-3xl bg-brand-red-deep p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-bold text-lg">
                {step === 'review' ? 'Review Transfer' : 'Send Money'}
              </h2>
              <div className="flex items-center gap-1.5 bg-white/10 border border-gold/40 text-gold text-xs font-semibold px-3 py-1.5 rounded-full">
                <TrendingUp className="h-3.5 w-3.5" /> Live Rates
              </div>
            </div>

            {/* Account verification banner */}
            {accountPending && (
              <div className="mb-4 rounded-xl bg-amber-500/20 border border-amber-400/40 px-4 py-3 space-y-2">
                <div className="flex items-center gap-2 text-amber-200 text-sm font-semibold">
                  <AlertCircle className="h-4 w-4 shrink-0" /> Account awaiting verification
                </div>
                <p className="text-xs text-amber-200/80">
                  Your account is being reviewed. Once approved by KogoPAY you can send money.
                  Complete your profile details below to speed up verification.
                </p>
                <Link href="/dashboard/profile"
                  className="inline-flex items-center gap-1 text-xs text-gold font-semibold underline">
                  Complete Profile →
                </Link>
              </div>
            )}

            {error && !accountPending && (
              <div className="mb-4 rounded-xl overflow-hidden">
                <div className="flex items-start gap-2 bg-red-900/40 border border-red-400/30 px-3 py-2.5 text-sm text-red-200">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />{error}
                </div>
              </div>
            )}

            {/* You Send */}
            <div className="bg-brand-red/60 border border-white/10 rounded-2xl p-4 mb-3">
              <p className="text-white/60 text-sm mb-2">You send</p>
              <div className="flex items-center gap-3">
                <input type="number" min="1" value={amount}
                  onChange={e => setAmount(e.target.value)}
                  disabled={step === 'review'}
                  className="flex-1 bg-transparent text-white text-3xl font-bold outline-none w-0 min-w-0 disabled:opacity-70" />
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
              <p className="text-white/60 text-sm mb-2">Recipient gets</p>
              <div className="flex items-center gap-3">
                <p className="flex-1 text-gold text-3xl font-bold">
                  {loadingCharges
                    ? <span className="text-white/40 text-2xl animate-pulse">…</span>
                    : charges?.receive_amount
                      ? parseFloat(charges.receive_amount).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      : '—'}
                </p>

                {/* Destination country selector */}
                {loadingCountries ? (
                  <div className="bg-white/15 border border-white/20 text-white/60 text-sm rounded-xl px-3 py-2 flex items-center gap-1">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading…
                  </div>
                ) : (
                  <div className="relative shrink-0">
                    <select value={countryId} onChange={e => setCountryId(e.target.value)}
                      disabled={step === 'review'}
                      className="appearance-none bg-white/15 border border-white/20 text-white text-sm font-semibold rounded-xl pl-3 pr-7 py-2 outline-none cursor-pointer disabled:opacity-70">
                      {countries.map(c => (
                        <option key={c.id} value={c.id} className="text-gray-900 bg-white">
                          {c.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white pointer-events-none" />
                  </div>
                )}
              </div>
              {charges?.destination_currency && (
                <p className="text-white/40 text-xs mt-1">{charges.destination_currency} • {selectedCountry?.name}</p>
              )}
            </div>

            {/* Transfer Type */}
            <div className="mb-4">
              <label className="block text-white/70 text-sm mb-1.5">Transfer Type</label>
              <div className="relative">
                <select value={transferType.label}
                  onChange={e => {
                    const t = TRANSFER_TYPES.find(t => t.label === e.target.value)
                    if (t) { setTransferType(t); setCardNumber('') }
                  }}
                  disabled={step === 'review'}
                  className="w-full appearance-none bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-gold cursor-pointer disabled:opacity-70 pr-8">
                  {TRANSFER_TYPES.map(t => (
                    <option key={t.label} value={t.label} className="text-gray-900 bg-white">{t.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60 pointer-events-none" />
              </div>
            </div>

            {/* Card Number */}
            {isCardTransfer && (
              <div className="mb-4">
                <label className="block text-white/70 text-sm mb-1.5">
                  <CreditCard className="inline h-3.5 w-3.5 mr-1" />
                  Recipient Card Number <span className="text-red-300">*</span>
                </label>
                <input type="text" value={cardNumber}
                  onChange={e => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                  disabled={step === 'review'} placeholder="1234 5678 9012 3456" maxLength={16}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-gold placeholder:text-white/30 disabled:opacity-70 font-mono tracking-widest" />
              </div>
            )}

            {/* Rate / Fee / Arrival info */}
            <div className="bg-white/5 border border-white/10 rounded-2xl divide-y divide-white/10 mb-4">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="flex items-center gap-2 text-white/60 text-sm"><TrendingUp className="h-4 w-4" /> Rate</span>
                <span className="text-white text-sm font-semibold">
                  {charges?.rate ? `1 GBP = ${parseFloat(charges.rate).toFixed(4)} ${charges.destination_currency}` : loadingCharges ? '…' : '—'}
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="flex items-center gap-2 text-white/60 text-sm"><Tag className="h-4 w-4" /> Fee</span>
                <span className="text-gold text-sm font-semibold">
                  {charges?.commission ? `£${charges.commission}` : loadingCharges ? '…' : 'From £0.00'}
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="flex items-center gap-2 text-white/60 text-sm"><Clock className="h-4 w-4" /> Arrives</span>
                <span className="text-white text-sm font-semibold">In minutes</span>
              </div>
            </div>

            {/* Beneficiary selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-white/70 text-sm">
                  Recipient <span className="text-red-300">*</span>
                </label>
                <Link href="/dashboard/beneficiaries" className="text-gold text-xs underline">
                  + Add new
                </Link>
              </div>

              {loadingBeneficiaries ? (
                <div className="flex items-center gap-2 text-white/50 text-sm py-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Loading beneficiaries…
                </div>
              ) : beneficiaries.length === 0 ? (
                <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white/50 text-sm">
                  No beneficiaries yet.{' '}
                  <Link href="/dashboard/beneficiaries" className="text-gold underline">Add one first →</Link>
                </div>
              ) : prefillBeneficiaryId && prefillName ? (
                <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm">
                  {prefillName} <span className="text-white/40 ml-1">ID: {prefillBeneficiaryId}</span>
                </div>
              ) : (
                <div className="relative">
                  <select value={beneficiaryId} onChange={e => setBeneficiaryId(e.target.value)}
                    disabled={step === 'review'}
                    className="w-full appearance-none bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-gold cursor-pointer disabled:opacity-70 pr-8">
                    <option value="" className="text-gray-900 bg-white">Select recipient…</option>
                    {beneficiaries.map(b => (
                      <option key={b.id} value={b.id} className="text-gray-900 bg-white">
                        {b.fname} {b.lname}{b.country_name ? ` — ${b.country_name}` : ''}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60 pointer-events-none" />
                </div>
              )}
            </div>

            {/* CTA buttons */}
            {step === 'details' && (
              <button onClick={handleReview}
                className="w-full flex items-center justify-center h-13 rounded-2xl bg-white text-brand-red font-bold text-base hover:bg-gold hover:text-brand-red-deep transition-colors py-3.5">
                Review Transfer
              </button>
            )}

            {step === 'review' && (
              <div className="flex gap-3">
                <button onClick={() => { setStep('details'); setError(null) }}
                  className="flex-1 h-13 rounded-2xl border border-white/30 text-white text-sm font-bold hover:bg-white/10 transition-colors py-3.5">
                  Back
                </button>
                <button onClick={handleCreate} disabled={isSubmitting}
                  className="flex-1 h-13 rounded-2xl bg-white text-brand-red font-bold text-sm hover:bg-gold hover:text-brand-red-deep transition-colors disabled:opacity-60 flex items-center justify-center gap-2 py-3.5">
                  {isSubmitting
                    ? <><Loader2 className="h-4 w-4 animate-spin" /> Processing…</>
                    : 'Confirm & Send'}
                </button>
              </div>
            )}
          </div>
        )}

        {step !== 'confirmed' && (
          <p className="mt-4 text-center text-xs text-gray-400">
            Rates are indicative. Final rate confirmed at time of transfer.
          </p>
        )}
      </main>
    </div>
  )
}
