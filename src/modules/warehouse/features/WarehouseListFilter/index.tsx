import { Form, Input, Select } from 'antd'
import React, { FC, useEffect } from 'react'

import DrawerFilter from 'components/Filters/DrawerFilter'
import FilterBlock from 'components/Filters/DrawerFilter/FilterBlock'

import { selectFieldNames } from './constants'
import {
  WarehouseListFilterFormFields,
  WarehouseListFilterProps,
} from './interfaces'

const WarehouseListFilter: FC<WarehouseListFilterProps> = ({
  visible,
  formValues,
  onClose,
  onApply,
}) => {
  const [form] = Form.useForm<WarehouseListFilterFormFields>()

  const resetFields =
    (fields?: Array<keyof WarehouseListFilterFormFields>) => () => {
      form.resetFields(fields)
    }

  useEffect(() => {
    if (formValues) {
      form.setFieldsValue(formValues)
    }
  }, [form, formValues])

  return (
    <DrawerFilter
      data-testid='warehouse-list-filter'
      visible={visible}
      onClose={onClose}
      onReset={resetFields()}
      onApply={form.submit}
    >
      <Form<WarehouseListFilterFormFields>
        preserve={false}
        layout='vertical'
        form={form}
        onFinish={onApply}
      >
        <FilterBlock
          data-testid='title-filter'
          label='Наименование объекта'
          onReset={resetFields(['title'])}
        >
          <Form.Item name='title'>
            <Input placeholder='Ключевое слово' />
          </Form.Item>
        </FilterBlock>

        <FilterBlock
          data-testid='legal-entity-filter'
          label='Юридическое лицо'
          onReset={resetFields(['legalEntity'])}
        >
          <Form.Item name='legalEntity'>
            <Select
              data-testid='legal-entity-select'
              disabled={false}
              fieldNames={selectFieldNames}
              loading={false}
              options={[]}
              placeholder='Наименование юридического лица'
            />
          </Form.Item>
        </FilterBlock>

        <FilterBlock
          data-testid='address-filter'
          label='Адрес'
          onReset={resetFields(['address'])}
        >
          <Form.Item name='address'>
            <Input placeholder='Ключевое слово' />
          </Form.Item>
        </FilterBlock>

        <FilterBlock
          data-testid='parent-filter'
          label='Родительский склад'
          onReset={resetFields(['parent'])}
        >
          <Form.Item name='parent'>
            <Select
              data-testid='parent-select'
              disabled={false}
              fieldNames={selectFieldNames}
              loading={false}
              options={[]}
              placeholder='Наименование родительского склада'
            />
          </Form.Item>
        </FilterBlock>
      </Form>
    </DrawerFilter>
  )
}

export default WarehouseListFilter
