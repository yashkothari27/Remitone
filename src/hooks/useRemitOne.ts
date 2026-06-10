'use client'

import { useState, useCallback } from 'react'
import useSWR from 'swr'

// ─── Auth ─────────────────────────────────────────────────────────────────────

interface AuthState {
  username: string
  session_token: string
}

export function useAuth() {
  const [auth, setAuth] = useState<AuthState | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = useCallback(async (username: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/remitone/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', username, password }),
      })
      const data = await res.json()
      if (data.status === 'SUCCESS' && data.data?.session_token) {
        setAuth({ username, session_token: data.data.session_token })
        return data
      }
      setError(data.message ?? 'Login failed')
      return data
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Login failed'
      setError(msg)
      return { status: 'FAIL', message: msg }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    if (!auth) return
    try {
      await fetch('/api/remitone/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout', username: auth.username, session_token: auth.session_token }),
      })
    } finally {
      setAuth(null)
    }
  }, [auth])

  return { auth, login, logout, isLoading, error }
}

// ─── Rates ───────────────────────────────────────────────────────────────────

export function useRemitOneRates(username?: string, session_token?: string, destination_country?: string) {
  const key =
    username && session_token
      ? `/api/remitone/rates?username=${encodeURIComponent(username)}&session_token=${encodeURIComponent(session_token)}${destination_country ? `&destination_country=${encodeURIComponent(destination_country)}` : ''}`
      : null

  const { data, error, mutate } = useSWR(
    key,
    async (url: string) => {
      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch rates')
      return res.json()
    },
    { refreshInterval: 60000, revalidateOnFocus: false }
  )

  return {
    rates: data?.data ?? [],
    isLoading: !error && !data && !!key,
    isError: !!error,
    refetch: mutate,
  }
}

// ─── Countries ───────────────────────────────────────────────────────────────

export function useDestinationCountries(username?: string, session_token?: string) {
  const key =
    username && session_token
      ? `/api/remitone/countries?username=${encodeURIComponent(username)}&session_token=${encodeURIComponent(session_token)}`
      : null

  const { data, error } = useSWR(
    key,
    async (url: string) => {
      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch countries')
      return res.json()
    },
    { revalidateOnFocus: false }
  )

  return {
    countries: data?.data ?? [],
    isLoading: !error && !data && !!key,
    isError: !!error,
  }
}

// ─── Beneficiaries ───────────────────────────────────────────────────────────

export function useBeneficiaries(username?: string, session_token?: string) {
  const key =
    username && session_token
      ? `/api/remitone/beneficiaries?username=${encodeURIComponent(username)}&session_token=${encodeURIComponent(session_token)}`
      : null

  const { data, error, mutate } = useSWR(
    key,
    async (url: string) => {
      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch beneficiaries')
      return res.json()
    },
    { revalidateOnFocus: false }
  )

  const createBeneficiary = useCallback(
    async (beneficiaryData: Record<string, string>) => {
      if (!username || !session_token) return { status: 'FAIL', message: 'Not authenticated' }
      const res = await fetch('/api/remitone/beneficiaries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...beneficiaryData, username, session_token }),
      })
      const result = await res.json()
      if (result.status === 'SUCCESS') await mutate()
      return result
    },
    [username, session_token, mutate]
  )

  return {
    beneficiaries: data?.data ?? [],
    isLoading: !error && !data && !!key,
    isError: !!error,
    createBeneficiary,
    refetch: mutate,
  }
}

// ─── Charges ─────────────────────────────────────────────────────────────────

interface ChargesParams {
  username?: string
  session_token?: string
  destination_country?: string   // country name, not ID
  trans_type?: string
  payment_method?: string
  service_level?: string
  amount_type?: string           // SOURCE / DESTINATION / TOTAL
  amount_to_send?: string
  source_currency?: string
  destination_currency?: string
  promotion_code?: string
}

export function useCharges({
  username,
  session_token,
  destination_country,
  trans_type,
  payment_method,
  service_level,
  amount_type,
  amount_to_send,
  source_currency,
  destination_currency,
  promotion_code,
}: ChargesParams) {
  const ready =
    username &&
    session_token &&
    destination_country &&
    trans_type &&
    payment_method &&
    service_level &&
    amount_type &&
    amount_to_send

  const params = new URLSearchParams()
  if (username) params.set('username', username)
  if (session_token) params.set('session_token', session_token)
  if (destination_country) params.set('destination_country', destination_country)
  if (trans_type) params.set('trans_type', trans_type)
  if (payment_method) params.set('payment_method', payment_method)
  if (service_level) params.set('service_level', service_level)
  if (amount_type) params.set('amount_type', amount_type)
  if (amount_to_send) params.set('amount_to_send', amount_to_send)
  if (source_currency) params.set('source_currency', source_currency)
  if (destination_currency) params.set('destination_currency', destination_currency)
  if (promotion_code) params.set('promotion_code', promotion_code)

  const { data, error, mutate } = useSWR(
    ready ? `/api/remitone/charges?${params.toString()}` : null,
    async (url: string) => {
      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch charges')
      return res.json()
    },
    { revalidateOnFocus: false }
  )

  return {
    charges: data?.data ?? null,
    isLoading: !error && !data && !!ready,
    isError: !!error,
    refetch: mutate,
  }
}

// ─── Transactions ─────────────────────────────────────────────────────────────

export function useTransactions(username?: string, session_token?: string) {
  const key =
    username && session_token
      ? `/api/remitone/transaction?username=${encodeURIComponent(username)}&session_token=${encodeURIComponent(session_token)}`
      : null

  const { data, error, mutate } = useSWR(
    key,
    async (url: string) => {
      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch transactions')
      return res.json()
    },
    { revalidateOnFocus: false }
  )

  const createTransaction = useCallback(
    async (txData: Record<string, string>) => {
      if (!username || !session_token) return { status: 'FAIL', message: 'Not authenticated' }
      const res = await fetch('/api/remitone/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create', ...txData, username, session_token }),
      })
      return res.json()
    },
    [username, session_token]
  )

  const confirmTransaction = useCallback(
    async (trans_session_id: string, confirmation_code?: string) => {
      if (!username || !session_token) return { status: 'FAIL', message: 'Not authenticated' }
      const res = await fetch('/api/remitone/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'confirm',
          username,
          session_token,
          trans_session_id,
          ...(confirmation_code ? { confirmation_code } : {}),
        }),
      })
      const result = await res.json()
      if (result.status === 'SUCCESS') await mutate()
      return result
    },
    [username, session_token, mutate]
  )

  return {
    transactions: data?.data ?? [],
    isLoading: !error && !data && !!key,
    isError: !!error,
    createTransaction,
    confirmTransaction,
    refetch: mutate,
  }
}
