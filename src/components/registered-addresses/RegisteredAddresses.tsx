import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { remove_address, selector_addresses } from './../registration/registrationSlice'
import { RegisteredAddressType, RegisteredAddressPropsType } from '../../types'

const RegisteredAddress = (props: RegisteredAddressPropsType) => {
    const dispatch = useDispatch();
    return (
        <div>
            <p>{props.address.line1}</p>
            <p>{props.address.date}</p>
            <button onClick={() => dispatch(remove_address(props.address.line1))}>
                <img alt='delete icon' src='images/icons/delete.png'/>
            </button>
        </div>
    )
}

const RegisteredAddresses = () => {
    const registered_addresses = useSelector(selector_addresses)

    return (
        <React.Fragment>
            {registered_addresses.length > 0
                ?   <div data-testid="addresses-registered">
                        {registered_addresses.map((_address: RegisteredAddressType, index: number) => <RegisteredAddress key={index} address={_address}/>)}
                        </div>
                :   null
            }
        </React.Fragment>
    )
}

export default RegisteredAddresses
