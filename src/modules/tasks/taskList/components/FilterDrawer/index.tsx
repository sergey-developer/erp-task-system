import { Button, DrawerProps, Form, FormProps, Input, Radio, Space } from 'antd'
import { Moment } from 'moment'
import React, { FC } from 'react'

import { TaskStatusEnum } from 'modules/tasks/taskList/components/TaskListPage/constants'
import BidColumn from 'modules/tasks/taskList/components/TaskTable/BidColumn'
import { MaybeNull, MaybeUndefined } from 'shared/interfaces/utils'

import { taskStatusDictionary } from './constants'
import FilterBlock from './FilterBlock'
import FilterBlockLabel from './FilterBlockLabel'
import {
  CheckboxGroupStyled,
  DrawerStyled,
  RadioGroupStyled,
  RangePickerStyled,
} from './styles'

type Props = Pick<DrawerProps, 'onClose' | 'visible'> & {
  onSubmit: (result: FormResultValues) => void
}

type FormFields = {
  columnName: keyof typeof searchableFields
  columnKeyword: string
  taskStatuses: TaskStatusEnum[]
  creationDate: MaybeNull<[Moment, Moment]>
}

type FormResultValues = {
  columnName: keyof typeof searchableFields
  columnKeyword: MaybeUndefined<string>
  taskStatuses: MaybeUndefined<TaskStatusEnum[]>
  creationDate: MaybeUndefined<MaybeNull<[Date, Date]>>
}

const checkboxStatusOptions = Object.values(TaskStatusEnum).map(
  (taskStatus) => ({
    label: (
      <BidColumn status={taskStatus} value={taskStatusDictionary[taskStatus]} />
    ),
    value: taskStatus,
  }),
)

const searchableFields = {
  topic: 'Тема',
  object: 'Объект',
  executor: 'Исполнитель',
}

const FilterDrawer: FC<Props> = (props) => {
  const { onClose, onSubmit, visible } = props

  const [form] = Form.useForm<FormFields>()

  const handleResetAll = () => {
    form.resetFields()
  }

  const handleSubmit: FormProps<FormFields>['onFinish'] = (values) => {
    const resultValues = {
      ...values,
      creationDate:
        values.creationDate &&
        ([values.creationDate[0].toDate(), values.creationDate[1].toDate()] as [
          Date,
          Date,
        ]),
    }
    onSubmit(resultValues)
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
      <Form<FormFields> form={form} onFinish={handleSubmit}>
        <FilterBlock withDivider>
          <FilterBlockLabel
            onReset={() => form.setFieldsValue({ taskStatuses: [] })}
          >
            Статус
          </FilterBlockLabel>
          <Form.Item name='taskStatuses'>
            <CheckboxGroupStyled options={checkboxStatusOptions} />
          </Form.Item>
        </FilterBlock>

        <FilterBlock withDivider>
          <FilterBlockLabel
            onReset={() => form.setFieldsValue({ creationDate: null })}
          >
            Период создания
          </FilterBlockLabel>
          <Form.Item name='creationDate'>
            <RangePickerStyled allowClear={false} />
          </Form.Item>
        </FilterBlock>

        <FilterBlock withDivider={false}>
          <FilterBlockLabel
            onReset={() =>
              form.setFieldsValue({
                columnName: 'topic',
                columnKeyword: '',
              })
            }
          >
            Поиск по столбцу
          </FilterBlockLabel>
          <Form.Item name='columnName' initialValue='topic'>
            <RadioGroupStyled>
              {Object.entries(searchableFields).map(([name, label]) => (
                <Radio key={name} value={name}>
                  {label}
                </Radio>
              ))}
            </RadioGroupStyled>
          </Form.Item>
          <Form.Item name='columnKeyword'>
            <Input placeholder='Ключевое слово' />
          </Form.Item>
        </FilterBlock>
      </Form>
    </DrawerStyled>
  )
}

export default FilterDrawer
