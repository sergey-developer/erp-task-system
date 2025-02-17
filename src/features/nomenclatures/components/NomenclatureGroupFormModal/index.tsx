import { Form, Input } from 'antd'
import React, { FC } from 'react'

import BaseModal from 'components/Modals/BaseModal'

import { NomenclatureGroupFormFields, NomenclatureGroupFormModalProps } from './types'
import { nameValidationRules } from './validation'

const NomenclatureGroupFormModal: FC<NomenclatureGroupFormModalProps> = ({
  onSubmit,
  isLoading,
  initialValues,
  ...props
}) => {
  const [form] = Form.useForm<NomenclatureGroupFormFields>()

  const handleFinish = async (values: NomenclatureGroupFormFields) => {
    await onSubmit(values, form.setFields)
  }

  return (
    <BaseModal
      {...props}
      data-testid='nomenclatureDetail-group-form-modal'
      onOk={form.submit}
      confirmLoading={isLoading}
    >
      <Form<NomenclatureGroupFormFields>
        form={form}
        initialValues={initialValues}
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

export default NomenclatureGroupFormModal
