import { Col, Form, Input, Row, Select } from 'antd'
import sortBy from 'lodash/sortBy'
import React, { FC, useMemo } from 'react'

import { TIME_PICKER_FORMAT } from 'lib/antd/constants/dateTimePicker'

import { userListSelectFieldNames } from 'modules/user/constants'
import { RelocationTaskFormFields } from 'modules/warehouse/types'

import DatePicker from 'components/DatePicker'
import TimePicker from 'components/TimePicker'

import { locationDict } from 'shared/constants/catalogs'
import { onlyNotEmptyStringRules, onlyRequiredRules } from 'shared/constants/validation'
import { IdType } from 'shared/types/common'
import { MaybeUndefined } from 'shared/types/utils'

import { LocationOption, RelocationTaskFormProps } from './types'
import { deadlineAtDateRules, deadlineAtTimeRules } from './validation'

const { TextArea } = Input

const RelocationTaskForm: FC<RelocationTaskFormProps> = ({
  isLoading,

  userList,
  userListIsLoading,

  locationList,
  locationListIsLoading,

  onChangeRelocateFrom,
  onChangeRelocateTo,
}) => {
  const form = Form.useFormInstance<RelocationTaskFormFields>()
  const relocateFromFormValue: MaybeUndefined<IdType> = Form.useWatch('relocateFrom', form)

  const locationOptions = useMemo(
    () =>
      locationList
        .reduce<LocationOption[]>((acc, loc) => {
          const optionGroup = acc.find((item) => item.type === loc.type)
          const option: LocationOption = {
            label: loc.title,
            value: loc.id,
            type: loc.type,
          }

          optionGroup
            ? optionGroup.options!.push(option)
            : acc.push({ label: locationDict[loc.type], type: loc.type, options: [option] })

          return acc
        }, [])
        .map((group) => ({ ...group, options: sortBy(group.options, 'label') })),
    [locationList],
  )

  return (
    <Row data-testid='relocation-task-form' gutter={90}>
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
          data-testid='relocate-from-form-item'
          label='Объект выбытия'
          name='relocateFrom'
          rules={onlyRequiredRules}
        >
          <Select<IdType, LocationOption>
            loading={locationListIsLoading}
            disabled={isLoading || locationListIsLoading}
            options={locationOptions}
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
            loading={locationListIsLoading}
            disabled={isLoading || !relocateFromFormValue || locationListIsLoading}
            options={locationOptions}
            placeholder='Выберите объект'
            onChange={(value, option) => {
              if (!Array.isArray(option)) onChangeRelocateTo(option)
            }}
          />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item
          data-testid='executor-form-item'
          label='Исполнитель'
          name='executor'
          rules={onlyRequiredRules}
        >
          <Select
            fieldNames={userListSelectFieldNames}
            loading={userListIsLoading}
            disabled={isLoading || userListIsLoading}
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
