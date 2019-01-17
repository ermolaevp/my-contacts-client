import React from 'react'
import Radio from '@material-ui/core/Radio'
import { FieldRenderProps } from 'react-final-form'

export default ({
  input: { checked, value, name, onChange, ...restInput },
  meta,
  ...rest
}: FieldRenderProps) => (
  <Radio
    {...rest}
    name={name}
    inputProps={restInput}
    onChange={onChange}
    checked={!!checked}
    value={value}
  />
)
