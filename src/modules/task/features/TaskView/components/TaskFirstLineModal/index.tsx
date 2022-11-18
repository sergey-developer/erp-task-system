import { Form, Input, Space, Typography } from 'antd'
import React, { FC } from 'react'

import BaseModal from 'components/Modals/BaseModal'
import { BASE_LONG_TEXT_RULES } from 'shared/constants/validation'

import { TaskFirstLineFormFields, TaskFirstLineModalProps } from './interfaces'

const { Text, Link } = Typography
const { TextArea } = Input

const OK_BUTTON_TEXT: string = 'Вернуть заявку'

const TaskFirstLineModal: FC<TaskFirstLineModalProps> = ({
  recordId,
  onCancel,
  onSubmit,
  isLoading,
}) => {
  const [form] = Form.useForm<TaskFirstLineFormFields>()

  const modalTitle = (
    <Text>
      Возврат заявки <Link>{recordId}</Link> на I линию
    </Text>
  )

  const handleFinish = async (values: TaskFirstLineFormFields) => {
    await onSubmit(values, form.setFields)
  }

  return (
    <BaseModal
      visible
      title={modalTitle}
      confirmLoading={isLoading}
      onOk={form.submit}
      okText={OK_BUTTON_TEXT}
      onCancel={onCancel}
    >
      <Space direction='vertical' size='large'>
        <Space direction='vertical'>
          <Text>
            Укажите причину возврата. Нажмите кнопку «{OK_BUTTON_TEXT}».
          </Text>

          <Text type='danger'>
            Заявка исчезнет из вашей очереди заявок. Просмотр заявки и работа с
            ней будут недоступны.
          </Text>
        </Space>

        <Form<TaskFirstLineFormFields>
          form={form}
          layout='vertical'
          onFinish={handleFinish}
          preserve={false}
        >
          <Form.Item
            data-testid='field-description'
            name='description'
            label='Причина возврата'
            rules={BASE_LONG_TEXT_RULES}
          >
            <TextArea
              placeholder='Расскажите подробнее о задаче'
              disabled={isLoading}
            />
          </Form.Item>
        </Form>
      </Space>
    </BaseModal>
  )
}

export default TaskFirstLineModal
