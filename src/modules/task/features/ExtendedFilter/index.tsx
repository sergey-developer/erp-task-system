import { DrawerProps, Form, Input, Radio, Select, Space } from 'antd'
import React, { FC, useEffect } from 'react'

import { extendedFilterPermissions } from 'modules/task/permissions'
import { workGroupListSelectFieldNames } from 'modules/workGroup/constants/selectFieldNames'
import { useGetWorkGroupList } from 'modules/workGroup/hooks'

import DrawerFilter from 'components/Filters/DrawerFilter'
import FilterBlock from 'components/Filters/DrawerFilter/FilterBlock'
import Permissions from 'components/Permissions'

import { isEqualDeep } from 'shared/utils/common/isEqual'

import {
  searchFieldOptions,
  taskAssignedOptions,
  taskExtendedStatusOptions,
  taskOverdueOptions,
} from './constants'
import { ExtendedFilterFormFields } from './interfaces'
import { CheckboxGroupStyled, RangePickerStyled } from './styles'

export type ExtendedFilterProps = Required<Pick<DrawerProps, 'onClose'>> & {
  formValues: ExtendedFilterFormFields
  initialFormValues: ExtendedFilterFormFields
  onSubmit: (result: ExtendedFilterFormFields) => void
}

const ExtendedFilter: FC<ExtendedFilterProps> = ({
  formValues,
  initialFormValues,
  onClose,
  onSubmit,
}) => {
  const [form] = Form.useForm<ExtendedFilterFormFields>()

  const { data: workGroupList, isFetching: workGroupListIsFetching } =
    useGetWorkGroupList()

  const resetFields =
    (fields?: Array<keyof ExtendedFilterFormFields>) => () => {
      form.resetFields(fields)
    }

  useEffect(() => {
    if (!isEqualDeep(initialFormValues, formValues)) {
      form.setFieldsValue(formValues)
    }
  }, [form, formValues, initialFormValues])

  return (
    <DrawerFilter
      data-testid='extended-filter'
      visible
      onClose={onClose}
      onReset={resetFields()}
      onApply={form.submit}
    >
      <Form<ExtendedFilterFormFields>
        layout='vertical'
        form={form}
        initialValues={initialFormValues}
        onFinish={onSubmit}
      >
        <FilterBlock
          data-testid='extended-filter-status'
          label='Статус'
          onReset={resetFields(['status'])}
        >
          <Form.Item name='status'>
            <CheckboxGroupStyled options={taskExtendedStatusOptions} />
          </Form.Item>
        </FilterBlock>

        <FilterBlock
          data-testid='extended-filter-is-assigned'
          label='Назначенный'
          onReset={resetFields(['isAssigned'])}
        >
          <Form.Item name='isAssigned'>
            <Radio.Group options={taskAssignedOptions} />
          </Form.Item>
        </FilterBlock>

        <FilterBlock
          data-testid='extended-filter-is-overdue'
          label='Просрочено'
          onReset={resetFields(['isOverdue'])}
        >
          <Form.Item name='isOverdue'>
            <Radio.Group options={taskOverdueOptions} />
          </Form.Item>
        </FilterBlock>

        <FilterBlock
          data-testid='extended-filter-complete-at'
          label='Выполнить до'
          onReset={resetFields(['completeAt'])}
        >
          <Form.Item name='completeAt'>
            <RangePickerStyled allowClear={false} />
          </Form.Item>
        </FilterBlock>

        <Permissions config={extendedFilterPermissions.workGroup}>
          {() => (
            <FilterBlock
              data-testid='extended-filter-work-group'
              label='Рабочая группа'
              onReset={resetFields(['workGroupId'])}
            >
              <Form.Item name='workGroupId'>
                <Select
                  data-testid='extended-filter-work-group-select'
                  disabled={workGroupListIsFetching}
                  fieldNames={workGroupListSelectFieldNames}
                  loading={workGroupListIsFetching}
                  options={workGroupList}
                  placeholder='Рабочая группа'
                  showSearch
                  filterOption={(input, option) => {
                    return option
                      ? option.name.toLowerCase().includes(input.toLowerCase())
                      : false
                  }}
                />
              </Form.Item>
            </FilterBlock>
          )}
        </Permissions>

        <FilterBlock
          data-testid='extended-filter-search-by-column'
          label='Поиск по столбцу'
          onReset={resetFields(['searchField', 'searchValue'])}
        >
          <Space direction='vertical' size='middle'>
            <Form.Item name='searchField'>
              <Radio.Group options={searchFieldOptions} />
            </Form.Item>

            <Form.Item name='searchValue'>
              <Input placeholder='Ключевое слово' />
            </Form.Item>
          </Space>
        </FilterBlock>
      </Form>
    </DrawerFilter>
  )
}

export default ExtendedFilter
