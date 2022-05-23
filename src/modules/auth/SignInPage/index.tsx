import { Button, Form, Input, Typography } from 'antd'
import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { RoutesEnum } from 'configs/routes'
import useDispatch from 'shared/hooks/useDispatch'

import { useLoginMutation } from '../auth.service'
import { login as loginAction } from '../authSlice'
import { IUseLoginMutationResult } from '../interfaces'
import { SignInFormFields } from './interfaces'
import {
  CardStyled,
  FormStyled,
  FormTitleStyled,
  PageTitleStyled,
} from './styles'
import { getError } from './utils'
import { EMAIL_RULES, PASSWORD_RULES } from './validation'

const SignInPage: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, { isLoading, error }] =
    useLoginMutation<IUseLoginMutationResult>()

  const onFinish = async (fields: SignInFormFields) => {
    try {
      let data = await login(fields)
      if ('data' in data) {
        dispatch(loginAction(data.data))
        navigate(RoutesEnum.Root)
      }
    } finally {
      return
    }
  }
  return (
    <CardStyled>
      <PageTitleStyled level={4}>Obermeister-ITSM</PageTitleStyled>
      <FormTitleStyled level={5}>Авторизация</FormTitleStyled>
      {error && (
        <Typography.Text type='danger'>{getError(error)}</Typography.Text>
      )}
      <FormStyled<SignInFormFields>
        onFinish={onFinish}
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
