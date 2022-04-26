import React, { FC } from 'react'
import { Form, Input, Button } from 'antd';

import {
  CardStyled,
  FooterStyled,
  FormItemStyled,
  PageTitleStyled,
  FormTitleStyled,
} from './styles'
import { Routes } from 'routes';
import { Link } from 'react-router-dom'

const SignIn:FC = () => {

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return <CardStyled>
    <PageTitleStyled level={1}>
      Obermeister-ITSM
    </PageTitleStyled>
    <FormTitleStyled level={2}>
      Авторизация
    </FormTitleStyled>
    <Form
      name='basic'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout='vertical'
      requiredMark={false}
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
        <Button type='primary' htmlType='submit' block size='large'>
          Войти
        </Button>
        <Link to={Routes.forgotPassword}><Button type="link" block>Забили пароль?</Button></Link>
      </FooterStyled>
    </Form>
  </CardStyled>
}

export default SignIn
