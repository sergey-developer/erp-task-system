import { Form, Input } from 'antd'
import React, { FC } from 'react'

import BaseModal from 'components/Modals/BaseModal'

import {
  AddOrEditNomenclatureGroupModalProps,
  AddOrEditNomenclatureGroupModalFormFields,
} from './types'
import { nameValidationRules } from './validation'

const AddOrEditNomenclatureGroupModal: FC<
  AddOrEditNomenclatureGroupModalProps
> = ({ onSubmit, isLoading, ...props }) => {
  const [form] = Form.useForm<AddOrEditNomenclatureGroupModalFormFields>()

  const handleFinish = async (
    values: AddOrEditNomenclatureGroupModalFormFields,
  ) => {
    await onSubmit(values, form.setFields)
  }

  return (
    <BaseModal
      {...props}
      data-testid='add-or-edit-nomenclature-group-modal'
      onOk={form.submit}
      confirmLoading={isLoading}
    >
      <Form<AddOrEditNomenclatureGroupModalFormFields>
        form={form}
        layout='vertical'
        onFinish={handleFinish}
        preserve={false}
      >
        <Form.Item
          data-testid='name-form-item'
          name='title'
          label='Наименование'
          rules={nameValidationRules}
        >
          <Input placeholder='Введите наименование' />
        </Form.Item>
      </Form>
    </BaseModal>
  )
}

export default AddOrEditNomenclatureGroupModal
