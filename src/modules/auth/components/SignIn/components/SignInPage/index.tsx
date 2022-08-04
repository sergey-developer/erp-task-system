import { Button, Form, Input } from 'antd'
import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import ErrorList from 'components/Error/ErrorList'
import Space from 'components/Space'
import { RoutesEnum } from 'configs/routes'
import { login as loginAction } from 'modules/auth/authSlice'
import { IUseLoginMutationResult } from 'modules/auth/interfaces'
import { useLoginMutation } from 'modules/auth/services/authApi.service'
import authLocalStorageService from 'modules/auth/services/authLocalStorage.service'
import parseJwt from 'modules/auth/utils/parseJwt'
import { APP_NAME } from 'shared/constants/common'
import useDispatch from 'shared/hooks/useDispatch'

import { SignInFormFields } from './interfaces'
import {
  CardStyled,
  FormStyled,
  FormTitleStyled,
  PageTitleStyled,
} from './styles'
import getLoginErrors from './utils/getLoginErrors'
import { EMAIL_RULES, PASSWORD_RULES } from './validation'

const SignInPage: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, { isLoading, error: loginErrorResponse }] =
    useLoginMutation<IUseLoginMutationResult>()

  const loginErrors = getLoginErrors(loginErrorResponse)

  const onFinish = async (fields: SignInFormFields) => {
    // todo: добавить обработку ошибок
    const response = await login(fields).unwrap()
    authLocalStorageService.setAccessToken(response.access)
    authLocalStorageService.setRefreshToken(response.refresh)

    dispatch(loginAction({ user: parseJwt(response.access), ...response }))
    navigate(RoutesEnum.Root)
  }

  return (
    <CardStyled>
      <PageTitleStyled level={4}>{APP_NAME}</PageTitleStyled>
      <FormTitleStyled level={5}>Авторизация</FormTitleStyled>

      <ErrorList errors={loginErrors} />

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
        </Form.Item>
      </FormStyled>
    </CardStyled>
  )
}

export default SignInPage
