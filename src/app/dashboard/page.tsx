'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Send, Users, Receipt, LogOut, ArrowUpRight, Globe } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function DashboardPage() {
  const { auth, isLoggedIn, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) router.replace('/login')
  }, [isLoggedIn, router])

  if (!auth) return null

  const quickActions = [
    { icon: Send, label: 'Send Money', description: 'Transfer funds internationally', href: '/dashboard/send', color: 'bg-brand-red' },
    { icon: Users, label: 'Beneficiaries', description: 'Manage your recipients', href: '/dashboard/beneficiaries', color: 'bg-brand-red-deep' },
    { icon: Receipt, label: 'Transactions', description: 'View transfer history', href: '/dashboard/transactions', color: 'bg-gold' },
    { icon: Globe, label: 'Exchange Rates', description: 'Live currency rates', href: '/dashboard/exchange-rates', color: 'bg-gray-700' },
  ]

  async function handleLogout() {
    await logout()
    router.replace('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-brand-red-deep shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/Kogo Flower.jpeg" alt="KogoPay" className="h-8 w-8 object-contain rounded-full" />
            <span className="font-bold text-white uppercase italic tracking-tight">KogoPay</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-white/70 text-sm hidden sm:block">
              Signed in as <span className="font-semibold text-white">{auth.username}</span>
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, <span className="text-brand-red">{auth.username}</span>
          </h1>
          <p className="mt-1 text-gray-500">What would you like to do today?</p>
        </div>

        {/* Session info card */}
        <div className="mb-8 rounded-2xl bg-brand-red-deep p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/60 text-sm font-medium uppercase tracking-wider">Active Session</p>
              <p className="mt-1 text-lg font-semibold">{auth.username}</p>
              <p className="mt-1 text-white/50 text-xs font-mono truncate max-w-xs">
                Token: {auth.session_token.slice(0, 20)}…
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-green-500/20 text-green-400 text-xs font-medium px-3 py-1.5 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              Connected
            </div>
          </div>
        </div>

        {/* Quick actions grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map(({ icon: Icon, label, description, href, color }) => (
            <Link
              key={label}
              href={href}
              className="group rounded-2xl bg-white border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${color} mb-4`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 group-hover:text-brand-red transition-colors">{label}</h3>
              <p className="mt-1 text-sm text-gray-500">{description}</p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand-red opacity-0 group-hover:opacity-100 transition-opacity">
                Go <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* Help note */}
        <div className="mt-8 rounded-xl bg-gold/10 border border-gold/30 px-5 py-4">
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-brand-red-deep">Test environment:</span>{' '}
            You are connected to the KogoPay TEST environment. Transfers will not move real funds.
          </p>
        </div>
      </main>
    </div>
  )
}
