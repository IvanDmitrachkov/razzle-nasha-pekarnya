// packages
import React from 'react'
import { Field, Form } from 'react-final-form'
// styles
import css from './pageOrderForm.module.scss'
// hooks
import usePageOrderForm from './usePageOrderForm'
import useMeta from 'api/hooks/useMeta'
// components
import Container from 'components/Container/Container'
import Input from 'components/Input/Input'
import BackLink from 'components/BackLink/BackLink'
import Button from 'components/Button/Button'
import Attention from 'components/Attention/Attention'
import CheckBox from 'components/CheckBox/CheckBox'
import TextArea from 'components/TextArea/TextArea'
import Helmet from 'components/Helmet/Helmet'
import { fields } from 'containers/PageOrderForm/fields'
import FieldRegion from 'containers/PageOrderForm/FieldRegion/FieldRegion'
import Delivery from 'containers/PageOrderForm/Delivery/Delivery'
import Price from 'containers/PageOrderForm/Price/Price'

const PageOrderForm = () => {
  const { form: formMeta } = useMeta()
  const {
    onSubmit,
    botError
  } = usePageOrderForm()

  if (botError) {
    return (
      <div className={css.errorBlock}>
        <h2 className={css.title}>Не удалось произвести оплату</h2>
        <div>Произошла ошибка бота. Обратитесь к нашему администратору</div>
      </div>
    )
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({
        handleSubmit,
        submitFailed,
        submitting
      }) => (
        <form onSubmit={handleSubmit}>
          <Helmet {...formMeta} />
          <Container className={css.container}>
            <BackLink />
            <div className={css.title}>Сделай заказ прямо сейчас</div>
            <div className={css.fieldName}>
              <Field
                component={Input}
                {...fields.name}
              />
            </div>
            <div className={css.fieldName}>
              <Field
                component={Input}
                {...fields.phone}
              />
            </div>
            <div className={css.subtitle}>Адрес доставки</div>
            <ul className={css.rowFields}>
              <li className={css.bigField}>
                <FieldRegion />
              </li>
              <li className={css.field}>
                <Delivery />
              </li>
              <li className={css.bigField}>
                <Field
                  component={Input}
                  {...fields.street}
                />
              </li>
              <li className={css.field}>
                <Field
                  component={Input}
                  {...fields.house}
                />
              </li>
              <li className={css.field}>
                <Field
                  component={Input}
                  {...fields.frontDoor}
                />
              </li>
              <li className={css.field}>
                <Field
                  component={Input}
                  {...fields.floor}
                />
              </li>
              <li className={css.field}>
                <Field
                  component={Input}
                  {...fields.flat}
                />
              </li>
            </ul>
            <Field
              className={css.textArea}
              component={TextArea}
              {...fields.textarea}
            />
            <Field component={CheckBox} {...fields.agree} />
            <div className={css.footer}>
              <Button
                height={64}
                variant='black'
                type='submit'
                disabled={submitting}
              >
                {submitting ? 'Отправка...' : 'Заказать'}
              </Button>
              <Price />
            </div>
            {submitFailed &&
              <Attention
                text='Попробуйте попытку позже'
                title={'Что то пошло не так :\'('}
                variant='danger'
              />}
          </Container>
        </form>
      )}
    />
  )
}
export default PageOrderForm
