import { Button, Form, Input, Typography } from 'antd'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import ErrorList from 'components/Error/ErrorList'
import Space from 'components/Space'
import { RoutesEnum } from 'configs/routes'
import useLogin from 'modules/auth/hooks/useLogin'
import { APP_NAME } from 'shared/constants/common'

import { SignInFormFields } from './interfaces'
import { CardStyled, FormStyled, PageTitleStyled } from './styles'
import getLoginErrors from './utils/getLoginErrors'
import { EMAIL_RULES, PASSWORD_RULES } from './validation'

const { Title } = Typography

const SignInPage: FC = () => {
  const {
    fn: login,
    state: { isLoading, error: loginErrorResponse },
  } = useLogin()

  const loginErrors = getLoginErrors(loginErrorResponse)

  return (
    <CardStyled>
      <Space direction='vertical' size='large'>
        <Space direction='vertical' size={48} $block>
          <PageTitleStyled level={4}>{APP_NAME}</PageTitleStyled>

          <Title level={5}>Авторизация</Title>
        </Space>

        <Space direction='vertical'>
          <ErrorList errors={loginErrors} />

          <FormStyled<SignInFormFields>
            onFinish={login}
            layout='vertical'
            requiredMark={false}
          >
            <Form.Item label='E-mail' name='email' rules={EMAIL_RULES}>
              <Input placeholder='ober@obermeister.ru' disabled={isLoading} />
            </Form.Item>

            <Form.Item label='Пароль' name='password' rules={PASSWORD_RULES}>
              <Input.Password placeholder='••••••••' disabled={isLoading} />
            </Form.Item>

            <Space direction='vertical' $block>
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
            </Space>
          </FormStyled>
        </Space>
      </Space>
    </CardStyled>
  )
}

export default SignInPage
