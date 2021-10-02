// packages
import React from 'react'
import css from './pageOrderResult.module.scss'
import Bg from 'components/Bg/Bg'
import Container from 'components/Container/Container'
import { MdCheck } from 'react-icons/md'
import Button from 'components/Button/Button'
import { PAGE_HOME } from 'constants/routes'
import usePageOrderResult from 'containers/PageOrderResult/usePageOrderResult'
import Contact from 'components/Contact/Contact'

const PageOrderResult = () => {
  const { contacts, priceData } = usePageOrderResult()

  if (!contacts.length) {
    return <div>404</div>
  }

  return (
    <Bg color='grey' className={css.bg}>
      <Container className={css.container}>
        <MdCheck className={css.check} />
        <div className={css.title}>Заказ успешно выполнен</div>
        <Contact contacts={contacts} />
        <div className={css.footer}>
          <Contact className={css.price} contacts={[priceData]} />
          {/* {isSmall */}
          {/*  ? ( */}
          {/*    <div className={css.btns}> */}
          {/*      <Button className={css.btnPrinter}> */}
          {/*        <MdPrint /> */}
          {/*      </Button> */}
          {/*      <Button variant='black' className={css.btnCheck}>Получить чек</Button> */}
          {/*    </div> */}
          {/*  ) : ( */}
          {/*    <> */}
          {/*      <Button className={css.btnPrinter}> */}
          {/*        <MdPrint /> */}
          {/*      </Button> */}
          {/*      <Button variant='black'>Получить чек</Button> */}
          {/*    </> */}
          {/*  )} */}
        </div>
      </Container>
      <div className={css.homeBtn}>
        <Button variant='black' to={PAGE_HOME}>На главную</Button>
      </div>
    </Bg>
  )
}
export default React.memo(PageOrderResult)
