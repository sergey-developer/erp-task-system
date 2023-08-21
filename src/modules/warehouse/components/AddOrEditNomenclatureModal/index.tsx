import { Form, Input, Select } from 'antd'
import React, { FC, useEffect } from 'react'

import BaseModal from 'components/Modals/BaseModal'

import { idAndTitleSelectFieldNames } from 'shared/constants/common'

import {
  AddOrEditNomenclatureModalProps,
  AddOrEditNomenclatureModalFormFields,
} from './types'
import {
  groupValidationRules,
  measurementUnitValidationRules,
  nameValidationRules,
  shortNameValidationRules,
  vendorCodeValidationRules,
} from './validation'

const AddOrEditNomenclatureModal: FC<AddOrEditNomenclatureModalProps> = ({
  onSubmit,
  isLoading,
  permissions,

  nomenclature,
  nomenclatureIsLoading,

  groups,
  groupsIsLoading,

  countries,
  countriesIsLoading,

  measurementUnits,
  measurementUnitsIsLoading,

  ...props
}) => {
  const [form] = Form.useForm<AddOrEditNomenclatureModalFormFields>()

  useEffect(() => {
    if (nomenclature) {
      form.setFieldsValue({
        title: nomenclature.title,
        shortTitle: nomenclature.shortTitle,
        vendorCode: nomenclature.vendorCode,
        group: nomenclature.group.id,
        measurementUnit: nomenclature.measurementUnit.id,
        country: nomenclature.country?.id,
      })
    }
  }, [form, nomenclature])

  const handleFinish = async ({
    title,
    shortTitle,
    vendorCode,
    group,
    country,
    measurementUnit,
  }: AddOrEditNomenclatureModalFormFields) => {
    await onSubmit(
      {
        title: title.trim(),
        shortTitle: shortTitle.trim(),
        vendorCode: vendorCode.trim(),
        group,
        country: country || null,
        measurementUnit,
      },
      form.setFields,
    )
  }

  return (
    <BaseModal
      {...props}
      data-testid='add-or-edit-nomenclature-modal'
      onOk={form.submit}
      okButtonProps={{
        disabled: !!permissions && !permissions.nomenclaturesUpdate,
      }}
      confirmLoading={isLoading}
      isLoading={nomenclatureIsLoading}
      footer={nomenclatureIsLoading ? null : undefined}
    >
      <Form<AddOrEditNomenclatureModalFormFields>
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
            options={groups}
            fieldNames={idAndTitleSelectFieldNames}
            loading={groupsIsLoading}
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
            options={measurementUnits}
            fieldNames={idAndTitleSelectFieldNames}
            loading={measurementUnitsIsLoading}
          />
        </Form.Item>

        <Form.Item
          data-testid='country-form-item'
          name='country'
          label='Страна производитель'
        >
          <Select
            placeholder='Выберите страну производителя'
            allowClear
            options={countries}
            fieldNames={idAndTitleSelectFieldNames}
            loading={countriesIsLoading}
          />
        </Form.Item>
      </Form>
    </BaseModal>
  )
}

export default AddOrEditNomenclatureModal
