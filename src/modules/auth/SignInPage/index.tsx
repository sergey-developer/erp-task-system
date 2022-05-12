import { Button, Form, Input, Typography } from 'antd'
import React, { FC, useCallback } from 'react'
import { Link } from 'react-router-dom'

import { RoutesEnum } from 'configs/routes'
import { ErrorResponse, getErrorDetail } from 'shared/services/api'

import { LoginApiArg } from '../models'
import { useLoginMutation } from '../services'
import {
  CardStyled,
  FormStyled,
  FormTitleStyled,
  PageTitleStyled,
} from './styles'

const SignInPage: FC = () => {
  const [login, { isLoading, error }] = useLoginMutation()
  const onFinish = useCallback(
    (values: LoginApiArg) => {
      login(values)
    },
    [login],
  )

  return (
    <CardStyled>
      <PageTitleStyled level={4}>Obermeister-ITSM</PageTitleStyled>
      <FormTitleStyled level={5}>Авторизация</FormTitleStyled>
      {error ? (
        <Typography.Text type='danger'>
          {getErrorDetail(error as ErrorResponse<LoginApiArg>)}
        </Typography.Text>
      ) : null}
      <FormStyled
        onFinish={onFinish as (v: any) => void}
        layout='vertical'
        requiredMark={false}
      >
        <Form.Item
          label='E-mail'
          name='email'
          rules={[{ required: true, message: 'Введите E-mail', type: 'email' }]}
        >
          <Input placeholder='ober@obermeister.ru' disabled={isLoading} />
        </Form.Item>
        <Form.Item
          label='Пароль'
          name='password'
          rules={[{ required: true, message: 'Введите пароль' }]}
        >
          <Input.Password placeholder='••••••••' disabled={isLoading} />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            block
            size='large'
            loading={isLoading}
          >
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
