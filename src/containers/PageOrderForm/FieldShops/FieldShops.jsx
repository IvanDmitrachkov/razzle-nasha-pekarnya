import React from 'react'
import { Field } from 'react-final-form'
import Select from 'components/Select/Select'
import { fields } from 'containers/PageOrderForm/fields'

const options = [
  {
    label: 'ул. Коммунистическая, д.50 (тц. Парма)',
    value: 'ул. Коммунистическая, д.50'
  },
  {
    label: 'ул. Ленина, д.36',
    value: 'ул. Ленина, д.36'
  },
  {
    label: 'ул. Петрозаводская, д.58 (тц. Йорк)',
    value: 'ул. Петрозаводская, д.58 (тц. Йорк)'
  }
]

const FieldShops = () => {
  return (
    <Field
      {...fields.shops}
      component={Select}
      initialValue={options[0].value}
      options={options}
      label='Выберете магазин'
      placeholder='Магазин'
    />
  )
}

export default FieldShops
