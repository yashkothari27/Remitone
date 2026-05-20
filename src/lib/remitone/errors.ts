export class RemitOneError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly internal?: string
  ) {
    super(message)
    this.name = 'RemitOneError'
  }
}

const SAFE_MESSAGES: Record<string, string> = {
  ECONNREFUSED: 'Unable to reach the payment service. Please try again.',
  ENOTFOUND: 'Unable to reach the payment service. Please try again.',
  ETIMEDOUT: 'The payment service request timed out. Please try again.',
  'fetch failed': 'Unable to reach the payment service. Please try again.',
}

/**
 * Returns a client-safe error message, never leaking internal details.
 * Logs the real error server-side.
 */
export function safeErrorMessage(error: unknown): string {
  if (error instanceof RemitOneError) return error.message

  if (error instanceof Error) {
    const msg = error.message
    // Return safe mapped message or generic fallback — never the raw message
    for (const [key, safe] of Object.entries(SAFE_MESSAGES)) {
      if (msg.includes(key)) return safe
    }
    // Log internally but never surface raw message to caller
    console.error('[RemitONE] Internal error:', msg)
    return 'An unexpected error occurred. Please try again.'
  }

  return 'An unexpected error occurred. Please try again.'
}
