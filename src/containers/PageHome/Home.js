import React from 'react'
// components
import News from 'containers/News/News'
import Bg from 'components/Bg/Bg'
import Helmet from 'components/Helmet/Helmet'
import HomeSimpleBanner from 'containers/PageHome/HomeSimpleBanner/HomeSimpleBanner'
import CardLink from 'components/CardLink/CardLink'
import Products from 'containers/Products/Products'
import HomeSlider from 'containers/PageHome/HomeSlider/HomeSlider'
import Categories from 'containers/Categories/Categories'
// constants
import { PAGE_NEWS } from 'constants/routes'
// hooks
import useMeta from 'api/hooks/useMeta'
// styles
import css from './home.module.scss'

function Home () {
  const { mainPage: mainPageMeta } = useMeta()

  return (
    <Bg color='grey' className={css.wrapper}>
      <Helmet {...mainPageMeta} />
      <Categories />
      <HomeSlider />
      <div className={css.products}>
        <Products />
      </div>
      <HomeSimpleBanner className={css.banner} />
      <News
        title='Последние новости'
        limit={2}
        CardMoreComponent={
          <CardLink link={PAGE_NEWS} title='Показать все новости и предложения' />
        }
      />
    </Bg>
  )
}

export default Home
