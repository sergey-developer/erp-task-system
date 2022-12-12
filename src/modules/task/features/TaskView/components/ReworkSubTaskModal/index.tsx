import { Form, Input, Typography } from 'antd'
import React, { FC } from 'react'

import BaseModal from 'components/Modals/BaseModal'
import { DEFAULT_MIDDLE_TEXT_RULES } from 'shared/constants/validation'

import { ReworkSubTaskFormFields, ReworkSubTaskModalProps } from './interfaces'

const { Text, Link } = Typography
const { TextArea } = Input

const ReworkSubTaskModal: FC<ReworkSubTaskModalProps> = ({
  recordId,
  isLoading,
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm<ReworkSubTaskFormFields>()

  const modalTitle = (
    <Text>
      Возврат на доработку задания <Link>{recordId}</Link>
    </Text>
  )

  const handleFinish = async (values: ReworkSubTaskFormFields) => {
    await onSubmit(values, form.setFields)
  }

  return (
    <BaseModal
      data-testid='rework-sub-task-modal'
      visible
      title={modalTitle}
      confirmLoading={isLoading}
      onOk={form.submit}
      okText='Сохранить'
      onCancel={onCancel}
    >
      <Form<ReworkSubTaskFormFields>
        form={form}
        layout='vertical'
        onFinish={handleFinish}
        preserve={false}
      >
        <Form.Item
          data-testid='returnReason'
          label='Причина возврата'
          name='returnReason'
          rules={DEFAULT_MIDDLE_TEXT_RULES}
        >
          <TextArea
            placeholder='Опишите причину возврата'
            disabled={isLoading}
          />
        </Form.Item>
      </Form>
    </BaseModal>
  )
}

export default ReworkSubTaskModal
