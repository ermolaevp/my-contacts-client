import * as React from 'react'
import { Field } from 'react-final-form'
import TextField from '../../components/ui/input/text-field'
import ErrorField from '../../components/ui/input/error-field'
import { FormRenderProps } from 'react-final-form'
import cx from 'classnames'

const ContactForm = (formId: string) => ({
  handleSubmit,
  submitSucceeded,
  submitError,
  submitting,
}: FormRenderProps) => (
  <form
    onSubmit={handleSubmit}
    className={cx({ submitSucceeded })}
    id={formId}
    data-testid="contact-form"
  >
    {submitError}
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
    <button
      type="submit"
      role="submit"
      value="submit"
      disabled={submitting}
      data-testid="contact-form-submit"
    >
      Submit
    </button>
  </form>
)

export default ContactForm
