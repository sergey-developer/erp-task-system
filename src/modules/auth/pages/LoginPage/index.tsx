import { Button, Form, Input, Typography } from 'antd'
import React, { FC } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { CommonRouteEnum } from 'configs/routes'

import { login as loginAction } from 'modules/auth/auth.slice'
import { AuthRouteEnum } from 'modules/auth/constants/routes'
import { useLoginMutation } from 'modules/auth/services/authApi.service'
import { authLocalStorageService } from 'modules/auth/services/authLocalStorage.service'
import { parseJwt } from 'modules/auth/utils'

import { BaseCard } from 'components/Card/BaseCard'
import Space from 'components/Space'

import { APP_NAME } from 'shared/constants/common'
import { useDispatch } from 'shared/hooks/useDispatch'
import { isBadRequestError, isErrorResponse } from 'shared/services/baseApi'
import { getFieldsErrors } from 'shared/utils/form'

import { PageTitleStyled } from './styles'
import { LoginFormFields } from './types'
import { getLoginError } from './utils'
import { emailRules, passwordRules } from './validation'

const { Text, Title } = Typography

const LoginPage: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const [form] = Form.useForm<LoginFormFields>()

  const [loginMutation, { isLoading, error: loginErrorResponse }] = useLoginMutation()
  const loginError = getLoginError(loginErrorResponse)

  const login = async (values: LoginFormFields) => {
    try {
      const response = await loginMutation(values).unwrap()

      authLocalStorageService.setAccessToken(response.access)
      authLocalStorageService.setRefreshToken(response.refresh)

      dispatch(loginAction({ user: parseJwt(response.access), ...response }))
      console.log(location.state.from)
      navigate(location.state?.from ? location.state.from : CommonRouteEnum.Home)
    } catch (error) {
      if (isErrorResponse(error)) {
        if (isBadRequestError(error)) {
          form.setFields(getFieldsErrors(error.data))
        }
      }
    }
  }

  return (
    <BaseCard data-testid='login-card'>
      <Space direction='vertical' size='large'>
        <Space direction='vertical' size={48} $block>
          <PageTitleStyled level={4}>{APP_NAME}</PageTitleStyled>

          <Title level={5}>Авторизация</Title>
        </Space>

        <Space direction='vertical'>
          {loginError && <Text type='danger'>{loginError}</Text>}

          <Form<LoginFormFields> form={form} onFinish={login} layout='vertical'>
            <Form.Item data-testid='field-email' label='E-mail' name='email' rules={emailRules}>
              <Input
                data-testid='input-email'
                placeholder='ober@obermeister.ru'
                disabled={isLoading}
              />
            </Form.Item>

            <Form.Item
              data-testid='field-password'
              label='Пароль'
              name='password'
              rules={passwordRules}
            >
              <Input.Password
                data-testid='input-password'
                placeholder='••••••••'
                disabled={isLoading}
              />
            </Form.Item>

            <Space direction='vertical' $block>
              <Button
                data-testid='btn-submit'
                type='primary'
                htmlType='submit'
                block
                size='large'
                loading={isLoading}
              >
                Войти
              </Button>

              <Link data-testid='btn-forgotPassword' to={AuthRouteEnum.ForgotPassword}>
                <Button type='link' block>
                  Забыли пароль?
                </Button>
              </Link>
            </Space>
          </Form>
        </Space>
      </Space>
    </BaseCard>
  )
}

export default LoginPage
