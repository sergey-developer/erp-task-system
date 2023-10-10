import { DatePicker, Form, Input, Radio, Select } from 'antd'
import isEqual from 'lodash/isEqual'
import React, { FC, useEffect } from 'react'

import { extendedFilterPermissions } from 'modules/task/permissions'
import { userListSelectFieldNames } from 'modules/user/constants'

import DrawerFilter from 'components/Filters/DrawerFilter'
import FilterBlock from 'components/Filters/DrawerFilter/FilterBlock'
import Permissions from 'components/Permissions'
import Space from 'components/Space'

import { idAndNameSelectFieldNames, idAndTitleSelectFieldNames } from 'shared/constants/selectField'
import { IdType } from 'shared/types/common'

import {
  searchFieldOptions,
  taskAssignedOptions,
  taskExtendedStatusOptions,
  taskOverdueOptions,
} from './constants'
import { CheckboxGroupStyled } from './styles'
import { ExtendedFilterFormFields, ExtendedFilterProps } from './types'

const { RangePicker } = DatePicker

const ExtendedFilter: FC<ExtendedFilterProps> = ({
  formValues,
  initialFormValues,

  workGroupList,
  workGroupListIsLoading,

  userList,
  userListIsLoading,

  customerList,
  customerListIsLoading,
  onChangeCustomers,

  macroregionList,
  macroregionListIsLoading,
  onChangeMacroregions,

  supportGroupList,
  supportGroupListIsLoading,

  onClose,
  onSubmit,
}) => {
  const [form] = Form.useForm<ExtendedFilterFormFields>()

  useEffect(() => {
    if (!isEqual(initialFormValues, formValues)) {
      form.setFieldsValue(formValues)
    }
  }, [form, formValues, initialFormValues])

  const resetFields = (fields?: Array<keyof ExtendedFilterFormFields>) => () => {
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
      data-testid='extended-filter'
      open
      onClose={onClose}
      onReset={handleResetAll}
      onApply={form.submit}
    >
      <Form<ExtendedFilterFormFields>
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
              loading={customerListIsLoading}
              options={customerList}
              placeholder='Выберите из списка'
              onChange={handleChangeCustomers}
            />
          </Form.Item>

          <Form.Item data-testid='macroregions-form-item' name='macroregions' label='Макрорегионы'>
            <Select
              mode='multiple'
              fieldNames={idAndTitleSelectFieldNames}
              loading={macroregionListIsLoading}
              options={macroregionList}
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
              loading={supportGroupListIsLoading}
              options={supportGroupList}
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

        <Permissions config={extendedFilterPermissions.workGroup}>
          {() => (
            <FilterBlock
              data-testid='work-group-block'
              label='Рабочая группа'
              onReset={resetFields(['workGroupId'])}
            >
              <Form.Item name='workGroupId'>
                <Select
                  data-testid='work-group-select'
                  fieldNames={idAndNameSelectFieldNames}
                  loading={workGroupListIsLoading}
                  options={workGroupList}
                  placeholder='Рабочая группа'
                  showSearch
                  filterOption={(input, option) =>
                    option ? option.name.toLowerCase().includes(input.toLowerCase()) : false
                  }
                />
              </Form.Item>
            </FilterBlock>
          )}
        </Permissions>

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
              fieldNames={userListSelectFieldNames}
              loading={userListIsLoading}
              options={userList}
              placeholder='Руководитель'
              showSearch
              filterOption={(input, option) =>
                option ? option.fullName.toLowerCase().includes(input.toLowerCase()) : false
              }
            />
          </Form.Item>
        </FilterBlock>
      </Form>
    </DrawerFilter>
  )
}

export default ExtendedFilter
