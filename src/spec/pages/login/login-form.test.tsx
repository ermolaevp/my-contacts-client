import React from 'react'
import Login from '../../../pages/login'
import LoginForm from '../../../pages/login/login-form'
import { fireEvent, cleanup, waitForElement } from 'react-testing-library'
import renderWithRedux from '../../../utils/render-with-redux'
import {
  SESSION_LOGIN,
  SESSION_AUTHORIZE,
} from '../../../redux/actions/session'
import { FORM_ERROR } from '../../../redux/actions/errors'
import { assert } from 'chai'

afterEach(cleanup)

describe('TestLoginForm', () => {
  it('login form success', async () => {
    const onSuccessMock = jest.fn()
    const { getByLabelText, getByRole, container } = renderWithRedux(
      <LoginForm
        startActionType={SESSION_LOGIN}
        resolveActionType={SESSION_AUTHORIZE}
        rejectActionType={FORM_ERROR}
        onSuccess={onSuccessMock}
      />,
    )
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
    assert.equal(1, onSuccessMock.mock.calls.length)
  })
})
