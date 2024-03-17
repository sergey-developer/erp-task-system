import { Form, Select } from 'antd'
import isEqual from 'lodash/isEqual'
import React, { FC, useEffect } from 'react'

import DrawerFilter from 'components/Filters/DrawerFilter'
import FilterBlock from 'components/Filters/DrawerFilter/FilterBlock'

import { idAndNameSelectFieldNames, idAndTitleSelectFieldNames } from 'shared/constants/selectField'
import { IdType } from 'shared/types/common'

import {
  FiscalAccumulatorTasksReportFilterFormFields,
  FiscalAccumulatorTasksReportFilterProps,
} from './types'

const FiscalAccumulatorTasksReportFilter: FC<FiscalAccumulatorTasksReportFilterProps> = ({
  values,
  initialValues,

  customers,
  customersIsLoading,
  onChangeCustomers,

  macroregions,
  macroregionsIsLoading,
  onChangeMacroregions,

  supportGroups,
  supportGroupsIsLoading,

  onSubmit,

  ...props
}) => {
  const [form] = Form.useForm<FiscalAccumulatorTasksReportFilterFormFields>()

  useEffect(() => {
    if (!isEqual(initialValues, values)) {
      form.setFieldsValue(values)
    }
  }, [form, values, initialValues])

  const resetFields =
    (fields?: Array<keyof FiscalAccumulatorTasksReportFilterFormFields>) => () => {
      form.resetFields(fields)
    }

  const handleChangeCustomers = (value: IdType[]) => {
    resetFields(['macroregions', 'supportGroups'])()
    onChangeCustomers(value)
  }

  const handleChangeMacroregions = (value: IdType[]) => {
    resetFields(['supportGroups'])()
    onChangeMacroregions(value)
  }

  const handleResetSupportGroupFilters = () => {
    resetFields(['customers', 'macroregions', 'supportGroups'])()
    onChangeCustomers([])
    onChangeMacroregions([])
  }

  const handleResetAll = () => {
    resetFields()()
    onChangeCustomers([])
    onChangeMacroregions([])
  }

  return (
    <DrawerFilter
      {...props}
      data-testid='fiscal-accumulator-tasks-report-filter'
      onReset={handleResetAll}
      onApply={form.submit}
    >
      <Form<FiscalAccumulatorTasksReportFilterFormFields>
        preserve={false}
        layout='vertical'
        form={form}
        initialValues={initialValues}
        onFinish={onSubmit}
      >
        <FilterBlock
          data-testid='support-group-block'
          label='Группа поддержки'
          onReset={handleResetSupportGroupFilters}
        >
          <Form.Item data-testid='customers-form-item' name='customers' label='Клиенты'>
            <Select
              mode='multiple'
              fieldNames={idAndTitleSelectFieldNames}
              loading={customersIsLoading}
              options={customers}
              placeholder='Выберите из списка'
              onChange={handleChangeCustomers}
            />
          </Form.Item>

          <Form.Item data-testid='macroregions-form-item' name='macroregions' label='Макрорегионы'>
            <Select
              mode='multiple'
              fieldNames={idAndTitleSelectFieldNames}
              loading={macroregionsIsLoading}
              options={macroregions}
              placeholder='Выберите из списка'
              onChange={handleChangeMacroregions}
            />
          </Form.Item>

          <Form.Item
            data-testid='support-groups-form-item'
            name='supportGroups'
            label='Группы поддержки'
          >
            <Select
              mode='multiple'
              fieldNames={idAndNameSelectFieldNames}
              loading={supportGroupsIsLoading}
              options={supportGroups}
              placeholder='Выберите из списка'
            />
          </Form.Item>
        </FilterBlock>
      </Form>
    </DrawerFilter>
  )
}

export default FiscalAccumulatorTasksReportFilter
