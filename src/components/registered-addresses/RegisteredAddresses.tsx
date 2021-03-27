import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { remove_address, selector_addresses } from './../registration/registrationSlice'
import { RegisteredAddressType, RegisteredAddressPropsType } from '../../types'
import { address_formatter } from './../../utils/utils'
import styles from './RegisteredAddresses.module.scss'

const RegisteredAddress = (props: RegisteredAddressPropsType) => {
    const dispatch = useDispatch();
    return (
        <div className={styles.registered_address}>
            <div>
                <p>{address_formatter(props.address, 'string')}</p>
                <p className={styles.registered_address_date}>{props.address.date}</p>
            </div>
            <button onClick={() => dispatch(remove_address(props.address.line1 + props.address.line2 + props.address.city))}>
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
