import crypto from 'crypto'
import { REMITONE_SERVER_PUBLIC_KEY } from './config'
import { RemitOneError } from './errors'

/**
 * Encrypts a JSON payload using the RemitONE server's RSA public key.
 * Uses RSA/ECB/PKCS1Padding as documented in Appendix I of the API spec.
 *
 * Flow: JSON.stringify(data) → RSA encrypt with server public key → base64 encode
 */
export function encryptPayload(data: Record<string, string>): string {
  const plaintext = JSON.stringify(data)
  // Normalise escaped \n sequences that some env parsers leave as literals
  const publicKey = REMITONE_SERVER_PUBLIC_KEY.replace(/\\n/g, '\n')

  if (!publicKey || publicKey.includes('PASTE_YOUR')) {
    // Log config problem server-side; surface only a generic message to callers
    console.error('[RemitONE] RSA public key is not configured')
    throw new RemitOneError('Payment service is not available. Please contact support.', 'CONFIG_ERROR')
  }

  const encrypted = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    Buffer.from(plaintext, 'utf-8')
  )

  return encrypted.toString('base64')
}

/**
 * Builds the encrypted_data string for login:
 * {"seed": "<seed>", "password": "<password>"}
 */
export function buildLoginEncryptedData(seed: string, password: string): string {
  return encryptPayload({ seed, password })
}

/**
 * Builds the encrypted_data string for loginPin:
 * {"seed": "<seed>", "pin": "<pin>"}
 */
export function buildLoginPinEncryptedData(seed: string, pin: string): string {
  return encryptPayload({ seed, pin })
}

/**
 * Builds the encrypted_data string for changePassword:
 * {"seed": "<seed>", "new_password": "<new>", "current_password": "<current>"}
 */
export function buildChangePasswordEncryptedData(
  seed: string,
  newPassword: string,
  currentPassword: string
): string {
  return encryptPayload({ seed, new_password: newPassword, current_password: currentPassword })
}

/**
 * Builds the encrypted_data string for remitterUser/register:
 * {"password": "<password>"} — no seed, user does not exist yet
 */
export function buildRegisterEncryptedData(password: string): string {
  return encryptPayload({ password })
}

/**
 * Builds the encrypted_data string for changePin:
 * {"seed": "<seed>", "new_pin": "<pin>", "current_password": "<pass>"}
 */
export function buildChangePinEncryptedData(
  seed: string,
  newPin: string,
  currentPassword: string
): string {
  return encryptPayload({ seed, new_pin: newPin, current_password: currentPassword })
}
