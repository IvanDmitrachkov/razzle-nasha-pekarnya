import { composeValidators, maxValue, minValue, required } from 'utils/validators'

export const fields = {
  shops: {
    name: 'shop'
  },
  deliveryType: {
    name: 'deliveryType'
  },
  name: {
    name: 'name',
    label: 'Ваше имя',
    validate: required
  },
  phone: {
    name: 'phone',
    label: 'Номер телефона',
    validate: required
  },
  street: {
    name: 'street',
    label: 'Улица',
    prompt: 'Введите вашу улицу',
    validate: required
  },
  house: {
    name: 'house',
    label: 'Дом',
    prompt: '',
    validate: required
  },
  frontDoor: {
    name: 'frontDoor',
    label: 'Подъезд',
    prompt: '',
    type: 'number',
    validate: composeValidators(minValue(0), maxValue(15), required)
  },
  floor: {
    name: 'floor',
    label: 'Этаж',
    type: 'number',
    validate: composeValidators(minValue(0), maxValue(25), required)
  },
  flat: {
    name: 'flat',
    label: 'Квартира',
    type: 'number',
    validate: composeValidators(minValue(0), maxValue(1000), required)
  },
  agree: {
    name: 'agree',
    label: 'Я согласен с политикой конфиденциальности',
    validate: required
  },
  textarea: {
    name: 'textarea',
    placeholder: '',
    label: 'Комментарий к заказу'
  }
}
