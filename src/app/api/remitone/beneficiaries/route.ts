import { NextRequest, NextResponse } from 'next/server'
import { listBeneficiaries, createBeneficiary } from '@/lib/remitone/client'
import { safeErrorMessage } from '@/lib/remitone/errors'

// Explicit allowlist — only these fields are forwarded to RemitONE
const BENEFICIARY_ALLOWED_FIELDS = new Set([
  'fname', 'lname', 'mname', 'nickname', 'gender', 'local_name',
  'address1', 'address2', 'address3', 'city', 'state', 'postcode',
  'country_id', 'nationality', 'dob', 'email', 'telephone', 'mobile',
  'sms_payout_mobile', 'remitt_benef_relation', 'fathers_name', 'mothers_name',
  'national_id_number', 'id_type', 'id_details', 'id_start', 'id_expiry',
  'id_issued_by', 'id_issue_place', 'id_issue_country',
  'bank_account_number1', 'bank_account_type1', 'bank_account_name1',
  'bank1', 'bank_iban1', 'bank_swift_code1', 'bank_ifsc_code1', 'bank_bsb_code1',
  'bank_routing_transit_number1', 'bank_branch1', 'bank_branch_id1',
  'mobile_transfer_number', 'mobile_transfer_network', 'mobile_transfer_network_id',
  'mobile_transfer_network_credit_type_id', 'mobile_transfer_network_credit_type',
  'collection_point_id', 'home_delivery_notes', 'confirm_scam_warning',
])

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const username = searchParams.get('username')
    const session_token = searchParams.get('session_token')

    if (!username || !session_token) {
      return NextResponse.json(
        { status: 'FAIL', message: 'username and session_token are required' },
        { status: 400 }
      )
    }

    const result = await listBeneficiaries(username, session_token)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ status: 'FAIL', message: safeErrorMessage(error) }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json()

    const username = rawBody.username
    const session_token = rawBody.session_token

    if (!username || typeof username !== 'string') {
      return NextResponse.json({ status: 'FAIL', message: 'username is required' }, { status: 400 })
    }
    if (!session_token || typeof session_token !== 'string') {
      return NextResponse.json({ status: 'FAIL', message: 'session_token is required' }, { status: 400 })
    }
    if (!rawBody.fname || !rawBody.lname || !rawBody.address1 || !rawBody.city || !rawBody.country_id) {
      return NextResponse.json(
        { status: 'FAIL', message: 'fname, lname, address1, city, country_id are required' },
        { status: 400 }
      )
    }

    // Build a clean payload using only allowlisted fields
    const safePayload: Record<string, string> = { username, session_token }
    for (const field of BENEFICIARY_ALLOWED_FIELDS) {
      const val = rawBody[field]
      if (typeof val === 'string' && val.length > 0) {
        safePayload[field] = val.slice(0, 500)
      }
    }

    const result = await createBeneficiary(safePayload as unknown as Parameters<typeof createBeneficiary>[0])
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ status: 'FAIL', message: safeErrorMessage(error) }, { status: 500 })
  }
}
