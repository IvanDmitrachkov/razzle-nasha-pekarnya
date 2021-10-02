// packages
import React, { useMemo } from 'react'
import { useRemoteData } from '@aic/react-remote-data-provider'
import FETCH_NEWS_DETAIL from 'api/fetch/FETCH_NEWS_DETAIL'
import { useParams } from 'react-router-dom'
import ContentConstructor from 'components/СontentConstructor/СontentConstructor'
import BackLink from 'components/BackLink/BackLink'
import Container from 'components/Container/Container'
import Helmet from 'components/Helmet/Helmet'

const PageNewsDetail = () => {
  const { slug } = useParams()

  const {
    response: {
      dimanic,
      title
    } = {}
  } = useRemoteData(FETCH_NEWS_DETAIL(slug), [slug])

  const helmetData = useMemo(() => ({
    title
  }), [title])

  return (
    <div style={{ marginTop: '3.2rem' }}>
      <Helmet {...helmetData} />
      <Container>
        <BackLink />
        <ContentConstructor items={dimanic} />
      </Container>
    </div>
  )
}
export default React.memo(PageNewsDetail)
