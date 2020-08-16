// packages
import React, { useMemo } from 'react'
import Header from 'containers/Header/Header'
import Bg from 'components/Bg/Bg'
import useProducts from 'hooks/useProducts'
import _ from 'lodash'
import Button from 'components/Button/Button'
import { PAGE_ORDER } from 'constants/routes'
import { getFullPrice } from 'utils/priceUtils'
import { useSelector } from 'react-redux'
import BackLink from 'components/BackLink/BackLink'
import Container from 'components/Container/Container'
import CardBasket from 'components/CardBasket/CardBasket'
import EmptyBasket from 'components/EmptyBasket/EmptyBasket'
import useDevice from 'hooks/useDevice'
import css from './pageBasket.module.scss'

const PageBasket = () => {
  const { currentDevice } = useDevice()
  const { cards } = useProducts()
  const basket = useSelector(state => state.basket)
  const price = useMemo(() => getFullPrice(basket), [basket])

  const selectedCards = useMemo(() =>
    _.filter(cards, card => card.count > 0),
  [cards]
  )

  return (
    <Bg color='grey' className={css[currentDevice]}>
      <Header />
      <Container className={css.container}>
        <div className={css.header}>
          <BackLink />
          <h1 className={css.mainTitle}>Корзина заказа</h1>
        </div>
        {
          !selectedCards ? <div />
            : selectedCards.length
              ? (
                <div>
                  {
                    _.map(selectedCards, (item, key) => (
                      <CardBasket
                        key={key}
                        className={css.card}
                        {...item}
                      />
                    ))
                  }
                  <div className={css.footer}>
                    <div className={css.footerTitle}>Итого к оплате</div>
                    <div className={css.price}>{price}.00</div>
                    <Button to={PAGE_ORDER}>Оплатить</Button>
                  </div>
                </div>
              )
              : <EmptyBasket />
        }

      </Container>
    </Bg>
  )
}
export default React.memo(PageBasket)
