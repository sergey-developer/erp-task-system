import { Col, Form, InputNumber, Radio, Row, Select, SelectProps } from 'antd'
import isEmpty from 'lodash/isEmpty'
import React, { FC, useEffect, useMemo } from 'react'

import { equipmentConditionOptions } from 'modules/warehouse/constants/equipment'

import DatePicker from 'components/DatePicker'
import DrawerFilter from 'components/Filters/DrawerFilter'
import FilterBlock from 'components/Filters/DrawerFilter/FilterBlock'

import { idAndTitleSelectFieldNames, yesNoOptions } from 'shared/constants/selectField'
import { useSelectAll } from 'shared/hooks/useSelectAll'
import { filterOptionBy } from 'shared/utils/common'
import { getBooleanOptions } from 'shared/utils/selectField'

import { EquipmentFilterFormFields, EquipmentFilterProps } from './types'

const { RangePicker } = DatePicker
const zeroQuantityOptions = getBooleanOptions('Отображать', 'Не отображать')

const EquipmentFilter: FC<EquipmentFilterProps> = ({
  visible,

  values,
  initialValues,

  warehouseList,
  warehouseListIsLoading,

  categoryList,
  categoryListIsLoading,

  ownerList,
  ownerListIsLoading,

  onClose,
  onApply,
}) => {
  const [form] = Form.useForm<EquipmentFilterFormFields>()
  const warehousesFormValue: EquipmentFilterFormFields['warehouses'] = Form.useWatch(
    'warehouses',
    form,
  )

  const onChangeWarehouses: SelectProps['onChange'] = (
    value: EquipmentFilterFormFields['warehouses'],
  ) => form.setFieldValue('warehouses', value)

  const warehouseOptions = useMemo(
    () => warehouseList.map((w) => ({ label: w.title, value: w.id })),
    [warehouseList],
  )

  const warehouseSelectProps = useSelectAll({
    showSelectAll: true,
    value: warehousesFormValue,
    onChange: onChangeWarehouses,
    options: warehouseOptions,
  })

  useEffect(() => {
    if (!isEmpty(values)) {
      form.setFieldsValue(values!)
    } else {
      form.setFieldsValue(initialValues)
    }
  }, [form, values, initialValues])

  const resetFields = (fields?: Array<keyof EquipmentFilterFormFields>) => () => {
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
      data-testid='equipment-filter'
      open={visible}
      onClose={onClose}
      onReset={resetFields()}
      onApply={form.submit}
    >
      <Form<EquipmentFilterFormFields>
        preserve={false}
        layout='vertical'
        form={form}
        onFinish={onApply}
      >
        <FilterBlock
          data-testid='conditions'
          label='Состояние'
          onReset={resetFields(['conditions'])}
        >
          <Form.Item name='conditions'>
            <Select
              data-testid='conditions-select'
              mode='multiple'
              placeholder='Выберите состояние'
              options={equipmentConditionOptions}
            />
          </Form.Item>
        </FilterBlock>

        <FilterBlock data-testid='warehouses' label='Склад' onReset={resetFields(['warehouses'])}>
          <Form.Item name='warehouses'>
            <Select
              {...warehouseSelectProps}
              data-testid='warehouses-select'
              mode='multiple'
              placeholder='Выберите склад'
              loading={warehouseListIsLoading}
              showSearch
              filterOption={filterOptionBy('label')}
            />
          </Form.Item>
        </FilterBlock>

        <FilterBlock
          data-testid='owners'
          label='Владелец оборудования'
          onReset={resetFields(['owners'])}
        >
          <Form.Item name='owners'>
            <Select
              data-testid='owners-select'
              mode='multiple'
              fieldNames={idAndTitleSelectFieldNames}
              placeholder='Выберите владельца оборудования'
              options={ownerList}
              loading={ownerListIsLoading}
            />
          </Form.Item>
        </FilterBlock>

        <FilterBlock data-testid='is-new' label='Новое' onReset={resetFields(['isNew'])}>
          <Form.Item name='isNew'>
            <Radio.Group options={yesNoOptions} />
          </Form.Item>
        </FilterBlock>

        <FilterBlock
          data-testid='is-warranty'
          label='На гарантии'
          onReset={resetFields(['isWarranty'])}
        >
          <Form.Item name='isWarranty'>
            <Radio.Group options={yesNoOptions} />
          </Form.Item>
        </FilterBlock>

        <FilterBlock
          data-testid='is-repaired'
          label='Отремонтированное'
          onReset={resetFields(['isRepaired'])}
        >
          <Form.Item name='isRepaired'>
            <Radio.Group options={yesNoOptions} />
          </Form.Item>
        </FilterBlock>

        <FilterBlock
          data-testid='categories'
          label='Категория'
          onReset={resetFields(['categories'])}
        >
          <Form.Item name='categories'>
            <Select
              data-testid='categories-select'
              mode='multiple'
              fieldNames={idAndTitleSelectFieldNames}
              placeholder='Выберите категорию'
              options={categoryList}
              loading={categoryListIsLoading}
            />
          </Form.Item>
        </FilterBlock>

        <FilterBlock
          data-testid='price'
          label='Стоимость'
          onReset={resetFields(['priceFrom', 'priceTo'])}
        >
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item label='От' name='priceFrom'>
                <InputNumber min={0} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label='До' name='priceTo'>
                <InputNumber min={0} />
              </Form.Item>
            </Col>
          </Row>
        </FilterBlock>

        <FilterBlock
          data-testid='created-at'
          label='Период оприходования'
          onReset={resetFields(['createdAt'])}
        >
          <Form.Item name='createdAt'>
            <RangePicker allowClear={false} />
          </Form.Item>
        </FilterBlock>

        <FilterBlock
          data-testid='zero-quantity'
          label='Оборудование с остатком 0'
          onReset={resetFields(['zeroQuantity'])}
        >
          <Form.Item name='zeroQuantity'>
            <Radio.Group options={zeroQuantityOptions} />
          </Form.Item>
        </FilterBlock>
      </Form>
    </DrawerFilter>
  )
}

export default EquipmentFilter
