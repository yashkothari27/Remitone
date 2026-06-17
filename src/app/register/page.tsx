'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Eye, EyeOff, AlertCircle, CheckCircle, ArrowRight, Phone, User } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const SOURCE_COUNTRIES = [
  { source_country_id: '01', name: 'United Kingdom', flag: '🇬🇧', code: '+44' },
]

const PHONE_CODES = [
  { code: '+44', flag: '🇬🇧' },
]

function checkPassword(p: string) {
  return {
    length: p.length >= 10,
    upper: /[A-Z]/.test(p),
    lower: /[a-z]/.test(p),
    digit: /[0-9]/.test(p),
  }
}

export default function RegisterPage() {
  const router = useRouter()
  const { login } = useAuth()

  const [country]            = useState(SOURCE_COUNTRIES[0])
  const [username, setUsername]             = useState('')
  const [password, setPassword]             = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword]     = useState(false)
  const [showConfirm, setShowConfirm]       = useState(false)
  const [fname, setFname]                   = useState('')
  const [lname, setLname]                   = useState('')
  const [phoneCode, setPhoneCode]           = useState('+44')
  const [phoneNumber, setPhoneNumber]       = useState('')
  const [dob, setDob]                       = useState('')
  const [agentCode, setAgentCode]           = useState('')
  const [termsAccepted, setTermsAccepted]   = useState(false)
  const [marketingAccepted, setMarketingAccepted] = useState(false)

  const [errors, setErrors]     = useState<Record<string, string>>({})
  const [apiError, setApiError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess]   = useState(false)

  // Email verification step (RemitONE requires confirmRegistration before login works)
  const [awaitingVerification, setAwaitingVerification] = useState(false)
  const [verificationCode, setVerificationCode]         = useState('')
  const [verifyError, setVerifyError]                   = useState<string | null>(null)
  const [isVerifying, setIsVerifying]                   = useState(false)

  const pwCheck = checkPassword(password)

  function validate() {
    const e: Record<string, string> = {}
    if (!username || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)) e.username = 'Valid email required'
    if (!password || !Object.values(pwCheck).every(Boolean)) e.password = 'Password does not meet requirements'
    if (password !== confirmPassword) e.confirmPassword = 'Passwords do not match'
    if (!fname.trim()) e.fname = 'Required'
    if (!lname.trim()) e.lname = 'Required'
    if (!dob) e.dob = 'Date of birth is required'
    if (!phoneNumber.trim() || phoneNumber.trim().length < 5) e.mobile = 'Mobile number is required'
    if (!termsAccepted) e.terms = 'You must agree to the Terms and Conditions'
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setApiError(null)
    setIsLoading(true)
    try {
      const res = await fetch('/api/remitone/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          fname: fname.trim(),
          lname: lname.trim(),
          mobile: `${phoneCode}${phoneNumber.trim()}`,
          source_country_id: country.source_country_id,
          dob,
          receive_marketing: marketingAccepted,
          ...(agentCode.trim() ? { referral_code: agentCode.trim() } : {}),
        }),
      })
      const data = await res.json()
      if (data.status === 'SUCCESS') {
        if (data.data?.email_verification_code) {
          // Account is pending — must confirm with the emailed code before login will work
          setAwaitingVerification(true)
        } else {
          await login(username.trim(), password)
          router.replace('/dashboard')
        }
      } else {
        const msg = data.errors?.length
          ? data.errors.map((err: { messages: string[] }) => err.messages[0]).join(' ')
          : data.message ?? 'Registration failed. Please try again.'
        setApiError(msg)
      }
    } catch {
      setApiError('Unable to connect. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault()
    if (!verificationCode.trim()) { setVerifyError('Enter the verification code from your email'); return }
    setVerifyError(null)
    setIsVerifying(true)
    try {
      const res = await fetch('/api/remitone/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'confirm',
          username: username.trim(),
          email_verification_code: verificationCode.trim(),
        }),
      })
      const data = await res.json()
      if (data.status === 'SUCCESS') {
        const loginResult = await login(username.trim(), password)
        if (loginResult.status === 'SUCCESS') {
          router.replace('/dashboard')
        } else {
          setAwaitingVerification(false)
          setSuccess(true)
        }
      } else {
        setVerifyError(data.message ?? 'Invalid verification code. Please try again.')
      }
    } catch {
      setVerifyError('Unable to connect. Please try again.')
    } finally {
      setIsVerifying(false)
    }
  }

  const inputCls = (field: string) =>
    `w-full px-4 py-3 rounded-xl border-2 text-sm transition-colors outline-none ${
      errors[field]
        ? 'border-red-400 bg-red-50 focus:border-red-500'
        : 'border-gray-200 focus:border-brand-red bg-white'
    }`

  // ── Email verification ────────────────────────────────────────────────────

  if (awaitingVerification) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-10 space-y-5">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-brand-red/10 mx-auto">
              <Mail className="h-8 w-8 text-brand-red" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Verify your email</h2>
            <p className="text-gray-500 text-sm">
              We sent a verification code to <span className="font-semibold text-gray-700">{username}</span>. Enter it below to activate your account.
            </p>
          </div>

          {verifyError && (
            <div role="alert" aria-live="polite" className="flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
              <AlertCircle className="mt-0.5 h-5 w-5 text-red-500 shrink-0" />
              <p className="text-sm text-red-700">{verifyError}</p>
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label htmlFor="verification-code" className="block text-sm font-medium text-gray-700 mb-1.5">Verification code</label>
              <input id="verification-code" type="text" autoFocus value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter the code from your email"
                aria-invalid={!!verifyError}
                aria-describedby={verifyError ? 'verify-error' : undefined}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-red text-sm outline-none bg-white" />
            </div>
            <button type="submit" disabled={isVerifying}
              className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-brand-red text-white font-bold text-sm hover:bg-brand-red-deep transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
              {isVerifying ? (
                <><span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Verifying…</>
              ) : (
                <>Verify <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </form>

          {/* Fallback: the verification call can report failure even after the account
              was actually activated server-side — give users a way out instead of a dead end. */}
          <p className="text-center text-xs text-gray-400">
            Already verified?{' '}
            <Link href="/login" className="font-semibold text-brand-red hover:text-brand-red-deep transition-colors">
              Try signing in
            </Link>
          </p>
        </div>
      </div>
    )
  }

  // ── Success ────────────────────────────────────────────────────────────────

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center space-y-5">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mx-auto">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Account Created!</h2>
          <p className="text-gray-500 text-sm">Your KogoPAY account has been created. You can now sign in with your email and password.</p>
          <button onClick={() => router.push('/login')}
            className="w-full h-12 rounded-xl bg-brand-red text-white font-bold hover:bg-brand-red-deep transition-colors">
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  // ── Main layout ────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex">

      {/* ── Left brand panel ─────────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-2/5 bg-brand-red-deep flex-col justify-between p-12">
        <Link href="/" className="flex justify-center">
          <img src="/kogo-logo-black.png" alt="KogoPAY" className="w-4/5 h-auto object-contain drop-shadow-2xl" />
        </Link>
        <div className="space-y-5">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Join KogoPAY<br />
            <span className="text-gold">Send money globally.</span>
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Fast, secure international transfers to 150+ countries with competitive rates.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2">
            {[
              { label: 'Transfer fee', value: 'From £0' },
              { label: 'Countries', value: '150+' },
              { label: 'Avg. transfer', value: '< 1 hour' },
              { label: 'Security', value: 'Bank-grade' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-xl p-4">
                <p className="text-gold font-bold text-xl">{s.value}</p>
                <p className="text-white/60 text-sm mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-white/40 text-sm">© {new Date().getFullYear()} KogoPAY. All rights reserved.</p>
      </div>

      {/* ── Right form panel ──────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16 bg-white overflow-y-auto">

        {/* Mobile logo */}
        <div className="mb-8 flex items-center gap-3 lg:hidden">
          <img src="/kogo-logo-black.png" alt="KogoPAY" className="h-16 w-auto object-contain" />
        </div>

        <div className="w-full max-w-md mx-auto">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Create account</h2>
            <p className="mt-1.5 text-gray-500">Fill in your details to get started</p>
          </div>

          {apiError && (
            <div role="alert" aria-live="polite" className="mb-5 flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
              <AlertCircle className="mt-0.5 h-5 w-5 text-red-500 shrink-0" />
              <p className="text-sm text-red-700">{apiError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">

            {/* ── Account details ── */}
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider pt-1">Account Details</p>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email <span className="text-brand-red">*</span></label>
              <div className="relative">
                <input type="email" autoComplete="email" autoFocus value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) setErrors((p) => ({ ...p, username: undefined as unknown as string }))
                  }}
                  onBlur={(e) => {
                    if (e.target.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value))
                      setErrors((p) => ({ ...p, username: 'Valid email required' }))
                    else setErrors((p) => ({ ...p, username: undefined as unknown as string }))
                  }}
                  placeholder="you@example.com"
                  className={`${inputCls('username')} pr-10`} />
                <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
              {errors.username && <p role="alert" className="mt-1.5 text-xs text-red-600">{errors.username}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password <span className="text-brand-red">*</span></label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} autoComplete="new-password" value={password}
                  onChange={(e) => {
                    const val = e.target.value
                    setPassword(val)
                    setErrors((p) => ({
                      ...p,
                      password: undefined as unknown as string,
                      confirmPassword: confirmPassword ? (val !== confirmPassword ? 'Passwords do not match' : undefined as unknown as string) : p.confirmPassword,
                    }))
                  }}
                  placeholder="At least 10 characters"
                  className={`${inputCls('password')} pr-10`} />
                <button type="button" onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1.5 -m-1.5">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {password.length > 0 && (
                <div className="mt-2 flex gap-3 flex-wrap">
                  {[
                    { ok: pwCheck.length, label: '10+ chars' },
                    { ok: pwCheck.upper, label: 'Uppercase' },
                    { ok: pwCheck.lower, label: 'Lowercase' },
                    { ok: pwCheck.digit, label: 'Number' },
                  ].map(({ ok, label }) => (
                    <span key={label} className={`flex items-center gap-1 text-xs ${ok ? 'text-green-600' : 'text-gray-400'}`}>
                      <span className={`inline-block h-1.5 w-1.5 rounded-full ${ok ? 'bg-green-500' : 'bg-gray-300'}`} />
                      {label}
                    </span>
                  ))}
                </div>
              )}
              {errors.password && <p role="alert" className="mt-1.5 text-xs text-red-600">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password <span className="text-brand-red">*</span></label>
              <div className="relative">
                <input type={showConfirm ? 'text' : 'password'} autoComplete="new-password" value={confirmPassword}
                  onChange={(e) => {
                    const val = e.target.value
                    setConfirmPassword(val)
                    setErrors((p) => ({ ...p, confirmPassword: val && val !== password ? 'Passwords do not match' : undefined as unknown as string }))
                  }}
                  placeholder="Repeat your password"
                  className={`${inputCls('confirmPassword')} pr-10`} />
                <button type="button" onClick={() => setShowConfirm((v) => !v)}
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1.5 -m-1.5">
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p role="alert" className="mt-1.5 text-xs text-red-600">{errors.confirmPassword}</p>}
            </div>

            {/* ── Personal details ── */}
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider pt-2">Personal Details</p>

            {/* Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name <span className="text-brand-red">*</span></label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  <input type="text" autoComplete="given-name" value={fname}
                    onChange={(e) => { setFname(e.target.value); setErrors((p) => ({ ...p, fname: undefined as unknown as string })) }}
                    placeholder="First name"
                    className={`${inputCls('fname')} pl-10`} />
                </div>
                {errors.fname && <p role="alert" className="mt-1.5 text-xs text-red-600">{errors.fname}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name <span className="text-brand-red">*</span></label>
                <input type="text" autoComplete="family-name" value={lname}
                  onChange={(e) => { setLname(e.target.value); setErrors((p) => ({ ...p, lname: undefined as unknown as string })) }}
                  placeholder="Last name"
                  className={inputCls('lname')} />
                {errors.lname && <p role="alert" className="mt-1.5 text-xs text-red-600">{errors.lname}</p>}
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Date of Birth <span className="text-brand-red">*</span></label>
              <input type="date" value={dob}
                onChange={(e) => { setDob(e.target.value); setErrors((p) => ({ ...p, dob: undefined as unknown as string })) }}
                max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                className={inputCls('dob')} />
              {errors.dob && <p role="alert" className="mt-1.5 text-xs text-red-600">{errors.dob}</p>}
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Mobile <span className="text-brand-red">*</span></label>
              <div className="flex gap-2">
                <div className="relative">
                  <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
                  <select value={phoneCode} onChange={(e) => setPhoneCode(e.target.value)}
                    className="pl-7 pr-2 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-brand-red bg-white w-24 shrink-0">
                    {PHONE_CODES.map((p) => (
                      <option key={p.code} value={p.code}>{p.flag} {p.code}</option>
                    ))}
                  </select>
                </div>
                <input type="tel" autoComplete="tel" value={phoneNumber}
                  onChange={(e) => { setPhoneNumber(e.target.value); setErrors((prev) => ({ ...prev, mobile: undefined as unknown as string })) }}
                  placeholder="07700 000000"
                  className={inputCls('mobile')} />
              </div>
              {errors.mobile && <p role="alert" className="mt-1.5 text-xs text-red-600">{errors.mobile}</p>}
            </div>

            {/* Agent Referral Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Agent Referral Code <span className="text-gray-400 font-normal">(optional)</span></label>
              <input type="text" value={agentCode} onChange={(e) => setAgentCode(e.target.value)}
                placeholder="Enter referral code if you have one"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-red text-sm outline-none bg-white" />
            </div>

            {/* Terms */}
            <div className="pt-1 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={termsAccepted}
                  onChange={(e) => { setTermsAccepted(e.target.checked); setErrors((p) => ({ ...p, terms: undefined as unknown as string })) }}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-brand-red" />
                <span className="text-sm text-gray-600">
                  I agree with the{' '}
                  <a href="https://kogopay.com/terms"
                    target="_blank" rel="noopener noreferrer"
                    className="text-brand-red font-medium underline hover:text-brand-red-deep">
                    Terms and Conditions
                  </a>{' '}
                  of the service.
                </span>
              </label>
              {errors.terms && <p role="alert" className="ml-7 text-xs text-red-600">{errors.terms}</p>}

              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={marketingAccepted} onChange={(e) => setMarketingAccepted(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-brand-red" />
                <span className="text-sm text-gray-500">
                  I&apos;d like to receive occasional offers and updates from KogoPAY by email or SMS.
                </span>
              </label>
            </div>

            {/* Submit */}
            <button type="submit" disabled={isLoading}
              className="mt-2 w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-brand-red text-white font-bold text-sm hover:bg-brand-red-deep transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
              {isLoading ? (
                <><span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Creating account…</>
              ) : (
                <>Create Account <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-brand-red hover:text-brand-red-deep transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
