export interface RemitOneResponse<T = unknown> {
  status: 'SUCCESS' | 'FAIL'
  data?: T
  message?: string
  errors?: ValidationError[]
}

export interface ValidationError {
  field: string
  messages: string[]
}

// Auth
export interface SeedResult {
  seed: string
}

export interface TwoFactorAuth {
  required: boolean
  type: string
  can_resend_code: boolean
  google_2fa_qr_code_url: string
  two_fa_setup_required: boolean
  code_length: number
}

export interface LoginResult {
  session_token: string
  app_pin?: string
  two_factor_authentication?: TwoFactorAuth
}

// Countries
export interface Country {
  id: string
  name: string
  iso_code: string
}

// Rates
export interface Rate {
  destination_country_id: string
  destination_country_name: string
  destination_country_iso_code: string
  source_currency: string
  destination_currency: string
  rate: string
  payment_method: string
  payment_method_code: string
  service_level: string
  service_level_code: string
  source_country_iso_code: string
}

// Charges
export interface Charges {
  send_amount: string
  receive_amount: string
  commission: string
  total_to_pay: string
  source_currency: string
  destination_currency: string
  rate: string
  payment_method_code: string
  service_level_code: string
  source_country_iso_code: string
  destination_country_iso_code: string
  promotion_code?: string
}

// Beneficiary
export interface Beneficiary {
  id: string
  fname: string
  lname: string
  mname?: string
  nickname?: string
  email?: string
  mobile?: string
  telephone?: string
  address1?: string
  city?: string
  country_id: string
  country_name?: string
  country_iso_code?: string
}

export interface CreateBeneficiaryInput {
  username: string
  session_token: string
  fname: string
  lname: string
  mname?: string
  address1: string
  city: string
  country_id: string
  email?: string
  mobile?: string
  telephone?: string
  gender?: 'MALE' | 'FEMALE'
  dob?: string
  bank_account_number1?: string
  bank_account_type1?: string
  bank_account_name1?: string
  bank1?: string
  bank_iban1?: string
  bank_swift_code1?: string
  mobile_transfer_number?: string
  mobile_transfer_network?: string
}

// Transaction
export interface Transaction {
  id: string
  ref: string
  status: string
  send_amount: string
  receive_amount: string
  commission: string
  total_to_pay: string
  source_currency: string
  destination_currency: string
  rate: string
  created_date: string
  beneficiary_fname?: string
  beneficiary_lname?: string
}

export interface CreateTransactionInput {
  username: string
  session_token: string
  trans_type: string
  beneficiary_id: string
  source_currency: string
  destination_currency: string
  amount_type: string           // SOURCE / DESTINATION / TOTAL
  amount: string
  payment_method: string
  service_level: string
  account_item_number?: string
  purpose?: string
  source_of_income?: string
  promotion_code?: string
  loyalty_points?: string
  sms_confirmation?: string     // t / f
  sms_notification?: string     // t / f
  sms_mobile?: string
  sms_benef_confirmation?: string
  sms_benef_mobile?: string
  payment_token?: string
  remitter_wallet_currency?: string
  utility_bill_invoice?: string
  utility_bill_description?: string
  comments_to_beneficiary?: string
}

export interface ConfirmTransactionInput {
  username: string
  session_token: string
  trans_session_id: string
  email_confirmation_code?: string
  sms_confirmation_code?: string
  confirmation_pin?: string
}

export interface CreateRemitterInput {
  // required
  fname: string
  lname: string
  username_type: 'email' | 'mobile'
  email: string
  encrypted_data: string   // RSA({ password }) — no seed for registration
  source_country_id: string
  mobile: string
  dob: string              // YYYY-MM-DD
  toc: 'true'             // must be "true" to accept terms
  // optional
  registration_type?: 'registered' | 'quickregistered' | 'basicregistered'
  nationality?: string
  gender?: string
  building_no?: string
  address1?: string
  address2?: string
  city?: string
  postcode?: string
  state?: string
  telephone?: string
  place_of_birth?: string
  country_of_birth?: string
  id1_type?: string
  id1_details?: string
  id1_expiry?: string      // YYYY-MM-DD
  receive_marketing?: 't' | 'f'
  referral_code?: string
}

export interface ConfirmRegistrationInput {
  username: string
  email_verification_code?: string
  sms_verification_code?: string
}

export interface GetChargesInput {
  username: string
  session_token: string
  destination_country: string   // country name per getDestinationCountries
  trans_type: string            // Account / Cash Collection / Card Transfer / Home Delivery / Mobile Transfer
  payment_method: string        // code per Appendix B
  service_level: string         // code per Appendix C
  amount_type: string           // SOURCE / DESTINATION / TOTAL
  amount_to_send: string
  source_currency?: string
  destination_currency?: string
  sms_confirmation?: string     // t / f
  sms_notification?: string     // t / f
  sms_benef_confirmation?: string
  collection_point_id?: string
  benef_branch_id?: string
  benef_bank?: string
  utility_company?: string
  promotion_code?: string
  loyalty_points?: string
  loyalty_points_monetary_value?: string
  loyalty_points_discount?: string
}
