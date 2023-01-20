import { Form, Input, Typography } from 'antd'
import React, { FC } from 'react'

import BaseModal from 'components/Modals/BaseModal'
import { validationRules } from 'shared/constants/validation'

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
          data-testid='return-reason'
          label='Причина возврата'
          name='returnReason'
          rules={validationRules.string.middle}
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
