import { buildApiUrl } from './config'
import {
  parseStatus,
  parseMessage,
  parseField,
  parseResult,
  parseValidationErrors,
  parseCountries,
  parseRates,
  parseCharges,
  parseBeneficiaries,
  parseTransaction,
  parseTransactions,
} from './xml-parser'
import { buildLoginEncryptedData, buildLoginPinEncryptedData } from './crypto'
import type {
  RemitOneResponse,
  SeedResult,
  LoginResult,
  CreateBeneficiaryInput,
  CreateRemitterInput,
  ConfirmRegistrationInput,
  GetChargesInput,
  CreateTransactionInput,
} from './types'

async function post(group: string, method: string, params: Record<string, string>): Promise<string> {
  const url = buildApiUrl(group, method)
  const body = new URLSearchParams(params)

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })

  if (!res.ok) {
    throw new Error(`RemitONE HTTP error: ${res.status} ${res.statusText}`)
  }

  return res.text()
}

function buildResponse<T>(xml: string, data?: T): RemitOneResponse<T> {
  const status = parseStatus(xml)
  if (status === 'FAIL') {
    const message = parseMessage(xml)
    const errors = parseValidationErrors(xml)
    return { status: 'FAIL', message, errors: errors.length ? errors : undefined }
  }
  return { status: 'SUCCESS', data }
}

// ─── Authentication ───────────────────────────────────────────────────────────

export async function getSeed(username: string): Promise<RemitOneResponse<SeedResult>> {
  const xml = await post('auth', 'getSeed', { username })
  if (parseStatus(xml) === 'FAIL') return buildResponse(xml)
  const resultXml = parseResult(xml)
  const seed = parseField(resultXml, 'seed')
  return buildResponse(xml, { seed })
}

export async function login(
  username: string,
  password: string
): Promise<RemitOneResponse<LoginResult>> {
  const seedResp = await getSeed(username)
  if (seedResp.status === 'FAIL' || !seedResp.data?.seed) {
    return { status: 'FAIL', message: seedResp.message ?? 'Failed to get seed' }
  }

  const encrypted_data = buildLoginEncryptedData(seedResp.data.seed, password)
  const xml = await post('auth', 'login', { username, encrypted_data })

  if (parseStatus(xml) === 'FAIL') return buildResponse(xml)

  const resultXml = parseResult(xml)
  const session_token = parseField(resultXml, 'session_token')
  const app_pin = parseField(resultXml, 'app_pin')
  const twoFaXml = parseField(resultXml, 'two_factor_authentication')

  const result: LoginResult = { session_token }
  if (app_pin) result.app_pin = app_pin
  if (twoFaXml) {
    result.two_factor_authentication = {
      required: parseField(twoFaXml, 'required') === 'true',
      type: parseField(twoFaXml, 'type'),
      can_resend_code: parseField(twoFaXml, 'can_resend_code') === 'true',
      google_2fa_qr_code_url: parseField(twoFaXml, 'google_2fa_qr_code_url'),
      two_fa_setup_required: parseField(twoFaXml, 'two_fa_setup_required') === 'true',
      code_length: parseInt(parseField(twoFaXml, 'code_length') || '6', 10),
    }
  }

  return buildResponse(xml, result)
}

export async function loginWithPin(
  username: string,
  pin: string
): Promise<RemitOneResponse<LoginResult>> {
  const seedResp = await getSeed(username)
  if (seedResp.status === 'FAIL' || !seedResp.data?.seed) {
    return { status: 'FAIL', message: seedResp.message ?? 'Failed to get seed' }
  }

  const encrypted_data = buildLoginPinEncryptedData(seedResp.data.seed, pin)
  const xml = await post('auth', 'loginPin', { username, encrypted_data })

  if (parseStatus(xml) === 'FAIL') return buildResponse(xml)

  const resultXml = parseResult(xml)
  const session_token = parseField(resultXml, 'session_token')
  return buildResponse(xml, { session_token })
}

export async function confirmTwoFactor(
  username: string,
  session_token: string,
  code: string
): Promise<RemitOneResponse<void>> {
  const xml = await post('auth', 'confirmTwoFactorAuthentication', {
    username,
    session_token,
    code,
  })
  return buildResponse(xml)
}

