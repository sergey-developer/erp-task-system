import { Form, Input, InputNumber, Radio } from 'antd'
import React, { FC } from 'react'

import BaseModal from 'components/Modals/BaseModal'

import { yesNoOptions } from 'shared/constants/selectField'
import {
  onlyNotEmptyStringRules,
  onlyRequiredRules,
  requiredStringRules,
} from 'shared/constants/validation'

import {
  CreateEquipmentTechnicalExaminationFormFields,
  CreateEquipmentTechnicalExaminationModalProps,
} from './types'
import { restorationActionRules, restorationCostRules } from './validation'

const CreateEquipmentTechnicalExaminationModal: FC<
  CreateEquipmentTechnicalExaminationModalProps
> = ({
  isLoading,
  onSubmit,

  ...props
}) => {
  const [form] = Form.useForm<CreateEquipmentTechnicalExaminationFormFields>()

  const onFinish = async (values: CreateEquipmentTechnicalExaminationFormFields) => {
    await onSubmit(
      {
        ...values,
        malfunction: values.malfunction.trim(),
        restorationAction: values.restorationAction.trim(),
        conclusion: values.conclusion?.trim(),
      },
      form.setFields,
    )
  }

  return (
    <BaseModal
      {...props}
      data-testid='create-equipmentDetail-technical-examination-modal'
      title='Данные АТЭ'
      okText='Сформировать'
      onOk={form.submit}
      confirmLoading={isLoading}
    >
      <Form<CreateEquipmentTechnicalExaminationFormFields>
        layout='vertical'
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          data-testid='malfunction-form-item'
          name='malfunction'
          label='Причина неисправности'
          rules={requiredStringRules}
        >
          <Input placeholder='Введите текст' disabled={isLoading} />
        </Form.Item>

        <Form.Item
          data-testid='has-mechanical-damage-form-item'
          name='hasMechanicalDamage'
          label='Имеются следы механического повреждения'
          rules={onlyRequiredRules}
        >
          <Radio.Group options={yesNoOptions} disabled={isLoading} />
        </Form.Item>

        <Form.Item
          data-testid='restoration-action-form-item'
          name='restorationAction'
          label='Для устранения неисправности необходимо'
          rules={restorationActionRules}
        >
          <Input placeholder='Введите текст' disabled={isLoading} />
        </Form.Item>

        <Form.Item
          data-testid='restoration-cost-form-item'
          name='restorationCost'
          label='Стоимость восстановления'
          rules={restorationCostRules}
        >
          <InputNumber disabled={isLoading} />
        </Form.Item>

        <Form.Item
          data-testid='conclusion-form-item'
          name='conclusion'
          label='Заключение комиссии'
          rules={onlyNotEmptyStringRules}
        >
          <Input placeholder='Введите текст' disabled={isLoading} />
        </Form.Item>
      </Form>
    </BaseModal>
  )
}

export default CreateEquipmentTechnicalExaminationModal
