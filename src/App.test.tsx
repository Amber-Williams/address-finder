import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';

import { store } from './store/store';
import server from './../testing/mock-server'
import App from './App';

test('renders without crashing', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())


test('Capture the address of UK-based user and save user address', async () => {
    act(() => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        )
    })
    // user sets years at address
    const years_dropdown = screen.getByTestId('address-years-selector') as HTMLInputElement
    userEvent.selectOptions(years_dropdown, "1")

    // user sets months at address
    const months_dropdown = screen.getByTestId('address-months-selector') as HTMLInputElement
    userEvent.selectOptions(months_dropdown, "1")

    // user enters invalid postcode and recieves error message
    const postcode1 = screen.getByTestId('postcode1') as HTMLInputElement
    userEvent.type(postcode1, "se17sdfsdf2ny")
    expect(postcode1.value).toBe("se17sdfsdf2ny")
    userEvent.type(postcode1, '{enter}')
    await waitFor(() => expect(screen.getByText(/enter valid postcode/i)).toBeInTheDocument());

    // user enters valid postcode
    userEvent.clear(postcode1)
    userEvent.type(postcode1, "SE17 2NY")
    expect(postcode1.value).toBe("SE17 2NY")
    userEvent.type(postcode1, '{enter}')

    // user is able to use address dropdown from valid postcode
    await waitFor(() => expect(screen.getByTestId('address-selector')).toBeInTheDocument())

    // user selects address and a prepopulated address form appears
    const address_dropdown = screen.getByTestId('address-selector') as HTMLInputElement
    userEvent.selectOptions(address_dropdown, "139 Merrow Street, , , , , London, ")
    expect(screen.getByTestId('address-form')).toBeInTheDocument()

    // user submits form and adds address
    const address_submit = screen.getByTestId('address-submit')
    userEvent.click(address_submit)
    expect(screen.getByTestId('addresses-registered')).toBeInTheDocument()
    const registered_addresses = screen.getByTestId('addresses-registered')

    // user deletes address
    const delete_button = screen.getByAltText('delete icon')
    userEvent.click(delete_button)
    expect(registered_addresses).not.toBeInTheDocument()
})