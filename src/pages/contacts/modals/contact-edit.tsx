import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import ContactForm from '../contact-form'
import {
  CONTACT_SEND_UPDATE,
  CONTACT_UPDATE,
} from '../../../redux/actions/contacts'
import { FORM_ERROR } from '../../../redux/actions/errors'

interface IProps {
  open: boolean
  onClose: () => void
  currentContact: object
}

const ContactEditModal = ({ open, onClose, currentContact }: IProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle id="form-dialog-title">Edit contact</DialogTitle>
      <DialogContent>
        <ContactForm
          startActionType={CONTACT_SEND_UPDATE}
          resolveActionType={CONTACT_UPDATE}
          rejectActionType={FORM_ERROR}
          onSuccess={onClose}
          initialValues={currentContact}
        />
      </DialogContent>
    </Dialog>
  )
}

export default ContactEditModal
