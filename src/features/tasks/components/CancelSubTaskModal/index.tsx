import { Form, Input, Typography } from 'antd'
import { Rule } from 'rc-field-form/es/interface'
import React, { FC } from 'react'

import BaseModal from 'components/Modals/BaseModal'

import { SAVE_TEXT } from 'shared/constants/common'
import { validationSizes } from 'shared/constants/validation'

import { CancelSubTaskFormFields, CancelSubTaskModalProps } from './types'

const { Text, Link } = Typography
const { TextArea } = Input

const cancelReasonValidationRules: Rule[] = [
  {
    required: true,
    whitespace: true,
    max: validationSizes.string.middle,
  },
]

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
      open
      title={modalTitle}
      confirmLoading={isLoading}
      onOk={form.submit}
      okText={SAVE_TEXT}
      onCancel={onCancel}
    >
      <Form<CancelSubTaskFormFields>
        form={form}
        layout='vertical'
        onFinish={handleFinish}
        preserve={false}
      >
        <Form.Item
          data-testid='cancel-reason'
          label='Причина отмены'
          name='cancelReason'
          rules={cancelReasonValidationRules}
        >
          <TextArea placeholder='Опишите причину отмены' disabled={isLoading} />
        </Form.Item>
      </Form>
    </BaseModal>
  )
}

export default CancelSubTaskModal
