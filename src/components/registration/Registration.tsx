import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { address_formatter } from '../../utils/utils'
import { add_address } from './registrationSlice'
import SearchPostcodes from './../search-postcodes/SearchPostcodes'
import SelectDropdown from './../select-dropdown/SelectDropdown'

import './Registration.module.scss'

const Registration = () => {
    const dispatch = useDispatch()

    const [years, set_years] = useState<string | null>(null)
    const [months, set_months] = useState<string | null>(null)

    const [postcode, set_postcode] = useState<string>('')
    const [addresses, set_addresses] = useState<any>(null)
    const [selected_address, set_selected_address] = useState<string | null>(null)

    const [line1, set_line1] = useState<string>('')
    const [line2, set_line2] = useState<string>('')
    const [line3, set_line3] = useState<string>('')
    const [line4, set_line4] = useState<string>('')
    const [locality, set_locality] = useState<string>('')
    const [city, set_city] = useState<string>('')
    const [county, set_county] = useState<string>('')

    const [error_address, set_error_address] = useState<string | null>(null)

    function on_address_submit() {
        if (!selected_address) {
            set_error_address('Please select address from dropdown.')
            return;
        }
        if (!vaildate_form()) {
            set_error_address('Please complete all required fields.')
            return;
        }
        if (!years) {
            set_error_address('Please select years at address.')
            return;
        }
        if (!months) {
            set_error_address('Please select month at address.')
            return;
        }
        dispatch(add_address(
            { 
                line1, 
                line2, 
                line3, 
                line4, 
                locality, 
                city, 
                county, 
                date: `Time at address: ${years} year, ${months} months`
            })
        );
        set_addresses(null)
        set_selected_address(null)
    }

    function vaildate_form() {
        if (line1.length > 0 && city.length > 0 && postcode.length > 0)
            return true;
        else
            return false;
    }

    function generate_form(address: string) {
        if (address) {
            const address_object = address_formatter(address, 'object')
            if (typeof address_object === 'object') {
                set_line1(address_object.line1)
                set_line2(address_object.line2)
                set_line3(address_object.line3)
                set_line4(address_object.line4)
                set_locality(address_object.locality)
                set_city(address_object.city)
                set_county(address_object.county)
            }
        }
    }

    return (
        <div>
            <SelectDropdown placeholder="Select years"
                            on_change={(e) => set_years(e.target.value)}
                            selections={[
                { value: '0', name: '0'},
                { value: '1', name: '1'},
                { value: '2', name: '2'},
                { value: '3', name: '3'},
                { value: '4', name: '4'},
                { value: '5+', name: '5+'},
                ]}
                />

            <SelectDropdown placeholder="Select months"
                            on_change={(e) => set_months(e.target.value)}
                            selections={[
                { value: '0', name: '0'},
                { value: '1', name: '1'},
                { value: '2', name: '2'},
                { value: '3', name: '3'},
                { value: '5', name: '5'},
                { value: '6', name: '6'},
                { value: '7', name: '7'},
                { value: '8', name: '8'},
                { value: '9', name: '9'},
                { value: '10', name: '10'},
                { value: '11', name: '11'},
                ]}
                />
            <SearchPostcodes set_postcode={set_postcode} postcode={postcode} set_addresses={set_addresses}/>

            { addresses
                ? <SelectDropdown placeholder="Select address"
                                on_change={(e) => {
                                    set_selected_address(e.target.value);
                                    generate_form(e.target.value)
                                }}
                                selections={addresses.map((address: string) => {
                                    return { value: address, name: address_formatter(address, 'string')}
                                })}
                    />
                : null
            }

            { addresses && selected_address
                ?   <div>
                        <input type="text" name="line1" value={line1} placeholder="Line 1" onChange={(e) => set_line1(e.target.value)}/>
                        <input type="text" name="line2" value={line2} placeholder="Line 2" onChange={(e) => set_line2(e.target.value)}/>
                        <input type="text" name="line3" value={line3} placeholder="Line 3" onChange={(e) => set_line3(e.target.value)}/>
                        <input type="text" name="line4" value={line4} placeholder="Line 4" onChange={(e) => set_line4(e.target.value)}/>
                        <input type="text" name="locality" value={locality} placeholder="Locality" onChange={(e) => set_locality(e.target.value)}/>
                        <input type="text" name="city" value={city} placeholder="City" onChange={(e) => set_city(e.target.value)}/>
                        <input type="text" name="county" value={county} placeholder="County" onChange={(e) => set_county(e.target.value)}/>
                        <input type="text" name="county" value={postcode} placeholder="County" onChange={(e) => set_postcode(e.target.value)}/>
                    </div>
                :   null
            }

            { addresses && selected_address
                ?   <button onClick={on_address_submit}>submit address</button>
                :   null
            }
            {error_address}
        </div>
    )
}

export default Registration
