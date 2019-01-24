import React from 'react'
import MakeAsyncFunction from 'react-redux-promise-listener'
import { promiseListener } from '../redux/configureStore'

export interface IAsyncFormProps {
  startActionType: string
  resolveActionType: string
  rejectActionType: string
}

export default function withAsyncForm(Component: any) {
  return function ComponentWithAsyncForm({
    startActionType,
    resolveActionType,
    rejectActionType,
    ...rest
  }: IAsyncFormProps & any) {
    return (
      <MakeAsyncFunction
        listener={promiseListener}
        start={startActionType}
        resolve={resolveActionType}
        reject={rejectActionType}
      >
        {(handleSubmit: any) => <Component {...rest} onSubmit={handleSubmit} />}
      </MakeAsyncFunction>
    )
  }
}
