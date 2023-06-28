import { Button, Form, Input, Typography, Space } from 'antd'
import React, { FC } from 'react'

import { BaseCard } from 'components/Card/BaseCard'

import { ChangePasswordFormFields } from './interfaces'
import { confirmPasswordRules, newPasswordRules } from './validation'

const { Title } = Typography

const ChangePasswordPage: FC = () => {
  const [form] = Form.useForm<ChangePasswordFormFields>()

  const handleSubmit = async (values: ChangePasswordFormFields) => {}

  return (
    <BaseCard data-testid='change-password-card'>
      <Space direction='vertical' size='large'>
        <Title level={5}>Создание нового пароля</Title>

        <Space direction='vertical'>
          {/*{loginError && <Text type='danger'>{loginError}</Text>}*/}

          <Form<ChangePasswordFormFields>
            form={form}
            onFinish={handleSubmit}
            layout='vertical'
          >
            <Form.Item
              data-testid='new-password'
              label='Новый пароль'
              name='newPassword'
              rules={newPasswordRules}
            >
              <Input.Password placeholder='••••••••' disabled={false} />
            </Form.Item>

            <Form.Item
              data-testid='confirm-password'
              label='Подтверждение пароля'
              name='confirmPassword'
              rules={confirmPasswordRules}
              dependencies={['newPassword']}
            >
              <Input.Password placeholder='••••••••' disabled={false} />
            </Form.Item>

            <Button
              type='primary'
              htmlType='submit'
              block
              size='large'
              loading={false}
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
