import { describe, it, expect } from 'vitest'
import {
  parseStatus,
  parseMessage,
  parseField,
  parseResult,
  parseValidationErrors,
  parseCountries,
  parseRates,
  parseCharges,
  parseBeneficiaries,
  parseTransaction,
  parseTransactions,
} from '../xml-parser'

const SUCCESS_XML = `<?xml version="1.0" encoding="utf-8"?>
<response>
  <status>SUCCESS</status>
  <result>
    <seed>ABC123XYZ</seed>
  </result>
</response>`

const FAIL_XML = `<?xml version="1.0" encoding="utf-8"?>
<response>
  <status>FAIL</status>
  <message>Invalid credentials</message>
</response>`

const VALIDATION_FAIL_XML = `<?xml version="1.0" encoding="utf-8"?>
<response>
  <status>FAIL</status>
  <message>VALIDATION FAILED</message>
  <result>
    <errors>
      <error>
        <field>fname</field>
        <message>First name is required</message>
        <message>Must be at least 2 characters</message>
      </error>
      <error>
        <field>country_id</field>
        <message>Invalid country</message>
      </error>
    </errors>
  </result>
</response>`

const COUNTRIES_XML = `<?xml version="1.0" encoding="utf-8"?>
<response>
  <status>SUCCESS</status>
  <result>
    <countries>
      <country>
        <id>001</id>
        <name>United Kingdom</name>
        <iso_code>UK</iso_code>
      </country>
      <country>
        <id>002</id>
        <name>United States</name>
        <iso_code>US</iso_code>
      </country>
    </countries>
  </result>
</response>`

const RATES_XML = `<?xml version="1.0" encoding="utf-8"?>
<response>
  <status>SUCCESS</status>
  <result>
    <rates>
      <rate>
        <destination_country>India</destination_country>
        <destination_country_iso_code>IN</destination_country_iso_code>
        <source_currency>GBP</source_currency>
        <destination_currency>INR</destination_currency>
        <account>105.50</account>
        <cash_collection>104.80</cash_collection>
        <card>104.00</card>
        <home_delivery>103.50</home_delivery>
        <mobile_transfer>105.20</mobile_transfer>
        <payment_method_code>3</payment_method_code>
        <service_level_code>3</service_level_code>
      </rate>
    </rates>
  </result>
</response>`

const CHARGES_XML = `<?xml version="1.0" encoding="utf-8"?>
<response>
  <status>SUCCESS</status>
  <result>
    <source_country_iso_code>GB</source_country_iso_code>
    <source_currency>GBP</source_currency>
    <source_amount>100.00</source_amount>
    <rate>105.50</rate>
    <destination_country_iso_code>IN</destination_country_iso_code>
    <destination_currency>INR</destination_currency>
    <destination_amount>10550.00</destination_amount>
    <commission>2.50</commission>
    <agent_fee>0.00</agent_fee>
    <hq_fee>0.50</hq_fee>
    <total_charges>3.00</total_charges>
    <tax>0.40</tax>
    <remitt_pay>102.50</remitt_pay>
    <commission_before_promotion>2.50</commission_before_promotion>
  </result>
</response>`

const BENEFICIARIES_XML = `<?xml version="1.0" encoding="utf-8"?>
<response>
  <status>SUCCESS</status>
  <result>
    <beneficiaries>
      <beneficiary>
        <id>42</id>
        <fname>John</fname>
        <lname>Doe</lname>
        <email>john@example.com</email>
        <city>Mumbai</city>
        <country_id>001</country_id>
        <country_name>India</country_name>
        <country_iso_code>IN</country_iso_code>
      </beneficiary>
    </beneficiaries>
  </result>
</response>`

const TRANSACTION_XML = `<?xml version="1.0" encoding="utf-8"?>
<response>
  <status>SUCCESS</status>
  <result>
    <transaction>
      <trans_ref>TXN-ABC123</trans_ref>
      <status>ENTERED</status>
      <trans_type>Account</trans_type>
      <send_currency>GBP</send_currency>
      <send_amount>100.00</send_amount>
      <receive_currency>INR</receive_currency>
      <receive_amount>10550.00</receive_amount>
      <commission>2.50</commission>
      <fees>0</fees>
      <tax>0</tax>
      <remitter_pay>102.50</remitter_pay>
      <rate>105.50</rate>
      <creation_date>2024-01-15</creation_date>
      <benef_name>John Doe</benef_name>
    </transaction>
    <sms_confirmation_code>true</sms_confirmation_code>
    <email_confirmation_code>false</email_confirmation_code>
  </result>
</response>`

// ─── parseStatus ─────────────────────────────────────────────────────────────

