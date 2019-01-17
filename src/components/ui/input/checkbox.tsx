import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import { FieldRenderProps } from 'react-final-form'

export default ({
  input: { checked, name, onChange, ...restInput },
  meta,
  ...rest
}: FieldRenderProps) => (
  <Checkbox
    {...rest}
    name={name}
    inputProps={restInput}
    onChange={onChange}
    checked={!!checked}
  />
)
