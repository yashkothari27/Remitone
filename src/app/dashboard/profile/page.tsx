'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2, AlertCircle, CheckCircle, User, MapPin, CreditCard, Save } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const NATIONALITIES = [
  { v: 'GB', l: '🇬🇧 British' }, { v: 'US', l: '🇺🇸 American' },
  { v: 'IN', l: '🇮🇳 Indian' },  { v: 'PK', l: '🇵🇰 Pakistani' },
  { v: 'BD', l: '🇧🇩 Bangladeshi' }, { v: 'NG', l: '🇳🇬 Nigerian' },
  { v: 'GH', l: '🇬🇭 Ghanaian' }, { v: 'PH', l: '🇵🇭 Filipino' },
  { v: 'KE', l: '🇰🇪 Kenyan' },  { v: 'IE', l: '🇮🇪 Irish' },
  { v: 'AU', l: '🇦🇺 Australian' }, { v: 'CA', l: '🇨🇦 Canadian' },
  { v: 'ZA', l: '🇿🇦 South African' }, { v: 'OT', l: 'Other' },
]

const ID_TYPES = [
  { v: 'Passport', l: 'Passport' },
  { v: 'Driving_License', l: 'Driving Licence' },
  { v: 'National_ID', l: 'National ID' },
  { v: 'National_Insurance', l: 'National Insurance' },
  { v: 'Other', l: 'Other' },
]

interface ProfileForm {
  fname: string; lname: string; mobile: string; dob: string
  nationality: string; address1: string; city: string; postcode: string
  id1_type: string; id1_details: string; id1_expiry: string
}

const EMPTY: ProfileForm = {
  fname: '', lname: '', mobile: '', dob: '',
  nationality: '', address1: '', city: '', postcode: '',
  id1_type: '', id1_details: '', id1_expiry: '',
}

export default function ProfilePage() {
  const { auth, isLoggedIn } = useAuth()
  const router = useRouter()

  const [form, setForm] = useState<ProfileForm>(EMPTY)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [profileComplete, setProfileComplete] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) { router.replace('/login'); return }
    fetchProfile()
  }, [isLoggedIn])

  async function fetchProfile() {
    if (!auth) return
    setIsLoading(true)
    setLoadError(null)
    try {
      const res = await fetch(
        `/api/remitone/profile?username=${encodeURIComponent(auth.username)}&session_token=${encodeURIComponent(auth.session_token)}`
      )
      const data = await res.json()
      if (data.status === 'SUCCESS' && data.data) {
        const d = data.data
        setForm({
          fname:       d.fname       ?? '',
          lname:       d.lname       ?? '',
          mobile:      d.mobile      ?? '',
          dob:         d.dob         ?? '',
          nationality: d.nationality ?? d.country_iso_code ?? '',
          address1:    d.address1    ?? '',
          city:        d.city        ?? '',
          postcode:    d.postcode    ?? '',
          id1_type:    d.id1_type    ?? '',
          id1_details: d.id1_details ?? '',
          id1_expiry:  d.id1_expiry  ?? '',
        })
        setProfileComplete(!!(d.nationality && d.address1 && d.postcode))
      }
      // If API doesn't support getRemitter, silently show empty form — user can still save
    } catch {
      setLoadError('Unable to connect. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!auth) return
    setIsSaving(true)
    setSaveError(null)
    setSuccess(false)
    try {
      const res = await fetch('/api/remitone/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: auth.username, session_token: auth.session_token, ...form }),
      })
      const data = await res.json()
      if (data.status === 'SUCCESS') {
        setSuccess(true)
        setProfileComplete(!!(form.nationality && form.address1 && form.postcode && form.id1_type && form.id1_details))
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        const msg = data.errors?.length
          ? data.errors.map((e: { messages: string[] }) => e.messages[0]).join(' • ')
          : data.message ?? 'Failed to save profile'
        // If the test environment doesn't support updateRemitter, guide user to the original portal
        setSaveError(msg)
      }
    } catch {
      setSaveError('Unable to connect. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  function set(field: keyof ProfileForm) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm(p => ({ ...p, [field]: e.target.value }))
      setSuccess(false)
    }
  }

  const inputCls = 'w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-red text-sm outline-none bg-white transition-colors'

  if (!auth) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-brand-red-deep">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Link>
          <span className="text-white font-semibold text-sm">My Profile</span>
          <div className="w-20" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        {/* Profile complete banner */}
        {!profileComplete && !isLoading && (
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800">Complete your profile to send money</p>
              <p className="text-xs text-amber-700 mt-0.5">Fill in your nationality, address and ID details below.</p>
            </div>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
            <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
            <p className="text-sm font-semibold text-green-800">Profile updated successfully!</p>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-brand-red" />
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">

            {/* Personal Details */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-brand-red" />
                <h2 className="font-semibold text-gray-900">Personal Details</h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">First Name</label>
                  <input type="text" value={form.fname} onChange={set('fname')} className={inputCls} placeholder="First name" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Last Name</label>
                  <input type="text" value={form.lname} onChange={set('lname')} className={inputCls} placeholder="Last name" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Mobile</label>
                <input type="tel" value={form.mobile} onChange={set('mobile')} className={inputCls} placeholder="+44 7700 000000" />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Date of Birth</label>
                <input type="date" value={form.dob} onChange={set('dob')} className={inputCls}
                  max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]} />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Nationality <span className="text-brand-red">*</span></label>
                <select value={form.nationality} onChange={set('nationality')} className={inputCls}>
                  <option value="">Select nationality</option>
                  {NATIONALITIES.map(n => <option key={n.v} value={n.v}>{n.l}</option>)}
                </select>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-brand-red" />
                <h2 className="font-semibold text-gray-900">Address</h2>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Street Address <span className="text-brand-red">*</span></label>
                <input type="text" value={form.address1} onChange={set('address1')} className={inputCls} placeholder="123 High Street" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">City</label>
                  <input type="text" value={form.city} onChange={set('city')} className={inputCls} placeholder="London" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Postcode <span className="text-brand-red">*</span></label>
                  <input type="text" value={form.postcode} onChange={set('postcode')} className={inputCls} placeholder="SW1A 2AA" />
                </div>
              </div>
            </div>

            {/* Identity */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="h-4 w-4 text-brand-red" />
                <h2 className="font-semibold text-gray-900">Identity Document</h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">ID Type <span className="text-brand-red">*</span></label>
                  <select value={form.id1_type} onChange={set('id1_type')} className={inputCls}>
                    <option value="">Select type</option>
                    {ID_TYPES.map(t => <option key={t.v} value={t.v}>{t.l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">ID Number <span className="text-brand-red">*</span></label>
                  <input type="text" value={form.id1_details} onChange={set('id1_details')} className={inputCls} placeholder="Document number" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">ID Expiry Date</label>
                <input type="date" value={form.id1_expiry} onChange={set('id1_expiry')} className={inputCls}
                  min={new Date().toISOString().split('T')[0]} />
              </div>
            </div>

            {saveError && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{saveError}</p>
              </div>
            )}

            <button type="submit" disabled={isSaving}
              className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-brand-red text-white font-bold hover:bg-brand-red-deep transition-colors disabled:opacity-60">
              {isSaving
                ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</>
                : <><Save className="h-4 w-4" /> Save Profile</>}
            </button>
          </form>
        )}
      </main>
    </div>
  )
}
