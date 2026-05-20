import { NextRequest, NextResponse } from 'next/server'
import { getRates } from '@/lib/remitone/client'
import { safeErrorMessage } from '@/lib/remitone/errors'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const username = searchParams.get('username')
    const session_token = searchParams.get('session_token')
    const destination_country_id = searchParams.get('destination_country_id') ?? undefined

    if (!username || !session_token) {
      return NextResponse.json(
        { status: 'FAIL', message: 'username and session_token are required' },
        { status: 400 }
      )
    }

    if (destination_country_id && !/^\d{1,10}$/.test(destination_country_id)) {
      return NextResponse.json({ status: 'FAIL', message: 'Invalid destination_country_id' }, { status: 400 })
    }

    const result = await getRates(username, session_token, destination_country_id)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ status: 'FAIL', message: safeErrorMessage(error) }, { status: 500 })
  }
}
