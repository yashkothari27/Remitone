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
        <destination_country_id>001</destination_country_id>
        <destination_country_name>India</destination_country_name>
        <destination_country_iso_code>IN</destination_country_iso_code>
        <source_currency>GBP</source_currency>
        <destination_currency>INR</destination_currency>
        <rate>105.50</rate>
        <payment_method>Bank Transfer</payment_method>
        <payment_method_code>3</payment_method_code>
        <service_level>Immediate</service_level>
        <service_level_code>3</service_level_code>
        <source_country_iso_code>GB</source_country_iso_code>
      </rate>
    </rates>
  </result>
</response>`

const CHARGES_XML = `<?xml version="1.0" encoding="utf-8"?>
<response>
  <status>SUCCESS</status>
  <result>
    <send_amount>100.00</send_amount>
    <receive_amount>10550.00</receive_amount>
    <commission>2.50</commission>
    <total_to_pay>102.50</total_to_pay>
    <source_currency>GBP</source_currency>
    <destination_currency>INR</destination_currency>
    <rate>105.50</rate>
    <remitt_pay>102.50</remitt_pay>
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
    <id>9999</id>
    <ref>TXN-ABC123</ref>
    <status>ENTERED</status>
    <send_amount>100.00</send_amount>
    <receive_amount>10550.00</receive_amount>
    <commission>2.50</commission>
    <total_to_pay>102.50</total_to_pay>
    <source_currency>GBP</source_currency>
    <destination_currency>INR</destination_currency>
    <rate>105.50</rate>
    <created_date>2024-01-15</created_date>
    <beneficiary_fname>John</beneficiary_fname>
    <beneficiary_lname>Doe</beneficiary_lname>
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
    expect(charges.send_amount).toBe('100.00')
    expect(charges.receive_amount).toBe('10550.00')
    expect(charges.commission).toBe('2.50')
    expect(charges.total_to_pay).toBe('102.50')
    expect(charges.source_currency).toBe('GBP')
    expect(charges.destination_currency).toBe('INR')
    expect(charges.rate).toBe('105.50')
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
    expect(tx.id).toBe('9999')
    expect(tx.ref).toBe('TXN-ABC123')
    expect(tx.status).toBe('ENTERED')
    expect(tx.send_amount).toBe('100.00')
    expect(tx.receive_amount).toBe('10550.00')
    expect(tx.commission).toBe('2.50')
    expect(tx.total_to_pay).toBe('102.50')
    expect(tx.source_currency).toBe('GBP')
    expect(tx.destination_currency).toBe('INR')
    expect(tx.beneficiary_fname).toBe('John')
    expect(tx.beneficiary_lname).toBe('Doe')
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
        <id>1</id>
        <ref>TXN-001</ref>
        <status>PROCESSED</status>
        <send_amount>50.00</send_amount>
        <receive_amount>5275.00</receive_amount>
        <commission>1.25</commission>
        <total_to_pay>51.25</total_to_pay>
        <source_currency>GBP</source_currency>
        <destination_currency>INR</destination_currency>
        <rate>105.50</rate>
        <created_date>2024-01-10</created_date>
      </transaction>
      <transaction>
        <id>2</id>
        <ref>TXN-002</ref>
        <status>ENTERED</status>
        <send_amount>100.00</send_amount>
        <receive_amount>10550.00</receive_amount>
        <commission>2.50</commission>
        <total_to_pay>102.50</total_to_pay>
        <source_currency>GBP</source_currency>
        <destination_currency>INR</destination_currency>
        <rate>105.50</rate>
        <created_date>2024-01-15</created_date>
      </transaction>
    </transactions>
  </result>
</response>`

  it('parses a list of transactions', () => {
    const txs = parseTransactions(LIST_XML)
    expect(txs).toHaveLength(2)
    expect(txs[0].id).toBe('1')
    expect(txs[0].status).toBe('PROCESSED')
    expect(txs[1].id).toBe('2')
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
