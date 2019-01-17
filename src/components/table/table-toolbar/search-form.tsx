import React from 'react'
import {
  Field,
  FormRenderProps,
  FieldRenderProps,
  FormSpy,
} from 'react-final-form'
import InputBase from '@material-ui/core/InputBase'

interface ISearchForm {
  name?: string
  id?: string
  classes: any
}

const AutoSubmit = ({ handleSubmit }: { handleSubmit: () => void }) => (
  <FormSpy subscription={{ values: true }} onChange={handleSubmit} />
)

const SearchForm = ({
  handleSubmit,
  classes,
  name = 'name_cont',
  id = 'search-form',
}: ISearchForm & FormRenderProps) => (
  <form onSubmit={handleSubmit} id={id}>
    <AutoSubmit handleSubmit={handleSubmit} />
    <Field type="search" label="Search" name={name}>
      {({
        input: { name: inputName, onChange, value, ...restInput },
        meta,
        ...rest
      }: FieldRenderProps) => (
        <InputBase
          {...rest}
          name={inputName}
          error={meta.error && meta.touched}
          inputProps={restInput}
          onChange={onChange}
          value={value}
          placeholder="Search..."
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
        />
      )}
    </Field>
  </form>
)

export default (props: ISearchForm) => (frProps: FormRenderProps) => (
  <SearchForm {...props} {...frProps} />
)
