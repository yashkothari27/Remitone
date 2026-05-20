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
    send_amount: getTagValue(resultXml, 'send_amount'),
    receive_amount: getTagValue(resultXml, 'receive_amount'),
    commission: getTagValue(resultXml, 'commission'),
    total_to_pay: getTagValue(resultXml, 'total_to_pay'),
    source_currency: getTagValue(resultXml, 'source_currency'),
    destination_currency: getTagValue(resultXml, 'destination_currency'),
    rate: getTagValue(resultXml, 'rate'),
    remitt_pay: getTagValue(resultXml, 'remitt_pay'),
    commission_before_promotion: getTagValue(resultXml, 'commission_before_promotion'),
    promotion_names: getTagValue(resultXml, 'promotion_names'),
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
  // createTransaction wraps data in <transaction>; getTransaction uses a flat result
  const txXml = getTagValue(resultXml, 'transaction') || resultXml
  return {
    trans_session_id: getTagValue(txXml, 'trans_session_id'),
    id: getTagValue(txXml, 'id'),
    ref: getTagValue(txXml, 'trans_ref') || getTagValue(txXml, 'ref'),
    status: getTagValue(txXml, 'status'),
    trans_type: getTagValue(txXml, 'trans_type'),
    send_amount: getTagValue(txXml, 'send_amount'),
    receive_amount: getTagValue(txXml, 'receive_amount'),
    commission: getTagValue(txXml, 'commission'),
    total_to_pay: getTagValue(txXml, 'remitter_pay') || getTagValue(txXml, 'total_to_pay'),
    source_currency: getTagValue(txXml, 'send_currency') || getTagValue(txXml, 'source_currency'),
    destination_currency: getTagValue(txXml, 'receive_currency') || getTagValue(txXml, 'destination_currency'),
    rate: getTagValue(txXml, 'rate'),
    created_date: getTagValue(txXml, 'created_date'),
    beneficiary_name: getTagValue(txXml, 'benef_name') || getTagValue(txXml, 'beneficiary_fname'),
    payment_instructions: getTagValue(txXml, 'payment_instructions'),
    tax: getTagValue(txXml, 'tax'),
    purpose: getTagValue(txXml, 'purpose'),
    source_of_income: getTagValue(txXml, 'source_of_income'),
    sms_confirmation_code: getTagValue(resultXml, 'sms_confirmation_code'),
    email_confirmation_code: getTagValue(resultXml, 'email_confirmation_code'),
  }
}

export function parseTransactions(xml: string) {
  const resultXml = getTagValue(xml, 'result')
  const transactionsXml = getTagValue(resultXml, 'transactions')
  const blocks = getAllTagValues(transactionsXml, 'transaction')
  return blocks.map((block) => ({
    id: getTagValue(block, 'id'),
    ref: getTagValue(block, 'ref'),
    status: getTagValue(block, 'status'),
    send_amount: getTagValue(block, 'send_amount'),
    receive_amount: getTagValue(block, 'receive_amount'),
    commission: getTagValue(block, 'commission'),
    total_to_pay: getTagValue(block, 'total_to_pay'),
    source_currency: getTagValue(block, 'source_currency'),
    destination_currency: getTagValue(block, 'destination_currency'),
    rate: getTagValue(block, 'rate'),
    created_date: getTagValue(block, 'created_date'),
    beneficiary_fname: getTagValue(block, 'beneficiary_fname'),
    beneficiary_lname: getTagValue(block, 'beneficiary_lname'),
  }))
}
