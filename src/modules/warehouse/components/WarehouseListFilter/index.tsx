import { Form, Input, Select } from 'antd'
import React, { FC, useEffect } from 'react'

import { getLegalEntityListMessages } from 'modules/warehouse/constants'
import { useGetWarehouseList } from 'modules/warehouse/hooks'
import { useGetLegalEntityListQuery } from 'modules/warehouse/services/legalEntityApi.service'

import DrawerFilter from 'components/Filters/DrawerFilter'
import FilterBlock from 'components/Filters/DrawerFilter/FilterBlock'

import { showErrorNotification } from 'shared/utils/notifications'

import { selectFieldNames } from './constants'
import {
  WarehouseListFilterFormFields,
  WarehouseListFilterProps,
} from './types'

const WarehouseListFilter: FC<WarehouseListFilterProps> = ({
  visible,
  formValues,
  onClose,
  onApply,
}) => {
  const [form] = Form.useForm<WarehouseListFilterFormFields>()

  const {
    isFetching: warehouseListIsFetching,
    currentData: warehouseList = [],
  } = useGetWarehouseList()

  const {
    currentData: legalEntityList = [],
    isFetching: legalEntityListIsFetching,
    isError: isGetLegalEntityListError,
  } = useGetLegalEntityListQuery()

  useEffect(() => {
    if (isGetLegalEntityListError) {
      showErrorNotification(getLegalEntityListMessages.commonError)
    }
  }, [isGetLegalEntityListError])

  useEffect(() => {
    if (formValues) {
      form.setFieldsValue(formValues)
    }
  }, [form, formValues])

  const resetFields = (field?: keyof WarehouseListFilterFormFields) => () => {
    form.resetFields(field ? [field] : undefined)
  }

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
          onReset={resetFields('title')}
        >
          <Form.Item name='title'>
            <Input placeholder='Ключевое слово' />
          </Form.Item>
        </FilterBlock>

        <FilterBlock
          data-testid='legal-entity-filter'
          label='Юридическое лицо'
          onReset={resetFields('legalEntity')}
        >
          <Form.Item name='legalEntity'>
            <Select
              data-testid='legal-entity-select'
              fieldNames={selectFieldNames}
              loading={legalEntityListIsFetching}
              options={legalEntityList}
              placeholder='Наименование юридического лица'
            />
          </Form.Item>
        </FilterBlock>

        <FilterBlock
          data-testid='address-filter'
          label='Адрес'
          onReset={resetFields('address')}
        >
          <Form.Item name='address'>
            <Input placeholder='Ключевое слово' />
          </Form.Item>
        </FilterBlock>

        <FilterBlock
          data-testid='parent-filter'
          label='Родительский склад'
          onReset={resetFields('parent')}
        >
          <Form.Item name='parent'>
            <Select
              data-testid='parent-select'
              fieldNames={selectFieldNames}
              loading={warehouseListIsFetching}
              options={warehouseList}
              placeholder='Наименование родительского склада'
            />
          </Form.Item>
        </FilterBlock>
      </Form>
    </DrawerFilter>
  )
}

export default WarehouseListFilter
