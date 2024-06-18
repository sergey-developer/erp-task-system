import { Flex, Form, Input, InputNumber, Radio } from 'antd'
import React, { FC, useEffect } from 'react'

import Label from 'components/Label'
import BaseModal from 'components/Modals/BaseModal'

import { SAVE_TEXT } from 'shared/constants/common'
import { yesNoOptions } from 'shared/constants/selectField'
import {
  onlyNotEmptyStringRules,
  onlyRequiredRules,
  requiredStringRules,
} from 'shared/constants/validation'

import {
  CreateRelocationEquipmentTechnicalExaminationFormFields,
  CreateRelocationEquipmentTechnicalExaminationModalProps,
} from './types'
import { restorationActionRules, restorationCostRules } from './validation'

const CreateRelocationEquipmentTechnicalExaminationModal: FC<
  CreateRelocationEquipmentTechnicalExaminationModalProps
> = ({
  isLoading,
  onSubmit,

  technicalExamination,
  technicalExaminationIsLoading,

  relocationEquipment,

  ...props
}) => {
  const [form] = Form.useForm<CreateRelocationEquipmentTechnicalExaminationFormFields>()

  useEffect(() => {
    if (technicalExamination) {
      form.setFieldsValue({
        malfunction: technicalExamination.malfunction,
        hasMechanicalDamage: technicalExamination.hasMechanicalDamage,
        restorationAction: technicalExamination.restorationAction,
        restorationCost: technicalExamination.restorationCost,
        conclusion: technicalExamination.conclusion || undefined,
      })
    }
  }, [form, technicalExamination])

  const onFinish = async (values: CreateRelocationEquipmentTechnicalExaminationFormFields) => {
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
      data-testid='create-technical-examination-modal'
      title='Данные АТЭ'
      okText={SAVE_TEXT}
      onOk={form.submit}
      confirmLoading={isLoading}
      isLoading={technicalExaminationIsLoading}
    >
      <Flex vertical gap='large'>
        <Label label='Наименование'>
          {technicalExamination?.relocationEquipment.equipment.title ||
            relocationEquipment?.equipment.title}
        </Label>

        <Label label='Серийный номер'>
          {technicalExamination?.relocationEquipment.equipment.serialNumber ||
            relocationEquipment?.equipment.serialNumber}
        </Label>

        <Label label='Инвентарный номер'>
          {technicalExamination?.relocationEquipment.equipment.inventoryNumber ||
            relocationEquipment?.equipment.inventoryNumber}
        </Label>

        <Form<CreateRelocationEquipmentTechnicalExaminationFormFields>
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

export default CreateRelocationEquipmentTechnicalExaminationModal
