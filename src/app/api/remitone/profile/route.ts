import { NextRequest, NextResponse } from 'next/server'
import { getRemitter, updateRemitter } from '@/lib/remitone/client'
import { safeErrorMessage } from '@/lib/remitone/errors'

// Per spec: email, name and country cannot be changed via updateProfile
const ALLOWED_UPDATE_FIELDS = [
  'local_name','mname','nationality','gender',
  'building_no','address1','address2','city','state','postcode',
  'email','telephone','mobile','fax','dob',
  'place_of_birth','country_of_birth',
  'fathers_name','mothers_name','national_id_number',
  'id1_type','id1_details','id1_issued_by','id1_issue_place','id1_start','id1_expiry',
  'id2_type','id2_details','id2_issued_by','id2_issue_place','id2_start','id2_expiry',
  'id3_type','id3_details','id3_issued_by','id3_issue_place','id3_start','id3_expiry',
  'id4_type','id4_details','id4_issued_by','id4_issue_place','id4_start','id4_expiry',
  'taxpayer_reg','account_number','sort_code',
  'purpose','source_of_income','sector','employer','business_address',
  'annual_income','annual_remittance',
  'hear_about_us','hear_about_us_other',
  'language','custom1','custom2','custom3',
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
        safe[field] = updates[field].trim().slice(0, 500)
      }
    }
    const result = await updateRemitter(username, session_token, safe)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ status: 'FAIL', message: safeErrorMessage(error) }, { status: 500 })
  }
}
