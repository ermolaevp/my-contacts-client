import * as React from 'react'
import Login from '../../../pages/login/index'
import { fireEvent, cleanup, waitForElement } from 'react-testing-library'
import renderWithRedux from '../../../utils/render-with-redux'

afterEach(cleanup)

describe('TestLoginForm', () => {
  it('Change input', async () => {
    const { getByLabelText, getByRole, container } = renderWithRedux(<Login />)
    const inputLogin = getByLabelText('Login')
    const inputPassword = getByLabelText('Password')
    const buttonSubmit = getByRole('submit')
    fireEvent.change(inputLogin, { target: { value: 'new@value.com' } })
    fireEvent.change(inputPassword, { target: { value: 'new value' } })
    await waitForElement(async () => {
      fireEvent.click(buttonSubmit)
      await waitForElement(() =>
        container.querySelector('form.submitSucceeded'),
      )
    })
  })
})
