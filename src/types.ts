export interface AddressType {
    line1: string,
    line2: string,
    line3: string,
    line4: string,
    locality: string,
    city: string,
    county: string
}

export interface RegisteredAddressType {
    line1: string,
    line2: string,
    line3: string,
    line4: string,
    locality: string,
    city: string,
    county: string,
    date: string
}

export interface SelectDropdownSelectionsType {
    value: any,
    name: string
}

export interface SelectDropdownPropsType {
    selections: SelectDropdownSelectionsType[],
    on_change: React.ChangeEventHandler<HTMLSelectElement>
    placeholder?: string,
    testid?: string,
}

export interface RegisteredAddressPropsType {
    address: RegisteredAddressType
}