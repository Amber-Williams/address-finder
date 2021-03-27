import React from 'react'
import Registration from '../registration/Registration'
import RegisteredAddresses from '../registered-addresses/RegisteredAddresses'

const AddressFinder = () => (
    <div>
        <h1>Address Search</h1>
        <h2>Please enter your address</h2>
        <div/>
        <RegisteredAddresses/>

        <p>How long have you lived at your current address?</p>
        <Registration/>
    </div>
)

export default AddressFinder