export async function logout(
  username: string,
  session_token: string
): Promise<RemitOneResponse<void>> {
  const xml = await post('auth', 'logout', { username, session_token })
  return buildResponse(xml)
}

export async function getSourceCountries(): Promise<RemitOneResponse<ReturnType<typeof parseCountries>>> {
  const xml = await post('remitterUser', 'getSourceCountries', {})
  if (parseStatus(xml) === 'FAIL') return buildResponse(xml)
  return buildResponse(xml, parseCountries(xml))
}

export async function register(
  input: CreateRemitterInput
): Promise<RemitOneResponse<{ email_verification_code: boolean; sms_verification_code: boolean }>> {
  const params: Record<string, string> = {}
  for (const [k, v] of Object.entries(input)) {
    if (v !== undefined) params[k] = String(v)
  }
  const xml = await post('remitterUser', 'register', params)
  if (parseStatus(xml) === 'FAIL') return buildResponse(xml)
  const resultXml = parseResult(xml)
  return buildResponse(xml, {
    email_verification_code: parseField(resultXml, 'email_verification_code') === 'true',
    sms_verification_code: parseField(resultXml, 'sms_verification_code') === 'true',
  })
}

export async function confirmRegistration(
  input: ConfirmRegistrationInput
): Promise<RemitOneResponse<LoginResult>> {
  const params: Record<string, string> = { username: input.username }
  if (input.email_verification_code) params.email_verification_code = input.email_verification_code
  if (input.sms_verification_code) params.sms_verification_code = input.sms_verification_code
  const xml = await post('remitterUser', 'confirmRegistration', params)
  if (parseStatus(xml) === 'FAIL') return buildResponse(xml)
  const resultXml = parseResult(xml)
  const session_token = parseField(resultXml, 'session_token')
  return buildResponse(xml, { session_token })
}

export async function forgotPassword(
  username: string,
  dob: string
): Promise<RemitOneResponse<void>> {
  const xml = await post('auth', 'forgotPassword', { username, dob })
  return buildResponse(xml)
}

export async function getRemitter(
  username: string,
  session_token: string
): Promise<RemitOneResponse<Record<string, string>>> {
  const xml = await post('remitterUser', 'getProfile', { username, session_token })
  if (parseStatus(xml) === 'FAIL') return buildResponse(xml)
  const resultXml = parseResult(xml)
  // Log raw XML in dev so we can see actual field names
  if (process.env.NODE_ENV === 'development') console.log('[getProfile] result XML:', resultXml)
  const fields = [
    'firstname','lastname','email','mobile','dob',
    'nationality','address1','address2','city','postcode','state',
    'id1_type','id1_details','id1_expiry',
    'country','country_id','country_iso_code','status','trans_allowed',
  ]
  const data: Record<string, string> = {}
  for (const f of fields) {
    const val = parseField(resultXml, f)
    if (val) data[f] = val
  }
  // Normalise to fname/lname so the profile form fields work
  data.fname = data.firstname ?? ''
  data.lname  = data.lastname  ?? ''
  return buildResponse(xml, data)
}

export async function updateRemitter(
  username: string,
  session_token: string,
  updates: Record<string, string>
): Promise<RemitOneResponse<void>> {
  const xml = await post('remitterUser', 'updateProfile', { username, session_token, ...updates })
  return buildResponse(xml)
}

// ─── Rates ───────────────────────────────────────────────────────────────────

export async function getRates(
  username: string,
  session_token: string,
  destination_country_id?: string
): Promise<RemitOneResponse<ReturnType<typeof parseRates>>> {
  const params: Record<string, string> = { username, session_token }
  if (destination_country_id) params.destination_country_id = destination_country_id

  const xml = await post('rate', 'getRates', params)
  if (parseStatus(xml) === 'FAIL') return buildResponse(xml)

  return buildResponse(xml, parseRates(xml))
}

// ─── Beneficiary ─────────────────────────────────────────────────────────────

