import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makeXml(body: string) {
  return `<?xml version="1.0" encoding="utf-8"?><response>${body}</response>`
}

function successXml(resultBody: string) {
  return makeXml(`<status>SUCCESS</status><result>${resultBody}</result>`)
}

function failXml(message = 'Error') {
  return makeXml(`<status>FAIL</status><message>${message}</message>`)
}

// ─── Mock setup ───────────────────────────────────────────────────────────────

const REAL_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnzzQ/8Yk1J89I2g/Xmcm
TyZ/c7ZlCXoUPwsBDChPduXwhc5PKDMBfJPfkDdE73hrMcdDzbaKCU+dwf9OolGK
fBWZvUlgimy99Gsg+5IC7sUmt/Nx4xRZicOXOBXIuS8vaJbAFlzyM4lhCjUeATGs
EV/CFB7sanhGRvQHe7tBfvOeHURkKd8P2/Xrb7abdFCWJThdugHM3AbuYjElpk5G
ut/+LriQkgP5urpMJ/MLfi02YKoBaDafvXWhdIvUibQ89GHDUeOf7LAzVd0DTxQY
jEOcWlZSlsWPrl2AJBM43Rrs1XqPMHUWKQ5WSx3WZgkXU0+V/X2Hg3njZU00ASGW
xwIDAQAB
-----END PUBLIC KEY-----`

describe('getSeed', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.doMock('../config', () => ({
      REMITONE_SERVER_PUBLIC_KEY: REAL_PUBLIC_KEY,
      REMITONE_BASE_URL: 'https://test.remit.by/kogopaytest/remitterws/',
      REMITONE_SECURITY_HASH: 'test_hash',
      buildApiUrl: (g: string, m: string) =>
        `https://test.remit.by/kogopaytest/remitterws/${g}/${m}`,
    }))
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns SUCCESS with seed on valid response', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => successXml('<seed>TESTSEED123</seed>'),
    } as unknown as Response)

    const { getSeed } = await import('../client')
    const result = await getSeed('testuser')

    expect(result.status).toBe('SUCCESS')
    expect(result.data?.seed).toBe('TESTSEED123')
  })

  it('returns FAIL with message on failure response', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => failXml('User not found'),
    } as unknown as Response)

    const { getSeed } = await import('../client')
    const result = await getSeed('unknownuser')

    expect(result.status).toBe('FAIL')
    expect(result.message).toBe('User not found')
  })

  it('throws when HTTP response is not ok', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
      statusText: 'Service Unavailable',
    } as unknown as Response)

    const { getSeed } = await import('../client')
    await expect(getSeed('testuser')).rejects.toThrow('RemitONE HTTP error: 503')
  })

  it('sends POST to correct URL with username', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => successXml('<seed>S1</seed>'),
    } as unknown as Response)

    const { getSeed } = await import('../client')
    await getSeed('myuser')

    expect(global.fetch).toHaveBeenCalledWith(
      'https://test.remit.by/kogopaytest/remitterws/auth/getSeed',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
    )
    const body = (global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body as string
    expect(body).toContain('username=myuser')
  })
})

describe('login', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.doMock('../config', () => ({
      REMITONE_SERVER_PUBLIC_KEY: REAL_PUBLIC_KEY,
      REMITONE_BASE_URL: 'https://test.remit.by/kogopaytest/remitterws/',
      REMITONE_SECURITY_HASH: '',
      buildApiUrl: (g: string, m: string) =>
        `https://test.remit.by/kogopaytest/remitterws/${g}/${m}`,
    }))
  })

  it('calls getSeed then login in sequence', async () => {
    let callCount = 0
    global.fetch = vi.fn().mockImplementation(async () => {
      callCount++
      if (callCount === 1) {
        return { ok: true, text: async () => successXml('<seed>SEED_ABC</seed>') }
      }
      return {
        ok: true,
        text: async () => successXml('<session_token>TOKEN_XYZ</session_token>'),
      }
    }) as unknown as typeof fetch

    const { login } = await import('../client')
    const result = await login('user', 'pass123')

    expect(global.fetch).toHaveBeenCalledTimes(2)
    expect(result.status).toBe('SUCCESS')
    expect(result.data?.session_token).toBe('TOKEN_XYZ')
  })

  it('returns FAIL when getSeed fails', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => failXml('User not found'),
    } as unknown as Response)

    const { login } = await import('../client')
    const result = await login('baduser', 'pass')

    expect(result.status).toBe('FAIL')
    expect(global.fetch).toHaveBeenCalledTimes(1)
  })

  it('returns FAIL when login call fails', async () => {
    let callCount = 0
    global.fetch = vi.fn().mockImplementation(async () => {
      callCount++
      if (callCount === 1) {
        return { ok: true, text: async () => successXml('<seed>S1</seed>') }
      }
      return { ok: true, text: async () => failXml('Invalid password') }
    }) as unknown as typeof fetch

    const { login } = await import('../client')
    const result = await login('user', 'wrongpass')

    expect(result.status).toBe('FAIL')
    expect(result.message).toBe('Invalid password')
  })

  it('encrypted_data field is sent in login request body', async () => {
    let callCount = 0
    let loginRequestBody = ''
    global.fetch = vi.fn().mockImplementation(async (_url: string, init: RequestInit) => {
      callCount++
      if (callCount === 1) {
        return { ok: true, text: async () => successXml('<seed>SEED_XYZ</seed>') }
      }
      loginRequestBody = init.body as string
      return { ok: true, text: async () => successXml('<session_token>TOK</session_token>') }
    }) as unknown as typeof fetch

    const { login } = await import('../client')
    await login('user', 'pass')

    expect(loginRequestBody).toContain('encrypted_data=')
    // Should not contain raw password
    expect(loginRequestBody).not.toContain('pass123')
    expect(loginRequestBody).not.toContain('"password"')
  })
})

