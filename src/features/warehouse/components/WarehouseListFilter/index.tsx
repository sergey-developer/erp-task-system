import { Form, Input, Select } from 'antd'
import { useGetWarehouses } from 'features/warehouse/hooks/warehouse'
import React, { FC, useEffect } from 'react'

import DrawerFilter from 'components/Filters/DrawerFilter'
import FilterBlock from 'components/Filters/DrawerFilter/FilterBlock'

import { getLegalEntitiesCatalogErrorMessage } from 'shared/catalogs/legalEntities/api/constants'
import { useGetLegalEntitiesCatalogQuery } from 'shared/catalogs/legalEntities/api/endpoints/legalEntitiesCatalog.endpoints'
import { idAndTitleSelectFieldNames } from 'shared/constants/selectField'
import { showErrorNotification } from 'shared/utils/notifications'

import { WarehouseListFilterFormFields, WarehouseListFilterProps } from './types'

const WarehouseListFilter: FC<WarehouseListFilterProps> = ({
  visible,
  formValues,
  onClose,
  onApply,
}) => {
  const [form] = Form.useForm<WarehouseListFilterFormFields>()

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

  const resetFields = (field?: keyof WarehouseListFilterFormFields) => () => {
    form.resetFields(field ? [field] : undefined)
  }

  return (
    <DrawerFilter
      data-testid='warehouse-list-filter'
      open={visible}
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

export default WarehouseListFilter
