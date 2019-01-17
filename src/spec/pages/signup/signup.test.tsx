import * as React from 'react'
import Signup from '../../../pages/signup'
import { fireEvent, cleanup, waitForElement } from 'react-testing-library'
import renderWithRedux from '../../../utils/render-with-redux'

afterEach(cleanup)

describe('TestSignupForm', () => {
  it('Change input', async () => {
    const { getByRole, container } = renderWithRedux(<Signup />)
    const inputEmail = container.querySelector('input#email')
    if (!inputEmail) {
      throw new Error()
    }
    const inputPassword = container.querySelector('input#password')
    if (!inputPassword) {
      throw new Error()
    }
    const inputConfirmation = container.querySelector(
      'input#password-confirmation',
    )
    if (!inputConfirmation) {
      throw new Error()
    }
    const buttonSubmit = getByRole('submit')
    fireEvent.change(inputEmail, { target: { value: 'new value' } })
    fireEvent.change(inputPassword, { target: { value: 'new value' } })
    fireEvent.change(inputConfirmation, { target: { value: 'new value' } })
    await waitForElement(async () => {
      fireEvent.click(buttonSubmit)
      await waitForElement(() =>
        container.querySelector('form.submitSucceeded'),
      )
    })
  })
})
