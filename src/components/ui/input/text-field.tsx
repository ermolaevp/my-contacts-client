import React from 'react'
import TextField from '@material-ui/core/TextField'
import { FieldRenderProps } from 'react-final-form'

export default ({
  input: { name, onChange, value, ...restInput },
  meta,
  ...rest
}: FieldRenderProps) => (
  <TextField
    {...rest}
    name={name}
    helperText={meta.touched ? meta.error : undefined}
    error={meta.error && meta.touched}
    inputProps={restInput}
    onChange={onChange}
    value={value}
  />
)
