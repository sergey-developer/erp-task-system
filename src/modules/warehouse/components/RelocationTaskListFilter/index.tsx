import { Form, Select } from 'antd'
import isEmpty from 'lodash/isEmpty'
import React, { FC, useEffect } from 'react'

import {
  relocationTaskStatusOptions,
  relocationTaskTypeOptions,
} from 'modules/warehouse/constants/relocationTask'

import DatePicker from 'components/DatePicker'
import DrawerFilter from 'components/Filters/DrawerFilter'
import FilterBlock from 'components/Filters/DrawerFilter/FilterBlock'

import {
  idAndFullNameSelectFieldNames,
  idAndTitleSelectFieldNames,
} from 'shared/constants/selectField'
import { filterOptionBy } from 'shared/utils/common'

import { RelocationTaskListFilterFormFields, RelocationTaskListFilterProps } from './types'

const { RangePicker } = DatePicker

const RelocationTaskListFilter: FC<RelocationTaskListFilterProps> = ({
  values,
  initialValues,

  users,
  usersIsLoading,

  locations,
  locationsIsLoading,

  onApply,

  ...props
}) => {
  const [form] = Form.useForm<RelocationTaskListFilterFormFields>()

  useEffect(() => {
    if (isEmpty(values)) {
      form.setFieldsValue(initialValues)
    } else {
      form.setFieldsValue(values!)
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

        <FilterBlock data-testid='type-block' label='Тип заявки' onReset={resetFields(['type'])}>
          <Form.Item name='type'>
            <Select
              data-testid='type-select'
              mode='multiple'
              placeholder='Тип заявки'
              options={relocationTaskTypeOptions}
            />
          </Form.Item>
        </FilterBlock>

        <FilterBlock
          data-testid='deadline-at-block'
          label='Период выполнения'
          onReset={resetFields(['deadlineAt'])}
        >
          <Form.Item data-testid='deadline-at-form-item' name='deadlineAt'>
            <RangePicker allowEmpty={[true, true]} />
          </Form.Item>
        </FilterBlock>

        <FilterBlock
          data-testid='locations-from-block'
          label='Объект выбытия'
          onReset={resetFields(['locationsFrom'])}
        >
          <Form.Item data-testid='locations-from-form-item' name='locationsFrom'>
            <Select
              data-testid='locations-from-select'
              mode='multiple'
              placeholder='Объект выбытия'
              filterOption={filterOptionBy('title')}
              fieldNames={idAndTitleSelectFieldNames}
              options={locations}
              loading={locationsIsLoading}
            />
          </Form.Item>
        </FilterBlock>

        <FilterBlock
          data-testid='locations-to-block'
          label='Объект прибытия'
          onReset={resetFields(['locationsTo'])}
        >
          <Form.Item data-testid='locations-to-form-item' name='locationsTo'>
            <Select
              data-testid='locations-to-select'
              mode='multiple'
              placeholder='Объект прибытия'
              filterOption={filterOptionBy('title')}
              fieldNames={idAndTitleSelectFieldNames}
              options={locations}
              loading={locationsIsLoading}
            />
          </Form.Item>
        </FilterBlock>

        <FilterBlock
          data-testid='executor-block'
          label='Исполнитель'
          onReset={resetFields(['executor'])}
        >
          <Form.Item data-testid='executor-form-item' name='executor'>
            <Select
              data-testid='executor-select'
              placeholder='Исполнитель'
              showSearch
              filterOption={filterOptionBy('fullName')}
              fieldNames={idAndFullNameSelectFieldNames}
              options={users}
              loading={usersIsLoading}
            />
          </Form.Item>
        </FilterBlock>

        <FilterBlock
          data-testid='controller-block'
          label='Контролер'
          onReset={resetFields(['controller'])}
        >
          <Form.Item data-testid='controller-form-item' name='controller'>
            <Select
              data-testid='controller-select'
              placeholder='Контролер'
              showSearch
              filterOption={filterOptionBy('fullName')}
              fieldNames={idAndFullNameSelectFieldNames}
              options={users}
              loading={usersIsLoading}
            />
          </Form.Item>
        </FilterBlock>

        <FilterBlock
          data-testid='created-by-block'
          label='Инициатор'
          onReset={resetFields(['createdBy'])}
        >
          <Form.Item data-testid='created-by-form-item' name='createdBy'>
            <Select
              data-testid='created-by-select'
              placeholder='Инициатор'
              showSearch
              filterOption={filterOptionBy('fullName')}
              fieldNames={idAndFullNameSelectFieldNames}
              options={users}
              loading={usersIsLoading}
            />
          </Form.Item>
        </FilterBlock>

        <FilterBlock
          data-testid='created-at-block'
          label='Период создания'
          onReset={resetFields(['createdAt'])}
        >
          <Form.Item data-testid='created-at-form-item' name='createdAt'>
            <RangePicker allowEmpty={[true, true]} />
          </Form.Item>
        </FilterBlock>
      </Form>
    </DrawerFilter>
  )
}

export default RelocationTaskListFilter