describe('logout', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.doMock('../config', () => ({
      REMITONE_SERVER_PUBLIC_KEY: REAL_PUBLIC_KEY,
      REMITONE_BASE_URL: '',
      REMITONE_SECURITY_HASH: '',
      buildApiUrl: (g: string, m: string) => `https://test/${g}/${m}`,
    }))
  })

  it('returns SUCCESS on valid logout', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => makeXml('<status>SUCCESS</status>'),
    } as unknown as Response)

    const { logout } = await import('../client')
    const result = await logout('user', 'token')

    expect(result.status).toBe('SUCCESS')
  })
})

describe('getCharges', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.doMock('../config', () => ({
      REMITONE_SERVER_PUBLIC_KEY: REAL_PUBLIC_KEY,
      REMITONE_BASE_URL: '',
      REMITONE_SECURITY_HASH: '',
      buildApiUrl: (g: string, m: string) => `https://test/${g}/${m}`,
    }))
  })

  it('returns parsed charges on success', async () => {
    const chargesXml = successXml(`
      <send_amount>100.00</send_amount>
      <receive_amount>10550.00</receive_amount>
      <commission>2.50</commission>
      <total_to_pay>102.50</total_to_pay>
      <source_currency>GBP</source_currency>
      <destination_currency>INR</destination_currency>
      <rate>105.50</rate>
    `)

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => chargesXml,
    } as unknown as Response)

    const { getCharges } = await import('../client')
    const result = await getCharges({
      username: 'user',
      session_token: 'tok',
      destination_country_id: '1',
      payment_method_code: '3',
      service_level_code: '3',
      send_amount: '100',
    })

    expect(result.status).toBe('SUCCESS')
    expect(result.data?.send_amount).toBe('100.00')
    expect(result.data?.commission).toBe('2.50')
    expect(result.data?.rate).toBe('105.50')
  })
})

describe('createBeneficiary', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.doMock('../config', () => ({
      REMITONE_SERVER_PUBLIC_KEY: REAL_PUBLIC_KEY,
      REMITONE_BASE_URL: '',
      REMITONE_SECURITY_HASH: '',
      buildApiUrl: (g: string, m: string) => `https://test/${g}/${m}`,
    }))
  })

  it('returns new_beneficiary_id on success', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => makeXml('<status>SUCCESS</status><new_beneficiary_id>99</new_beneficiary_id>'),
    } as unknown as Response)

    const { createBeneficiary } = await import('../client')
    const result = await createBeneficiary({
      username: 'user',
      session_token: 'tok',
      fname: 'John',
      lname: 'Doe',
      address1: '123 Street',
      city: 'Mumbai',
      country_id: '1',
    })

    expect(result.status).toBe('SUCCESS')
    expect(result.data?.new_beneficiary_id).toBe('99')
  })

  it('returns FAIL with errors on validation failure', async () => {
    const validationXml = makeXml(`
      <status>FAIL</status>
      <message>VALIDATION FAILED</message>
      <result>
        <errors>
          <error>
            <field>fname</field>
            <message>Required</message>
          </error>
        </errors>
      </result>
    `)

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => validationXml,
    } as unknown as Response)

    const { createBeneficiary } = await import('../client')
    const result = await createBeneficiary({
      username: 'user',
      session_token: 'tok',
      fname: '',
      lname: 'Doe',
      address1: '123',
      city: 'Mumbai',
      country_id: '1',
    })

    expect(result.status).toBe('FAIL')
    expect(result.errors).toHaveLength(1)
    expect(result.errors![0].field).toBe('fname')
  })
})
