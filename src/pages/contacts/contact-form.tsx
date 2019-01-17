import * as React from 'react'
import { Field } from 'react-final-form'
import TextField from '../../components/ui/input/text-field'
import ErrorField from '../../components/ui/input/error-field'
import { FormRenderProps } from 'react-final-form'
import cx from 'classnames'

const ContactForm = (formId: string) => ({
  handleSubmit,
  submitSucceeded,
}: FormRenderProps) => (
  <form onSubmit={handleSubmit} className={cx({ submitSucceeded })} id={formId}>
    <ErrorField name="error" />
    <div>
      <Field
        name="name"
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
        label="Email"
        type="email"
        component={TextField}
        fullWidth={true}
        margin="dense"
      />
      <ErrorField name="email" />
    </div>
  </form>
)

export default ContactForm
