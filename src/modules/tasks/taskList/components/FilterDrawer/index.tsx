import {
  Button,
  DrawerProps,
  Form,
  FormInstance,
  Input,
  Radio,
  Select,
  Space,
} from 'antd'
import React, { FC } from 'react'

import TaskStatus from 'components/TaskStatus'
import { TaskStatusEnum } from 'modules/tasks/constants/enums'
import { taskStatusDictionary } from 'modules/tasks/constants/taskStatus'
import useUserRole from 'modules/user/hooks/useUserRole'
import { workGroupListSelectFieldNames } from 'modules/workGroups/workGroupList/constants'
import useGetWorkGroupList from 'modules/workGroups/workGroupList/hooks/useGetWorkGroupList'

import { ExtendedFilterFormFields } from '../TaskListPage/interfaces'
import { searchQueriesDictionary } from './constants'
import FilterBlock from './FilterBlock'
import FilterBlockLabel from './FilterBlockLabel'
import {
  CheckboxGroupStyled,
  DrawerStyled,
  RadioGroupStyled,
  RangePickerStyled,
} from './styles'

export type FilterDrawerProps = Pick<DrawerProps, 'onClose' | 'visible'> & {
  form: FormInstance<ExtendedFilterFormFields>
  initialValues: ExtendedFilterFormFields
  onSubmit: (result: ExtendedFilterFormFields) => void
}

const checkboxStatusOptions = Object.values(TaskStatusEnum).map(
  (taskStatus) => ({
    label: (
      <TaskStatus
        status={taskStatus}
        value={taskStatusDictionary[taskStatus]}
      />
    ),
    value: taskStatus,
  }),
)

const FilterDrawer: FC<FilterDrawerProps> = (props) => {
  const { form, initialValues, onClose, onSubmit, visible } = props

  const { isFirstLineSupportRole, isEngineerRole } = useUserRole()

  const { data: workGroupList, isFetching: workGroupListIsFetching } =
    useGetWorkGroupList()

  const handleResetAll = () => {
    form.resetFields()
  }

  return (
    <DrawerStyled
      extra={
        <Space>
          <Button onClick={handleResetAll}>Сбросить все</Button>
          <Button type='primary' onClick={form.submit}>
            Применить
          </Button>
        </Space>
      }
      title='Фильтры'
      placement='left'
      width={500}
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

          <Form.Item name='status'>
            <CheckboxGroupStyled options={checkboxStatusOptions} />
          </Form.Item>
        </FilterBlock>

        <FilterBlock withDivider>
          <FilterBlockLabel
            onReset={() => form.setFieldsValue({ creationDateRange: null })}
          >
            Период создания
          </FilterBlockLabel>

          <Form.Item name='creationDateRange'>
            <RangePickerStyled allowClear={false} />
          </Form.Item>
        </FilterBlock>

        {!isFirstLineSupportRole && !isEngineerRole && (
          <FilterBlock withDivider>
            <FilterBlockLabel
              onReset={() => form.setFieldsValue({ workGroupId: undefined })}
            >
              Рабочая группа
            </FilterBlockLabel>

            <Form.Item name='workGroupId'>
              <Select
                disabled={workGroupListIsFetching}
                fieldNames={workGroupListSelectFieldNames}
                loading={workGroupListIsFetching}
                options={workGroupList}
                placeholder='Рабочая группа'
                showSearch
                filterOption={(input, option) => {
                  if (!option) {
                    return false
                  }
                  return option.name.toLowerCase().includes(input.toLowerCase())
                }}
              />
            </Form.Item>
          </FilterBlock>
        )}

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
            <RadioGroupStyled>
              {Object.entries(searchQueriesDictionary).map(([name, label]) => (
                <Radio key={name} value={name}>
                  {label}
                </Radio>
              ))}
            </RadioGroupStyled>
          </Form.Item>

          <Form.Item name='searchValue'>
            <Input placeholder='Ключевое слово' />
          </Form.Item>
        </FilterBlock>
      </Form>
    </DrawerStyled>
  )
}

export default FilterDrawer
