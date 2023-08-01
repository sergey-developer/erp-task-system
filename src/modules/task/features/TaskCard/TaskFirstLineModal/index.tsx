import { Form, Input, Space, Typography } from 'antd'
import { Rule } from 'rc-field-form/es/interface'
import React, { FC } from 'react'

import BaseModal from 'components/Modals/BaseModal'

import { validationSizes } from 'shared/constants/validation'

import { TaskFirstLineFormFields, TaskFirstLineModalProps } from './interfaces'

const { Text, Link } = Typography
const { TextArea } = Input

const okBtnText: string = 'Вернуть заявку'

const descriptionValidationRules: Rule[] = [
  {
    required: true,
    whitespace: true,
    max: validationSizes.string.long,
  },
]

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
      data-testid='modal-task-first-line'
      visible
      title={modalTitle}
      confirmLoading={isLoading}
      onOk={form.submit}
      okText={okBtnText}
      onCancel={onCancel}
    >
      <Space direction='vertical' size='large'>
        <Space direction='vertical'>
          <Text>Укажите причину возврата. Нажмите кнопку «{okBtnText}».</Text>

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
            rules={descriptionValidationRules}
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