describe('parseStatus', () => {
  it('returns SUCCESS for success XML', () => {
    expect(parseStatus(SUCCESS_XML)).toBe('SUCCESS')
  })

  it('returns FAIL for failure XML', () => {
    expect(parseStatus(FAIL_XML)).toBe('FAIL')
  })

  it('returns FAIL for empty string', () => {
    expect(parseStatus('')).toBe('FAIL')
  })

  it('returns FAIL for malformed XML', () => {
    expect(parseStatus('<response><status>INVALID</status></response>')).toBe('FAIL')
  })
})

// ─── parseMessage ────────────────────────────────────────────────────────────

describe('parseMessage', () => {
  it('extracts the error message', () => {
    expect(parseMessage(FAIL_XML)).toBe('Invalid credentials')
  })

  it('returns empty string when no message tag', () => {
    expect(parseMessage(SUCCESS_XML)).toBe('')
  })
})

// ─── parseField / parseResult ─────────────────────────────────────────────────

describe('parseField', () => {
  it('extracts a field value', () => {
    const resultXml = parseResult(SUCCESS_XML)
    expect(parseField(resultXml, 'seed')).toBe('ABC123XYZ')
  })

  it('returns empty string for missing field', () => {
    expect(parseField(SUCCESS_XML, 'nonexistent')).toBe('')
  })
})

// ─── parseValidationErrors ───────────────────────────────────────────────────

describe('parseValidationErrors', () => {
  it('parses multiple validation errors with multiple messages', () => {
    const errors = parseValidationErrors(VALIDATION_FAIL_XML)
    expect(errors).toHaveLength(2)
    expect(errors[0].field).toBe('fname')
    expect(errors[0].messages).toHaveLength(2)
    expect(errors[0].messages[0]).toBe('First name is required')
    expect(errors[0].messages[1]).toBe('Must be at least 2 characters')
    expect(errors[1].field).toBe('country_id')
    expect(errors[1].messages[0]).toBe('Invalid country')
  })

  it('returns empty array on success XML', () => {
    expect(parseValidationErrors(SUCCESS_XML)).toHaveLength(0)
  })
})

// ─── parseCountries ──────────────────────────────────────────────────────────

describe('parseCountries', () => {
  it('parses multiple countries correctly', () => {
    const countries = parseCountries(COUNTRIES_XML)
    expect(countries).toHaveLength(2)
    expect(countries[0]).toEqual({ id: '001', name: 'United Kingdom', iso_code: 'UK' })
    expect(countries[1]).toEqual({ id: '002', name: 'United States', iso_code: 'US' })
  })

  it('returns empty array when no countries', () => {
    const xml = `<response><status>SUCCESS</status><result><countries></countries></result></response>`
    expect(parseCountries(xml)).toHaveLength(0)
  })
})

// ─── parseRates ──────────────────────────────────────────────────────────────

describe('parseRates', () => {
  it('parses rate entries correctly', () => {
    const rates = parseRates(RATES_XML)
    expect(rates).toHaveLength(1)
    expect(rates[0].source_currency).toBe('GBP')
    expect(rates[0].destination_currency).toBe('INR')
    expect(rates[0].rate_account).toBe('105.50')
    expect(rates[0].rate_cash_collection).toBe('104.80')
    expect(rates[0].rate).toBe('105.50')
    expect(rates[0].payment_method_code).toBe('3')
    expect(rates[0].service_level_code).toBe('3')
    expect(rates[0].destination_country_iso_code).toBe('IN')
  })

  it('returns empty array when no rates', () => {
    const xml = `<response><status>SUCCESS</status><result><rates></rates></result></response>`
    expect(parseRates(xml)).toHaveLength(0)
  })
})

// ─── parseCharges ────────────────────────────────────────────────────────────

describe('parseCharges', () => {
  it('parses all charge fields', () => {
    const charges = parseCharges(CHARGES_XML)
    expect(charges.source_currency).toBe('GBP')
    expect(charges.source_amount).toBe('100.00')
    expect(charges.destination_currency).toBe('INR')
    expect(charges.destination_amount).toBe('10550.00')
    expect(charges.commission).toBe('2.50')
    expect(charges.rate).toBe('105.50')
    expect(charges.remitt_pay).toBe('102.50')
    expect(charges.tax).toBe('0.40')
    expect(charges.source_country_iso_code).toBe('GB')
    expect(charges.destination_country_iso_code).toBe('IN')
  })
})

// ─── parseBeneficiaries ──────────────────────────────────────────────────────

