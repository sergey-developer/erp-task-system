import { Form, Input, Select } from 'antd'
import { FieldNames } from 'rc-select/lib/Select'
import React, { FC } from 'react'

import BaseModal from 'components/Modals/BaseModal'

import {
  AddOrEditNomenclatureItemModalProps,
  AddOrEditNomenclatureItemModalFormFields,
} from './types'
import {
  countryValidationRules,
  groupValidationRules, measurementUnitValidationRules,
  nameValidationRules,
  shortNameValidationRules, vendorCodeValidationRules
} from "./validation";

const selectFieldNames: Readonly<FieldNames> = {
  label: 'title',
  value: 'id',
}

const fakeGroups = [
  {
    id: 1,
    title: 'title',
  },
]

const fakeMeasurementUnits = [
  {
    id: 1,
    title: 'title',
  },
]

const fakeCountries = [
  {
    id: 1,
    title: 'title',
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
            fieldNames={selectFieldNames}
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
            fieldNames={selectFieldNames}
          />
        </Form.Item>

        <Form.Item
          data-testid='country-form-item'
          name='country'
          label='Страна производитель'
          rules={countryValidationRules}
        >
          <Select
            placeholder='Выберите страну производителя'
            options={fakeCountries}
            fieldNames={selectFieldNames}
          />
        </Form.Item>
      </Form>
    </BaseModal>
  )
}

export default AddOrEditNomenclatureItemModal
