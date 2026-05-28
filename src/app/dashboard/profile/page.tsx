'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2, AlertCircle, CheckCircle, User, MapPin, CreditCard, Save, ShieldAlert, ShieldCheck } from 'lucide-react'
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

function isComplete(f: ProfileForm) {
  return !!(f.nationality && f.address1 && f.postcode && f.id1_type && f.id1_details)
}

// Normalize placeholder values the API sometimes returns
function normalize(val: string | undefined): string {
  if (!val) return ''
  const trimmed = val.trim()
  if (trimmed === 'N/A' || trimmed === 'n/a' || trimmed === '-') return ''
  return trimmed
}

export default function ProfilePage() {
  const { auth, isLoggedIn } = useAuth()
  const router = useRouter()

  const [form, setForm]                 = useState<ProfileForm>(EMPTY)
  const [isLoading, setIsLoading]       = useState(true)
  const [isSaving, setIsSaving]         = useState(false)
  const [loadError, setLoadError]       = useState<string | null>(null)
  const [saveError, setSaveError]       = useState<string | null>(null)
  const [fieldErrors, setFieldErrors]   = useState<Partial<ProfileForm>>({})
  const [success, setSuccess]           = useState(false)
  const [profileComplete, setProfileComplete] = useState(false)
  const [accountStatus, setAccountStatus] = useState<string>('')

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
        const loaded: ProfileForm = {
          fname:       normalize(d.fname),
          lname:       normalize(d.lname),
          mobile:      normalize(d.mobile),
          dob:         normalize(d.dob),
          nationality: normalize(d.nationality) || normalize(d.country_iso_code),
          address1:    normalize(d.address1),
          city:        normalize(d.city),
          postcode:    normalize(d.postcode),
          id1_type:    normalize(d.id1_type),
          id1_details: normalize(d.id1_details),
          id1_expiry:  normalize(d.id1_expiry),
        }
        setForm(loaded)
        setProfileComplete(isComplete(loaded))
        if (d.status) setAccountStatus(d.status)
      }
      // Silently show empty form if API doesn't return data
    } catch {
      setLoadError('Unable to load profile. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  function validate(): Partial<ProfileForm> {
    const e: Partial<ProfileForm> = {}
    if (!form.nationality)    e.nationality  = 'Nationality is required'
    if (!form.address1.trim()) e.address1    = 'Street address is required'
    if (!form.postcode.trim()) e.postcode    = 'Postcode is required'
    if (!form.id1_type)        e.id1_type    = 'ID type is required'
    if (!form.id1_details.trim()) e.id1_details = 'ID number is required'
    return e
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!auth) return

    const errors = validate()
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setSaveError('Please fill in all required fields.')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    setFieldErrors({})
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
        setProfileComplete(isComplete(form))
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        const msg = data.errors?.length
          ? data.errors.map((e: { messages: string[] }) => e.messages[0]).join(' • ')
          : data.message ?? 'Failed to save profile. Please try again.'
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
      // Clear only the specific field error, not the success message
      if (fieldErrors[field]) setFieldErrors(p => ({ ...p, [field]: undefined }))
      if (saveError) setSaveError(null)
    }
  }

  function inputCls(field?: keyof ProfileForm) {
    const hasError = field && fieldErrors[field]
    return `w-full px-4 py-3 rounded-xl border-2 text-sm outline-none bg-white transition-colors ${
      hasError
        ? 'border-red-400 bg-red-50 focus:border-red-500'
        : 'border-gray-200 focus:border-brand-red'
    }`
  }

  if (!auth) return null

  const isBlocked = accountStatus === 'blocked'
  const isVerified = accountStatus === 'active' || accountStatus === 'verified'

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

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-4">

        {/* Account status banner */}
        {accountStatus && (
          <div className={`flex items-start gap-3 rounded-xl px-4 py-3 border ${
            isVerified
              ? 'bg-green-50 border-green-200'
              : isBlocked
                ? 'bg-amber-50 border-amber-200'
                : 'bg-blue-50 border-blue-200'
          }`}>
            {isVerified
              ? <ShieldCheck className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              : <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />}
            <div>
              <p className={`text-sm font-semibold ${isVerified ? 'text-green-800' : 'text-amber-800'}`}>
                {isVerified
                  ? 'Account verified — you can send money'
                  : isBlocked
                    ? 'Account awaiting verification'
                    : `Account status: ${accountStatus}`}
              </p>
              {isBlocked && (
                <p className="text-xs text-amber-700 mt-0.5">
                  Complete your profile below to speed up KYC verification by KogoPAY.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Profile incomplete warning */}
        {!profileComplete && !isLoading && !success && (
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800">Complete your profile to send money</p>
              <p className="text-xs text-amber-700 mt-0.5">
                Fields marked <span className="text-brand-red font-bold">*</span> are required.
              </p>
            </div>
          </div>
        )}

        {/* Success banner */}
        {success && (
          <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
            <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-green-800">Profile saved successfully!</p>
              {profileComplete && (
                <p className="text-xs text-green-700 mt-0.5">Your profile is complete.</p>
              )}
            </div>
          </div>
        )}

        {/* Load error */}
        {loadError && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-red-700">{loadError}</p>
              <button onClick={fetchProfile} className="text-xs text-brand-red underline mt-1">Retry</button>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-brand-red" />
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4" noValidate>

            {/* Personal Details */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <User className="h-4 w-4 text-brand-red" />
                <h2 className="font-semibold text-gray-900">Personal Details</h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">First Name</label>
                  <input type="text" value={form.fname} onChange={set('fname')}
                    className={inputCls()} placeholder="First name" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Last Name</label>
                  <input type="text" value={form.lname} onChange={set('lname')}
                    className={inputCls()} placeholder="Last name" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Mobile</label>
                <input type="tel" value={form.mobile} onChange={set('mobile')}
                  className={inputCls()} placeholder="+44 7700 000000" />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Date of Birth</label>
                <input type="date" value={form.dob} onChange={set('dob')} className={inputCls()}
                  max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]} />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Nationality <span className="text-brand-red">*</span>
                </label>
                <select value={form.nationality} onChange={set('nationality')} className={inputCls('nationality')}>
                  <option value="">Select nationality</option>
                  {NATIONALITIES.map(n => <option key={n.v} value={n.v}>{n.l}</option>)}
                </select>
                {fieldErrors.nationality && <p className="mt-1 text-xs text-red-600">{fieldErrors.nationality}</p>}
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="h-4 w-4 text-brand-red" />
                <h2 className="font-semibold text-gray-900">Address</h2>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Street Address <span className="text-brand-red">*</span>
                </label>
                <input type="text" value={form.address1} onChange={set('address1')}
                  className={inputCls('address1')} placeholder="123 High Street" />
                {fieldErrors.address1 && <p className="mt-1 text-xs text-red-600">{fieldErrors.address1}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">City</label>
                  <input type="text" value={form.city} onChange={set('city')}
                    className={inputCls()} placeholder="London" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Postcode <span className="text-brand-red">*</span>
                  </label>
                  <input type="text" value={form.postcode} onChange={set('postcode')}
                    className={inputCls('postcode')} placeholder="SW1A 2AA" />
                  {fieldErrors.postcode && <p className="mt-1 text-xs text-red-600">{fieldErrors.postcode}</p>}
                </div>
              </div>
            </div>

            {/* Identity */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <CreditCard className="h-4 w-4 text-brand-red" />
                <h2 className="font-semibold text-gray-900">Identity Document</h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    ID Type <span className="text-brand-red">*</span>
                  </label>
                  <select value={form.id1_type} onChange={set('id1_type')} className={inputCls('id1_type')}>
                    <option value="">Select type</option>
                    {ID_TYPES.map(t => <option key={t.v} value={t.v}>{t.l}</option>)}
                  </select>
                  {fieldErrors.id1_type && <p className="mt-1 text-xs text-red-600">{fieldErrors.id1_type}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    ID Number <span className="text-brand-red">*</span>
                  </label>
                  <input type="text" value={form.id1_details} onChange={set('id1_details')}
                    className={inputCls('id1_details')} placeholder="Document number" />
                  {fieldErrors.id1_details && <p className="mt-1 text-xs text-red-600">{fieldErrors.id1_details}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">ID Expiry Date</label>
                <input type="date" value={form.id1_expiry} onChange={set('id1_expiry')} className={inputCls()}
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

            <p className="text-center text-xs text-gray-400 pb-4">
              Fields marked <span className="text-brand-red font-bold">*</span> are required to send money
            </p>
          </form>
        )}
      </main>
    </div>
  )
}
