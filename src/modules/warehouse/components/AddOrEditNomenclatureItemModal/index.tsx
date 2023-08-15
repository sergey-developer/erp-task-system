import { Form, Input, Select } from 'antd'
import React, { FC } from 'react'

import BaseModal from 'components/Modals/BaseModal'

import { idAndTitleSelectFieldNames } from 'shared/constants/common'

import {
  AddOrEditNomenclatureItemModalProps,
  AddOrEditNomenclatureItemModalFormFields,
} from './types'
import {
  groupValidationRules,
  measurementUnitValidationRules,
  nameValidationRules,
  shortNameValidationRules,
  vendorCodeValidationRules,
} from './validation'

export const fakeGroups = [
  {
    id: 1,
    title: 'group',
  },
]

export const fakeMeasurementUnits = [
  {
    id: 1,
    title: 'Measurement',
  },
]

export const fakeCountries = [
  {
    id: 1,
    title: 'Country',
  },
]

const AddOrEditNomenclatureItemModal: FC<
  AddOrEditNomenclatureItemModalProps
> = ({ onSubmit, ...props }) => {
  const [form] = Form.useForm<AddOrEditNomenclatureItemModalFormFields>()

  const handleFinish = async (
    values: AddOrEditNomenclatureItemModalFormFields,
  ) => {
    await onSubmit(values, form.setFields)
  }

  return (
    <BaseModal
      {...props}
      data-testid='add-or-edit-nomenclature-item-modal'
      onOk={form.submit}
    >
      <Form<AddOrEditNomenclatureItemModalFormFields>
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

        <Form.Item
          data-testid='short-name-form-item'
          name='shortTitle'
          label='Краткое наименование'
          rules={shortNameValidationRules}
        >
          <Input placeholder='Введите краткое наименование' />
        </Form.Item>

        <Form.Item
          data-testid='group-form-item'
          name='group'
          label='Группа'
          rules={groupValidationRules}
        >
          <Select
            placeholder='Выберите группу'
            options={fakeGroups}
            fieldNames={idAndTitleSelectFieldNames}
          />
        </Form.Item>

        <Form.Item
          data-testid='vendor-code-form-item'
          name='vendorCode'
          label='Артикул'
          rules={vendorCodeValidationRules}
        >
          <Input placeholder='Введите артикул' />
        </Form.Item>

        <Form.Item
          data-testid='measurement-unit-form-item'
          name='measurementUnit'
          label='Единица измерения'
          rules={measurementUnitValidationRules}
        >
          <Select
            placeholder='Выберите единицу измерения'
            options={fakeMeasurementUnits}
            fieldNames={idAndTitleSelectFieldNames}
          />
        </Form.Item>

        <Form.Item
          data-testid='country-form-item'
          name='country'
          label='Страна производитель'
        >
          <Select
            placeholder='Выберите страну производителя'
            options={fakeCountries}
            fieldNames={idAndTitleSelectFieldNames}
          />
        </Form.Item>
      </Form>
    </BaseModal>
  )
}

export default AddOrEditNomenclatureItemModal
