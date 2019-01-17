import * as React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import ContactForm from '../contact-form'
import MakeAsyncFunction from 'react-redux-promise-listener'
import { Form } from 'react-final-form'
import Button from '@material-ui/core/Button'
import { promiseListener } from '../../../redux/configureStore'
import {
  CONTACT_SEND_ADD,
  CONTACT_ADD,
  CONTACT_ADD_ERROR,
} from '../../../redux/actions/contacts'

interface IProps {
  open: boolean
  onClose: () => void
}

const ContactAddModal = ({ open, onClose }: IProps) => {
  const contactHandleSubmit = (handleSubmit: any) => (values: object) =>
    handleSubmit(values).then(() => onClose())
  const formId = 'contact-add-form'
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle id="form-dialog-title">Add contact</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>Add contact</DialogContentText> */}
        <MakeAsyncFunction
          listener={promiseListener}
          start={CONTACT_SEND_ADD}
          resolve={CONTACT_ADD}
          reject={CONTACT_ADD_ERROR}
        >
          {(handleSubmit: any) => (
            <Form
              render={ContactForm(formId)}
              onSubmit={contactHandleSubmit(handleSubmit)}
            />
          )}
        </MakeAsyncFunction>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" form={formId} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ContactAddModal
