export interface ParsedXml {
  [key: string]: string | ParsedXml | ParsedXml[] | undefined
}

function getTagValue(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'))
  return match ? match[1].trim() : ''
}

function getAllTagValues(xml: string, tag: string): string[] {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'gi')
  const results: string[] = []
  let m
  while ((m = re.exec(xml)) !== null) {
    results.push(m[1].trim())
  }
  return results
}

export function parseStatus(xml: string): 'SUCCESS' | 'FAIL' {
  return getTagValue(xml, 'status') === 'SUCCESS' ? 'SUCCESS' : 'FAIL'
}

export function parseMessage(xml: string): string {
  return getTagValue(xml, 'message')
}

export function parseResult(xml: string): string {
  return getTagValue(xml, 'result')
}

export function parseField(xml: string, field: string): string {
  return getTagValue(xml, field)
}

export function parseValidationErrors(xml: string) {
  const errorsXml = getTagValue(xml, 'errors')
  const errorBlocks = getAllTagValues(errorsXml, 'error')
  return errorBlocks.map((block) => ({
    field: getTagValue(block, 'field'),
    messages: getAllTagValues(block, 'message'),
  }))
}

export function parseCountries(xml: string) {
  const resultXml = getTagValue(xml, 'result')
  const countriesXml = getTagValue(resultXml, 'countries')
  const countryBlocks = getAllTagValues(countriesXml, 'country')
  return countryBlocks.map((block) => ({
    id: getTagValue(block, 'id'),
    name: getTagValue(block, 'name'),
    iso_code: getTagValue(block, 'iso_code'),
  }))
}

export function parseRates(xml: string) {
  const resultXml = getTagValue(xml, 'result')
  const ratesXml = getTagValue(resultXml, 'rates')
  const blocks = getAllTagValues(ratesXml, 'rate')

  // Actual API response uses per-transfer-type rate fields (account, cash_collection, card…)
  // and destination_country / destination_currency rather than the spec's listed fields.
  return blocks.map((block) => ({
    destination_country_name: getTagValue(block, 'destination_country'),
    destination_country_id: getTagValue(block, 'destination_country_id'),
    destination_country_iso_code: getTagValue(block, 'destination_country_iso_code'),
    source_currency: getTagValue(block, 'source_currency'),
    destination_currency: getTagValue(block, 'destination_currency'),
    // Rates per transfer type
    rate_account: getTagValue(block, 'account'),
    rate_cash_collection: getTagValue(block, 'cash_collection'),
    rate_card: getTagValue(block, 'card'),
    rate_home_delivery: getTagValue(block, 'home_delivery'),
    rate_utility_bill: getTagValue(block, 'utility_bill'),
    rate_mobile_transfer: getTagValue(block, 'mobile_transfer'),
    // Convenience — default rate is the account rate
    rate: getTagValue(block, 'account') || getTagValue(block, 'cash_collection'),
    payment_method: getTagValue(block, 'payment_method'),
    payment_method_code: getTagValue(block, 'payment_method_code'),
    service_level: getTagValue(block, 'service_level'),
    service_level_code: getTagValue(block, 'service_level_code'),
  }))
}

export function parseCharges(xml: string) {
  const resultXml = getTagValue(xml, 'result')
  return {
    source_country_iso_code: getTagValue(resultXml, 'source_country_iso_code'),
    source_currency: getTagValue(resultXml, 'source_currency'),
    source_amount: getTagValue(resultXml, 'source_amount'),
    rate: getTagValue(resultXml, 'rate'),
    destination_country_iso_code: getTagValue(resultXml, 'destination_country_iso_code'),
    destination_currency: getTagValue(resultXml, 'destination_currency'),
    destination_amount: getTagValue(resultXml, 'destination_amount'),
    commission: getTagValue(resultXml, 'commission'),
    agent_fee: getTagValue(resultXml, 'agent_fee'),
    hq_fee: getTagValue(resultXml, 'hq_fee'),
    total_charges: getTagValue(resultXml, 'total_charges'),
    tax: getTagValue(resultXml, 'tax'),
    remitt_pay: getTagValue(resultXml, 'remitt_pay'),
    commission_before_promotion: getTagValue(resultXml, 'commission_before_promotion'),
    promotion_names: getTagValue(resultXml, 'promotion_names'),
    promotion_ids: getTagValue(resultXml, 'promotion_ids'),
    loyalty_points_discount: getTagValue(resultXml, 'loyalty_points_discount'),
    loyalty_points_used: getTagValue(resultXml, 'loyalty_points_used'),
    loyalty_points_monetary_amount: getTagValue(resultXml, 'loyalty_points_monetary_amount'),
  }
}

export function parseBeneficiaries(xml: string) {
  const resultXml = getTagValue(xml, 'result')
  const beneficiariesXml = getTagValue(resultXml, 'beneficiaries')
  const blocks = getAllTagValues(beneficiariesXml, 'beneficiary')
  return blocks.map((block) => ({
    // API may return beneficiary ID as 'id', 'beneficiary_id', or 'remitter_beneficiary_id'
    id: getTagValue(block, 'id') || getTagValue(block, 'beneficiary_id') || getTagValue(block, 'remitter_beneficiary_id'),
    fname: getTagValue(block, 'fname'),
    lname: getTagValue(block, 'lname'),
    mname: getTagValue(block, 'mname'),
    nickname: getTagValue(block, 'nickname'),
    email: getTagValue(block, 'email'),
    mobile: getTagValue(block, 'mobile'),
    telephone: getTagValue(block, 'telephone'),
    address1: getTagValue(block, 'address1'),
    city: getTagValue(block, 'city'),
    country_id: getTagValue(block, 'country_id'),
    country_name: getTagValue(block, 'country_name'),
    country_iso_code: getTagValue(block, 'country_iso_code'),
  }))
}