export async function getDestinationCountries(
  username: string,
  session_token: string
): Promise<RemitOneResponse<ReturnType<typeof parseCountries>>> {
  const xml = await post('beneficiary', 'getDestinationCountries', { username, session_token })
  if (parseStatus(xml) === 'FAIL') return buildResponse(xml)
  return buildResponse(xml, parseCountries(xml))
}

export async function listBeneficiaries(
  username: string,
  session_token: string
): Promise<RemitOneResponse<ReturnType<typeof parseBeneficiaries>>> {
  const xml = await post('beneficiary', 'listBeneficiaries', { username, session_token })
  if (parseStatus(xml) === 'FAIL') return buildResponse(xml)
  return buildResponse(xml, parseBeneficiaries(xml))
}

export async function createBeneficiary(
  input: CreateBeneficiaryInput
): Promise<RemitOneResponse<{ new_beneficiary_id: string }>> {
  const params: Record<string, string> = {}
  for (const [k, v] of Object.entries(input)) {
    if (v !== undefined) params[k] = v
  }

  const xml = await post('beneficiary', 'createBeneficiary', params)
  if (parseStatus(xml) === 'FAIL') return buildResponse(xml)

  const new_beneficiary_id = parseField(xml, 'new_beneficiary_id')
  return buildResponse(xml, { new_beneficiary_id })
}

// ─── Transactions ─────────────────────────────────────────────────────────────

export async function getCharges(
  input: GetChargesInput
): Promise<RemitOneResponse<ReturnType<typeof parseCharges>>> {
  const params: Record<string, string> = {}
  for (const [k, v] of Object.entries(input)) {
    if (v !== undefined) params[k] = v
  }

  const xml = await post('transaction', 'getCharges', params)
  if (parseStatus(xml) === 'FAIL') return buildResponse(xml)
  return buildResponse(xml, parseCharges(xml))
}

export async function createTransaction(
  input: CreateTransactionInput
): Promise<RemitOneResponse<ReturnType<typeof parseTransaction>>> {
  const params: Record<string, string> = {}
  for (const [k, v] of Object.entries(input)) {
    if (v !== undefined) params[k] = v
  }

  const xml = await post('transaction', 'createTransaction', params)
  if (parseStatus(xml) === 'FAIL') return buildResponse(xml)
  return buildResponse(xml, parseTransaction(xml))
}

export async function confirmTransaction(
  username: string,
  session_token: string,
  trans_session_id: string,
  opts?: { email_confirmation_code?: string; sms_confirmation_code?: string; confirmation_pin?: string }
): Promise<RemitOneResponse<ReturnType<typeof parseTransaction>>> {
  const params: Record<string, string> = { username, session_token, trans_session_id }
  if (opts?.email_confirmation_code) params.email_confirmation_code = opts.email_confirmation_code
  if (opts?.sms_confirmation_code) params.sms_confirmation_code = opts.sms_confirmation_code
  if (opts?.confirmation_pin) params.confirmation_pin = opts.confirmation_pin
  const xml = await post('transaction', 'confirmTransaction', params)
  if (parseStatus(xml) === 'FAIL') return buildResponse(xml)
  return buildResponse(xml, parseTransaction(xml))
}

export async function listTransactions(
  username: string,
  session_token: string,
  page?: string,
  per_page?: string
): Promise<RemitOneResponse<ReturnType<typeof parseTransactions>>> {
  const params: Record<string, string> = { username, session_token }
  if (page) params.page = page
  if (per_page) params.per_page = per_page

  const xml = await post('transaction', 'listTransactions', params)
  if (parseStatus(xml) === 'FAIL') return buildResponse(xml)
  return buildResponse(xml, parseTransactions(xml))
}

export async function getTransaction(
  username: string,
  session_token: string,
  transaction_id: string
): Promise<RemitOneResponse<ReturnType<typeof parseTransaction>>> {
  const xml = await post('transaction', 'getTransaction', {
    username,
    session_token,
    transaction_id,
  })
  if (parseStatus(xml) === 'FAIL') return buildResponse(xml)
  return buildResponse(xml, parseTransaction(xml))
}
