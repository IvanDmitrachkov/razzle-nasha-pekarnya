import express from 'express'
import TelegramBot from 'node-telegram-bot-api'
import _ from 'lodash'
import bodyParser from 'body-parser'

const token = '1251996786:AAFgUw71lAfKhwieThNWT_7qQ7uBjSJ4Veo'

const bot = new TelegramBot(token, { polling: true })

// create application/json parser
const jsonParser = bodyParser.json()

// id группового чата начинается со знака тире
// const chatId = '365533192';
const chatId = '-492832966'

// first inline-keyboard
const firstOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'Принять', callback_data: '1' }]
    ],
    hide_keyboard: true
  })
}

const router = express.Router()

router.post('/', jsonParser, async (req, res) => {
  const {
    price,
    userData: {
      street,
      house,
      frontDoor,
      floor,
      flat,
      textarea,
      region,
      delivery = 0,
      name,
      shop,
      deliveryType
    } = {},
    orders
  } = req.body || {}

  // Парсинг товаров в корзине
  const preparedOrders = _.map(orders, (order) => {
    const {
      count,
      discountPrice,
      price,
      title
    } = order
    return `  • ${title}, ${count}шт, ${discountPrice || price}р.`
  })

  const withDelivery = deliveryType === '1'

  /** текст адреса */
  const addressText = withDelivery
    ? `${region}, ул.${street}, д.${house}, подъезд ${frontDoor}, этаж ${floor}, кв.${flat}`
    : ''

  // Формировние текста
  const message = `
  Заказ на сумму ${price}р.\n
  ${withDelivery
    ? `Доставка ${delivery + ' р.' || 'Бесплатно'}`
    : `Самовывоз с ${shop}`} \n
${name} \n
${addressText}\n
${textarea ? 'Комментарий: ' + textarea + '\n' : ''}
Товары:
${preparedOrders.join('\n')}
  `

  await bot.sendMessage(chatId, message, firstOptions)
  res.send({
    error: false,
    status: 'ok'
  })
})

bot.on('callback_query', async function (msg) {
  // Обработка callback от телеграмм
  switch (msg.data) {
    case '1':
      await bot.editMessageText(msg.message.text + '\n\nПринят - ' + msg.from.first_name, {
        chat_id: chatId,
        message_id: msg.message.message_id,
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [{ text: 'Выполнить', callback_data: '2' }]
          ],
          hide_keyboard: true
        })
      })
      break
    case '2':
      await bot.editMessageText(msg.message.text + '\nПередан в доставку - ' + msg.from.first_name, {
        chat_id: chatId,
        message_id: msg.message.message_id,
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [{ text: 'Завершить', callback_data: '3' }]
          ],
          hide_keyboard: true
        })
      })
      break

    case '3':
      await bot.editMessageText(msg.message.text + '\nДоставлен - ' + msg.from.first_name, {
        chat_id: chatId,
        message_id: msg.message.message_id,
        reply_markup: {}
      })
      break
  }
})

bot.on('polling_error', (err) => console.log(err))

module.exports = router