describe('parseBeneficiaries', () => {
  it('parses beneficiary list correctly', () => {
    const beneficiaries = parseBeneficiaries(BENEFICIARIES_XML)
    expect(beneficiaries).toHaveLength(1)
    expect(beneficiaries[0].id).toBe('42')
    expect(beneficiaries[0].fname).toBe('John')
    expect(beneficiaries[0].lname).toBe('Doe')
    expect(beneficiaries[0].country_iso_code).toBe('IN')
  })

  it('returns empty array when no beneficiaries', () => {
    const xml = `<response><status>SUCCESS</status><result><beneficiaries></beneficiaries></result></response>`
    expect(parseBeneficiaries(xml)).toHaveLength(0)
  })
})

// ─── parseTransaction ────────────────────────────────────────────────────────

describe('parseTransaction', () => {
  it('parses all transaction fields', () => {
    const tx = parseTransaction(TRANSACTION_XML)
    expect(tx.trans_ref).toBe('TXN-ABC123')
    expect(tx.status).toBe('ENTERED')
    expect(tx.trans_type).toBe('Account')
    expect(tx.send_currency).toBe('GBP')
    expect(tx.send_amount).toBe('100.00')
    expect(tx.receive_currency).toBe('INR')
    expect(tx.receive_amount).toBe('10550.00')
    expect(tx.commission).toBe('2.50')
    expect(tx.remitter_pay).toBe('102.50')
    expect(tx.rate).toBe('105.50')
    expect(tx.creation_date).toBe('2024-01-15')
    expect(tx.benef_name).toBe('John Doe')
    expect(tx.sms_confirmation_code).toBe('true')
    expect(tx.email_confirmation_code).toBe('false')
  })
})

// ─── parseTransactions (list) ────────────────────────────────────────────────

describe('parseTransactions', () => {
  const LIST_XML = `<?xml version="1.0" encoding="utf-8"?>
<response>
  <status>SUCCESS</status>
  <result>
    <transactions>
      <transaction>
        <trans_ref>RA001</trans_ref>
        <trans_type>Account</trans_type>
        <status>HQ_OK</status>
        <creation_date>2024-01-10</creation_date>
        <originating_country>GB</originating_country>
        <destination_country>India</destination_country>
        <source_currency>GBP</source_currency>
        <source_amount>50.00</source_amount>
        <dest_currency>INR</dest_currency>
        <dest_amount>5275.00</dest_amount>
        <payment_method>1</payment_method>
        <benef_id>42</benef_id>
        <benef_name>John Doe</benef_name>
      </transaction>
      <transaction>
        <trans_ref>RA002</trans_ref>
        <trans_type>Account</trans_type>
        <status>ENTERED</status>
        <creation_date>2024-01-15</creation_date>
        <originating_country>GB</originating_country>
        <destination_country>India</destination_country>
        <source_currency>GBP</source_currency>
        <source_amount>100.00</source_amount>
        <dest_currency>INR</dest_currency>
        <dest_amount>10550.00</dest_amount>
        <payment_method>1</payment_method>
        <benef_id>42</benef_id>
        <benef_name>Jane Smith</benef_name>
      </transaction>
    </transactions>
  </result>
</response>`

  it('parses a list of transactions', () => {
    const txs = parseTransactions(LIST_XML)
    expect(txs).toHaveLength(2)
    expect(txs[0].ref).toBe('RA001')
    expect(txs[0].status).toBe('HQ_OK')
    expect(txs[0].source_amount).toBe('50.00')
    expect(txs[0].destination_currency).toBe('INR')
    expect(txs[0].destination_amount).toBe('5275.00')
    expect(txs[0].benef_name).toBe('John Doe')
    expect(txs[1].ref).toBe('RA002')
    expect(txs[1].status).toBe('ENTERED')
  })
})

// ─── XSS / Injection resistance ──────────────────────────────────────────────

describe('XML parser injection resistance', () => {
  it('does not execute script content in tag values', () => {
    const xml = `<response><status>SUCCESS</status><result><seed><script>alert(1)</script></seed></result></response>`
    const result = parseResult(xml)
    // parseField returns the raw string — no HTML execution in Node context
    const seed = parseField(result, 'seed')
    expect(seed).toContain('script')
    // No throw, no side effect — safe in server context
  })

  it('handles CDATA-like content without breaking', () => {
    const xml = `<response><status>SUCCESS</status><result><seed>abc&amp;def</seed></result></response>`
    expect(() => parseField(parseResult(xml), 'seed')).not.toThrow()
  })

  it('handles deeply nested malformed XML gracefully', () => {
    const xml = `<response><status>FAIL</status><message>err</message>`
    expect(parseStatus(xml)).toBe('FAIL')
    expect(parseMessage(xml)).toBe('err')
  })
})
