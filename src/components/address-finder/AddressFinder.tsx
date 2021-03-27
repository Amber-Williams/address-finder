import React from 'react'
import Registration from '../registration/Registration'
import RegisteredAddresses from '../registered-addresses/RegisteredAddresses'

import styles from './AddressFinder.module.scss'

const AddressFinder = () => (
    <div className={styles.container}>
        <h1>Address Search</h1>
        <h2>Please enter your address</h2>
        <div className={styles.line}></div>
        <RegisteredAddresses/>
        <Registration/>
    </div>
)

export default AddressFinder