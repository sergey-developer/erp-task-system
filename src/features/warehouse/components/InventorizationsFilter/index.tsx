import { Form, Select } from 'antd'
import isEmpty from 'lodash/isEmpty'
import React, { FC, useEffect } from 'react'

import {
  inventorizationStatusOptions,
  inventorizationTypeOptions,
} from 'features/warehouse/constants/inventorization'

import DrawerFilter from 'components/Filters/DrawerFilter'
import FilterBlock from 'components/Filters/DrawerFilter/FilterBlock'

import { InventorizationsFilterFormFields, InventorizationsFilterProps } from './types'

const InventorizationsFilter: FC<InventorizationsFilterProps> = ({
  values,
  initialValues,

  onApply,

  ...props
}) => {
  const [form] = Form.useForm<InventorizationsFilterFormFields>()

  useEffect(() => {
    if (isEmpty(values)) form.setFieldsValue(initialValues)
    else form.setFieldsValue(values!)
  }, [form, values, initialValues])

  const resetFields = (fields?: Array<keyof InventorizationsFilterFormFields>) => () => {
    if (isEmpty(fields)) {
      form.setFieldsValue(initialValues)
    } else {
      fields!.forEach((fieldKey) => {
        form.setFieldsValue({ [fieldKey]: initialValues[fieldKey] })
      })
    }
  }

  return (
    <DrawerFilter
      {...props}
      data-testid='inventorizations-filter'
      onReset={resetFields()}
      onApply={form.submit}
    >
      <Form<InventorizationsFilterFormFields> layout='vertical' form={form} onFinish={onApply}>
        <FilterBlock data-testid='status-block' label='Статус' onReset={resetFields(['statuses'])}>
          <Form.Item name='statuses'>
            <Select
              mode='multiple'
              placeholder='Выберите статус'
              options={inventorizationStatusOptions}
            />
          </Form.Item>
        </FilterBlock>

        <FilterBlock data-testid='type-block' label='Тип' onReset={resetFields(['types'])}>
          <Form.Item name='types'>
            <Select
              mode='multiple'
              placeholder='Выберите тип'
              options={inventorizationTypeOptions}
            />
          </Form.Item>
        </FilterBlock>
      </Form>
    </DrawerFilter>
  )
}

export default InventorizationsFilter
