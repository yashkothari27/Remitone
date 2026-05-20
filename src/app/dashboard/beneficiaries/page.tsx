'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Users, Plus, ArrowLeft, Loader2, AlertCircle, CheckCircle, User, MapPin, Phone, Mail } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface Beneficiary {
  id: string; fname: string; lname: string; mname?: string
  email?: string; mobile?: string; city?: string
  country_name?: string; country_iso_code?: string
}

interface DestCountry { id: string; name: string; iso_code: string }

interface NewBeneficiaryForm {
  fname: string; lname: string; email: string; mobile: string
  address1: string; city: string; country_id: string
  // Account Transfer
  bank_account_number1: string; bank1: string; bank_iban1: string; bank_swift_code1: string
  // Mobile Transfer
  mobile_transfer_number: string; mobile_transfer_network: string
  // Card Transfer
  card_number: string
  // Home Delivery
  home_delivery_notes: string
}

const EMPTY_FORM: NewBeneficiaryForm = {
  fname: '', lname: '', email: '', mobile: '', address1: '', city: '', country_id: '',
  bank_account_number1: '', bank1: '', bank_iban1: '', bank_swift_code1: '',
  mobile_transfer_number: '', mobile_transfer_network: '',
  card_number: '', home_delivery_notes: '',
}

