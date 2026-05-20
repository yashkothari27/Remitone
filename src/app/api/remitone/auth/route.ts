import { NextRequest, NextResponse } from 'next/server'
import {
  login,
  loginWithPin,
  logout,
  forgotPassword,
  confirmTwoFactor,
} from '@/lib/remitone/client'
import { safeErrorMessage } from '@/lib/remitone/errors'

const USERNAME_RE = /^[a-zA-Z0-9@._+-]{1,100}$/
const DOB_RE = /^\d{4}-\d{2}-\d{2}$/

function validateUsername(u: string): boolean {
  return typeof u === 'string' && USERNAME_RE.test(u)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, username, password, pin, session_token, code, dob } = body

    if (!action || !username) {
      return NextResponse.json({ status: 'FAIL', message: 'action and username are required' }, { status: 400 })
    }

    if (!validateUsername(username)) {
      return NextResponse.json({ status: 'FAIL', message: 'Invalid username format' }, { status: 400 })
    }

    // Reject unknown action values early (prevents probing)
    const ALLOWED_ACTIONS = ['login', 'loginPin', 'confirmTwoFactor', 'logout', 'forgotPassword']
    if (!ALLOWED_ACTIONS.includes(action)) {
      return NextResponse.json({ status: 'FAIL', message: 'Invalid action' }, { status: 400 })
    }

    switch (action) {
      case 'login': {
        if (!password || typeof password !== 'string' || password.length > 200) {
          return NextResponse.json({ status: 'FAIL', message: 'password is required' }, { status: 400 })
        }
        const result = await login(username, password)
        return NextResponse.json(result)
      }

      case 'loginPin': {
        if (!pin || typeof pin !== 'string' || !/^\d{4,8}$/.test(pin)) {
          return NextResponse.json({ status: 'FAIL', message: 'pin must be 4-8 digits' }, { status: 400 })
        }
        const result = await loginWithPin(username, pin)
        return NextResponse.json(result)
      }

      case 'confirmTwoFactor': {
        if (!session_token || typeof session_token !== 'string') {
          return NextResponse.json({ status: 'FAIL', message: 'session_token is required' }, { status: 400 })
        }
        if (!code || typeof code !== 'string' || !/^\d{4,8}$/.test(code)) {
          return NextResponse.json({ status: 'FAIL', message: 'code must be 4-8 digits' }, { status: 400 })
        }
        const result = await confirmTwoFactor(username, session_token, code)
        return NextResponse.json(result)
      }

      case 'logout': {
        if (!session_token || typeof session_token !== 'string') {
          return NextResponse.json({ status: 'FAIL', message: 'session_token is required' }, { status: 400 })
        }
        const result = await logout(username, session_token)
        return NextResponse.json(result)
      }

      case 'forgotPassword': {
        if (!dob || !DOB_RE.test(dob)) {
          return NextResponse.json({ status: 'FAIL', message: 'dob must be YYYY-MM-DD' }, { status: 400 })
        }
        const result = await forgotPassword(username, dob)
        return NextResponse.json(result)
      }
    }
  } catch (error) {
    return NextResponse.json({ status: 'FAIL', message: safeErrorMessage(error) }, { status: 500 })
  }
}
