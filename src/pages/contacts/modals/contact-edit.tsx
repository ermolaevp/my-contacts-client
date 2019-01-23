import * as React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import MakeAsyncFunction from 'react-redux-promise-listener'
import { Form } from 'react-final-form'
import Button from '@material-ui/core/Button'
import { promiseListener } from '../../../redux/configureStore'
import ContactForm from '../contact-form'
import {
  CONTACT_SEND_UPDATE,
  CONTACT_UPDATE,
  CONTACT_UPDATE_ERROR,
} from '../../../redux/actions/contacts'

interface IProps {
  open: boolean
  onClose: () => void
  currentContact: object
}

const ContactEditModal = ({ open, onClose, currentContact }: IProps) => {
  const contactHandleSubmit = (handleSubmit: any) => (values: object) =>
    handleSubmit(values).then(() => onClose())
  const formId = 'contact-edit-form'
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
        {/* <DialogContentText>
          Edit contact
        </DialogContentText> */}
        <MakeAsyncFunction
          listener={promiseListener}
          start={CONTACT_SEND_UPDATE}
          resolve={CONTACT_UPDATE}
          reject={CONTACT_UPDATE_ERROR}
        >
          {(handleSubmit: any) => (
            <Form
              render={ContactForm(formId)}
              onSubmit={contactHandleSubmit(handleSubmit)}
              initialValues={currentContact}
            />
          )}
        </MakeAsyncFunction>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" form={formId} color="primary" role="submit">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ContactEditModal
