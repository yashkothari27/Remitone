export const REMITONE_BASE_URL =
  process.env.REMITONE_BASE_URL ?? 'https://test.remit.by/kogopaytest/remitterws/'

export const REMITONE_SERVER_PUBLIC_KEY =
  process.env.REMITONE_SERVER_PUBLIC_KEY ?? ''

export const REMITONE_SECURITY_HASH =
  process.env.REMITONE_SECURITY_HASH ?? ''

export function buildApiUrl(group: string, method: string): string {
  return `${REMITONE_BASE_URL}${group}/${method}`
}
