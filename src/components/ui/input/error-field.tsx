import * as React from 'react'
import { Field } from 'react-final-form'
import { createStyles, Theme, withStyles } from '@material-ui/core/styles'
import { titleize } from '../../../utils/text-transform'
import { Typography } from '@material-ui/core'

const styles = (theme: Theme) =>
  createStyles({
    error: {
      color: theme.palette.error.dark,
      textAlign: 'left',
    },
  })

const ErrorField = ({ name, ...rest }: any) => (
  <Field
    name={name}
    subscription={{ submitError: true, dirtySinceLastSubmit: true }}
  >
    {({ meta: { submitError, dirtySinceLastSubmit } }) =>
      submitError && !dirtySinceLastSubmit ? (
        <Typography
          color="error"
          variant="subtitle2"
          align="left"
          gutterBottom={true}
          {...rest}
        >{`${titleize(name)} ${submitError}`}</Typography>
      ) : null
    }
  </Field>
)

export default withStyles(styles)(ErrorField)
