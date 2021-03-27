import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { address_formatter } from '../../utils/utils'
import { add_address } from './registrationSlice'
import SearchPostcodes from './../search-postcodes/SearchPostcodes'
import SelectDropdown from './../select-dropdown/SelectDropdown'

import styles from './Registration.module.scss'

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
                date: `Time at address: ${years}, ${months}`
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
        <div className={styles.registration}>
            <p>How long have you lived at your current address?</p>
            <div className={styles.dates}>
                <SelectDropdown placeholder="Select years"
                                on_change={(e) => set_years(e.target.value)}
                                selections={[
                    { value: '0 years', name: '0 years'},
                    { value: '1 year', name: '1 year'},
                    { value: '2 years', name: '2 years'},
                    { value: '3 years', name: '3 years'},
                    { value: '4 years', name: '4 years'},
                    { value: '5+ years', name: '5+ years'},
                    ]}
                    testid="address-years-selector"
                    />

                <SelectDropdown placeholder="Select months"
                                on_change={(e) => set_months(e.target.value)}
                                selections={[
                    { value: '0 months', name: '0 months'},
                    { value: '1 month', name: '1 month'},
                    { value: '2 months', name: '2 months'},
                    { value: '3 months', name: '3 months'},
                    { value: '5 months', name: '5 months'},
                    { value: '6 months', name: '6 months'},
                    { value: '7 months', name: '7 months'},
                    { value: '8 months', name: '8 months'},
                    { value: '9 months', name: '9 months'},
                    { value: '10 months', name: '10 months'},
                    { value: '11 months', name: '11 months'},
                    ]}
                    testid="address-months-selector"
                    />
            </div>

            <p>Postcode search</p>
            <SearchPostcodes set_postcode={set_postcode} postcode={postcode} set_addresses={set_addresses}/>

            { addresses
                ?   <React.Fragment>
                        <p>Address</p>
                        <SelectDropdown placeholder="Select address"
                                    on_change={(e) => {
                                        set_selected_address(e.target.value);
                                        generate_form(e.target.value)
                                    }}
                                    selections={addresses.map((address: string) => {
                                        return { value: address, name: address_formatter(address, 'string')}
                                    })}
                                    testid="address-selector"
                        />
                    </React.Fragment>
                    
                : null
            }

            { addresses && selected_address
                ?   <React.Fragment>
                        <div className={styles.double_chevron}>
                            <img src='images/icons/double-chevron.png'/>
                        </div>
                        
                        <div className={styles.address_form} data-testid="address-form">
                            <p>Address line 1*</p>
                            <input type="text" name="line1" value={line1} placeholder="Line 1" onChange={(e) => set_line1(e.target.value)}/>
                            <p>Address line 2</p>
                            <input type="text" name="line2" value={line2} placeholder="Line 2" onChange={(e) => set_line2(e.target.value)}/>
                            <p>City</p>
                            <input type="text" name="city" value={city} placeholder="City" onChange={(e) => set_city(e.target.value)}/>
                            <p>Postcode</p>
                            <input type="text" name="postcode" value={postcode} placeholder="Postcode" onChange={(e) => set_postcode(e.target.value)}/>
                        </div>
                    </React.Fragment>
                :   null
            }

            { addresses && selected_address
                ?   <div className={styles.address_submit}><button  onClick={on_address_submit} data-testid="address-submit">Add address</button></div>
                :   null
            }
            <p className={styles.error_message}>{error_address}</p>
        </div>
    )
}

export default Registration
