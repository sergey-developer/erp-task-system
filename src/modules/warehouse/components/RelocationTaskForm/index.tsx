import { Col, Form, Input, Row, Select } from 'antd'
import React, { FC, useEffect, useMemo } from 'react'

import { TIME_PICKER_FORMAT } from 'lib/antd/constants/dateTimePicker'

import { userListSelectFieldNames } from 'modules/user/constants'
import { relocationTaskTypeOptions } from 'modules/warehouse/constants/relocationTask'
import { checkRelocationTaskTypeIsWriteOff } from 'modules/warehouse/utils/relocationTask'

import DatePicker from 'components/DatePicker'
import TimePicker from 'components/TimePicker'

import { onlyNotEmptyStringRules, onlyRequiredRules } from 'shared/constants/validation'
import { IdType } from 'shared/types/common'
import { MaybeUndefined } from 'shared/types/utils'

import { LocationOption, RelocationTaskFormProps } from './types'
import { makeLocationOptions } from './utils'
import { deadlineAtDateRules, deadlineAtTimeRules } from './validation'

const { TextArea } = Input

const RelocationTaskForm: FC<RelocationTaskFormProps> = ({
  isLoading,

  userList,
  userListIsLoading,

  relocateFromLocationList,
  relocateFromLocationListIsLoading,
  relocateToLocationList,
  relocateToLocationListIsLoading,

  type,
  onChangeType,

  onChangeRelocateFrom,
  onChangeRelocateTo,
}) => {
  const form = Form.useFormInstance()
  const relocateFromFormValue: MaybeUndefined<IdType> = Form.useWatch('relocateFrom', form)

  const relocateFromLocationOptions = useMemo(
    () => makeLocationOptions(relocateFromLocationList),
    [relocateFromLocationList],
  )

  const relocateToLocationOptions = useMemo(
    () => makeLocationOptions(relocateToLocationList),
    [relocateToLocationList],
  )

  useEffect(() => {
    if (type && type !== form.getFieldValue('type')) {
      form.setFieldValue('type', type)
    }
  }, [form, type])

  return (
    <Row data-testid='relocation-task-form' gutter={90}>
      <Col span={6}>
        <Form.Item
          data-testid='type-form-item'
          label='Тип заявки'
          name='type'
          rules={onlyRequiredRules}
        >
          <Select
            options={relocationTaskTypeOptions}
            placeholder='Выберите тип'
            value={type}
            onChange={onChangeType}
          />
        </Form.Item>

        <Form.Item
          data-testid='relocate-from-form-item'
          label='Объект выбытия'
          name='relocateFrom'
          rules={onlyRequiredRules}
        >
          <Select<IdType, LocationOption>
            loading={relocateFromLocationListIsLoading}
            disabled={isLoading}
            options={relocateFromLocationOptions}
            placeholder='Выберите объект'
            onChange={(value, option) => {
              if (!Array.isArray(option)) onChangeRelocateFrom(value, option)
            }}
          />
        </Form.Item>

        <Form.Item
          data-testid='relocate-to-form-item'
          label='Объект прибытия'
          name='relocateTo'
          rules={onlyRequiredRules}
        >
          <Select<IdType, LocationOption>
            loading={relocateToLocationListIsLoading}
            disabled={
              isLoading || !relocateFromFormValue || checkRelocationTaskTypeIsWriteOff(type)
            }
            options={relocateToLocationOptions}
            placeholder='Выберите объект'
            onChange={(value, option) => {
              if (!Array.isArray(option)) onChangeRelocateTo(option)
            }}
          />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item data-testid='deadline-at-form-item' label='Срок выполнения'>
          <Row justify='space-between'>
            <Col span={15}>
              <Form.Item
                data-testid='deadline-at-date-form-item'
                name='deadlineAtDate'
                rules={deadlineAtDateRules}
              >
                <DatePicker disabled={isLoading} />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                data-testid='deadline-at-time-form-item'
                name='deadlineAtTime'
                dependencies={['deadlineAtDate']}
                rules={deadlineAtTimeRules}
              >
                <TimePicker disabled={isLoading} format={TIME_PICKER_FORMAT} placeholder='Время' />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          data-testid='executor-form-item'
          label='Исполнитель'
          name='executor'
          rules={onlyRequiredRules}
        >
          <Select
            fieldNames={userListSelectFieldNames}
            loading={userListIsLoading}
            disabled={isLoading}
            options={userList}
            placeholder='Выберите исполнителя'
          />
        </Form.Item>

        <Form.Item
          data-testid='comment-form-item'
          label='Комментарий'
          name='comment'
          rules={onlyNotEmptyStringRules}
        >
          <TextArea placeholder='Добавьте комментарий' disabled={isLoading} />
        </Form.Item>
      </Col>
    </Row>
  )
}

export default RelocationTaskForm
