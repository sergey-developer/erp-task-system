import { Col, DatePicker, Form, Input, Row, Select, TimePicker } from 'antd'
import sortBy from 'lodash/sortBy'
import { DefaultOptionType } from 'rc-select/lib/Select'
import React, { FC, useMemo } from 'react'

import { TIME_PICKER_FORMAT } from 'lib/antd/constants/dateTimePicker'

import { userListSelectFieldNames } from 'modules/user/constants'
import { UserListModel } from 'modules/user/models'

import { locationDict } from 'shared/constants/catalogs'
import { onlyNotEmptyStringRules, onlyRequiredRules } from 'shared/constants/validation'
import { LocationListModel } from 'shared/models/catalogs/location'

import { deadlineAtDateRules, deadlineAtTimeRules } from './validation'

const { TextArea } = Input

export type CreateRelocationTaskFormProps = {
  userList: UserListModel
  userListIsLoading: boolean

  locationList: LocationListModel
  locationListIsLoading: boolean
}

const CreateRelocationTaskForm: FC<CreateRelocationTaskFormProps> = ({
  userList,
  userListIsLoading,

  locationList,
  locationListIsLoading,
}) => {
  const locationOptions = useMemo<DefaultOptionType[]>(
    () =>
      locationList
        .reduce<DefaultOptionType[]>((acc, l) => {
          const option = acc.find((item) => item.label === locationDict[l.type])

          option
            ? option.options.push({ label: l.title, value: l.id })
            : acc.push({ label: locationDict[l.type], options: [{ label: l.title, value: l.id }] })

          return acc
        }, [])
        .map((opt) => ({
          ...opt,
          options: sortBy(opt.options, 'label'),
        })),
    [locationList],
  )

  return (
    <Row data-testid='create-relocation-task-form' gutter={90}>
      <Col span={6}>
        <Form.Item data-testid='deadline-at-form-item' label='Срок выполнения'>
          <Row justify='space-between'>
            <Col span={15}>
              <Form.Item
                data-testid='deadline-at-date-form-item'
                name='deadlineAtDate'
                rules={deadlineAtDateRules}
              >
                <DatePicker disabled={false} />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                data-testid='deadline-at-time-form-item'
                name='deadlineAtTime'
                dependencies={['deadlineAtDate']}
                rules={deadlineAtTimeRules}
              >
                <TimePicker disabled={false} format={TIME_PICKER_FORMAT} placeholder='Время' />
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
          <Select
            loading={locationListIsLoading}
            options={locationOptions}
            placeholder='Выберите объект'
          />
        </Form.Item>

        <Form.Item
          data-testid='relocate-to-form-item'
          label='Объект прибытия'
          name='relocateTo'
          rules={onlyRequiredRules}
        >
          <Select
            loading={locationListIsLoading}
            options={locationOptions}
            placeholder='Выберите объект'
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
          <TextArea placeholder='Добавьте комментарий' />
        </Form.Item>
      </Col>
    </Row>
  )
}

export default CreateRelocationTaskForm
