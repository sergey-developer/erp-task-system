import { Button, DrawerProps, Form, FormProps, Input, Radio, Space } from 'antd'
import React, { FC } from 'react'

import {
  ExtendedFilterFormFields,
  SmartSearchFields,
  TaskStatusEnum,
} from 'modules/tasks/models'
import BidColumn from 'modules/tasks/taskList/components/TaskTable/BidColumn'

import { taskStatusDictionary } from './constants'
import FilterBlock from './FilterBlock'
import FilterBlockLabel from './FilterBlockLabel'
import {
  CheckboxGroupStyled,
  DrawerStyled,
  RadioGroupStyled,
  RangePickerStyled,
} from './styles'

export type FilterDrawerProps = Pick<DrawerProps, 'onClose' | 'visible'> & {
  initialValues: ExtendedFilterFormFields
  onSubmit: (result: ExtendedFilterFormFields) => void
}

const checkboxStatusOptions = Object.values(TaskStatusEnum).map(
  (taskStatus) => ({
    label: (
      <BidColumn status={taskStatus} value={taskStatusDictionary[taskStatus]} />
    ),
    value: taskStatus,
  }),
)

const searchableFields: Record<keyof SmartSearchFields, any> = {
  smartSearchDescription: 'Тема',
  smartSearchName: 'Объект',
  smartSearchAssignee: 'Исполнитель',
}

const INITIAL_SEARCH_FIELD: keyof SmartSearchFields = 'smartSearchDescription'

const FilterDrawer: FC<FilterDrawerProps> = (props) => {
  const { initialValues, onClose, onSubmit, visible } = props

  console.log('initialValues', initialValues)

  const [form] = Form.useForm<ExtendedFilterFormFields>()

  const handleResetAll = () => {
    form.resetFields()
  }

  const handleSubmit: FormProps<ExtendedFilterFormFields>['onFinish'] = (
    values,
  ) => {
    onSubmit(values)
  }

  return (
    <DrawerStyled
      destroyOnClose
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
        onFinish={handleSubmit}
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

        <FilterBlock withDivider={false}>
          <FilterBlockLabel
            onReset={() =>
              form.setFieldsValue({
                smartSearchField: INITIAL_SEARCH_FIELD,
                smartSearchValue: '',
              })
            }
          >
            Поиск по столбцу
          </FilterBlockLabel>
          <Form.Item
            name='smartSearchField'
            initialValue={INITIAL_SEARCH_FIELD}
          >
            <RadioGroupStyled>
              {Object.entries(searchableFields).map(([name, label]) => (
                <Radio key={name} value={name}>
                  {label}
                </Radio>
              ))}
            </RadioGroupStyled>
          </Form.Item>
          <Form.Item name='smartSearchValue'>
            <Input placeholder='Ключевое слово' />
          </Form.Item>
        </FilterBlock>
      </Form>
    </DrawerStyled>
  )
}

export default FilterDrawer
