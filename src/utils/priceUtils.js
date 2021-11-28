import _ from 'lodash'

// Возвращает цену по скидке
export const getDiscountPrice = (price, discount) => discount ? Math.floor(price - (price * discount / 100)) : price

// Считает общую цену, перебирая весь список
export const getFullPrice = (items) => console.log(items) ||
  (items && _.reduce(
    Object.values(items), (sum, n) => sum + n.count * (n.discountPrice || n.price), 0))
