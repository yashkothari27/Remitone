import { NextRequest, NextResponse } from 'next/server'
import { register, confirmRegistration } from '@/lib/remitone/client'
import { buildRegisterEncryptedData } from '@/lib/remitone/crypto'
import { REMITONE_SECURITY_HASH } from '@/lib/remitone/config'
import { safeErrorMessage } from '@/lib/remitone/errors'

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{1,63}$/
const PHONE_RE = /^\+?[\d\s\-().]{7,20}$/
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const PASSWORD_RE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,200}$/

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    // ── confirmRegistration ───────────────────────────────────────────────────
    if (action === 'confirm') {
      const { username, email_verification_code, sms_verification_code } = body
      if (!username) {
        return NextResponse.json({ status: 'FAIL', message: 'Username is required' }, { status: 400 })
      }
      const result = await confirmRegistration({ username, email_verification_code, sms_verification_code })
      return NextResponse.json(result)
    }

    // ── register ──────────────────────────────────────────────────────────────
    const {
      username, password,
      fname, lname,
      dob, mobile, source_country_id,
      nationality, address1, address2, city, postcode, state,
      id1_type, id1_details, id1_expiry,
      referral_code, receive_marketing,
    } = body

    // Validate required fields
    if (!username || !EMAIL_RE.test(username)) {
      return NextResponse.json({ status: 'FAIL', message: 'A valid email address is required' }, { status: 400 })
    }
    if (!password || !PASSWORD_RE.test(password)) {
      return NextResponse.json({ status: 'FAIL', message: 'Password must be at least 10 characters with 1 uppercase, 1 lowercase, and 1 number' }, { status: 400 })
    }
    if (!fname?.trim()) return NextResponse.json({ status: 'FAIL', message: 'First name is required' }, { status: 400 })
    if (!lname?.trim()) return NextResponse.json({ status: 'FAIL', message: 'Last name is required' }, { status: 400 })
    if (!mobile || !PHONE_RE.test(mobile)) return NextResponse.json({ status: 'FAIL', message: 'A valid mobile number is required' }, { status: 400 })
    if (!source_country_id) return NextResponse.json({ status: 'FAIL', message: 'Country is required' }, { status: 400 })
    if (!dob || !DATE_RE.test(dob)) return NextResponse.json({ status: 'FAIL', message: 'Date of birth is required (YYYY-MM-DD)' }, { status: 400 })

    // Encrypt only the password (no seed for new registrations)
    const encrypted_data = buildRegisterEncryptedData(password)

    const result = await register({
      fname: fname.trim(),
      lname: lname.trim(),
      username_type: 'email',
      email: username,
      encrypted_data,
      source_country_id: String(source_country_id),
      mobile,
      dob,
      toc: 'true',
      registration_type: 'quickregistered',
      ...(nationality ? { nationality: String(nationality) } : {}),
      ...(address1 ? { address1: String(address1).trim() } : {}),
      ...(address2 ? { address2: String(address2).trim() } : {}),
      ...(city ? { city: String(city).trim() } : {}),
      ...(postcode ? { postcode: String(postcode).trim() } : {}),
      ...(state ? { state: String(state).trim() } : {}),
      ...(id1_type ? { id1_type: String(id1_type) } : {}),
      ...(id1_details ? { id1_details: String(id1_details) } : {}),
      ...(id1_expiry && DATE_RE.test(id1_expiry) ? { id1_expiry: String(id1_expiry) } : {}),
      ...(referral_code ? { referral_code: String(referral_code).trim() } : {}),
      receive_marketing: receive_marketing === true ? 't' : 'f',
      ...(REMITONE_SECURITY_HASH ? { security_hash: REMITONE_SECURITY_HASH } : {}),
    })

    return NextResponse.json({ ...result, username })
  } catch (error) {
    return NextResponse.json({ status: 'FAIL', message: safeErrorMessage(error) }, { status: 500 })
  }
}
