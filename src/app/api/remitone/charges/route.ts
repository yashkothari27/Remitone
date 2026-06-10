import { NextRequest, NextResponse } from 'next/server'
import { getCharges } from '@/lib/remitone/client'
import { safeErrorMessage } from '@/lib/remitone/errors'

const CODE_RE = /^[a-zA-Z0-9_-]{1,20}$/
const NUMERIC_RE = /^\d{1,10}(\.\d{1,4})?$/

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const username = searchParams.get('username')
    const session_token = searchParams.get('session_token')
    const destination_country = searchParams.get('destination_country')
    const trans_type = searchParams.get('trans_type')
    const payment_method = searchParams.get('payment_method')
    const service_level = searchParams.get('service_level')
    const amount_type = searchParams.get('amount_type') ?? 'SOURCE'
    const amount_to_send = searchParams.get('amount_to_send') ?? '0'
    const source_currency = searchParams.get('source_currency') ?? undefined
    const destination_currency = searchParams.get('destination_currency') ?? undefined
    const promotion_code = searchParams.get('promotion_code') ?? undefined
    const loyalty_points = searchParams.get('loyalty_points') ?? undefined

    if (!username || !session_token || !destination_country || !trans_type || !payment_method || !service_level) {
      return NextResponse.json(
        { status: 'FAIL', message: 'username, session_token, destination_country, trans_type, payment_method, service_level are required' },
        { status: 400 }
      )
    }

    if (!CODE_RE.test(payment_method) || !CODE_RE.test(service_level)) {
      return NextResponse.json({ status: 'FAIL', message: 'Invalid payment_method or service_level' }, { status: 400 })
    }
    if (!['SOURCE', 'DESTINATION', 'TOTAL'].includes(amount_type)) {
      return NextResponse.json({ status: 'FAIL', message: 'amount_type must be SOURCE, DESTINATION, or TOTAL' }, { status: 400 })
    }
    if (!NUMERIC_RE.test(amount_to_send)) {
      return NextResponse.json({ status: 'FAIL', message: 'Invalid amount_to_send' }, { status: 400 })
    }
    if (promotion_code && !/^[a-zA-Z0-9_-]{1,50}$/.test(promotion_code)) {
      return NextResponse.json({ status: 'FAIL', message: 'Invalid promotion_code' }, { status: 400 })
    }

    const result = await getCharges({
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
      loyalty_points,
    })

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ status: 'FAIL', message: safeErrorMessage(error) }, { status: 500 })
  }
}
