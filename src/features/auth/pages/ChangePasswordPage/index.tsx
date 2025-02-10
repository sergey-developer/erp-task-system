import { Button, Form, Input, Space, Typography } from 'antd'
import { useUpdatePasswordMutation } from 'features/auth/api/auth.endpoints'
import { updatePasswordSuccessMsg } from 'features/auth/constants'
import { TasksRoutesEnum } from 'features/task/constants/routes'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { BaseCard } from 'components/Card/BaseCard'

import { isBadRequestError, isErrorResponse } from 'shared/api/baseApi'
import { SAVE_TEXT } from 'shared/constants/common'
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

      navigate(TasksRoutesEnum.DesktopTasks)
      showSuccessNotification(updatePasswordSuccessMsg)
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
              {SAVE_TEXT}
            </Button>
          </Form>
        </Space>
      </Space>
    </BaseCard>
  )
}

export default ChangePasswordPage
