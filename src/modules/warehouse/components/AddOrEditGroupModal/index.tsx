import { Form, Input } from 'antd'
import React, { FC } from 'react'

import BaseModal from 'components/Modals/BaseModal'

import { AddOrEditGroupModalProps, GroupModalFormFields } from './types'
import { nameValidationRules } from './validation'

const AddOrEditGroupModal: FC<AddOrEditGroupModalProps> = ({
  onSubmit,
  ...props
}) => {
  const [form] = Form.useForm<GroupModalFormFields>()

  const handleFinish = async (values: GroupModalFormFields) => {
    await onSubmit(values, form.setFields)
  }

  return (
    <BaseModal
      {...props}
      data-testid='add-or-edit-group-modal'
      onOk={form.submit}
    >
      <Form<GroupModalFormFields>
        form={form}
        layout='vertical'
        onFinish={handleFinish}
        preserve={false}
      >
        <Form.Item
          data-testid='name-form-item'
          name='name'
          label='Наименование'
          rules={nameValidationRules}
        >
          <Input placeholder='Введите наименование' />
        </Form.Item>
      </Form>
    </BaseModal>
  )
}

export default AddOrEditGroupModal