export function parseTransaction(xml: string) {
  const resultXml = getTagValue(xml, 'result')
  // createTransaction and getTempTransaction wrap data in <transaction>; getTransaction also wraps
  const txXml = getTagValue(resultXml, 'transaction') || resultXml
  return {
    trans_session_id: getTagValue(txXml, 'trans_session_id'),
    trans_ref: getTagValue(txXml, 'trans_ref'),
    status: getTagValue(txXml, 'status'),
    trans_type: getTagValue(txXml, 'trans_type'),
    purpose: getTagValue(txXml, 'purpose'),
    source_of_income: getTagValue(txXml, 'source_of_income'),
    creation_date: getTagValue(txXml, 'creation_date'),
    delivery_date: getTagValue(txXml, 'delivery_date'),
    processed_date: getTagValue(txXml, 'processed_date'),
    payment_gateway_acknowledged: getTagValue(txXml, 'payment_gateway_acknowledged'),
    benef_id: getTagValue(txXml, 'benef_id'),
    benef_name: getTagValue(txXml, 'benef_name'),
    benef_tel: getTagValue(txXml, 'benef_tel'),
    benef_mobile: getTagValue(txXml, 'benef_mobile'),
    benef_email: getTagValue(txXml, 'benef_email'),
    benef_bank_account_number: getTagValue(txXml, 'benef_bank_account_number'),
    benef_bank: getTagValue(txXml, 'benef_bank'),
    benef_bank_swift_code: getTagValue(txXml, 'benef_bank_swift_code'),
    benef_bank_ifsc_code: getTagValue(txXml, 'benef_bank_ifsc_code'),
    benef_bank_iban: getTagValue(txXml, 'benef_bank_iban'),
    benef_address1: getTagValue(txXml, 'benef_address1'),
    benef_city: getTagValue(txXml, 'benef_city'),
    benef_mobiletransfer_number: getTagValue(txXml, 'benef_mobiletransfer_number'),
    collection_point: getTagValue(txXml, 'collection_point'),
    collection_point_id: getTagValue(txXml, 'collection_point_id'),
    send_country: getTagValue(txXml, 'send_country'),
    send_currency: getTagValue(txXml, 'send_currency'),
    send_amount: getTagValue(txXml, 'send_amount'),
    rate: getTagValue(txXml, 'rate'),
    commission: getTagValue(txXml, 'commission'),
    commission_before_promotion: getTagValue(txXml, 'commission_before_promotion'),
    service_level: getTagValue(txXml, 'service_level'),
    fees: getTagValue(txXml, 'fees'),
    tax: getTagValue(txXml, 'tax'),
    remitter_pay: getTagValue(txXml, 'remitter_pay'),
    receive_country: getTagValue(txXml, 'receive_country'),
    receive_currency: getTagValue(txXml, 'receive_currency'),
    receive_amount: getTagValue(txXml, 'receive_amount'),
    payment_method: getTagValue(txXml, 'payment_method'),
    payment_token: getTagValue(txXml, 'payment_token'),
    promotion_names: getTagValue(txXml, 'promotion_names'),
    promotion_ids: getTagValue(txXml, 'promotion_ids'),
    loyalty_points_used: getTagValue(txXml, 'loyalty_points_used'),
    loyalty_points_discount: getTagValue(txXml, 'loyalty_points_discount'),
    bank_sequence: getTagValue(txXml, 'bank_sequence'),
    benef_trans_ref: getTagValue(txXml, 'benef_trans_ref'),
    // Flags from outer result (createTransaction / requestTransactionConfirmationCode)
    sms_confirmation_code: getTagValue(resultXml, 'sms_confirmation_code'),
    email_confirmation_code: getTagValue(resultXml, 'email_confirmation_code'),
  }
}

export function parseTransactions(xml: string) {
  const resultXml = getTagValue(xml, 'result')
  const transactionsXml = getTagValue(resultXml, 'transactions')
  const blocks = getAllTagValues(transactionsXml, 'transaction')
  return blocks.map((block) => ({
    ref: getTagValue(block, 'trans_ref'),
    trans_type: getTagValue(block, 'trans_type'),
    status: getTagValue(block, 'status'),
    created_date: getTagValue(block, 'creation_date'),
    processed_date: getTagValue(block, 'processed_date'),
    originating_country: getTagValue(block, 'originating_country'),
    destination_country: getTagValue(block, 'destination_country'),
    source_currency: getTagValue(block, 'source_currency'),
    source_amount: getTagValue(block, 'source_amount'),
    destination_currency: getTagValue(block, 'dest_currency'),
    destination_amount: getTagValue(block, 'dest_amount'),
    payment_method: getTagValue(block, 'payment_method'),
    benef_id: getTagValue(block, 'benef_id'),
    benef_name: getTagValue(block, 'benef_name'),
    benef_mobile: getTagValue(block, 'benef_mobile'),
    compliance_needed: getTagValue(block, 'compliance_needed'),
    compliance_checked: getTagValue(block, 'compliance_checked'),
  }))
}
