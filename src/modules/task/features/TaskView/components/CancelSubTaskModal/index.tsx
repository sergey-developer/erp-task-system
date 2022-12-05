import { Form, Input, Typography } from 'antd'
import React, { FC } from 'react'

import BaseModal from 'components/Modals/BaseModal'
import { DEFAULT_LONG_TEXT_RULES } from 'shared/constants/validation'

import { CancelSubTaskFormFields, CancelSubTaskModalProps } from './interfaces'

const { Text, Link } = Typography
const { TextArea } = Input

const CancelSubTaskModal: FC<CancelSubTaskModalProps> = ({
  recordId,
  isLoading,
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm<CancelSubTaskFormFields>()

  const modalTitle = (
    <Text>
      Отмена задания <Link>{recordId}</Link>
    </Text>
  )

  const handleFinish = async (values: CancelSubTaskFormFields) => {
    await onSubmit(values, form.setFields)
  }

  return (
    <BaseModal
      data-testid='cancel-sub-task-modal'
      visible
      title={modalTitle}
      confirmLoading={isLoading}
      onOk={form.submit}
      okText='Сохранить'
      onCancel={onCancel}
    >
      <Form<CancelSubTaskFormFields>
        form={form}
        layout='vertical'
        onFinish={handleFinish}
        preserve={false}
      >
        <Form.Item
          data-testid='cancelReason'
          label='Причина отмены'
          name='cancelReason'
          rules={DEFAULT_LONG_TEXT_RULES}
        >
          <TextArea placeholder='Опишите причину отмены' disabled={isLoading} />
        </Form.Item>
      </Form>
    </BaseModal>
  )
}

export default CancelSubTaskModal
