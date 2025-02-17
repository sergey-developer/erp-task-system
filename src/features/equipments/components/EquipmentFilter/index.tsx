import { Col, Form, InputNumber, Radio, Row, Select, SelectProps } from 'antd'
import { equipmentConditionOptions } from 'features/equipments/constants'
import isEmpty from 'lodash/isEmpty'
import React, { FC, useCallback, useEffect, useMemo } from 'react'

import DatePicker from 'components/DatePicker'
import DrawerFilter from 'components/Filters/DrawerFilter'
import FilterBlock from 'components/Filters/DrawerFilter/FilterBlock'

import { idAndTitleSelectFieldNames, yesNoOptions } from 'shared/constants/selectField'
import { useSelectAll } from 'shared/hooks/useSelectAll'
import { filterOptionBy } from 'shared/utils/common'
import { getBooleanOptions } from 'shared/utils/selectField'

import { EquipmentFilterProps, EquipmentsFilterFormFields } from './types'

const { RangePicker } = DatePicker
const zeroQuantityOptions = getBooleanOptions('Отображать', 'Не отображать')

const EquipmentFilter: FC<EquipmentFilterProps> = ({
  visible,

  values,
  initialValues,

  locations,
  locationsIsLoading,

  categories,
  categoriesIsLoading,

  owners,
  ownersIsLoading,

  onClose,
  onApply,
}) => {
  const [form] = Form.useForm<EquipmentsFilterFormFields>()
  const locationsFormValue: EquipmentsFilterFormFields['locations'] = Form.useWatch(
    'locations',
    form,
  )

  const onChangeLocations = useCallback<NonNullable<SelectProps['onChange']>>(
    (value: EquipmentsFilterFormFields['locations']) => form.setFieldValue('locations', value),
    [form],
  )

  const locationOptions = useMemo(
    () => locations.map((w) => ({ label: w.title, value: w.id })),
    [locations],
  )

  const locationSelectProps = useSelectAll({
    showSelectAll: true,
    value: locationsFormValue,
    onChange: onChangeLocations,
    options: locationOptions,
  })

  useEffect(() => {
    if (!isEmpty(values)) {
      form.setFieldsValue(values!)
    } else {
      form.setFieldsValue(initialValues)
    }
  }, [form, values, initialValues])

  const resetFields = (fields?: Array<keyof EquipmentsFilterFormFields>) => () => {
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
      data-testid='equipmentDetail-filter'
      open={visible}
      onClose={onClose}
      onReset={resetFields()}
      onApply={form.submit}
    >
      <Form<EquipmentsFilterFormFields>
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

        <FilterBlock
          data-testid='locations'
          label='Местонахождение'
          onReset={resetFields(['locations'])}
        >
          <Form.Item name='locations'>
            <Select
              {...locationSelectProps}
              data-testid='locations-select'
              mode='multiple'
              placeholder='Выберите местонахождение'
              loading={locationsIsLoading}
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
              options={owners}
              loading={ownersIsLoading}
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
              options={categories}
              loading={categoriesIsLoading}
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
