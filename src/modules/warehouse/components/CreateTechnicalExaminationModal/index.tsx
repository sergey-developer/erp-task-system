import { Flex, Form, Input, InputNumber, Radio } from 'antd'
import React, { FC } from 'react'

import Label from 'components/Label'
import BaseModal from 'components/Modals/BaseModal'

import { SAVE_TEXT } from 'shared/constants/common'
import { yesNoOptions } from 'shared/constants/selectField'
import {
  onlyNotEmptyStringRules,
  onlyRequiredRules,
  requiredStringRules,
} from 'shared/constants/validation'

import { CreateTechnicalExaminationFormFields, CreateTechnicalExaminationModalProps } from './types'
import { restorationActionRules, restorationCostRules } from './validation'

const CreateTechnicalExaminationModal: FC<CreateTechnicalExaminationModalProps> = ({
  isLoading,
  onSubmit,
  ...props
}) => {
  const [form] = Form.useForm<CreateTechnicalExaminationFormFields>()

  const onFinish = async (values: CreateTechnicalExaminationFormFields) => {
    await onSubmit(values, form.setFields)
  }

  return (
    <BaseModal
      {...props}
      data-testid='create-technical-examination-modal'
      title='Данные АТЭ'
      okText={SAVE_TEXT}
      onOk={form.submit}
      confirmLoading={isLoading}
    >
      <Flex vertical gap='large'>
        <Label label='Наименование'>Наименование</Label>

        <Label label='Серийный номер'>Серийный номер</Label>

        <Label label='Инвентарный номер'>Инвентарный номер</Label>

        <Form<CreateTechnicalExaminationFormFields>
          layout='vertical'
          form={form}
          onFinish={onFinish}
        >
          <Form.Item name='malfunction' label='Причина неисправности' rules={requiredStringRules}>
            <Input placeholder='Введите текст' disabled={isLoading} />
          </Form.Item>

          <Form.Item
            name='hasMechanicalDamage'
            label='Имеются следы механического повреждения'
            rules={onlyRequiredRules}
          >
            <Radio.Group options={yesNoOptions} disabled={isLoading} />
          </Form.Item>

          <Form.Item
            name='restorationAction'
            label='Для устранения неисправности необходимо'
            rules={restorationActionRules}
          >
            <Input placeholder='Введите текст' disabled={isLoading} />
          </Form.Item>

          <Form.Item
            name='restorationCost'
            label='Стоимость восстановления'
            rules={restorationCostRules}
          >
            <InputNumber disabled={isLoading} />
          </Form.Item>

          <Form.Item name='conclusion' label='Заключение комиссии' rules={onlyNotEmptyStringRules}>
            <Input placeholder='Введите текст' disabled={isLoading} />
          </Form.Item>
        </Form>
      </Flex>
    </BaseModal>
  )
}

export default CreateTechnicalExaminationModal
