import axios from 'axios'
import express from 'express'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
// constants
import {
  SBER_LOGIN,
  SBER_PASSWORD,
  SBER_PAYMENT_URL
} from 'constants/payment'

dayjs.extend(advancedFormat)

const getOrderNumber = () => {
  const random = Math.round(9999 - 0.5 + Math.random() * (1000 - 9999 + 1))
  const seconds = dayjs().format('x')

  return `${seconds}${random}`
}

const router = express.Router()

const paymentRouter = router.get('/', (req, res) => {
  const {
    query: {
      amount,
      returnUrl
    } = {}
  } = req

  axios.get(SBER_PAYMENT_URL, {
    params: {
      userName: SBER_LOGIN,
      password: SBER_PASSWORD,
      orderNumber: getOrderNumber(),
      amount: amount * 100, // В минимальных размерах валюты - копейки
      returnUrl
    }
  }).then(response => {
    const {
      errorCode
    } = response.data

    if (errorCode) {
      res.status(500)
    }

    res.send({
      text: 'Запрос в сбербанк прошёл',
      errorCode,
      ...response.data
    })
  })
})

export default paymentRouter
