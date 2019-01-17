import React from 'react'
import Radio from '../../../../components/ui/input/radio'
import { Form, Field } from 'react-final-form'
import { cleanup } from 'react-testing-library'
import renderWithRedux from '../../../../utils/render-with-redux'

afterEach(cleanup)

const onSubmit = () => {
  return
}

it('renders without crashing', () => {
  renderWithRedux(
    <Form onSubmit={onSubmit}>
      {() => <Field type="checkbox" name="active" component={Radio} />}
    </Form>,
  )
})
