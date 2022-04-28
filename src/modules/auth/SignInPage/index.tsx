import { Button, Form, Input } from 'antd'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import { RoutesEnum } from 'configs/routes'

import {
  CardStyled,
  FormStyled,
  FormTitleStyled,
  PageTitleStyled,
} from './styles'

const SignInPage: FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <CardStyled>
      <PageTitleStyled level={4}>Obermeister-ITSM</PageTitleStyled>
      <FormTitleStyled level={5}>Авторизация</FormTitleStyled>
      <FormStyled
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout='vertical'
        requiredMark={false}
      >
        <Form.Item
          label='E-mail'
          name='email'
          rules={[{ required: true, message: 'Введите E-mail', type: 'email' }]}
        >
          <Input placeholder='ober@obermeister.ru' />
        </Form.Item>
        <Form.Item
          label='Пароль'
          name='password'
          rules={[{ required: true, message: 'Введите пароль' }]}
        >
          <Input.Password placeholder='••••••••' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' block size='large'>
            Войти
          </Button>
          <Link to={RoutesEnum.ForgotPassword}>
            <Button type='link' block>
              Забыли пароль?
            </Button>
          </Link>
        </Form.Item>
      </FormStyled>
    </CardStyled>
  )
}

export default SignInPage
