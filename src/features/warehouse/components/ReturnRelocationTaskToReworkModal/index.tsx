import { Form, Input } from 'antd'
import { Rule } from 'rc-field-form/es/interface'
import React, { FC } from 'react'

import BaseModal from 'components/Modals/BaseModal'

import { ReturnRelocationTaskToReworkFormFields, ReturnRelocationTaskToReworkModalProps } from './types'

const { TextArea } = Input

const reasonRules: Rule[] = [{ required: true, whitespace: true, max: 10000 }]

const ReturnRelocationTaskToReworkModal: FC<ReturnRelocationTaskToReworkModalProps> = ({
  onSubmit,
  isLoading,
  ...props
}) => {
  const [form] = Form.useForm<ReturnRelocationTaskToReworkFormFields>()

  const handleFinish = async (values: ReturnRelocationTaskToReworkFormFields) => {
    await onSubmit(values, form.setFields)
  }

  return (
    <BaseModal
      data-testid='return-relocation-task-rework-modal'
      title='Возврат на доработку'
      confirmLoading={isLoading}
      onOk={form.submit}
      okText='Вернуть на доработку'
      {...props}
    >
      <Form<ReturnRelocationTaskToReworkFormFields>
        form={form}
        layout='vertical'
        onFinish={handleFinish}
        preserve={false}
      >
        <Form.Item
          data-testid='reason-form-item'
          name='reason'
          label='Причина возврата'
          rules={reasonRules}
        >
          <TextArea placeholder='Введите текст' />
        </Form.Item>
      </Form>
    </BaseModal>
  )
}

export default ReturnRelocationTaskToReworkModal
