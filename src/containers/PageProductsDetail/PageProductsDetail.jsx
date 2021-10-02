// packages
import React, { useCallback, useMemo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import _ from 'lodash'
import { FiPlus } from 'react-icons/fi'
import { useRemoteData } from '@aic/react-remote-data-provider'
// components
import Container from 'components/Container/Container'
import SliderPhoto from 'components/SliderPhoto/SliderPhoto'
import BackLink from 'components/BackLink/BackLink'
import Button from 'components/Button/Button'
import Picker from 'components/Picker/Picker'
import ContactsBlock from 'components/ContactsBlock/ContactsBlock'
// hooks
import useProducts from 'hooks/useProducts'
// constants
import { PAGE_404 } from 'constants/routes'
import Helmet from 'components/Helmet/Helmet'
import FETCH_PRODUCTS_DETAIL from 'api/fetch/FETCH_PRODUCTS_DETAIL'
// utils
import { getDiscountPrice } from 'utils/priceUtils'
// styles
import css from './pageProductsDetail.module.scss'

const PageProductsDetail = () => {
  const { slug } = useParams()
  const {
    response: {
      title,
      images,
      price,
      text,
      discount,
      discountText,
      id,
      isNotFound
    } = {}
  } = useRemoteData(FETCH_PRODUCTS_DETAIL(slug), [])

  const { addBasket, cards } = useProducts()

  const currentCount = useMemo(() => _.find(cards, item => item.id === id)?.count, [cards])

  const btnAddClick = useCallback(() => addBasket(id, 1), [addBasket, id])
  const addToBasket = useCallback((count) => addBasket(id, count), [addBasket, id])

  const helmetData = useMemo(() => ({
    title,
    description: text
  }), [
    title,
    text
  ])

  if (isNotFound) {
    return <Redirect to={PAGE_404} />
  }

  return (
    <div>
      <Helmet {...helmetData} />
      <Container className={css.row}>
        <div className={css.left}>
          <BackLink />
          <SliderPhoto
            className={css.slider}
            items={images}
            slideClassName={css.img}
          />
        </div>
        <div className={css.content}>
          <h1 className={css.title}>{title}</h1>
          <div className={css.text}>
            {text}
          </div>
          <div className={css.bottom}>
            {discount && (
              <div className={css.discount}>
                <div className={css.discountBlock}>- {discount}%</div>
                <div className={css.discountBottom}>* {discountText || 'Ограниченное предложение'}</div>
              </div>)}
            <div className={css.counterBlock}>
              <div className={css.price}>
                {discount && <div className={css.oldPrice}>{price} ₽</div>}
                {getDiscountPrice(price, discount)} ₽
              </div>
              {
                currentCount
                  ? <Picker onChange={addToBasket} count={currentCount} variant='black' />
                  : (
                    <Button
                      onClick={btnAddClick}
                      className={css.btnBasket}
                    >
                      <FiPlus className={css.plusIcon} />
                      <span>В корзину</span>
                    </Button>
                  )
              }
            </div>
          </div>
          <ContactsBlock className={css.contacts} />
        </div>
      </Container>
    </div>
  )
}
export default React.memo(PageProductsDetail)
