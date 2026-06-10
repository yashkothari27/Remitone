import { NextRequest, NextResponse } from 'next/server'
import {
  createTransaction,
  confirmTransaction,
  listTransactions,
  getTransaction,
  requestTransactionConfirmationCode,
} from '@/lib/remitone/client'
import { safeErrorMessage } from '@/lib/remitone/errors'
import type { CreateTransactionInput } from '@/lib/remitone/types'

// Explicit allowlist — only these fields are forwarded on createTransaction
const TX_ALLOWED_FIELDS: Array<keyof CreateTransactionInput> = [
  'trans_type',
  'beneficiary_id',
  'source_currency',
  'destination_currency',
  'amount_type',
  'amount',
  'payment_method',
  'service_level',
  'account_item_number',
  'purpose',
  'source_of_income',
  'promotion_code',
  'loyalty_points',
  'sms_confirmation',
  'sms_notification',
  'sms_mobile',
  'sms_benef_confirmation',
  'sms_benef_mobile',
  'payment_token',
  'remitter_wallet_currency',
  'utility_bill_invoice',
  'utility_bill_description',
  'comments_to_beneficiary',
]

const NUMERIC_RE = /^\d{1,10}(\.\d{1,4})?$/
const CODE_RE = /^[a-zA-Z0-9_-]{1,20}$/
const NUMERIC_ID_RE = /^\d{1,10}$/
const TRANS_SESSION_RE = /^[a-zA-Z0-9]{1,50}$/
const TRANS_REF_RE = /^[a-zA-Z0-9]{1,50}$/

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const username = searchParams.get('username')
    const session_token = searchParams.get('session_token')
    const transaction_id = searchParams.get('trans_ref') ?? searchParams.get('transaction_id')
    const page = searchParams.get('page') ?? undefined
    const per_page = searchParams.get('per_page') ?? undefined

    if (!username || !session_token) {
      return NextResponse.json(
        { status: 'FAIL', message: 'username and session_token are required' },
        { status: 400 }
      )
    }

    if (transaction_id) {
      if (!TRANS_REF_RE.test(transaction_id)) {
        return NextResponse.json({ status: 'FAIL', message: 'Invalid transaction reference' }, { status: 400 })
      }
      const result = await getTransaction(username, session_token, transaction_id)
      return NextResponse.json(result)
    }

    const result = await listTransactions(username, session_token, page, per_page)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ status: 'FAIL', message: safeErrorMessage(error) }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    if (!action) {
      return NextResponse.json({ status: 'FAIL', message: 'action is required' }, { status: 400 })
    }

    switch (action) {
      case 'create': {
        const username = body.username
        const session_token = body.session_token

        if (!username || typeof username !== 'string') {
          return NextResponse.json({ status: 'FAIL', message: 'username is required' }, { status: 400 })
        }
        if (!session_token || typeof session_token !== 'string') {
          return NextResponse.json({ status: 'FAIL', message: 'session_token is required' }, { status: 400 })
        }
        if (!body.trans_type || typeof body.trans_type !== 'string') {
          return NextResponse.json({ status: 'FAIL', message: 'trans_type is required' }, { status: 400 })
        }
        if (!body.beneficiary_id || !NUMERIC_ID_RE.test(String(body.beneficiary_id))) {
          return NextResponse.json({ status: 'FAIL', message: 'beneficiary_id is required and must be numeric' }, { status: 400 })
        }
        if (!body.source_currency || typeof body.source_currency !== 'string') {
          return NextResponse.json({ status: 'FAIL', message: 'source_currency is required' }, { status: 400 })
        }
        if (!body.destination_currency || typeof body.destination_currency !== 'string') {
          return NextResponse.json({ status: 'FAIL', message: 'destination_currency is required' }, { status: 400 })
        }
        if (!body.amount_type || !['SOURCE', 'DESTINATION', 'TOTAL'].includes(body.amount_type)) {
          return NextResponse.json({ status: 'FAIL', message: 'amount_type must be SOURCE, DESTINATION, or TOTAL' }, { status: 400 })
        }
        if (!body.amount || !NUMERIC_RE.test(body.amount)) {
          return NextResponse.json({ status: 'FAIL', message: 'amount is required' }, { status: 400 })
        }
        if (!body.payment_method || !CODE_RE.test(body.payment_method)) {
          return NextResponse.json({ status: 'FAIL', message: 'payment_method is required' }, { status: 400 })
        }
        if (!body.service_level || !CODE_RE.test(body.service_level)) {
          return NextResponse.json({ status: 'FAIL', message: 'service_level is required' }, { status: 400 })
        }

        // Build safe payload from allowlist only
        const safeInput: CreateTransactionInput = {
          username,
          session_token,
          trans_type: body.trans_type,
          beneficiary_id: String(body.beneficiary_id),
          source_currency: body.source_currency,
          destination_currency: body.destination_currency,
          amount_type: body.amount_type,
          amount: body.amount,
          payment_method: body.payment_method,
          service_level: body.service_level,
        }
        for (const field of TX_ALLOWED_FIELDS) {
          const val = body[field]
          if (typeof val === 'string' && val.length > 0 && !(field in safeInput)) {
            (safeInput as unknown as Record<string, string>)[field] = val.slice(0, 500)
          }
        }

        const result = await createTransaction(safeInput)
        return NextResponse.json(result)
      }

      case 'confirm': {
        const { username, session_token, trans_session_id, confirmation_code, confirmation_pin } = body

        if (!username || typeof username !== 'string') {
          return NextResponse.json({ status: 'FAIL', message: 'username is required' }, { status: 400 })
        }
        if (!session_token || typeof session_token !== 'string') {
          return NextResponse.json({ status: 'FAIL', message: 'session_token is required' }, { status: 400 })
        }
        if (!trans_session_id || !TRANS_SESSION_RE.test(String(trans_session_id))) {
          return NextResponse.json({ status: 'FAIL', message: 'trans_session_id is required' }, { status: 400 })
        }

        const result = await confirmTransaction(username, session_token, String(trans_session_id), {
          confirmation_code: typeof confirmation_code === 'string' ? confirmation_code : undefined,
          confirmation_pin: typeof confirmation_pin === 'string' ? confirmation_pin : undefined,
        })
        return NextResponse.json(result)
      }

      case 'requestConfirmationCode': {
        const { username, session_token, trans_session_id } = body

        if (!username || typeof username !== 'string') {
          return NextResponse.json({ status: 'FAIL', message: 'username is required' }, { status: 400 })
        }
        if (!session_token || typeof session_token !== 'string') {
          return NextResponse.json({ status: 'FAIL', message: 'session_token is required' }, { status: 400 })
        }
        if (!trans_session_id || !TRANS_SESSION_RE.test(String(trans_session_id))) {
          return NextResponse.json({ status: 'FAIL', message: 'trans_session_id is required' }, { status: 400 })
        }

        const result = await requestTransactionConfirmationCode(username, session_token, String(trans_session_id))
        return NextResponse.json(result)
      }

      default:
        return NextResponse.json({ status: 'FAIL', message: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ status: 'FAIL', message: safeErrorMessage(error) }, { status: 500 })
  }
}
