import {
  Button,
  DrawerProps,
  Form,
  FormInstance,
  Input,
  Radio,
  Row,
  Select,
  Space,
} from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import React, { FC } from 'react'

import Permissions from 'components/Permissions'
import { extendedFilterPermissions } from 'modules/task/features/TaskList/permissions/extendedFilter.permissions'
import { workGroupListSelectFieldNames } from 'modules/workGroup/features/WorkGroupList/constants/selectFieldNames'
import useGetWorkGroupList from 'modules/workGroup/features/WorkGroupList/hooks/useGetWorkGroupList'
import { isEqualDeep } from 'shared/utils/common/isEqual'

import {
  checkboxExtraStatusOptions,
  checkboxFilterStatusOptions,
  checkboxStatusOptions,
  searchQueriesDict,
} from './constants'
import FilterBlock from './FilterBlock'
import FilterBlockLabel from './FilterBlockLabel'
import { ExtendedFilterFormFields } from './interfaces'
import { CheckboxGroupStyled, DrawerStyled, RangePickerStyled } from './styles'

export type ExtendedFilterProps = Pick<DrawerProps, 'onClose' | 'visible'> & {
  form: FormInstance<ExtendedFilterFormFields>
  initialFormValues: ExtendedFilterFormFields
  onSubmit: (result: ExtendedFilterFormFields) => void
}

const ExtendedFilter: FC<ExtendedFilterProps> = ({
  form,
  initialFormValues,
  onClose,
  onSubmit,
  visible,
}) => {
  const breakpoints = useBreakpoint()

  const { data: workGroupList, isFetching: workGroupListIsFetching } =
    useGetWorkGroupList()

  const statusValue = Form.useWatch('status', form)
  const extraStatusValue = Form.useWatch('extraStatus', form)
  const filterStatusValue = Form.useWatch('filterStatus', form)
  const completeAtValue = Form.useWatch('completeAt', form)
  const workGroupIdValue = Form.useWatch('workGroupId', form)
  const searchFieldValue = Form.useWatch('searchField', form)
  const searchValueValue = Form.useWatch('searchValue', form)

  const formValues: ExtendedFilterFormFields = {
    searchValue: searchValueValue,
    status: statusValue,
    extraStatus: extraStatusValue,
    filterStatus: filterStatusValue,
    completeAt: completeAtValue,
    workGroupId: workGroupIdValue,
    searchField: searchFieldValue,
  }

  const isValuesNotChanged = isEqualDeep(initialFormValues, formValues)

  const resetFields =
    (fields?: Array<keyof ExtendedFilterFormFields>) => () => {
      form.resetFields(fields)
    }

  return (
    <DrawerStyled
      data-testid='filter-extended'
      $breakpoints={breakpoints}
      footer={
        <Row justify='end'>
          <Space>
            <Button onClick={resetFields()} disabled={isValuesNotChanged}>
              Сбросить все
            </Button>

            <Button
              type='primary'
              onClick={form.submit}
              disabled={isValuesNotChanged}
            >
              Применить
            </Button>
          </Space>
        </Row>
      }
      title='Фильтры'
      placement='left'
      width={breakpoints.xxl ? 500 : 380}
      onClose={onClose}
      visible={visible}
    >
      <Form<ExtendedFilterFormFields>
        layout='vertical'
        form={form}
        initialValues={initialFormValues}
        onFinish={onSubmit}
      >
        <FilterBlock withDivider data-testid='filter-extended-status'>
          <FilterBlockLabel
            label='Статус'
            onReset={resetFields(['status', 'extraStatus', 'filterStatus'])}
          />

          <Form.Item name='extraStatus'>
            <CheckboxGroupStyled options={checkboxExtraStatusOptions} />
          </Form.Item>

          <Form.Item name='status'>
            <CheckboxGroupStyled options={checkboxStatusOptions} />
          </Form.Item>

          <Form.Item name='filterStatus'>
            <CheckboxGroupStyled options={checkboxFilterStatusOptions} />
          </Form.Item>
        </FilterBlock>

        <FilterBlock withDivider data-testid='filter-extended-complete-at'>
          <FilterBlockLabel
            label='Выполнить до'
            onReset={resetFields(['completeAt'])}
          />

          <Form.Item name='completeAt'>
            <RangePickerStyled allowClear={false} />
          </Form.Item>
        </FilterBlock>

        <Permissions config={extendedFilterPermissions.workGroup}>
          {() => (
            <FilterBlock withDivider data-testid='filter-extended-work-group'>
              <FilterBlockLabel
                label='Рабочая группа'
                onReset={resetFields(['workGroupId'])}
              />

              <Form.Item name='workGroupId'>
                <Select
                  data-testid='filter-extended-work-group-select'
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
          withDivider={false}
          data-testid='filter-extended-search-by-column'
        >
          <FilterBlockLabel
            label='Поиск по столбцу'
            onReset={resetFields(['searchField', 'searchValue'])}
          />

          <Space direction='vertical' size='middle'>
            <Form.Item name='searchField'>
              <Radio.Group>
                {Object.entries(searchQueriesDict).map(([name, label]) => (
                  <Radio key={name} value={name}>
                    {label}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>

            <Form.Item name='searchValue'>
              <Input placeholder='Ключевое слово' />
            </Form.Item>
          </Space>
        </FilterBlock>
      </Form>
    </DrawerStyled>
  )
}

export default ExtendedFilter
