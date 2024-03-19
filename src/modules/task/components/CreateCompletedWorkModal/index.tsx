import { Form, Input, InputNumber, Select } from 'antd'
import React, { FC } from 'react'

import BaseModal from 'components/Modals/BaseModal'

import { ADD_TEXT } from 'shared/constants/common'
import { idAndTitleSelectFieldNames } from 'shared/constants/selectField'
import { onlyRequiredRules } from 'shared/constants/validation'

import { CreateCompletedWorkFormFields, CreateCompletedWorkModalProps } from './types'
import { quantityRules, titleRules } from './validation'

const CreateCompletedWorkModal: FC<CreateCompletedWorkModalProps> = ({
  onSubmit,
  measurementUnits,
  measurementUnitsIsLoading,
  ...props
}) => {
  const [form] = Form.useForm<CreateCompletedWorkFormFields>()

  const onFinish = async (values: CreateCompletedWorkFormFields) => {
    await onSubmit({ ...values, title: values.title.trim() }, form.setFields)
  }

  return (
    <BaseModal {...props} title='Добавление работ' onOk={form.submit} okText={ADD_TEXT}>
      <Form<CreateCompletedWorkFormFields> layout='vertical' form={form} onFinish={onFinish}>
        <Form.Item name='title' label='Наименование работ' rules={titleRules}>
          <Input placeholder='Введите текст' />
        </Form.Item>

        <Form.Item name='measurementUnit' label='Единица измерения' rules={onlyRequiredRules}>
          <Select
            placeholder='Выберите из списка'
            loading={measurementUnitsIsLoading}
            disabled={measurementUnitsIsLoading}
            options={measurementUnits}
            fieldNames={idAndTitleSelectFieldNames}
          />
        </Form.Item>

        <Form.Item name='quantity' label='Количество' rules={quantityRules}>
          <InputNumber placeholder='Введите значение' />
        </Form.Item>
      </Form>
    </BaseModal>
  )
}

export default CreateCompletedWorkModal
