import { useMemo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFullPrice } from 'utils/priceUtils'
import axios from 'axios'
import { useHistory } from 'react-router'
import { PAGE_ORDER_RESULT } from 'constants/ROUTES'
import { botUrl } from 'api/axios/instance'
import { FORM_ERROR } from 'final-form'
import useSearchValues from 'utils/useSearchValues'
import { isBrowser } from 'utils'

const usePageOrderForm = () => {
  const [botError, setBotError] = useState(undefined)

  // Появляется когда идет редирект со страницы оплаты
  const { orderId } = useSearchValues()

  const history = useHistory()
  const dispatch = useDispatch()

  const basket = useSelector(state => state.basket)
  const userData = useSelector(state => state.userData)

  const price = useMemo(() => getFullPrice(basket), [basket])

  // Если в параметре есть orderId - надо сделать запрос на бота и перейти на страницу успешной оплаты
  useEffect(() => {
    // Запрос на бота и редирект на страницу успеха
    if (orderId) {
      const getBotRequest = async () => {
        try {
          const orders = Object.values(basket)

          await axios.post(botUrl, {
            orders,
            userData,
            price
          })

          history.push(PAGE_ORDER_RESULT, {
            orderId
          })
        } catch (e) {
          setBotError(true)
        }
      }
      getBotRequest()
    }
  }, [orderId, userData, basket])

  const onSubmit = useCallback(async userData => {
    try {
      dispatch({
        type: 'ADD_USER_DATA',
        payload: userData
      })

      // Берём текущий маршрут (тк перенаправлять нужно обратно сюда)
      const webUrl = isBrowser && window.location.href

      const {
        data: {
          formUrl
        } = {}
      } = await axios.get('/payment', {
        params: {
          amount: price,
          returnUrl: webUrl
        }
      })

      // В случае успеха перенаправляем на страницу платежа
      if (formUrl) {
        document.location.href = formUrl
      }
    } catch (e) {
      return { [FORM_ERROR]: 'error' }
    }
  }, [price])

  return {
    onSubmit,
    price,
    botError
  }
}
export default usePageOrderForm
