import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { <%= plural %>Fetch } from '../../redux/actions/<%= plural %>'
import { <%= plural %> } from '../../selectors/index'
import { createStructuredSelector } from 'reselect'
import compose from '../../utils/compose'
import { Button } from '@material-ui/core'

const mapDispatch = {
  <%= plural %>Fetch,
}

const selectors = createStructuredSelector({
  <%= plural %>,
})

const <%= Plural %> = (props: any) => {
  const load = () => props.<%= plural %>Fetch()
  useEffect(
    () => {
      props.<%= plural %>Fetch()
    },
    [props.<%= plural %>.lenght],
  )
  return (
    <div>
      <Button onClick={load}>load</Button>
      {JSON.stringify(props.<%= plural %>)}
    </div>
  )
}

export default compose(
  connect(
    selectors,
    mapDispatch,
  ),
)(<%= Plural %>)
