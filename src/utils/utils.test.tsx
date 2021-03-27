import { verify_postcode, address_formatter } from './utils'

test('Postcode verification works', () => {
    // valid postcodes
    expect(verify_postcode('se172ny')).toBe(true)
    expect(verify_postcode('se17 2ny')).toBe(true)
    expect(verify_postcode('SE17 2NY')).toBe(true)
    expect(verify_postcode('SE172NY')).toBe(true)

     // invalid postcodes
    expect(verify_postcode('00000')).toBe(false)
    expect(verify_postcode('asdfas')).toBe(false)
})

test('address_formatter: formats raw string to easy to read string', () => {
    const result = address_formatter('10 Watkin Terrace, , , , , Northampton, Northamptonshire', 'string')
    const expected = '10 Watkin Terrace, Northampton, Northamptonshire'
    expect(result).toBe(expected)
})

test('address_formatter: formats raw string to easy to object', () => {
    const result = address_formatter('10 Watkin Terrace, , , , , Northampton, Northamptonshire', 'object')
    const expected = {
        line1: '10 Watkin Terrace',
        line2: '',
        line3: '',
        line4: '',
        locality: '',
        city: 'Northampton',
        county: 'Northamptonshire'
    }
    expect(result).toStrictEqual(expected)
})

test('address_formatter: formats object to easy to easy to read string', () => {
    const result = address_formatter({
        line1: '10 Watkin Terrace',
        line2: '',
        line3: '',
        line4: '',
        locality: '',
        city: 'Northampton',
        county: 'Northamptonshire'
    }, 'string')
    
    const expected = '10 Watkin Terrace, Northampton, Northamptonshire'
    expect(result).toStrictEqual(expected)
})