import { Form, Input } from 'antd'
import React, { FC } from 'react'

import BaseModal from 'components/Modals/BaseModal'

import { ADD_TEXT } from 'shared/constants/common'
import { onlyRequiredRules } from 'shared/constants/validation'

import { CreateCallingReasonModalFormFields, CreateCallingReasonModalProps } from './types'

const CreateCallingReasonModal: FC<CreateCallingReasonModalProps> = ({ onSubmit, ...props }) => {
  const [form] = Form.useForm<CreateCallingReasonModalFormFields>()

  const onFinish = async (values: CreateCallingReasonModalFormFields) => {
    await onSubmit(
      {
        title: values.title.trim(),
        equipmentType: values.equipmentType.trim(),
        malfunction: values.malfunction.trim(),
        inventoryNumber: values.inventoryNumber?.trim(),
      },
      form.setFields,
    )
  }

  return (
    <BaseModal {...props} title='Добавление причины вызова' onOk={form.submit} okText={ADD_TEXT}>
      <Form<CreateCallingReasonModalFormFields> layout='vertical' form={form} onFinish={onFinish}>
        <Form.Item name='title' label='№ заявки/причина вызова' rules={onlyRequiredRules}>
          <Input placeholder='Введите текст' />
        </Form.Item>

        <Form.Item name='equipmentType' label='Тип/марка оборудования' rules={onlyRequiredRules}>
          <Input placeholder='Введите текст' />
        </Form.Item>

        <Form.Item name='malfunction' label='Причина неисправности' rules={onlyRequiredRules}>
          <Input placeholder='Введите текст' />
        </Form.Item>

        <Form.Item name='inventoryNumber' label='Инвентарный номер'>
          <Input placeholder='Введите текст' />
        </Form.Item>
      </Form>
    </BaseModal>
  )
}

export default CreateCallingReasonModal
