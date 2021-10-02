// packages
import React from 'react'
import { useRemoteData } from '@aic/react-remote-data-provider'
import FETCH_ABOUT from 'api/fetch/FETCH_ABOUT'
import ContentConstructor from 'components/СontentConstructor/СontentConstructor'
import useMeta from 'api/hooks/useMeta'
import Helmet from 'components/Helmet/Helmet'

const PageAbout = () => {
  const {
    response: {
      contents
    } = {}
  } = useRemoteData(FETCH_ABOUT, [])

  const { about: aboutMeta } = useMeta()
  return (
    <div>
      <Helmet {...aboutMeta} />
      <ContentConstructor items={contents} />
    </div>
  )
}
export default React.memo(PageAbout)
