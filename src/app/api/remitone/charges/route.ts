import { NextRequest, NextResponse } from 'next/server'
import { getCharges } from '@/lib/remitone/client'
import { safeErrorMessage } from '@/lib/remitone/errors'

const NUMERIC_ID_RE = /^\d{1,10}$/
const CODE_RE = /^[a-zA-Z0-9_-]{1,20}$/

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const username = searchParams.get('username')
    const session_token = searchParams.get('session_token')
    const destination_country_id = searchParams.get('destination_country_id')
    const payment_method_code = searchParams.get('payment_method_code')
    const service_level_code = searchParams.get('service_level_code')
    const send_amount = searchParams.get('send_amount') ?? undefined
    const receive_amount = searchParams.get('receive_amount') ?? undefined
    const promotion_code = searchParams.get('promotion_code') ?? undefined

    if (!username || !session_token || !destination_country_id || !payment_method_code || !service_level_code) {
      return NextResponse.json(
        { status: 'FAIL', message: 'username, session_token, destination_country_id, payment_method_code, service_level_code are required' },
        { status: 400 }
      )
    }

    if (!NUMERIC_ID_RE.test(destination_country_id)) {
      return NextResponse.json({ status: 'FAIL', message: 'Invalid destination_country_id' }, { status: 400 })
    }
    if (!CODE_RE.test(payment_method_code) || !CODE_RE.test(service_level_code)) {
      return NextResponse.json({ status: 'FAIL', message: 'Invalid payment_method_code or service_level_code' }, { status: 400 })
    }
    if (send_amount && !/^\d{1,10}(\.\d{1,4})?$/.test(send_amount)) {
      return NextResponse.json({ status: 'FAIL', message: 'Invalid send_amount' }, { status: 400 })
    }
    if (receive_amount && !/^\d{1,10}(\.\d{1,4})?$/.test(receive_amount)) {
      return NextResponse.json({ status: 'FAIL', message: 'Invalid receive_amount' }, { status: 400 })
    }
    if (promotion_code && !/^[a-zA-Z0-9_-]{1,50}$/.test(promotion_code)) {
      return NextResponse.json({ status: 'FAIL', message: 'Invalid promotion_code' }, { status: 400 })
    }

    const result = await getCharges({
      username,
      session_token,
      destination_country_id,
      payment_method_code,
      service_level_code,
      send_amount,
      receive_amount,
      promotion_code,
    })

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ status: 'FAIL', message: safeErrorMessage(error) }, { status: 500 })
  }
}
