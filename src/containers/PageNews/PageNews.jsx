// packages
import React from 'react'
// styles
import css from './pageNews.module.scss'
// components
import News from 'containers/News/News'
import Bg from 'components/Bg/Bg'
import Title from 'components/Title/Title'
import Container from 'components/Container/Container'
import Helmet from 'components/Helmet/Helmet'
// hooks
import useMeta from 'api/hooks/useMeta'

const PageNews = () => {
  const { news: newsMeta } = useMeta()

  return (
    <Bg color='grey' className={css.container}>
      <Helmet {...newsMeta} />
      <Container>
        <Title>Новости и Акции</Title>
      </Container>
      <News />
    </Bg>
  )
}
export default React.memo(PageNews)
