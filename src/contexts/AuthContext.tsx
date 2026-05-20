'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

interface AuthState {
  username: string
  session_token: string
}

interface AuthContextValue {
  auth: AuthState | null
  isLoggedIn: boolean
  isLoading: boolean
  error: string | null
  login: (username: string, password: string) => Promise<{ status: string; message?: string }>
  logout: () => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const SESSION_KEY = 'kogopay_auth'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hydrated, setHydrated] = useState(false)

  // Restore session from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as AuthState
        if (parsed.username && parsed.session_token) {
          setAuth(parsed)
        }
      }
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true)
  }, [])

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
        const state: AuthState = { username, session_token: data.data.session_token }
        setAuth(state)
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(state))
      } else {
        setError(data.message ?? 'Login failed')
      }
      return data
    } catch (e) {
      const msg = 'Unable to connect. Please try again.'
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
      sessionStorage.removeItem(SESSION_KEY)
    }
  }, [auth])

  const clearError = useCallback(() => setError(null), [])

  if (!hydrated) return null

  return (
    <AuthContext.Provider value={{ auth, isLoggedIn: !!auth, isLoading, error, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
