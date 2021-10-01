// packages
import UAParser from 'ua-parser-js'

const getDeviceSize = (req) => {
  // определяем размер страницы по заголовку 'user-agent'
  const uaParser = new UAParser(req.headers['user-agent'])

  // определяем тип устройства
  const isSmall = uaParser.getDevice()?.type === 'mobile'
  const isMedium = uaParser.getDevice()?.type === 'tablet'

  return {
    currentDevice: isMedium ? 'isMedium' : isSmall ? 'isSmall' : 'isLarge',
    isLarge: !isSmall && !isMedium,
    isMedium,
    isSmall
  }
}

export default getDeviceSize
