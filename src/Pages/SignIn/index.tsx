import React from 'react'
import { Form, Input } from 'antd';

import {
  CardStyled,
  LinkStyled,
  ButtonStyled,
  FooterStyled,
  FormItemStyled,
  TitleStyledLevelFirst,
  TitleStyledLevelTwo,
} from './styles'

/** Страница авторизации */
const SignIn = () => {

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  /** PublicLayout вынести в настройки Routes */
  return <CardStyled>
    <TitleStyledLevelFirst level={1}>
      Obermeister-ITSM
    </TitleStyledLevelFirst>
    <TitleStyledLevelTwo level={2}>
      Авторизация
    </TitleStyledLevelTwo>
    <Form
      name='basic'
      // labelCol={{ span: 8 }}
      // wrapperCol={{ span: 16 }}
      // initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      // autoComplete='off'
      layout='vertical'
    >
      <FormItemStyled
        label='E-mail'
        name='email'
        rules={[{ required: true, message: 'Введите E-mail', type: 'email' }]}
      >
        <Input placeholder='ober@obermeister.ru' />
      </FormItemStyled>
      <FormItemStyled
        label='Пароль'
        name='password'
        rules={[{ required: true, message: 'Введите пароль' }]}
      >
        <Input.Password />
      </FormItemStyled>
      <FooterStyled>
        <ButtonStyled type='primary' htmlType='submit'>
          Войти
        </ButtonStyled>
        <LinkStyled to={'/'}>Забили пароль?</LinkStyled>
      </FooterStyled>
    </Form>
  </CardStyled>
}

export default SignIn
