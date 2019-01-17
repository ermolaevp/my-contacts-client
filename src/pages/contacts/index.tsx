import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/contacts'
import { contacts, user } from '../../selectors/index'
import { createStructuredSelector } from 'reselect'
import compose from '../../utils/compose'
import MainLayout from '../../layouts/main'
import { withStyles } from '@material-ui/core/styles'
import ContactEdit from './modals/contact-edit'
import ContactAdd from './modals/contact-add'
import ContactDelete from './modals/contact-delete'
import ContactShow from './modals/contact-show'
import Table from '../../components/table'
import Button from '@material-ui/core/Button'
import styles from './styles'
import find from 'lodash/find'
import columns from './columns'
import { Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

// const mapDispatch = {

// }

const selectors = createStructuredSelector({
  contacts,
  user,
})

interface IProps {
  contacts: any
  user: any
  classes: any
  contactsFetch: () => void
  contactsSetPage: () => void
  contactsSetPerPage: () => void
  contactsSetSort: () => void
  contactsSetFilter: () => void
  contactUpdate: () => void
  contactSendDelete: () => void
}

const Contacts = (props: IProps) => {
  const { currentPage, perPage, totalCount } = props.contacts.meta
  const { classes } = props
  useEffect(
    () => {
      if (props.user.id) {
        props.contactsFetch()
      }
    },
    [props.user.id],
  )
  const [currentContact, setCurrentContact] = useState({})
  const [currentModal, setCurrentModal] = useState('')
  const clearCurrentContact = () => setCurrentContact({})
  const clearCurrentModal = () => setCurrentModal('')
  const clearAll = () => {
    clearCurrentContact()
    clearCurrentModal()
  }
  const openContactAddModal = () => setCurrentModal('add')
  const setModalAndContact = (modal: string) => (id: number) => {
    const contact = find(props.contacts.items, { id })
    if (contact) {
      setCurrentContact(contact)
      setCurrentModal(modal)
    }
  }
  return (
    <MainLayout>
      <div className={classes.root}>
        <Table
          data={props.contacts.items}
          columns={columns}
          caption="Contacts"
          currentPage={currentPage}
          perPage={perPage}
          totalCount={totalCount}
          onChangePage={props.contactsSetPage}
          onChangeRowsPerPage={props.contactsSetPerPage}
          onRequestSort={props.contactsSetSort}
          onRequestEdit={setModalAndContact('edit')}
          onRequestDelete={setModalAndContact('delete')}
          onRequestShow={setModalAndContact('show')}
          onRequestFilter={props.contactsSetFilter}
          filterBy="number_or_name_or_email_cont"
        />
        <ContactEdit
          open={currentModal === 'edit'}
          onClose={clearAll}
          currentContact={currentContact}
        />
        <ContactAdd open={currentModal === 'add'} onClose={clearAll} />
        <ContactDelete
          open={currentModal === 'delete'}
          onClose={clearAll}
          onDelete={props.contactSendDelete}
          currentContact={currentContact}
        />
        <ContactShow
          open={currentModal === 'show'}
          onClose={clearAll}
          currentContact={currentContact}
        />
        <Fab
          onClick={openContactAddModal}
          color="primary"
          aria-label="Add"
          size="small"
          className={classes.addButton}
        >
          <AddIcon />
        </Fab>
      </div>
    </MainLayout>
  )
}

export default compose(
  connect(
    selectors,
    actions,
  ),
  withStyles(styles),
)(Contacts)
