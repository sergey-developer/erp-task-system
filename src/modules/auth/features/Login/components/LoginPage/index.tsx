import { Button, Form, Input, Typography } from 'antd'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import ErrorList from 'components/Error/ErrorList'
import Space from 'components/Space'
import { RoutesEnum } from 'configs/routes'
import useLogin from 'modules/auth/hooks/useLogin'
import { APP_NAME } from 'shared/constants/common'

import { LoginFormFields } from './interfaces'
import { CardStyled, FormStyled, PageTitleStyled } from './styles'
import getLoginErrors from './utils/getLoginErrors'
import { EMAIL_RULES, PASSWORD_RULES } from './validation'

const { Title } = Typography

const LoginPage: FC = () => {
  const {
    fn: login,
    state: { isLoading, error: loginErrorResponse },
  } = useLogin()

  const loginErrors = getLoginErrors(loginErrorResponse)

  const handleSubmit = async (values: LoginFormFields) => {
    try {
      await login(values)
    } catch {}
  }

  return (
    <CardStyled>
      <Space direction='vertical' size='large'>
        <Space direction='vertical' size={48} $block>
          <PageTitleStyled level={4}>{APP_NAME}</PageTitleStyled>

          <Title level={5}>Авторизация</Title>
        </Space>

        <Space direction='vertical'>
          <ErrorList errors={loginErrors} />

          <FormStyled<LoginFormFields>
            onFinish={handleSubmit}
            layout='vertical'
            requiredMark={false}
          >
            <Form.Item
              data-testid='field-email'
              label='E-mail'
              name='email'
              rules={EMAIL_RULES}
            >
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
              rules={PASSWORD_RULES}
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

              <Link
                data-testid='btn-forgot-password'
                to={RoutesEnum.ForgotPassword}
              >
                <Button type='link' block>
                  Забыли пароль?
                </Button>
              </Link>
            </Space>
          </FormStyled>
        </Space>
      </Space>
    </CardStyled>
  )
}

export default LoginPage
