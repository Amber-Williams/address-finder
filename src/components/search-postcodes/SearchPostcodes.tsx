import React, { useState }from 'react'

import { handle_enter_keydown, verify_postcode } from '../../utils/utils'

interface Props {
    set_postcode: (postcode: string) => void,
    set_addresses: (address: any) => void,
    postcode: string
}

const SearchPostcodes = (props: Props) => {
    const { set_postcode, postcode, set_addresses } = props

    const [error_api_postcode, set_error_api_postcode] = useState<string | null>(null)


    function on_postcode_change(e: React.ChangeEvent<HTMLInputElement>) {
        set_postcode(e.target.value)
        set_error_api_postcode(null)
    }

    function get_addresses() {
        if (!verify_postcode(postcode)) {
            set_addresses(null)
            set_error_api_postcode("Please enter valid postcode.")
            return
        }

        fetch(`${process.env.REACT_APP_SERVER_URL}/addresses/${postcode}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    set_addresses(data.success.addresses)
                }
                else if (data.error) {
                    set_addresses(null)
                    set_error_api_postcode(data.error)
                }
            })
            .catch( _ => {
                set_addresses(null)
                set_error_api_postcode("Sorry something went wrong.")
            })
    }

    return (
        <React.Fragment>
            <input type="text" placeholder="postcode" onChange={on_postcode_change} onKeyDown={(e) => handle_enter_keydown(e, get_addresses)}/>
            <button onClick={get_addresses}>
                <img alt="search-icon" src="images/icons/magnifying-glass.png"/>
            </button>
            
            <p>{error_api_postcode}</p>
        </React.Fragment>
    )
}

export default SearchPostcodes
