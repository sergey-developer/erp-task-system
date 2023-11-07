import { Form, Select } from 'antd'
import isEmpty from 'lodash/isEmpty'
import React, { FC, useEffect } from 'react'

import { relocationTaskStatusOptions } from 'modules/warehouse/constants/relocationTask'

import DrawerFilter from 'components/Filters/DrawerFilter'
import FilterBlock from 'components/Filters/DrawerFilter/FilterBlock'

import { RelocationTaskListFilterFormFields, RelocationTaskListFilterProps } from './types'

const RelocationTaskListFilter: FC<RelocationTaskListFilterProps> = ({
  values,
  initialValues,

  onApply,

  ...props
}) => {
  const [form] = Form.useForm<RelocationTaskListFilterFormFields>()

  useEffect(() => {
    if (!isEmpty(values)) {
      form.setFieldsValue(values!)
    } else {
      form.setFieldsValue(initialValues)
    }
  }, [form, values, initialValues])

  const resetFields = (fields?: Array<keyof RelocationTaskListFilterFormFields>) => () => {
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
      data-testid='relocation-task-list-filter'
      onReset={resetFields()}
      onApply={form.submit}
    >
      <Form<RelocationTaskListFilterFormFields>
        preserve={false}
        layout='vertical'
        form={form}
        onFinish={onApply}
      >
        <FilterBlock data-testid='status-block' label='Статус' onReset={resetFields(['status'])}>
          <Form.Item name='status'>
            <Select
              data-testid='status-select'
              mode='multiple'
              placeholder='Выберите статус'
              options={relocationTaskStatusOptions}
            />
          </Form.Item>
        </FilterBlock>
      </Form>
    </DrawerFilter>
  )
}

export default RelocationTaskListFilter
