import { NextRequest, NextResponse } from 'next/server'

// Static fallback rates — live rates come via /api/remitone/rates (requires auth)
const FALLBACK_RATES: Record<string, Record<string, number>> = {
  USD: { INR: 83.12, GBP: 0.79, EUR: 0.92, CAD: 1.36, AUD: 1.52, JPY: 149.50, CNY: 7.24, MXN: 17.05, BRL: 4.97 },
  INR: { USD: 0.012, GBP: 0.0095, EUR: 0.011, CAD: 0.016, AUD: 0.018, JPY: 1.80, CNY: 0.087, MXN: 0.205, BRL: 0.060 },
  GBP: { USD: 1.27, INR: 105.23, EUR: 1.17, CAD: 1.72, AUD: 1.93, JPY: 189.50, CNY: 9.19, MXN: 21.65, BRL: 6.31 },
  EUR: { USD: 1.09, INR: 90.35, GBP: 0.86, CAD: 1.47, AUD: 1.65, JPY: 162.00, CNY: 7.86, MXN: 18.52, BRL: 5.40 },
  CAD: { USD: 0.74, INR: 61.24, GBP: 0.58, EUR: 0.68, AUD: 1.12, JPY: 110.00, CNY: 5.33, MXN: 12.56, BRL: 3.66 },
  AUD: { USD: 0.66, INR: 54.68, GBP: 0.52, EUR: 0.61, CAD: 0.89, JPY: 98.36, CNY: 4.76, MXN: 11.23, BRL: 3.27 },
  JPY: { USD: 0.0067, INR: 0.56, GBP: 0.0053, EUR: 0.0062, CAD: 0.0091, AUD: 0.010, CNY: 0.048, MXN: 0.114, BRL: 0.033 },
  CNY: { USD: 0.14, INR: 11.49, GBP: 0.11, EUR: 0.13, CAD: 0.19, AUD: 0.21, JPY: 20.66, MXN: 2.36, BRL: 0.69 },
  MXN: { USD: 0.059, INR: 4.88, GBP: 0.046, EUR: 0.054, CAD: 0.080, AUD: 0.089, JPY: 8.77, CNY: 0.42, BRL: 0.29 },
  BRL: { USD: 0.20, INR: 16.72, GBP: 0.16, EUR: 0.19, CAD: 0.27, AUD: 0.31, JPY: 30.03, CNY: 1.45, MXN: 3.43 },
}

const CURRENCY_RE = /^[A-Z]{3}$/

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const from = searchParams.get('from') || 'USD'
  const to = searchParams.get('to') || 'INR'
  const amount = parseFloat(searchParams.get('amount') || '0')

  if (!CURRENCY_RE.test(from) || !CURRENCY_RE.test(to)) {
    return NextResponse.json({ error: 'Invalid currency code' }, { status: 400 })
  }
  if (!Number.isFinite(amount) || amount < 0) {
    return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
  }

  const rate = FALLBACK_RATES[from]?.[to] ?? 1
  return NextResponse.json({
    rate,
    convertedAmount: amount * rate,
    timestamp: new Date().toISOString(),
    source: 'indicative',
  })
}
