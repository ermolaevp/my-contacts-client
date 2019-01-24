import React from 'react'
import {
  fireEvent,
  cleanup,
  waitForElement,
  prettyDOM,
} from 'react-testing-library'
import ContactForm from '../../../pages/contacts/contact-form'
import renderWithRedux from '../../../utils/render-with-redux'
import {
  CONTACT_SEND_ADD,
  CONTACT_ADD,
  CONTACT_SEND_UPDATE,
  CONTACT_UPDATE,
} from '../../../redux/actions/contacts'
import { FORM_ERROR } from '../../../redux/actions/errors'
import { assert } from 'chai'

afterEach(cleanup)

describe('Contacts forms', () => {
  it('add contact success', async () => {
    const mockOnSuccess = jest.fn()
    const mockOnError = jest.fn()
    const {
      getByTestId,
      getByLabelText,
      getByRole,
      container,
    } = renderWithRedux(
      <ContactForm
        onSuccess={mockOnSuccess}
        onError={mockOnError}
        startActionType={CONTACT_SEND_ADD}
        resolveActionType={CONTACT_ADD}
        rejectActionType={FORM_ERROR}
      />,
    )
    const inputName = getByLabelText('Name')
    const inputNumber = getByLabelText('Number')
    const inputEmail = getByLabelText('Email')
    const submitButton = getByRole('submit')
    // console.log(prettyDOM(submitButton))
    fireEvent.change(inputName, { target: { value: 'new@value.com' } })
    fireEvent.change(inputNumber, { target: { value: 'new value' } })
    fireEvent.change(inputEmail, { target: { value: 'new@value.com' } })
    await waitForElement(async () => {
      fireEvent.click(submitButton)
      await waitForElement(() => {
        return container.querySelector('form.submitSucceeded')
      })
    })
    assert.equal(1, mockOnSuccess.mock.calls.length)
    assert.equal(0, mockOnError.mock.calls.length)
  })
  it('update contact success', async () => {
    const mockOnSuccess = jest.fn()
    const mockOnError = jest.fn()
    const initalValues = {
      name: 'Jon',
      number: '123',
      email: '',
    }
    const {
      getByTestId,
      getByLabelText,
      getByRole,
      container,
    } = renderWithRedux(
      <ContactForm
        onSuccess={mockOnSuccess}
        onError={mockOnError}
        initalValues={initalValues}
        startActionType={CONTACT_SEND_UPDATE}
        resolveActionType={CONTACT_UPDATE}
        rejectActionType={FORM_ERROR}
      />,
    )
    const inputEmail = getByLabelText('Email')
    const submitButton = getByRole('submit')
    // console.log(prettyDOM(submitButton))
    fireEvent.change(inputEmail, { target: { value: 'new@value.com' } })
    await waitForElement(async () => {
      fireEvent.click(submitButton)
      await waitForElement(() => {
        return container.querySelector('form.submitSucceeded')
      })
    })
    assert.equal(1, mockOnSuccess.mock.calls.length)
    assert.equal(0, mockOnError.mock.calls.length)
  })
})
