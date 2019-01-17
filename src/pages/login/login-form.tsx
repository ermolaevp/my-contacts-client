import * as React from 'react'
import { Field, FormRenderProps } from 'react-final-form'
import TextField from '../../components/ui/input/text-field'
import { Button } from '@material-ui/core'
import cx from 'classnames'
import ErrorField from '../../components/ui/input/error-field'

const LoginForm = (classes: any) => ({
  handleSubmit,
  pristine,
  submitting,
  invalid,
  submitSucceeded,
  submitError,
  form,
}: FormRenderProps) => (
  <form onSubmit={handleSubmit} className={cx({ submitSucceeded })}>
    <Field
      type="email"
      name="email"
      label="Login"
      component={TextField}
      id="login"
      fullWidth={true}
    />
    <Field
      type="password"
      name="password"
      component={TextField}
      label="Password"
      id="password"
      fullWidth={true}
    />
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
      login
    </Button>
    &nbsp;
    <Button onClick={form.reset} role="reset">
      reset
    </Button>
  </form>
)

export default LoginForm
