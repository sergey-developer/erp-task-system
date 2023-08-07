import { Form, FormInstance, Input } from 'antd'
import { Rule } from 'rc-field-form/es/interface'
import React, { FC } from 'react'

import BaseModal, { BaseModalProps } from 'components/Modals/BaseModal'

const nameValidationRules: Rule[] = [{ required: true, whitespace: true }]

type GroupModalFormFields = {
  name: string
}

export type AddOrEditGroupModalProps = Required<
  Pick<BaseModalProps, 'visible' | 'onCancel'>
> & {
  title: string
  okText: string
  onSubmit: (
    values: GroupModalFormFields,
    setFields: FormInstance['setFields'],
  ) => Promise<void>
}

const AddOrEditGroupModal: FC<AddOrEditGroupModalProps> = ({
  onSubmit,
  ...props
}) => {
  const [form] = Form.useForm<GroupModalFormFields>()

  const handleFinish = async (values: GroupModalFormFields) => {
    await onSubmit(values, form.setFields)
  }

  return (
    <BaseModal {...props} data-testid='add-edit-group-modal' onOk={form.submit}>
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
