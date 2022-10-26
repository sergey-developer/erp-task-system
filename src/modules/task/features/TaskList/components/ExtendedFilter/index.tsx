import {
  Button,
  DrawerProps,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
} from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import React, { FC, useEffect } from 'react'

import Permissions from 'components/Permissions'
import { extendedFilterPermissions } from 'modules/task/features/TaskList/permissions'
import { workGroupListSelectFieldNames } from 'modules/workGroup/features/WorkGroupList/constants/selectFieldNames'
import useGetWorkGroupList from 'modules/workGroup/features/WorkGroupList/hooks/useGetWorkGroupList'
import { isEqualDeep } from 'shared/utils/common/isEqual'

import {
  searchFieldOptions,
  taskAssignedOptions,
  taskExtendedStatusOptions,
  taskOverdueOptions,
} from './constants'
import FilterBlock from './FilterBlock'
import FilterBlockLabel from './FilterBlockLabel'
import { ExtendedFilterFormFields } from './interfaces'
import { CheckboxGroupStyled, DrawerStyled, RangePickerStyled } from './styles'

export type ExtendedFilterProps = Pick<DrawerProps, 'onClose'> & {
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
  const breakpoints = useBreakpoint()

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
    <DrawerStyled
      $breakpoints={breakpoints}
      footer={
        <Row justify='end'>
          <Space>
            <Button onClick={resetFields()}>Сбросить все</Button>

            <Button type='primary' onClick={form.submit}>
              Применить
            </Button>
          </Space>
        </Row>
      }
      title='Фильтры'
      placement='left'
      width={breakpoints.xxl ? 500 : 380}
      onClose={onClose}
      visible
    >
      <Form<ExtendedFilterFormFields>
        layout='vertical'
        form={form}
        initialValues={initialFormValues}
        onFinish={onSubmit}
      >
        <FilterBlock withDivider data-testid='filter-extended-status'>
          <FilterBlockLabel label='Статус' onReset={resetFields(['status'])} />

          <Form.Item name='status'>
            <CheckboxGroupStyled options={taskExtendedStatusOptions} />
          </Form.Item>
        </FilterBlock>

        <FilterBlock withDivider data-testid='filter-extended-is-assigned'>
          <FilterBlockLabel
            label='Назначенный'
            onReset={resetFields(['isAssigned'])}
          />

          <Form.Item name='isAssigned'>
            <Radio.Group options={taskAssignedOptions} />
          </Form.Item>
        </FilterBlock>

        <FilterBlock withDivider data-testid='filter-extended-is-overdue'>
          <FilterBlockLabel
            label='Просрочено'
            onReset={resetFields(['isOverdue'])}
          />

          <Form.Item name='isOverdue'>
            <Radio.Group options={taskOverdueOptions} />
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
              <Radio.Group options={searchFieldOptions} />
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
