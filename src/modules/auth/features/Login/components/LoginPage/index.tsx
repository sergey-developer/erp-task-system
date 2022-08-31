import { Button, Form, Input, Typography } from 'antd'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import Space from 'components/Space'
import { RoutesEnum } from 'configs/routes'
import useLogin from 'modules/auth/features/Login/hooks/useLogin'
import { APP_NAME } from 'shared/constants/common'
import { ErrorResponse } from 'shared/services/api'
import handleSetFieldsErrors from 'shared/utils/form/handleSetFieldsErrors'

import { LoginFormFields } from './interfaces'
import { CardStyled, FormStyled, PageTitleStyled } from './styles'
import getLoginError from './utils/getLoginError'
import { EMAIL_RULES, PASSWORD_RULES } from './validation'

const { Text, Title } = Typography

const LoginPage: FC = () => {
  const [form] = Form.useForm<LoginFormFields>()

  const {
    fn: login,
    state: { isLoading, error: loginErrorResponse },
  } = useLogin()

  const loginError = getLoginError(
    loginErrorResponse as ErrorResponse<LoginFormFields>,
  )

  const handleSubmit = async (values: LoginFormFields) => {
    try {
      await login(values)
    } catch (exception) {
      const error = exception as ErrorResponse<LoginFormFields>
      handleSetFieldsErrors(error, form.setFields)
    }
  }

  return (
    <CardStyled>
      <Space direction='vertical' size='large'>
        <Space direction='vertical' size={48} $block>
          <PageTitleStyled level={4}>{APP_NAME}</PageTitleStyled>

          <Title level={5}>Авторизация</Title>
        </Space>

        <Space direction='vertical'>
          {loginError && (
            <Text data-testid='login-error' type='danger'>
              {loginError}
            </Text>
          )}

          <FormStyled<LoginFormFields>
            form={form}
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
                data-testid='btn-forgotPassword'
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
