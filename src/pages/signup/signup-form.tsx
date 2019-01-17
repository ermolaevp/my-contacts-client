import * as React from 'react'
import { Field, FormRenderProps } from 'react-final-form'
import TextField from '../../components/ui/input/text-field'
import { Button } from '@material-ui/core'
import cx from 'classnames'
import ErrorField from '../../components/ui/input/error-field'

const SignupForm = (classes: any) => ({
  handleSubmit,
  submitting,
  submitSucceeded,
  submitError,
  form,
}: FormRenderProps) => (
  <form onSubmit={handleSubmit} className={cx({ submitSucceeded })}>
    <Field
      type="email"
      name="email"
      label="Email"
      component={TextField}
      id="email"
      fullWidth={true}
      required={true}
    />
    <ErrorField name="email" />
    <Field
      type="password"
      name="password"
      component={TextField}
      label="Password"
      id="password"
      fullWidth={true}
      required={true}
      autoComplete="new-password"
    />
    <ErrorField name="password" />
    <Field
      type="password"
      name="passwordConfirmation"
      component={TextField}
      label="Password confirmation"
      id="password-confirmation"
      fullWidth={true}
      required={true}
    />
    <ErrorField name="password_confirmation" />
    <Field
      type="hidden"
      name="companyId"
      component="input"
      label="Company ID"
      id="company-id"
      required={true}
    />
    <ErrorField name="company" />
    <div className={classes.error}>
      <ErrorField name="error" align="center" />
    </div>
    <Button
      type="submit"
      role="submit"
      variant="contained"
      color="primary"
      disabled={submitting}
    >
      Signup
    </Button>
    &nbsp;
    <Button onClick={form.reset} role="reset">
      reset
    </Button>
  </form>
)

export default SignupForm
