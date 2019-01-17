import * as React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

interface IProps {
  open: boolean
  currentContact: any
  onClose: () => void
}

const ContactShowModal = ({ open, currentContact, onClose }: IProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Info</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {currentContact.name}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus={true}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ContactShowModal
