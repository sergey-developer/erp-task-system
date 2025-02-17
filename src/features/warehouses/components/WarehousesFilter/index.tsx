import { Form, Input, Select } from 'antd'
import { useGetWarehouses } from 'features/warehouses/hooks'
import React, { FC, useEffect } from 'react'

import DrawerFilter from 'components/Filters/DrawerFilter'
import FilterBlock from 'components/Filters/DrawerFilter/FilterBlock'

import { getLegalEntitiesCatalogErrorMessage } from 'shared/catalogs/legalEntities/api/constants'
import { useGetLegalEntitiesCatalogQuery } from 'shared/catalogs/legalEntities/api/endpoints/legalEntitiesCatalog.endpoints'
import { idAndTitleSelectFieldNames } from 'shared/constants/selectField'
import { showErrorNotification } from 'shared/utils/notifications'

import { WarehousesFilterFormFields, WarehousesFilterProps } from './types'

const WarehousesFilter: FC<WarehousesFilterProps> = ({ visible, formValues, onClose, onApply }) => {
  const [form] = Form.useForm<WarehousesFilterFormFields>()

  const { isFetching: warehousesIsFetching, currentData: warehouses = [] } = useGetWarehouses()

  const {
    currentData: legalEntities = [],
    isFetching: legalEntitiesIsFetching,
    isError: isGetLegalEntitiesError,
  } = useGetLegalEntitiesCatalogQuery()

  useEffect(() => {
    if (isGetLegalEntitiesError) {
      showErrorNotification(getLegalEntitiesCatalogErrorMessage)
    }
  }, [isGetLegalEntitiesError])

  useEffect(() => {
    if (formValues) {
      form.setFieldsValue(formValues)
    }
  }, [form, formValues])

  const resetFields = (field?: keyof WarehousesFilterFormFields) => () => {
    form.resetFields(field ? [field] : undefined)
  }

  return (
    <DrawerFilter
      data-testid='warehouseDetail-list-filter'
      open={visible}
      onClose={onClose}
      onReset={resetFields()}
      onApply={form.submit}
    >
      <Form<WarehousesFilterFormFields>
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
              fieldNames={idAndTitleSelectFieldNames}
              loading={legalEntitiesIsFetching}
              options={legalEntities}
              placeholder='Наименование юридического лица'
            />
          </Form.Item>
        </FilterBlock>

        <FilterBlock data-testid='address-filter' label='Адрес' onReset={resetFields('address')}>
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
              fieldNames={idAndTitleSelectFieldNames}
              loading={warehousesIsFetching}
              options={warehouses}
              placeholder='Наименование родительского склада'
            />
          </Form.Item>
        </FilterBlock>
      </Form>
    </DrawerFilter>
  )
}

export default WarehousesFilter
