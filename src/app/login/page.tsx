'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Lock, User, ArrowRight, AlertCircle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginPage() {
  const { login, isLoading, error, isLoggedIn, clearError } = useAuth()
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<{ username?: string; password?: string }>({})

  useEffect(() => {
    if (isLoggedIn) router.replace('/dashboard')
  }, [isLoggedIn, router])

  function validate() {
    const errs: { username?: string; password?: string } = {}
    if (!username.trim()) errs.username = 'Username is required'
    else if (username.length > 100) errs.username = 'Username is too long'
    if (!password) errs.password = 'Password is required'
    return errs
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    clearError()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setFieldErrors(errs); return }
    setFieldErrors({})
    await login(username.trim(), password)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-brand-red-deep flex-col justify-between p-12">
        <Link href="/" className="flex items-center gap-3">
          <img src="/Kogo Flower.jpeg" alt="KogoPay" className="h-10 w-10 object-contain rounded-full" />
          <span className="text-xl font-bold text-white uppercase italic tracking-tight">KogoPay</span>
        </Link>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Send money globally,<br />
            <span className="text-gold">fast and secure.</span>
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Access your account to send transfers, manage beneficiaries, and track your transactions in real time.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            {[
              { label: 'Transfer fee', value: 'From £0' },
              { label: 'Supported countries', value: '150+' },
              { label: 'Avg. transfer time', value: '< 1 hour' },
              { label: 'Security', value: 'Bank-grade' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 rounded-xl p-4">
                <p className="text-gold font-bold text-xl">{stat.value}</p>
                <p className="text-white/60 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/40 text-sm">
          © {new Date().getFullYear()} KogoPay. All rights reserved.
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16 bg-white">
        {/* Mobile logo */}
        <div className="mb-10 flex items-center gap-3 lg:hidden">
          <img src="/Kogo Flower.jpeg" alt="KogoPay" className="h-9 w-9 object-contain rounded-full" />
          <span className="text-lg font-bold text-brand-red-deep uppercase italic tracking-tight">KogoPay</span>
        </div>

        <div className="w-full max-w-md mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="mt-2 text-gray-500">Sign in to your account to continue</p>
          </div>

          {/* API-level error banner */}
          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
              <AlertCircle className="mt-0.5 h-5 w-5 text-red-500 shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1.5">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400 pointer-events-none" />
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setFieldErrors((p) => ({ ...p, username: undefined })) }}
                  placeholder="Enter your username"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 text-sm transition-colors outline-none
                    ${fieldErrors.username
                      ? 'border-red-400 focus:border-red-500 bg-red-50'
                      : 'border-gray-200 focus:border-brand-red bg-white'
                    }`}
                />
              </div>
              {fieldErrors.username && (
                <p className="mt-1.5 text-xs text-red-600">{fieldErrors.username}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs font-medium text-brand-red hover:text-brand-red-deep transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400 pointer-events-none" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setFieldErrors((p) => ({ ...p, password: undefined })) }}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-12 py-3 rounded-xl border-2 text-sm transition-colors outline-none
                    ${fieldErrors.password
                      ? 'border-red-400 focus:border-red-500 bg-red-50'
                      : 'border-gray-200 focus:border-brand-red bg-white'
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="mt-1.5 text-xs text-red-600">{fieldErrors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-brand-red text-white font-bold text-sm
                hover:bg-brand-red-deep transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <Link href="/contact" className="font-semibold text-brand-red hover:text-brand-red-deep transition-colors">
              Contact us to register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
