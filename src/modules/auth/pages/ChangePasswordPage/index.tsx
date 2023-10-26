import { Button, Form, Input, Typography, Space } from 'antd'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { RouteEnum } from 'configs/routes'

import { UPDATE_PASSWORD_SUCCESS_MSG } from 'modules/auth/constants'
import { useUpdatePasswordMutation } from 'modules/auth/services/authApi.service'

import { BaseCard } from 'components/Card/BaseCard'

import { isBadRequestError, isErrorResponse } from 'shared/services/baseApi'
import { getFieldsErrors } from 'shared/utils/form'
import { showSuccessNotification } from 'shared/utils/notifications'

import { ChangePasswordFormFields } from './types'
import { getUpdatePasswordErrors } from './utils'
import { confirmPasswordRules, passwordRules } from './validation'

const { Title, Text } = Typography

const ChangePasswordPage: FC = () => {
  const navigate = useNavigate()

  const [form] = Form.useForm<ChangePasswordFormFields>()

  const [
    updatePasswordMutation,
    { isLoading: updatePasswordIsLoading, error: updatePasswordError },
  ] = useUpdatePasswordMutation()

  const updatePasswordErrors = getUpdatePasswordErrors(updatePasswordError)

  const handleSubmit = async (values: ChangePasswordFormFields) => {
    try {
      await updatePasswordMutation({
        password: values.password.trim(),
      }).unwrap()

      navigate(RouteEnum.DesktopTaskList)
      showSuccessNotification(UPDATE_PASSWORD_SUCCESS_MSG)
    } catch (error) {
      if (isErrorResponse(error)) {
        if (isBadRequestError(error)) {
          form.setFields(getFieldsErrors(error.data))
        }
      }
    }
  }

  return (
    <BaseCard data-testid='change-password-card'>
      <Space direction='vertical' size='large'>
        <Title level={5}>Создание нового пароля</Title>

        <Space direction='vertical'>
          {!!updatePasswordErrors?.length && (
            <Space direction='vertical'>
              {updatePasswordErrors.map((error) => (
                <Text type='danger'>{error}</Text>
              ))}
            </Space>
          )}

          <Form<ChangePasswordFormFields>
            form={form}
            onFinish={handleSubmit}
            layout='vertical'
            validateTrigger={['onSubmit', 'onBlur']}
          >
            <Form.Item
              data-testid='password'
              label='Новый пароль'
              name='password'
              rules={passwordRules}
            >
              <Input.Password placeholder='••••••••' disabled={updatePasswordIsLoading} />
            </Form.Item>

            <Form.Item
              data-testid='confirm-password'
              label='Подтверждение пароля'
              name='confirmPassword'
              rules={confirmPasswordRules}
              dependencies={['password']}
            >
              <Input.Password placeholder='••••••••' disabled={updatePasswordIsLoading} />
            </Form.Item>

            <Button
              type='primary'
              htmlType='submit'
              block
              size='large'
              loading={updatePasswordIsLoading}
            >
              Сохранить
            </Button>
          </Form>
        </Space>
      </Space>
    </BaseCard>
  )
}

export default ChangePasswordPage
