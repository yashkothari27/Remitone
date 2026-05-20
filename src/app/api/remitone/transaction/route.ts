import { NextRequest, NextResponse } from 'next/server'
import {
  createTransaction,
  confirmTransaction,
  listTransactions,
  getTransaction,
} from '@/lib/remitone/client'
import { safeErrorMessage } from '@/lib/remitone/errors'
import type { CreateTransactionInput } from '@/lib/remitone/types'

// Explicit allowlist — only these fields are forwarded on createTransaction
const TX_ALLOWED_FIELDS: Array<keyof CreateTransactionInput> = [
  'beneficiary_id',
  'amount',
  'amount_type',
  'source_currency',
  'destination_currency',
  'payment_method',
  'service_level',
  'trans_type',
  'destination_country',
  'card_number',
  'purpose',
  'source_of_income',
  'discount_code',
  'account_item_number',
]

const NUMERIC_RE = /^\d{1,10}(\.\d{1,4})?$/
const CODE_RE = /^[a-zA-Z0-9_-]{1,20}$/
const NUMERIC_ID_RE = /^\d{1,10}$/
const TRANS_SESSION_RE = /^[a-zA-Z0-9]{1,50}$/

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const username = searchParams.get('username')
    const session_token = searchParams.get('session_token')
    const transaction_id = searchParams.get('transaction_id')
    const page = searchParams.get('page') ?? undefined
    const per_page = searchParams.get('per_page') ?? undefined

    if (!username || !session_token) {
      return NextResponse.json(
        { status: 'FAIL', message: 'username and session_token are required' },
        { status: 400 }
      )
    }

    if (transaction_id) {
      if (!NUMERIC_ID_RE.test(transaction_id)) {
        return NextResponse.json({ status: 'FAIL', message: 'Invalid transaction_id' }, { status: 400 })
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
        if (!body.beneficiary_id || !NUMERIC_ID_RE.test(String(body.beneficiary_id))) {
          return NextResponse.json({ status: 'FAIL', message: 'beneficiary_id is required and must be numeric' }, { status: 400 })
        }
        if (!body.payment_method || !CODE_RE.test(body.payment_method)) {
          return NextResponse.json({ status: 'FAIL', message: 'payment_method is required' }, { status: 400 })
        }
        if (!body.service_level || !CODE_RE.test(body.service_level)) {
          return NextResponse.json({ status: 'FAIL', message: 'service_level is required' }, { status: 400 })
        }
        if (!body.amount || !NUMERIC_RE.test(body.amount)) {
          return NextResponse.json({ status: 'FAIL', message: 'amount is required' }, { status: 400 })
        }

        // Build safe payload from allowlist only
        const safeInput: CreateTransactionInput = { username, session_token, beneficiary_id: '', payment_method: '', service_level: '' }
        for (const field of TX_ALLOWED_FIELDS) {
          const val = body[field]
          if (typeof val === 'string' && val.length > 0) {
            (safeInput as unknown as Record<string, string>)[field] = val.slice(0, 200)
          }
        }

        const result = await createTransaction(safeInput)
        return NextResponse.json(result)
      }

      case 'confirm': {
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

        const result = await confirmTransaction(username, session_token, String(trans_session_id))
        return NextResponse.json(result)
      }

      default:
        return NextResponse.json({ status: 'FAIL', message: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ status: 'FAIL', message: safeErrorMessage(error) }, { status: 500 })
  }
}
