import { NextRequest, NextResponse } from 'next/server'
import { getRates } from '@/lib/remitone/client'
import { safeErrorMessage } from '@/lib/remitone/errors'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const username = searchParams.get('username')
    const session_token = searchParams.get('session_token')
    const destination_country = searchParams.get('destination_country') ?? undefined
    const source_currency = searchParams.get('source_currency') ?? undefined
    const destination_currency = searchParams.get('destination_currency') ?? undefined

    if (!username || !session_token) {
      return NextResponse.json(
        { status: 'FAIL', message: 'username and session_token are required' },
        { status: 400 }
      )
    }

    const result = await getRates(username, session_token, destination_country, source_currency, destination_currency)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ status: 'FAIL', message: safeErrorMessage(error) }, { status: 500 })
  }
}
