import { Button, Form, Input, Typography, Space } from 'antd'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { RouteEnum } from 'configs/routes'

import { UPDATE_PASSWORD_SUCCESS_MSG } from 'modules/auth/constants'
import { useUpdatePasswordMutation } from 'modules/auth/services/authApi.service'

import { BaseCard } from 'components/Card/BaseCard'

import { showSuccessNotification } from 'shared/utils/notifications'

import { ChangePasswordFormFields } from './interfaces'
import { getUpdatePasswordError } from './utils'
import { confirmPasswordRules, newPasswordRules } from './validation'

const { Title, Text } = Typography

const ChangePasswordPage: FC = () => {
  const navigate = useNavigate()

  const [form] = Form.useForm<ChangePasswordFormFields>()

  const [
    updatePasswordMutation,
    { isLoading: updatePasswordIsLoading, error: rawUpdatePasswordError },
  ] = useUpdatePasswordMutation()

  const updatePasswordError = getUpdatePasswordError(rawUpdatePasswordError)

  const handleSubmit = async (values: ChangePasswordFormFields) => {
    try {
      await updatePasswordMutation({
        password: values.newPassword.trim(),
      }).unwrap()

      navigate(RouteEnum.TaskList)
      showSuccessNotification(UPDATE_PASSWORD_SUCCESS_MSG)
    } catch {}
  }

  return (
    <BaseCard data-testid='change-password-card'>
      <Space direction='vertical' size='large'>
        <Title level={5}>Создание нового пароля</Title>

        <Space direction='vertical'>
          {updatePasswordError && (
            <Text type='danger'>{updatePasswordError}</Text>
          )}

          <Form<ChangePasswordFormFields>
            form={form}
            onFinish={handleSubmit}
            layout='vertical'
            validateTrigger={['onSubmit', 'onBlur']}
          >
            <Form.Item
              data-testid='new-password'
              label='Новый пароль'
              name='newPassword'
              rules={newPasswordRules}
            >
              <Input.Password
                placeholder='••••••••'
                disabled={updatePasswordIsLoading}
              />
            </Form.Item>

            <Form.Item
              data-testid='confirm-password'
              label='Подтверждение пароля'
              name='confirmPassword'
              rules={confirmPasswordRules}
              dependencies={['newPassword']}
            >
              <Input.Password
                placeholder='••••••••'
                disabled={updatePasswordIsLoading}
              />
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