export default function BeneficiariesPage() {
  const { auth, isLoggedIn } = useAuth()
  const router = useRouter()
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<NewBeneficiaryForm>(EMPTY_FORM)
  const [formErrors, setFormErrors] = useState<Partial<NewBeneficiaryForm>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [addedId, setAddedId] = useState<string | null>(null)
  const [destCountries, setDestCountries] = useState<DestCountry[]>([])
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})
  const toggleSection = (s: string) => setOpenSections((p) => ({ ...p, [s]: !p[s] }))

  useEffect(() => {
    if (!isLoggedIn) { router.replace('/login'); return }
    fetchBeneficiaries()
    fetchDestCountries()
  }, [isLoggedIn])

  async function fetchDestCountries() {
    if (!auth) return
    try {
      const res = await fetch(
        `/api/remitone/countries?username=${encodeURIComponent(auth.username)}&session_token=${encodeURIComponent(auth.session_token)}`
      )
      const data = await res.json()
      if (data.status === 'SUCCESS' && data.data?.length) {
        setDestCountries(data.data)
      }
    } catch { /* silently fall back */ }
  }

  async function fetchBeneficiaries() {
    if (!auth) return
    setIsLoading(true)
    try {
      const res = await fetch(
        `/api/remitone/beneficiaries?username=${encodeURIComponent(auth.username)}&session_token=${encodeURIComponent(auth.session_token)}`
      )
      const data = await res.json()
      if (data.status === 'SUCCESS') setBeneficiaries(data.data ?? [])
    } catch { /* show empty state */ }
    finally { setIsLoading(false) }
  }

  function setField(field: keyof NewBeneficiaryForm, value: string) {
    setForm((p) => ({ ...p, [field]: value }))
    setFormErrors((p) => ({ ...p, [field]: undefined }))
  }

  function validate(): Partial<NewBeneficiaryForm> {
    const e: Partial<NewBeneficiaryForm> = {}
    if (!form.fname.trim()) e.fname = 'Required'
    if (!form.lname.trim()) e.lname = 'Required'
    if (!form.mobile.trim()) e.mobile = 'Required for duplicate check'
    if (!form.address1.trim()) e.address1 = 'Required'
    if (!form.city.trim()) e.city = 'Required'
    if (!form.country_id) e.country_id = 'Required'
    return e
  }

  async function handleAddBeneficiary(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setFormErrors(errs); return }
    if (!auth) return
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      const res = await fetch('/api/remitone/beneficiaries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: auth.username,
          session_token: auth.session_token,
          fname: form.fname, lname: form.lname,
          email: form.email, mobile: form.mobile,
          address1: form.address1, city: form.city, country_id: form.country_id,
          ...(form.bank_account_number1 ? { bank_account_number1: form.bank_account_number1 } : {}),
          ...(form.bank1 ? { bank1: form.bank1 } : {}),
          ...(form.bank_iban1 ? { bank_iban1: form.bank_iban1 } : {}),
          ...(form.bank_swift_code1 ? { bank_swift_code1: form.bank_swift_code1 } : {}),
          ...(form.mobile_transfer_number ? { mobile_transfer_number: form.mobile_transfer_number } : {}),
          ...(form.mobile_transfer_network ? { mobile_transfer_network: form.mobile_transfer_network } : {}),
          ...(form.card_number ? { card_number: form.card_number } : {}),
        }),
      })
      const data = await res.json()
      if (data.status === 'SUCCESS') {
        setAddedId(data.data?.new_beneficiary_id ?? 'new')
        setForm(EMPTY_FORM)
        setShowForm(false)
        await fetchBeneficiaries()
        setTimeout(() => setAddedId(null), 3000)
      } else {
        const msg = data.errors?.map((e: { field: string; messages: string[] }) => `${e.field}: ${e.messages[0]}`).join(', ') ?? data.message ?? 'Failed to add beneficiary'
        setSubmitError(msg)
      }
    } catch {
      setSubmitError('Unable to connect. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputCls = (field: keyof NewBeneficiaryForm) =>
    `w-full px-3.5 py-2.5 rounded-xl border-2 text-sm outline-none transition-colors ${
      formErrors[field] ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-brand-red'
    }`

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-brand-red-deep">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Link>
          <span className="text-white font-semibold text-sm">Beneficiaries</span>
          <button
            onClick={() => { setShowForm(true); setSubmitError(null) }}
            className="flex items-center gap-1.5 bg-gold text-brand-red-deep text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-white transition-colors"
          >
            <Plus className="h-3.5 w-3.5" /> Add New
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {addedId && (
          <div className="mb-4 flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-700">
            <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
            Beneficiary added successfully!
          </div>
        )}

        {/* Add Beneficiary Form */}
        {showForm && (
          <div className="mb-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900 flex items-center gap-2"><Plus className="h-5 w-5 text-brand-red" /> Add Beneficiary</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-sm">Cancel</button>
            </div>
            {submitError && (
              <div className="mb-4 flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" /> {submitError}
              </div>
            )}
            <form onSubmit={handleAddBeneficiary} noValidate className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">First Name *</label>
                <input type="text" value={form.fname} onChange={(e) => setField('fname', e.target.value)} placeholder="First name" className={inputCls('fname')} />
                {formErrors.fname && <p className="text-xs text-red-600 mt-1">{formErrors.fname}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Last Name *</label>
                <input type="text" value={form.lname} onChange={(e) => setField('lname', e.target.value)} placeholder="Last name" className={inputCls('lname')} />
                {formErrors.lname && <p className="text-xs text-red-600 mt-1">{formErrors.lname}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                <input type="email" value={form.email} onChange={(e) => setField('email', e.target.value)} placeholder="Optional" className={inputCls('email')} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Mobile <span className="text-brand-red">*</span></label>
                <input type="tel" value={form.mobile} onChange={(e) => setField('mobile', e.target.value)} placeholder="+44 7700 000000" className={inputCls('mobile')} />
                {formErrors.mobile && <p className="text-xs text-red-600 mt-1">{formErrors.mobile}</p>}
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Address *</label>
                <input type="text" value={form.address1} onChange={(e) => setField('address1', e.target.value)} placeholder="Street address" className={inputCls('address1')} />
                {formErrors.address1 && <p className="text-xs text-red-600 mt-1">{formErrors.address1}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">City *</label>
                <input type="text" value={form.city} onChange={(e) => setField('city', e.target.value)} placeholder="City" className={inputCls('city')} />
                {formErrors.city && <p className="text-xs text-red-600 mt-1">{formErrors.city}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Destination Country *</label>
                <select
                  value={form.country_id}
                  onChange={(e) => setField('country_id', e.target.value)}
                  className={inputCls('country_id')}
                >
                  <option value="">Select country</option>
                  {destCountries.length > 0
                    ? destCountries.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))
                    : <>
                        <option value="999">🇮🇳 India</option>
                        <option value="998">🇹🇭 Thailand</option>
                      </>
                  }
                </select>
                {formErrors.country_id && <p className="text-xs text-red-600 mt-1">{formErrors.country_id}</p>}
              </div>
              {/* ── Transfer Type Sections ────────────────────────────────── */}
              <div className="col-span-2 space-y-2 pt-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Transfer Details (optional)</p>

                {/* Account Transfer */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <button type="button" onClick={() => toggleSection('account')}
                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left">
                    <span className="text-sm font-semibold text-gray-700">Account Transfer</span>
                    <span className="text-gray-400 text-xs">{openSections.account ? '▲' : '▼'}</span>
                  </button>
                  {openSections.account && (
                    <div className="px-4 py-4 space-y-3 bg-white">
                      <p className="text-xs text-blue-600 bg-blue-50 rounded-lg px-3 py-2">
                        Enter Account Transfer information if you wish to make Account Transfer remittances to this beneficiary.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2">
                          <label className="block text-xs font-medium text-gray-600 mb-1">Account Number</label>
                          <input type="text" value={form.bank_account_number1}
                            onChange={(e) => setField('bank_account_number1', e.target.value)}
                            placeholder="Account number"
                            className="w-full px-3.5 py-2.5 rounded-xl border-2 border-gray-200 focus:border-brand-red text-sm outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Bank Name</label>
                          <input type="text" value={form.bank1}
                            onChange={(e) => setField('bank1', e.target.value)}
                            placeholder="Bank name"
                            className="w-full px-3.5 py-2.5 rounded-xl border-2 border-gray-200 focus:border-brand-red text-sm outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">SWIFT / BIC Code</label>
                          <input type="text" value={form.bank_swift_code1}
                            onChange={(e) => setField('bank_swift_code1', e.target.value)}
                            placeholder="e.g. HDFCINBB"
                            className="w-full px-3.5 py-2.5 rounded-xl border-2 border-gray-200 focus:border-brand-red text-sm outline-none" />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-xs font-medium text-gray-600 mb-1">IBAN</label>
                          <input type="text" value={form.bank_iban1}
                            onChange={(e) => setField('bank_iban1', e.target.value)}
                            placeholder="IBAN (if applicable)"
                            className="w-full px-3.5 py-2.5 rounded-xl border-2 border-gray-200 focus:border-brand-red text-sm outline-none" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Cash Collection */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <button type="button" onClick={() => toggleSection('cash')}
                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left">
                    <span className="text-sm font-semibold text-gray-700">Cash Collection</span>
                    <span className="text-gray-400 text-xs">{openSections.cash ? '▲' : '▼'}</span>
                  </button>
                  {openSections.cash && (
                    <div className="px-4 py-4 bg-white">
                      <p className="text-xs text-blue-600 bg-blue-50 rounded-lg px-3 py-2">
                        Enter Cash Collection information if you wish to make Cash Collection remittances to this beneficiary.
                      </p>
                      <p className="mt-3 text-xs text-gray-400">Collection point will be selected at the time of transfer.</p>
                    </div>
                  )}
                </div>

                {/* Home Delivery */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <button type="button" onClick={() => toggleSection('home')}
                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left">
                    <span className="text-sm font-semibold text-gray-700">Home Delivery</span>
                    <span className="text-gray-400 text-xs">{openSections.home ? '▲' : '▼'}</span>
                  </button>
                  {openSections.home && (
                    <div className="px-4 py-4 space-y-3 bg-white">
                      <p className="text-xs text-blue-600 bg-blue-50 rounded-lg px-3 py-2">
                        The address details previously provided will be used to make Home Delivery transfer remittances to this beneficiary.
                      </p>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Home Delivery Notes</label>
                        <input type="text" value={form.home_delivery_notes}
                          onChange={(e) => setField('home_delivery_notes', e.target.value)}
                          placeholder="Optional delivery instructions"
                          className="w-full px-3.5 py-2.5 rounded-xl border-2 border-gray-200 focus:border-brand-red text-sm outline-none" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Transfer */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <button type="button" onClick={() => toggleSection('card')}
                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left">
                    <span className="text-sm font-semibold text-gray-700">Card Transfer</span>
                    <span className="text-gray-400 text-xs">{openSections.card ? '▲' : '▼'}</span>
                  </button>
                  {openSections.card && (
                    <div className="px-4 py-4 space-y-3 bg-white">
                      <p className="text-xs text-blue-600 bg-blue-50 rounded-lg px-3 py-2">
                        Enter Card information if you wish to make Card transfer remittances to this beneficiary (where available).
                      </p>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Card Number *</label>
                        <input type="text" value={form.card_number}
                          onChange={(e) => setField('card_number', e.target.value)}
                          placeholder="Card number"
                          className="w-full px-3.5 py-2.5 rounded-xl border-2 border-gray-200 focus:border-brand-red text-sm outline-none" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile Transfer */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <button type="button" onClick={() => toggleSection('mobile')}
                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left">
                    <span className="text-sm font-semibold text-gray-700">Mobile Transfer</span>
                    <span className="text-gray-400 text-xs">{openSections.mobile ? '▲' : '▼'}</span>
                  </button>
                  {openSections.mobile && (
                    <div className="px-4 py-4 space-y-3 bg-white">
                      <p className="text-xs text-blue-600 bg-blue-50 rounded-lg px-3 py-2">
                        Enter Mobile information if you wish to make Mobile transfer remittances to this beneficiary (where available).
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Mobile Number *</label>
                          <input type="tel" value={form.mobile_transfer_number}
                            onChange={(e) => setField('mobile_transfer_number', e.target.value)}
                            placeholder="+91 00000 00000"
                            className="w-full px-3.5 py-2.5 rounded-xl border-2 border-gray-200 focus:border-brand-red text-sm outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Mobile Network</label>
                          <select value={form.mobile_transfer_network}
                            onChange={(e) => setField('mobile_transfer_network', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border-2 border-gray-200 focus:border-brand-red text-sm outline-none bg-white">
                            <option value="">Select network</option>
                            <option value="Airtel">Airtel</option>
                            <option value="Jio">Jio</option>
                            <option value="Vodafone">Vodafone</option>
                            <option value="BSNL">BSNL</option>
                            <option value="MTN">MTN</option>
                            <option value="Safaricom">Safaricom</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="col-span-2 flex justify-end">
                <button type="submit" disabled={isSubmitting}
                  className="h-10 px-6 rounded-xl bg-brand-red text-white text-sm font-bold hover:bg-brand-red-deep transition-colors disabled:opacity-60 flex items-center gap-2">
                  {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</> : 'Add Beneficiary'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Beneficiary list */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-brand-red" />
          </div>
        ) : beneficiaries.length === 0 ? (
          <div className="text-center py-20">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-600">No beneficiaries yet</h3>
            <p className="text-sm text-gray-400 mt-1">Add someone to send money to</p>
            <button onClick={() => setShowForm(true)}
              className="mt-4 h-10 px-6 rounded-xl bg-brand-red text-white text-sm font-bold hover:bg-brand-red-deep transition-colors">
              Add First Beneficiary
            </button>
          </div>
        ) : (
          <div className="grid gap-3">
            {beneficiaries.map((b) => (
              <div key={b.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-full bg-brand-red/10 flex items-center justify-center shrink-0">
                    <User className="h-5 w-5 text-brand-red" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{b.fname} {b.lname}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      {b.city && (
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <MapPin className="h-3 w-3" />{b.city}{b.country_name ? `, ${b.country_name}` : ''}
                        </span>
                      )}
                      {b.mobile && <span className="flex items-center gap-1 text-xs text-gray-400"><Phone className="h-3 w-3" />{b.mobile}</span>}
                      {b.email && <span className="flex items-center gap-1 text-xs text-gray-400"><Mail className="h-3 w-3" />{b.email}</span>}
                    </div>
                  </div>
                </div>
                <Link
                  href={`/dashboard/send?beneficiary_id=${b.id}&name=${encodeURIComponent(`${b.fname} ${b.lname}`)}`}
                  className="text-xs font-bold text-brand-red border border-brand-red/30 rounded-lg px-3 py-1.5 hover:bg-brand-red hover:text-white transition-colors"
                >
                  Send
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
