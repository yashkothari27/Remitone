import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// ─── Module-level mock for config ─────────────────────────────────────────────

const REAL_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnzzQ/8Yk1J89I2g/Xmcm
TyZ/c7ZlCXoUPwsBDChPduXwhc5PKDMBfJPfkDdE73hrMcdDzbaKCU+dwf9OolGK
fBWZvUlgimy99Gsg+5IC7sUmt/Nx4xRZicOXOBXIuS8vaJbAFlzyM4lhCjUeATGs
EV/CFB7sanhGRvQHe7tBfvOeHURkKd8P2/Xrb7abdFCWJThdugHM3AbuYjElpk5G
ut/+LriQkgP5urpMJ/MLfi02YKoBaDafvXWhdIvUibQ89GHDUeOf7LAzVd0DTxQY
jEOcWlZSlsWPrl2AJBM43Rrs1XqPMHUWKQ5WSx3WZgkXU0+V/X2Hg3njZU00ASGW
xwIDAQAB
-----END PUBLIC KEY-----`

describe('encryptPayload', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('throws RemitOneError when public key is not configured', async () => {
    vi.doMock('../config', () => ({
      REMITONE_SERVER_PUBLIC_KEY: '',
      REMITONE_BASE_URL: 'https://test.remit.by/kogopaytest/remitterws/',
      REMITONE_SECURITY_HASH: '',
      buildApiUrl: (g: string, m: string) => `https://test.remit.by/${g}/${m}`,
    }))

    const { encryptPayload } = await import('../crypto')
    let thrown: unknown
    try { encryptPayload({ seed: 'abc', password: '123' }) } catch (e) { thrown = e }
    expect(thrown).toBeDefined()
    expect((thrown as { name?: string }).name).toBe('RemitOneError')
    expect((thrown as { code?: string }).code).toBe('CONFIG_ERROR')
  })

  it('throws RemitOneError when key contains placeholder', async () => {
    vi.doMock('../config', () => ({
      REMITONE_SERVER_PUBLIC_KEY: 'PASTE_YOUR_SERVER_PUBLIC_KEY_HERE',
      REMITONE_BASE_URL: 'https://test.remit.by/kogopaytest/remitterws/',
      REMITONE_SECURITY_HASH: '',
      buildApiUrl: (g: string, m: string) => `https://test.remit.by/${g}/${m}`,
    }))

    const { encryptPayload } = await import('../crypto')
    let thrown: unknown
    try { encryptPayload({ seed: 'abc', password: '123' }) } catch (e) { thrown = e }
    expect(thrown).toBeDefined()
    expect((thrown as { name?: string }).name).toBe('RemitOneError')
    expect((thrown as { code?: string }).code).toBe('CONFIG_ERROR')
  })

  it('error thrown does not contain config details in message', async () => {
    vi.doMock('../config', () => ({
      REMITONE_SERVER_PUBLIC_KEY: '',
      REMITONE_BASE_URL: '',
      REMITONE_SECURITY_HASH: '',
      buildApiUrl: (g: string, m: string) => `https://test.remit.by/${g}/${m}`,
    }))

    const { encryptPayload } = await import('../crypto')
    try {
      encryptPayload({ seed: 'abc', password: '123' })
    } catch (e) {
      const err = e as { message?: string }
      expect(err.message).not.toContain('REMITONE_SERVER_PUBLIC_KEY')
      expect(err.message).not.toContain('.env.local')
    }
  })

  it('produces a valid base64 string when key is configured', async () => {
    vi.doMock('../config', () => ({
      REMITONE_SERVER_PUBLIC_KEY: REAL_PUBLIC_KEY,
      REMITONE_BASE_URL: 'https://test.remit.by/kogopaytest/remitterws/',
      REMITONE_SECURITY_HASH: '',
      buildApiUrl: (g: string, m: string) => `https://test.remit.by/${g}/${m}`,
    }))

    const { encryptPayload } = await import('../crypto')
    const result = encryptPayload({ seed: 'test_seed_123', password: 'myPassword' })

    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
    // Base64 only contains valid chars
    expect(/^[A-Za-z0-9+/]+=*$/.test(result)).toBe(true)
    // RSA 2048 bit = 256 bytes = 344 base64 chars
    expect(result.length).toBe(344)
  })

  it('produces different ciphertexts for the same input (RSA PKCS1 is probabilistic)', async () => {
    vi.doMock('../config', () => ({
      REMITONE_SERVER_PUBLIC_KEY: REAL_PUBLIC_KEY,
      REMITONE_BASE_URL: '',
      REMITONE_SECURITY_HASH: '',
      buildApiUrl: (g: string, m: string) => `https://test.remit.by/${g}/${m}`,
    }))

    const { encryptPayload } = await import('../crypto')
    const r1 = encryptPayload({ seed: 'same', password: 'same' })
    const r2 = encryptPayload({ seed: 'same', password: 'same' })
    expect(r1).not.toBe(r2)
  })
})

describe('buildLoginEncryptedData', () => {
  it('encrypts a valid seed+password combination', async () => {
    vi.doMock('../config', () => ({
      REMITONE_SERVER_PUBLIC_KEY: REAL_PUBLIC_KEY,
      REMITONE_BASE_URL: '',
      REMITONE_SECURITY_HASH: '',
      buildApiUrl: (g: string, m: string) => `https://test.remit.by/${g}/${m}`,
    }))

    const { buildLoginEncryptedData } = await import('../crypto')
    const result = buildLoginEncryptedData('seed_abc', 'password123')
    expect(typeof result).toBe('string')
    expect(result.length).toBe(344)
  })
})
