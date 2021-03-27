import React from 'react'
import { SelectDropdownPropsType } from './../../types'

const SelectDropdown = (props: SelectDropdownPropsType) => (
    <select defaultValue={props.placeholder}
            onChange={props.on_change}
            data-testid={props.testid}
            >
        {props.placeholder ? <option value={props.placeholder} disabled >{props.placeholder}</option> : null}
        {props.selections.map((option, index) => <option value={option.value} key={index}>{option.name}</option>)}
    </select>
)

export default SelectDropdown