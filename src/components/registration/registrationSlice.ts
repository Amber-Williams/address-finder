import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { RegisteredAddressType } from "../../types"


interface RegistrationState {
  addresses: RegisteredAddressType[];
}

const initial_state: RegistrationState = {
    addresses: []
};

export const registrationSlice = createSlice({
  name: 'registration',
  initialState: initial_state,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    add_address: (state, action: PayloadAction<RegisteredAddressType>) => {
        state.addresses.push(action.payload);
    },
    remove_address: (state, action: PayloadAction<string>) => {
        state.addresses = state.addresses.filter(_address => _address.line1 !== action.payload)
    },
  },
});

export const { add_address, remove_address } = registrationSlice.actions;


export const selector_addresses = (state: RootState) => state.registration.addresses;

export default registrationSlice.reducer;
