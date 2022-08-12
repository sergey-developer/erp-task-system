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
import _isEqual from 'lodash/isEqual'
import React, { FC } from 'react'

import Permissions from 'components/Permissions'
import { extendedFilterPermissions } from 'modules/task/components/TaskList/permissions/extendedFilter.permissions'
import { workGroupListSelectFieldNames } from 'modules/workGroup/components/WorkGroupList/constants'
import useGetWorkGroupList from 'modules/workGroup/components/WorkGroupList/hooks/useGetWorkGroupList'

import { ExtendedFilterFormFields } from '../TaskListPage/interfaces'
import { checkboxStatusOptions, searchQueriesDictionary } from './constants'
import FilterBlock from './FilterBlock'
import FilterBlockLabel from './FilterBlockLabel'
import { CheckboxGroupStyled, DrawerStyled, RangePickerStyled } from './styles'

export type FilterDrawerProps = Pick<DrawerProps, 'onClose' | 'visible'> & {
  form: FormInstance<ExtendedFilterFormFields>
  initialFormValues: ExtendedFilterFormFields
  onSubmit: (result: ExtendedFilterFormFields) => void
}

const FilterDrawer: FC<FilterDrawerProps> = ({
  form,
  initialFormValues,
  onClose,
  onSubmit,
  visible,
}) => {
  const breakpoints = useBreakpoint()

  const statusValue = Form.useWatch('status', form)
  const creationDateRangeValue = Form.useWatch('creationDateRange', form)
  const workGroupIdValue = Form.useWatch('workGroupId', form)
  const searchFieldValue = Form.useWatch('searchField', form)
  const searchValueValue = Form.useWatch('searchValue', form)

  const formValues: ExtendedFilterFormFields = {
    searchValue: searchValueValue,
    status: statusValue,
    creationDateRange: creationDateRangeValue,
    workGroupId: workGroupIdValue,
    searchField: searchFieldValue,
  }

  const valuesNotChanged = _isEqual(initialFormValues, formValues)

  const { data: workGroupList, isFetching: workGroupListIsFetching } =
    useGetWorkGroupList()

  const handleResetAll = () => {
    form.resetFields()
  }

  return (
    <DrawerStyled
      $breakpoints={breakpoints}
      footer={
        <Row justify='end'>
          <Space>
            <Button onClick={handleResetAll} disabled={valuesNotChanged}>
              Сбросить все
            </Button>

            <Button
              type='primary'
              onClick={form.submit}
              disabled={valuesNotChanged}
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
        <FilterBlock withDivider>
          <FilterBlockLabel
            label='Статус'
            onReset={() => form.setFieldsValue({ status: [] })}
          />

          <Form.Item name='status'>
            <CheckboxGroupStyled options={checkboxStatusOptions} />
          </Form.Item>
        </FilterBlock>

        <FilterBlock withDivider>
          <FilterBlockLabel
            label='Период создания'
            onReset={() => form.setFieldsValue({ creationDateRange: null })}
          />

          <Form.Item name='creationDateRange'>
            <RangePickerStyled allowClear={false} />
          </Form.Item>
        </FilterBlock>

        <Permissions config={extendedFilterPermissions.workGroup}>
          {() => (
            <FilterBlock withDivider>
              <FilterBlockLabel
                label='Рабочая группа'
                onReset={() => form.setFieldsValue({ workGroupId: undefined })}
              />

              <Form.Item name='workGroupId'>
                <Select
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

        <FilterBlock withDivider={false}>
          <FilterBlockLabel
            label='Поиск по столбцу'
            onReset={() =>
              form.setFieldsValue({
                searchField: initialFormValues.searchField,
                searchValue: '',
              })
            }
          />

          <Space direction='vertical' size='middle'>
            <Form.Item name='searchField'>
              <Radio.Group>
                {Object.entries(searchQueriesDictionary).map(
                  ([name, label]) => (
                    <Radio key={name} value={name}>
                      {label}
                    </Radio>
                  ),
                )}
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

export default FilterDrawer
