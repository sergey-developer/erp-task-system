import { Button, Form, Input, Typography } from 'antd'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import { RoutesEnum } from 'configs/routes'
import { getErrorDetail } from 'shared/services/api'

import { useLoginMutation } from '../auth.service'
import { IUseLoginMutationResult } from '../interfaces'
import {
  CardStyled,
  FormStyled,
  FormTitleStyled,
  PageTitleStyled,
} from './styles'
import { EMAIL_RULES, PASSWORD_RULES } from './validation'

const SignInPage: FC = () => {
  const [login, { isLoading, error }] =
    useLoginMutation<IUseLoginMutationResult>()

  return (
    <CardStyled>
      <PageTitleStyled level={4}>Obermeister-ITSM</PageTitleStyled>
      <FormTitleStyled level={5}>Авторизация</FormTitleStyled>
      {error && (
        <Typography.Text type='danger'>{getErrorDetail(error)}</Typography.Text>
      )}
      <FormStyled
        onFinish={login as (v: any) => void}
        layout='vertical'
        requiredMark={false}
      >
        <Form.Item label='E-mail' name='email' rules={EMAIL_RULES}>
          <Input placeholder='ober@obermeister.ru' disabled={isLoading} />
        </Form.Item>
        <Form.Item label='Пароль' name='password' rules={PASSWORD_RULES}>
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
