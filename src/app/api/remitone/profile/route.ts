import { NextRequest, NextResponse } from 'next/server'
import { getRemitter, updateRemitter } from '@/lib/remitone/client'
import { safeErrorMessage } from '@/lib/remitone/errors'

const ALLOWED_UPDATE_FIELDS = [
  'fname','lname','mobile','dob','nationality',
  'address1','address2','city','postcode','state',
  'id1_type','id1_details','id1_expiry',
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const username = searchParams.get('username')
    const session_token = searchParams.get('session_token')
    if (!username || !session_token) {
      return NextResponse.json({ status: 'FAIL', message: 'username and session_token are required' }, { status: 400 })
    }
    const result = await getRemitter(username, session_token)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ status: 'FAIL', message: safeErrorMessage(error) }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, session_token, ...updates } = body
    if (!username || !session_token) {
      return NextResponse.json({ status: 'FAIL', message: 'username and session_token are required' }, { status: 400 })
    }
    const safe: Record<string, string> = {}
    for (const field of ALLOWED_UPDATE_FIELDS) {
      if (typeof updates[field] === 'string' && updates[field].trim()) {
        safe[field] = updates[field].trim().slice(0, 200)
      }
    }
    const result = await updateRemitter(username, session_token, safe)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ status: 'FAIL', message: safeErrorMessage(error) }, { status: 500 })
  }
}
