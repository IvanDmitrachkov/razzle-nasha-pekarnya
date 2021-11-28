import { useDispatch, useSelector } from 'react-redux'
import { useMemo, useEffect } from 'react'
import { getFullPrice } from 'utils/priceUtils'
import { useLocation } from 'react-router'
import _ from 'lodash'

const usePageOrderResult = () => {
  const dispatch = useDispatch()

  // orderId
  const {
    state: {
      orderId
    } = {}
  } = useLocation()

  // Список покупок
  const basket = useSelector(state => state.basket)
  const orders = useMemo(() => basket ? Object.values(basket) : [], [basket])

  // Общая цена
  const price = useMemo(() => getFullPrice(basket), [basket])

  // Данные пользователя
  const {
    floor,
    frontDoor,
    house,
    textarea,
    street,
    name,
    delivery = 0,
    deliveryType,
    shop
  } = useSelector(state => state.userData) || {}

  // Очищаем данные после того как покинем страницу
  useEffect(() => {
    return () => {
      dispatch({
        type: 'CLEAR_BASKET'
      })
      dispatch({
        type: 'CLEAR_USER_DATA'
      })
    }
  }, [])

  const withDelivery = deliveryType === '1'

  const contacts = useMemo(() => _.compact([
    {
      title: 'Ваше имя',
      value: name
    },
    withDelivery && {
      title: 'Адрес',
      value: `г.Сыктывкар, ул. ${street}, д.${house}, кв.${floor} (${frontDoor}й подъезд)`
    },
    {
      title: 'Комментарий',
      value: textarea || 'Нет комментария'
    },
    {
      title: 'Ваш заказ',
      value: orders.map(item => `${item.title}, ${item.count}шт - ${item.discountPrice * item.count} руб.`)
    },
    {
      title: 'Оплата',
      value: 'По карте (была произведена)'
    },
    {
      title: withDelivery ? 'Доставка' : 'Самовывоз',
      value: withDelivery
        ? delivery ? `${delivery} руб.` : 'Бесплатно'
        : shop
    },
    {
      title: 'Номер заказа',
      value: orderId || 'Без номера заказа'
    }
  ]), [withDelivery, orders, orderId])

  const priceData = { title: 'Итого', value: `${+price + +delivery}.00 руб.` }

  return {
    contacts,
    priceData
  }
}
export default usePageOrderResult
