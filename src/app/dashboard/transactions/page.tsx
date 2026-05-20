'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2, Receipt, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle, Send } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface Transaction {
  id: string; ref: string; status: string
  send_amount: string; receive_amount: string; commission: string; total_to_pay: string
  source_currency: string; destination_currency: string; rate: string
  created_date: string; beneficiary_fname?: string; beneficiary_lname?: string
}

function StatusBadge({ status }: { status: string }) {
  const s = status.toUpperCase()
  if (s === 'PROCESSED' || s === 'PAID') return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
      <CheckCircle className="h-3 w-3" />{status}
    </span>
  )
  if (s === 'CANCELLED' || s === 'REJECTED') return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
      <XCircle className="h-3 w-3" />{status}
    </span>
  )
  if (s === 'ENTERED' || s === 'PENDING') return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
      <Clock className="h-3 w-3" />{status}
    </span>
  )
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full">
      <AlertCircle className="h-3 w-3" />{status}
    </span>
  )
}

export default function TransactionsPage() {
  const { auth, isLoggedIn } = useAuth()
  const router = useRouter()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null)

  useEffect(() => {
    if (!isLoggedIn) { router.replace('/login'); return }
    fetchTransactions()
  }, [isLoggedIn])

  async function fetchTransactions() {
    if (!auth) return
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch(
        `/api/remitone/transaction?username=${encodeURIComponent(auth.username)}&session_token=${encodeURIComponent(auth.session_token)}`
      )
      const data = await res.json()
      if (data.status === 'SUCCESS') setTransactions(data.data ?? [])
      else setError(data.message ?? 'Failed to load transactions')
    } catch {
      setError('Unable to load transactions.')
    } finally {
      setIsLoading(false)
    }
  }

  // Summary stats
  const totalSent = transactions.reduce((sum, t) => sum + parseFloat(t.total_to_pay || '0'), 0)
  const processed = transactions.filter((t) => ['PROCESSED', 'PAID'].includes(t.status.toUpperCase())).length
  const pending = transactions.filter((t) => ['ENTERED', 'PENDING'].includes(t.status.toUpperCase())).length

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-brand-red-deep">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Link>
          <span className="text-white font-semibold text-sm">Transaction History</span>
          <button onClick={fetchTransactions} className="text-white/60 hover:text-white transition-colors" aria-label="Refresh">
            <Loader2 className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Stats */}
        {transactions.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { icon: Receipt, label: 'Total', value: transactions.length.toString(), sub: 'transfers' },
              { icon: CheckCircle, label: 'Processed', value: processed.toString(), sub: 'completed' },
              { icon: TrendingUp, label: 'Total Sent', value: `£${totalSent.toFixed(2)}`, sub: 'lifetime' },
            ].map(({ icon: Icon, label, value, sub }) => (
              <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-4 text-center">
                <Icon className="h-5 w-5 text-brand-red mx-auto mb-1.5" />
                <p className="text-xl font-bold text-gray-900">{value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
            <AlertCircle className="mt-0.5 h-5 w-5 text-red-500 shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-brand-red" />
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-20">
            <Receipt className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-600">No transactions yet</h3>
            <p className="text-sm text-gray-400 mt-1">Your transfer history will appear here</p>
            <Link href="/dashboard/send"
              className="mt-4 inline-flex items-center gap-2 h-10 px-6 rounded-xl bg-brand-red text-white text-sm font-bold hover:bg-brand-red-deep transition-colors">
              <Send className="h-4 w-4" /> Send Money
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <button
                key={tx.id}
                onClick={() => setSelectedTx(selectedTx?.id === tx.id ? null : tx)}
                className="w-full text-left bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-brand-red/10 flex items-center justify-center shrink-0">
                      <Send className="h-4.5 w-4.5 text-brand-red" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900 text-sm">
                          {tx.beneficiary_fname} {tx.beneficiary_lname}
                        </p>
                        <StatusBadge status={tx.status} />
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {tx.ref} · {tx.created_date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 text-sm">{tx.total_to_pay} {tx.source_currency}</p>
                    <p className="text-xs text-green-600 font-medium mt-0.5">→ {tx.receive_amount} {tx.destination_currency}</p>
                  </div>
                </div>

                {/* Expanded detail */}
                {selectedTx?.id === tx.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs">
                    {[
                      ['Amount sent', `${tx.send_amount} ${tx.source_currency}`],
                      ['Transfer fee', `${tx.commission} ${tx.source_currency}`],
                      ['Exchange rate', `${tx.rate}`],
                      ['Recipient gets', `${tx.receive_amount} ${tx.destination_currency}`],
                    ].map(([label, value]) => (
                      <div key={label} className="flex flex-col gap-0.5">
                        <span className="text-gray-400">{label}</span>
                        <span className="font-semibold text-gray-700">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {pending > 0 && !isLoading && (
          <p className="mt-4 text-center text-xs text-amber-600">
            {pending} transfer{pending > 1 ? 's' : ''} pending. Refresh to check for updates.
          </p>
        )}
      </main>
    </div>
  )
}
