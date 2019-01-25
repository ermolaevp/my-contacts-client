import React from 'react'
import { Field, FormRenderProps, Form, FormProps } from 'react-final-form'
import TextField from '../../components/ui/input/text-field'
import { Button, Typography } from '@material-ui/core'
import cx from 'classnames'
import withAsyncForm from '../../utils/with-async-form'
import DialogActions from '@material-ui/core/DialogActions'

interface IProps {
  onSubmit: (values: any) => Promise<object>
  onSuccess?: () => void
}

const LoginForm = ({ onSubmit, onSuccess, ...rest }: IProps & FormProps) => {
  const handleFormSubmit = (values: object) =>
    onSubmit(values).then(() => onSuccess && onSuccess())
  return (
    <Form {...rest} onSubmit={handleFormSubmit}>
      {({
        handleSubmit,
        pristine,
        submitting,
        invalid,
        submitSucceeded,
        submitError,
        dirtySinceLastSubmit,
        form,
      }: FormRenderProps) => (
        <form
          onSubmit={handleSubmit}
          className={cx({
            submitSucceeded: !!submitSucceeded,
            submitError: !dirtySinceLastSubmit && !!submitError,
          })}
        >
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
          <Typography color="error" variant="subtitle2" paragraph={true}>
            {!dirtySinceLastSubmit && submitError}
          </Typography>
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
      )}
    </Form>
  )
}

export default withAsyncForm(LoginForm)
