// packages
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getFullPrice } from 'utils/priceUtils'
import css from './price.module.scss'
import { useFormState } from 'react-final-form'

const Price = () => {
  const {
    values: {
      delivery = 0
    }
  } = useFormState()

  const basket = useSelector(state => state.basket)

  const price = useMemo(() => getFullPrice(basket), [basket])

  const deliveryText = delivery ? 'с учетом доставки' : 'доставка бесплатна'

  return (
    <div className={css.wrapper}>
      <span className={css.price}>{price + delivery}.00 руб.</span>
      <span className={css.small}>* {deliveryText}</span>
    </div>
  )
}
export default Price
