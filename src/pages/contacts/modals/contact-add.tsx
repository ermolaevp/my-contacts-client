import * as React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import ContactForm from '../contact-form'
import { CONTACT_SEND_ADD, CONTACT_ADD } from '../../../redux/actions/contacts'
import { FORM_ERROR } from '../../../redux/actions/errors'

interface IProps {
  open: boolean
  onClose: () => void
}

const ContactAddModal = ({ open, onClose }: IProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
      fullWidth={true}
      data-testid="contact-add-dialog"
    >
      <DialogTitle id="form-dialog-title">Add contact</DialogTitle>
      <DialogContent>
        <ContactForm
          startActionType={CONTACT_SEND_ADD}
          resolveActionType={CONTACT_ADD}
          rejectActionType={FORM_ERROR}
          onSuccess={onClose}
        />
      </DialogContent>
    </Dialog>
  )
}

export default ContactAddModal
