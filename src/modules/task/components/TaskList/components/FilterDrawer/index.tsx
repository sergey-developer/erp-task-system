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
import TaskStatus from 'components/TaskStatus'
import { extendedFilterPermissions } from 'modules/task/components/TaskList/permissions/extendedFilter.permissions'
import { TaskStatusEnum } from 'modules/task/constants/enums'
import { taskStatusDict } from 'modules/task/constants/taskStatus'
import { workGroupListSelectFieldNames } from 'modules/workGroup/components/WorkGroupList/constants'
import useGetWorkGroupList from 'modules/workGroup/components/WorkGroupList/hooks/useGetWorkGroupList'

import { ExtendedFilterFormFields } from '../TaskListPage/interfaces'
import { searchQueriesDictionary } from './constants'
import FilterBlock from './FilterBlock'
import FilterBlockLabel from './FilterBlockLabel'
import { CheckboxGroupStyled, DrawerStyled, RangePickerStyled } from './styles'

export type FilterDrawerProps = Pick<DrawerProps, 'onClose' | 'visible'> & {
  form: FormInstance<ExtendedFilterFormFields>
  initialValues: ExtendedFilterFormFields
  onSubmit: (result: ExtendedFilterFormFields) => void
}

const checkboxStatusOptions = Object.values(TaskStatusEnum)
  .filter((status) => status !== TaskStatusEnum.Closed)
  .map((taskStatus) => ({
    label: (
      <TaskStatus status={taskStatus} value={taskStatusDict[taskStatus]} />
    ),
    value: taskStatus,
  }))

const FilterDrawer: FC<FilterDrawerProps> = (props) => {
  const { form, initialValues, onClose, onSubmit, visible } = props

  const breakpoints = useBreakpoint()

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
            <Button onClick={handleResetAll}>Сбросить все</Button>

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
      visible={visible}
    >
      <Form<ExtendedFilterFormFields>
        form={form}
        initialValues={initialValues}
        onFinish={onSubmit}
      >
        <FilterBlock withDivider>
          <FilterBlockLabel onReset={() => form.setFieldsValue({ status: [] })}>
            Статус
          </FilterBlockLabel>

          <Form.Item name='status' className='mb-0'>
            <CheckboxGroupStyled options={checkboxStatusOptions} />
          </Form.Item>
        </FilterBlock>

        <FilterBlock withDivider>
          <FilterBlockLabel
            onReset={() => form.setFieldsValue({ creationDateRange: null })}
          >
            Период создания
          </FilterBlockLabel>

          <Form.Item name='creationDateRange' className='mb-0'>
            <RangePickerStyled allowClear={false} />
          </Form.Item>
        </FilterBlock>

        <Permissions config={extendedFilterPermissions.workGroup}>
          {() => (
            <FilterBlock withDivider>
              <FilterBlockLabel
                onReset={() => form.setFieldsValue({ workGroupId: undefined })}
              >
                Рабочая группа
              </FilterBlockLabel>

              <Form.Item name='workGroupId' className='mb-0'>
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
            onReset={() =>
              form.setFieldsValue({
                searchField: initialValues.searchField,
                searchValue: '',
              })
            }
          >
            Поиск по столбцу
          </FilterBlockLabel>

          <Form.Item name='searchField'>
            <Radio.Group>
              {Object.entries(searchQueriesDictionary).map(([name, label]) => (
                <Radio key={name} value={name}>
                  {label}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>

          <Form.Item name='searchValue' className='mb-0'>
            <Input placeholder='Ключевое слово' />
          </Form.Item>
        </FilterBlock>
      </Form>
    </DrawerStyled>
  )
}

export default FilterDrawer
