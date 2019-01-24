import * as React from 'react'
import {
  fireEvent,
  cleanup,
  waitForElement,
  prettyDOM,
} from 'react-testing-library'
import Contacts from '../../../pages/contacts'
import ContactAddModal from '../../../pages/contacts/modals/contact-add'
import ContactEditModal from '../../../pages/contacts/modals/contact-edit'
import ContactDeleteModal from '../../../pages/contacts/modals/contact-delete'
import ContactShowModal from '../../../pages/contacts/modals/contact-show'
import renderWithRedux from '../../../utils/render-with-redux'

afterEach(cleanup)

describe('Contacts page', () => {
  it('contact list renders', async () => {
    renderWithRedux(<Contacts />)
    // TODO: render modals on click
  })
  it('contact add modal renders', async () => {
    const onClose = () => jest.fn()
    renderWithRedux(<ContactAddModal open={true} onClose={onClose} />)
  })
  it('contact edit modal renders', async () => {
    const onClose = () => jest.fn()
    renderWithRedux(
      <ContactEditModal open={true} onClose={onClose} currentContact={{}} />,
    )
  })
  it('contact delete modal renders', async () => {
    const onClose = () => jest.fn()
    const onDelete = () => jest.fn()
    renderWithRedux(
      <ContactDeleteModal
        open={true}
        onClose={onClose}
        onDelete={onDelete}
        currentContact={{}}
      />,
    )
  })
  it('contact show modal renders', async () => {
    const onClose = () => jest.fn()
    renderWithRedux(
      <ContactShowModal open={true} onClose={onClose} currentContact={{}} />,
    )
  })
})
