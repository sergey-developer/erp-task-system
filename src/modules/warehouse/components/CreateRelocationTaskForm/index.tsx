import { Col, DatePicker, Form, Input, Row, Select, TimePicker } from 'antd'
import React, { FC } from 'react'

import { TIME_PICKER_FORMAT } from 'lib/antd/constants/dateTimePicker'

import { idAndNameSelectFieldNames } from 'shared/constants/selectField'
import { onlyNotEmptyStringRules, onlyRequiredRules } from 'shared/constants/validation'

import { deadlineAtDateRules, deadlineAtTimeRules } from './validation'

const { TextArea } = Input

export type CreateRelocationTaskFormProps = {}

const CreateRelocationTaskForm: FC<CreateRelocationTaskFormProps> = () => {
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
            disabled={false}
            fieldNames={idAndNameSelectFieldNames}
            loading={false}
            options={[]}
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
            disabled={false}
            fieldNames={idAndNameSelectFieldNames}
            loading={false}
            options={[]}
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
            disabled={false}
            fieldNames={idAndNameSelectFieldNames}
            loading={false}
            options={[]}
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
