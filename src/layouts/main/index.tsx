import React from 'react'
import { createStructuredSelector } from 'reselect'
import { user, appError } from '../../selectors'
import { connect } from 'react-redux'
import { sessionLogout } from '../../redux/actions/session'
import { errorClear } from '../../redux/actions/errors'
import { Button, AppBar, Toolbar, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'
import compose from '../../utils/compose'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const selectors = createStructuredSelector({
  user,
  appError,
})

const mapDispatch = {
  sessionLogout,
  errorClear,
}

interface IProps {
  user: any
  appError: any
  sessionLogout: () => void
  errorClear: () => void
  classes: any
  children: any
}

const MainLayout = (props: IProps) => {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            {props.user.email}
          </Typography>
          <div className={props.classes.spacer} />
          <Button onClick={props.sessionLogout} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <div className={props.classes.root}>{props.children}</div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={!!props.appError.key}
        autoHideDuration={6000}
        onClose={props.errorClear}
        ContentProps={{
          'aria-describedby': 'app-error',
        }}
        message={
          <span id="app-error">
            {props.appError.status} {props.appError.statusText}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={props.classes.close}
            onClick={props.errorClear}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </>
  )
}

export default compose(
  connect(
    selectors,
    mapDispatch,
  ),
  withStyles(styles),
)(MainLayout)
