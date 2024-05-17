import { Form, Input, Radio, Select } from 'antd'
import isEqual from 'lodash/isEqual'
import React, { FC, useEffect } from 'react'

import DatePicker from 'components/DatePicker'
import DrawerFilter from 'components/Filters/DrawerFilter'
import FilterBlock from 'components/Filters/DrawerFilter/FilterBlock'
import Space from 'components/Space'

import {
  idAndFullNameSelectFieldNames,
  idAndNameSelectFieldNames,
  idAndTitleSelectFieldNames,
} from 'shared/constants/selectField'
import { IdType } from 'shared/types/common'
import { filterOptionBy } from 'shared/utils/common'

import {
  searchFieldOptions,
  taskAssignedOptions,
  taskExtendedStatusOptions,
  taskOverdueOptions,
} from './constants'
import { CheckboxGroupStyled } from './styles'
import { TasksFilterFormFields, TasksFilterProps } from './types'

const { RangePicker } = DatePicker

const TasksFilter: FC<TasksFilterProps> = ({
  permissions,

  formValues,
  initialFormValues,

  workGroups,
  workGroupsIsLoading,

  users,
  usersIsLoading,

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
  const [form] = Form.useForm<TasksFilterFormFields>()

  useEffect(() => {
    if (!isEqual(initialFormValues, formValues)) {
      form.setFieldsValue(formValues)
    }
  }, [form, formValues, initialFormValues])

  const resetFields = (fields?: Array<keyof TasksFilterFormFields>) => () => {
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
      data-testid='extended-filter'
      onReset={handleResetAll}
      onApply={form.submit}
    >
      <Form<TasksFilterFormFields>
        preserve={false}
        layout='vertical'
        form={form}
        initialValues={initialFormValues}
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

        <FilterBlock data-testid='status-block' label='Статус' onReset={resetFields(['status'])}>
          <Form.Item name='status'>
            <CheckboxGroupStyled options={taskExtendedStatusOptions} />
          </Form.Item>
        </FilterBlock>

        <FilterBlock
          data-testid='creation-date-block'
          label='Период создания'
          onReset={resetFields(['creationDate'])}
        >
          <Form.Item name='creationDate'>
            <RangePicker allowClear={false} />
          </Form.Item>
        </FilterBlock>

        <FilterBlock
          data-testid='is-assigned-block'
          label='Назначенный'
          onReset={resetFields(['isAssigned'])}
        >
          <Form.Item name='isAssigned'>
            <Radio.Group options={taskAssignedOptions} />
          </Form.Item>
        </FilterBlock>

        <FilterBlock
          data-testid='is-overdue-block'
          label='Просрочено'
          onReset={resetFields(['isOverdue'])}
        >
          <Form.Item name='isOverdue'>
            <Radio.Group options={taskOverdueOptions} />
          </Form.Item>
        </FilterBlock>

        <FilterBlock
          data-testid='complete-at-block'
          label='Выполнить до'
          onReset={resetFields(['completeAt'])}
        >
          <Form.Item name='completeAt'>
            <RangePicker allowClear={false} />
          </Form.Item>
        </FilterBlock>

        {(permissions.selfWorkGroupsRead || permissions.anyWorkGroupsRead) && (
          <FilterBlock
            data-testid='work-group-block'
            label='Рабочая группа'
            onReset={resetFields(['workGroupId'])}
          >
            <Form.Item name='workGroupId'>
              <Select
                data-testid='work-group-select'
                fieldNames={idAndNameSelectFieldNames}
                loading={workGroupsIsLoading}
                options={workGroups}
                placeholder='Рабочая группа'
                showSearch
                filterOption={filterOptionBy('name')}
              />
            </Form.Item>
          </FilterBlock>
        )}

        <FilterBlock
          data-testid='search-by-column-block'
          label='Поиск по столбцу'
          onReset={resetFields(['searchField', 'searchValue'])}
        >
          <Space $block direction='vertical' size='middle'>
            <Form.Item name='searchField'>
              <Radio.Group options={searchFieldOptions} />
            </Form.Item>

            <Form.Item name='searchValue'>
              <Input placeholder='Ключевое слово' />
            </Form.Item>
          </Space>
        </FilterBlock>

        <FilterBlock
          data-testid='manager-block'
          label='Руководитель'
          onReset={resetFields(['manager'])}
        >
          <Form.Item name='manager'>
            <Select
              data-testid='manager-select'
              fieldNames={idAndFullNameSelectFieldNames}
              loading={usersIsLoading}
              options={users}
              placeholder='Руководитель'
              showSearch
              filterOption={filterOptionBy('fullName')}
            />
          </Form.Item>
        </FilterBlock>
      </Form>
    </DrawerFilter>
  )
}

export default TasksFilter
