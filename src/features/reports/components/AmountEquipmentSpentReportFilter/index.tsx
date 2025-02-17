import { Form, Select } from 'antd'
import isEmpty from 'lodash/isEmpty'
import React, { FC, useEffect } from 'react'

import DrawerFilter from 'components/Filters/DrawerFilter'
import FilterBlock from 'components/Filters/DrawerFilter/FilterBlock'

import { idAndTitleSelectFieldNames } from 'shared/constants/selectField'

import {
  AmountEquipmentSpentReportFilterFormFields,
  AmountEquipmentSpentReportFilterProps,
} from './types'

const AmountEquipmentSpentReportFilter: FC<AmountEquipmentSpentReportFilterProps> = ({
  values,
  initialValues,

  onApply,

  categories,
  categoriesIsLoading,

  ...props
}) => {
  const [form] = Form.useForm<AmountEquipmentSpentReportFilterFormFields>()

  useEffect(() => {
    if (isEmpty(values)) {
      form.setFieldsValue(initialValues)
    } else {
      form.setFieldsValue(values!)
    }
  }, [form, values, initialValues])

  const resetFields = (fields?: Array<keyof AmountEquipmentSpentReportFilterFormFields>) => () => {
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
      data-testid='amount-equipmentDetail-spent-report-filter'
      onReset={resetFields()}
      onApply={form.submit}
    >
      <Form<AmountEquipmentSpentReportFilterFormFields>
        preserve={false}
        layout='vertical'
        form={form}
        onFinish={onApply}
      >
        <FilterBlock
          data-testid='categories-block'
          label='Категории'
          onReset={resetFields(['categories'])}
        >
          <Form.Item name='categories'>
            <Select
              data-testid='categories-select'
              mode='multiple'
              placeholder='Категории'
              options={categories}
              loading={categoriesIsLoading}
              disabled={categoriesIsLoading}
              fieldNames={idAndTitleSelectFieldNames}
            />
          </Form.Item>
        </FilterBlock>
      </Form>
    </DrawerFilter>
  )
}

export default AmountEquipmentSpentReportFilter
