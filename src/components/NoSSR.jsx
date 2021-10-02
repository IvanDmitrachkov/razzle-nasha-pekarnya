// packages
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useIsomorphicLayoutEffect } from 'react-use'

const NoSSR = ({ children }) => {
  const [mount, setMount] = useState(false)

  useIsomorphicLayoutEffect(() => {
    setMount(true)
  }, [])

  if (mount) {
    return children
  }
  return null
}

NoSSR.propTypes = {
  children: PropTypes.node
}

export default React.memo(NoSSR)
