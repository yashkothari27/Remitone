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

  // Parse the first ID document from nested <id_documents><id_document> structure
  const idDocsXml = parseField(resultXml, 'id_documents')
  if (idDocsXml) {
    const firstDoc = parseField(idDocsXml, 'id_document')
    if (firstDoc) {
      const idType    = parseField(firstDoc, 'id_type')
      const idDetails = parseField(firstDoc, 'id_details')
      const idExpiry  = parseField(firstDoc, 'id_expiry')
      if (idType)    data.id1_type    = idType
      if (idDetails) data.id1_details = idDetails
      if (idExpiry)  data.id1_expiry  = idExpiry
    }
  }

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
  destination_country?: string,
  source_currency?: string,
  destination_currency?: string
): Promise<RemitOneResponse<ReturnType<typeof parseRates>>> {
  const params: Record<string, string> = { username, session_token }
  if (destination_country) params.destination_country = destination_country
  if (source_currency) params.source_currency = source_currency
  if (destination_currency) params.destination_currency = destination_currency

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
  const params: Record<string, string> = {
    username:            input.username,
    session_token:       input.session_token,
    destination_country: input.destination_country,
    trans_type:          input.trans_type,
    payment_method:      input.payment_method,
    service_level:       input.service_level,
    amount_type:         input.amount_type,
    amount_to_send:      input.amount_to_send,
  }
  if (input.source_currency)          params.source_currency          = input.source_currency
  if (input.destination_currency)     params.destination_currency     = input.destination_currency
  if (input.sms_confirmation)         params.sms_confirmation         = input.sms_confirmation
  if (input.sms_notification)         params.sms_notification         = input.sms_notification
  if (input.sms_benef_confirmation)   params.sms_benef_confirmation   = input.sms_benef_confirmation
  if (input.collection_point_id)      params.collection_point_id      = input.collection_point_id
  if (input.benef_branch_id)          params.benef_branch_id          = input.benef_branch_id
  if (input.benef_bank)               params.benef_bank               = input.benef_bank
  if (input.utility_company)          params.utility_company          = input.utility_company
  if (input.promotion_code)           params.promotion_code           = input.promotion_code
  if (input.loyalty_points)           params.loyalty_points           = input.loyalty_points
  if (input.loyalty_points_monetary_value) params.loyalty_points_monetary_value = input.loyalty_points_monetary_value
  if (input.loyalty_points_discount)  params.loyalty_points_discount  = input.loyalty_points_discount

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
  opts?: {
    confirmation_code?: string
    confirmation_pin?: string
    email_confirmation_code?: string
    sms_confirmation_code?: string
  }
): Promise<RemitOneResponse<ReturnType<typeof parseTransaction>>> {
  const params: Record<string, string> = { username, session_token, trans_session_id }
  if (opts?.confirmation_code) params.confirmation_code = opts.confirmation_code
  if (opts?.confirmation_pin) params.confirmation_pin = opts.confirmation_pin
  // Legacy fields — DEPRECATED by spec, kept for backward compatibility
  if (opts?.email_confirmation_code) params.email_confirmation_code = opts.email_confirmation_code
  if (opts?.sms_confirmation_code) params.sms_confirmation_code = opts.sms_confirmation_code
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
  trans_ref: string
): Promise<RemitOneResponse<ReturnType<typeof parseTransaction>>> {
  const xml = await post('transaction', 'getTransaction', {
    username,
    session_token,
    trans_ref,
  })
  if (parseStatus(xml) === 'FAIL') return buildResponse(xml)
  return buildResponse(xml, parseTransaction(xml))
}

export async function requestTransactionConfirmationCode(
  username: string,
  session_token: string,
  trans_session_id: string
): Promise<RemitOneResponse<{ sms_confirmation_code: boolean; email_confirmation_code: boolean }>> {
  const xml = await post('transaction', 'requestTransactionConfirmationCode', {
    username,
    session_token,
    trans_session_id,
  })
  if (parseStatus(xml) === 'FAIL') return buildResponse(xml)
  const resultXml = parseResult(xml)
  return buildResponse(xml, {
    sms_confirmation_code: parseField(resultXml, 'sms_confirmation_code') === 'true',
    email_confirmation_code: parseField(resultXml, 'email_confirmation_code') === 'true',
  })
}
