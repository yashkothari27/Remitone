import { describe, it, expect } from 'vitest'
import { RemitOneError, safeErrorMessage } from '../errors'

describe('RemitOneError', () => {
  it('has correct name and properties', () => {
    const err = new RemitOneError('Payment service unavailable', 'CONFIG_ERROR', 'raw detail')
    expect(err.name).toBe('RemitOneError')
    expect(err.message).toBe('Payment service unavailable')
    expect(err.code).toBe('CONFIG_ERROR')
    expect(err.internal).toBe('raw detail')
    expect(err instanceof Error).toBe(true)
  })
})

describe('safeErrorMessage', () => {
  it('returns RemitOneError message directly', () => {
    const err = new RemitOneError('Custom safe message', 'CODE')
    expect(safeErrorMessage(err)).toBe('Custom safe message')
  })

  it('maps ECONNREFUSED to a safe message', () => {
    const err = new Error('connect ECONNREFUSED 127.0.0.1:3000')
    const msg = safeErrorMessage(err)
    expect(msg).toBe('Unable to reach the payment service. Please try again.')
    expect(msg).not.toContain('127.0.0.1')
  })

  it('maps ENOTFOUND to a safe message', () => {
    const err = new Error('getaddrinfo ENOTFOUND test.remit.by')
    const msg = safeErrorMessage(err)
    expect(msg).toBe('Unable to reach the payment service. Please try again.')
    expect(msg).not.toContain('test.remit.by')
  })

  it('maps ETIMEDOUT to a safe message', () => {
    const err = new Error('ETIMEDOUT')
    const msg = safeErrorMessage(err)
    expect(msg).toBe('The payment service request timed out. Please try again.')
  })

  it('returns generic message for unknown errors', () => {
    const err = new Error('some internal db connection string: postgres://user:pass@host/db')
    const msg = safeErrorMessage(err)
    expect(msg).toBe('An unexpected error occurred. Please try again.')
    expect(msg).not.toContain('postgres')
    expect(msg).not.toContain('pass')
  })

  it('returns generic message for non-Error values', () => {
    expect(safeErrorMessage(null)).toBe('An unexpected error occurred. Please try again.')
    expect(safeErrorMessage(undefined)).toBe('An unexpected error occurred. Please try again.')
    expect(safeErrorMessage(42)).toBe('An unexpected error occurred. Please try again.')
    expect(safeErrorMessage('string error')).toBe('An unexpected error occurred. Please try again.')
  })

  it('never leaks internal config details', () => {
    const err = new Error('REMITONE_SERVER_PUBLIC_KEY is not configured in .env.local')
    const msg = safeErrorMessage(err)
    expect(msg).not.toContain('REMITONE_SERVER_PUBLIC_KEY')
    expect(msg).not.toContain('.env.local')
  })
})
