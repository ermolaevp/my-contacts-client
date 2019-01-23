import * as React from 'react'
import {
  fireEvent,
  cleanup,
  waitForElement,
  prettyDOM,
} from 'react-testing-library'
import Contacts from '../../../pages/contacts'
import ContactAddModal from '../../../pages/contacts/modals/contact-add'
import renderWithRedux from '../../../utils/render-with-redux'

afterEach(cleanup)

const onClose = () => {
  console.log('close')
  return
}

describe('Contacts page', () => {
  xit('renders without crashing', async () => {
    renderWithRedux(<Contacts />)
  })
  it('contact add error', async () => {
    const {
      getByTestId,
      getByLabelText,
      getByRole,
      container,
    } = renderWithRedux(<ContactAddModal open={true} onClose={onClose} />)
    const contactForm = getByTestId('contact-form')
    const inputName = getByLabelText('Name')
    const inputNumber = getByLabelText('Number')
    const inputEmail = getByLabelText('Email')
    const submitButton = getByTestId('contact-form-submit')
    // console.log(prettyDOM(submitButton))
    fireEvent.change(inputName, { target: { value: 'new@value.com' } })
    fireEvent.change(inputNumber, { target: { value: 'new value' } })
    fireEvent.change(inputEmail, { target: { value: 'new@value.com' } })
    await waitForElement(async () => {
      fireEvent.click(submitButton)
      await waitForElement(() =>
        container.querySelector('form.submitSucceeded'),
      )
    })
  })
})
