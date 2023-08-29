import { Form, Radio, Select, InputNumber, DatePicker, Row, Col } from 'antd'
import isEmpty from 'lodash/isEmpty'
import isUndefined from 'lodash/isUndefined'
import React, { FC, useEffect } from 'react'

import DrawerFilter from 'components/Filters/DrawerFilter'
import FilterBlock from 'components/Filters/DrawerFilter/FilterBlock'

import { idAndTitleSelectFieldNames, yesNoOptions } from 'shared/constants/selectField'

import { conditionOptions } from './options'
import { EquipmentFilterFormFields, EquipmentFilterProps } from './types'

const { RangePicker } = DatePicker

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
        const value = initialValues[fieldKey]
        if (!isUndefined(value)) {
          form.setFieldsValue({ [fieldKey]: value })
        }
      })
    }
  }

  return (
    <DrawerFilter
      data-testid='equipment-filter'
      visible={visible}
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
              options={conditionOptions}
            />
          </Form.Item>
        </FilterBlock>

        <FilterBlock data-testid='warehouses' label='Склад' onReset={resetFields(['warehouses'])}>
          <Form.Item name='warehouses'>
            <Select
              data-testid='warehouses-select'
              mode='multiple'
              fieldNames={idAndTitleSelectFieldNames}
              placeholder='Выберите склад'
              options={warehouseList}
              loading={warehouseListIsLoading}
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
          <Row>
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
      </Form>
    </DrawerFilter>
  )
}

export default EquipmentFilter
