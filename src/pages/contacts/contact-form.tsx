import React from 'react'
import { Field, Form, FormProps } from 'react-final-form'
import TextField from '../../components/ui/input/text-field'
import ErrorField from '../../components/ui/input/error-field'
import { FormRenderProps } from 'react-final-form'
import cx from 'classnames'
import Button from '@material-ui/core/Button'
import withAsyncForm from '../../utils/with-async-form'

interface IProps {
  onSubmit: (values: any) => Promise<object>
  onSuccess?: () => void
  onError?: () => void
}

const ContactForm = ({
  onSubmit,
  onSuccess,
  onError,
  ...rest
}: IProps & FormProps) => {
  const handleFormSubmit = (values: object) =>
    onSubmit(values)
      .then(() => onSuccess && onSuccess())
      .catch(() => onError && onError())
  return (
    <Form {...rest} onSubmit={handleFormSubmit}>
      {({
        handleSubmit,
        submitSucceeded,
        submitError,
        submitting,
        dirtySinceLastSubmit,
      }: FormRenderProps) => (
        <form
          onSubmit={handleSubmit}
          className={cx({
            submitSucceeded: !!submitSucceeded,
            submitError: !dirtySinceLastSubmit && !!submitError,
          })}
          data-testid="contact-form"
        >
          {!dirtySinceLastSubmit && submitError}
          <ErrorField name="error" />
          <div>
            <Field
              name="name"
              id="name"
              label="Name"
              component={TextField}
              fullWidth={true}
              margin="dense"
            />
            <ErrorField name="name" />
          </div>
          <div>
            <Field
              name="number"
              id="number"
              label="Number"
              component={TextField}
              fullWidth={true}
              margin="dense"
            />
            <ErrorField name="number" />
          </div>
          <div>
            <Field
              name="email"
              id="email"
              label="Email"
              type="email"
              component={TextField}
              fullWidth={true}
              margin="dense"
            />
            <ErrorField name="email" />
          </div>
          <Button onClick={onSuccess} color="primary">
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            role="submit"
            disabled={submitting}
          >
            Save
          </Button>
        </form>
      )}
    </Form>
  )
}

export default withAsyncForm(ContactForm)
