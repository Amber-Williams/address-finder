export function verify_postcode(postcode: string) {
    postcode = postcode.replace(/\s/g, "");
    var regex = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
    return regex.test(postcode);
}

interface Address {
    line1: string,
    line2: string,
    line3: string,
    line4: string,
    locality: string,
    city: string,
    county: string
}

export function address_formatter(address: string | Address, format_to_type: string) {
    switch(format_to_type) {
        case 'raw':
            if (typeof address === 'object') {
                return `${address.line1}, ${address.line2}, ${address.line3}, ${address.line4}, ${address.locality}, ${address.city}, ${address.county}`
            } 
            else {
                throw new Error("Formatted string cannot be transformed back to raw formatting");
            }
        case 'string':
            if (typeof address === 'object') {
                const raw = `${address.line1}, ${address.line2}, ${address.line3}, ${address.line4}, ${address.locality}, ${address.city}, ${address.county}`
                return raw.split(',')
                      .filter(entry => entry.trim())
                      .join(',')
            } 
            else {
                return address.split(',')
                                .filter(entry => entry.trim())
                                .join(',')
            }
        case 'object':
            if (typeof address === 'string') {
                const addres_list = address.split(',')
                
                if (addres_list.length === 7) {
                    const [line1, line2, line3, line4, locality, city, county] = address.split(',')
                                                                                        .map(entry => entry.trim());
                    return { line1, line2, line3, line4, locality, city, county }
                } else {
                    throw new Error("Formatted string cannot be transformed to object");
                }
            } else {
                throw new Error("Object cannot be transformed to object");
            }
    }
}