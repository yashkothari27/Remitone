'use client'

import { useState } from 'react'
import Link from 'next/link'
import { User, Calendar, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [username, setUsername] = useState('')
  const [dob, setDob] = useState('')
  const [errors, setErrors] = useState<{ username?: string; dob?: string }>({})
  const [apiError, setApiError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  function validate() {
    const e: { username?: string; dob?: string } = {}
    if (!username.trim()) e.username = 'Username is required'
    if (!dob) e.dob = 'Date of birth is required'
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) e.dob = 'Must be YYYY-MM-DD'
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
      const res = await fetch('/api/remitone/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'forgotPassword', username: username.trim(), dob }),
      })
      const data = await res.json()
      if (data.status === 'SUCCESS') {
        setSuccess(true)
      } else {
        setApiError(data.message ?? 'Request failed. Please check your details.')
      }
    } catch {
      setApiError('Unable to connect. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md">
        <Link href="/login" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>

        {success ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center space-y-4">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Request Submitted</h1>
            <p className="text-gray-500 text-sm">
              If your account details match our records, you will receive a temporary password by email or SMS shortly.
            </p>
            <Link href="/login"
              className="mt-2 inline-flex items-center justify-center w-full h-12 rounded-xl bg-brand-red text-white font-bold text-sm hover:bg-brand-red-deep transition-colors">
              Back to Login
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Forgot Password</h1>
              <p className="mt-1.5 text-sm text-gray-500">
                Enter your username and date of birth to reset your password.
              </p>
            </div>

            {apiError && (
              <div className="mb-5 flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
                <AlertCircle className="mt-0.5 h-5 w-5 text-red-500 shrink-0" />
                <p className="text-sm text-red-700">{apiError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1.5">Username</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  <input
                    id="username" type="text" autoFocus autoComplete="username"
                    value={username} onChange={(e) => { setUsername(e.target.value); setErrors((p) => ({ ...p, username: undefined })) }}
                    placeholder="Your username"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors ${
                      errors.username ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-brand-red'
                    }`}
                  />
                </div>
                {errors.username && <p className="mt-1.5 text-xs text-red-600">{errors.username}</p>}
              </div>

              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1.5">Date of Birth</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  <input
                    id="dob" type="date"
                    value={dob} onChange={(e) => { setDob(e.target.value); setErrors((p) => ({ ...p, dob: undefined })) }}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors ${
                      errors.dob ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-brand-red'
                    }`}
                  />
                </div>
                {errors.dob && <p className="mt-1.5 text-xs text-red-600">{errors.dob}</p>}
              </div>

              <button
                type="submit" disabled={isLoading}
                className="w-full h-12 rounded-xl bg-brand-red text-white font-bold text-sm hover:bg-brand-red-deep transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <><span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Submitting…</>
                ) : 'Reset Password'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
