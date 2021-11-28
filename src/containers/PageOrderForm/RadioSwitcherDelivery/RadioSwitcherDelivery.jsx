import React from 'react'
import { useField } from 'react-final-form'
import css from 'containers/PageOrderForm/RadioSwitcherDelivery/radioSwitcherDelivery.module.scss'

const options = [
  {
    value: '1',
    label: 'Доставка'
  },
  {
    value: '0',
    label: 'Самовывоз'
  }
]

const RadioSwitcherDelivery = () => {
  return (
    <div className={css.container}>
      {options.map(item => (
        <FieldRadio key={item.value} {...item} />
      ))}
    </div>
  )
}

const FieldRadio = ({ label, ...props }) => {
  const field = useField('deliveryType', { ...props, type: 'radio', initialValue: '0' })

  return (
    <label className={css.label}>
      <input className={css.input} {...field.input} />
      <span>{label}</span>
    </label>
  )
}

export default RadioSwitcherDelivery
