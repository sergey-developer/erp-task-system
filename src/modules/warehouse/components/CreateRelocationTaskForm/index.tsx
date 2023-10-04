import { useBoolean, usePrevious } from 'ahooks'
import { Col, DatePicker, Form, Input, Modal, Row, Select, TimePicker, Typography } from 'antd'
import sortBy from 'lodash/sortBy'
import React, { FC, useMemo, useState } from 'react'

import { TIME_PICKER_FORMAT } from 'lib/antd/constants/dateTimePicker'

import { userListSelectFieldNames } from 'modules/user/constants'

import { locationDict } from 'shared/constants/catalogs'
import { onlyNotEmptyStringRules, onlyRequiredRules } from 'shared/constants/validation'

import { CreateRelocationTaskFormProps, LocationOption } from './types'
import { deadlineAtDateRules, deadlineAtTimeRules } from './validation'

const { TextArea } = Input
const { Text } = Typography

const CreateRelocationTaskForm: FC<CreateRelocationTaskFormProps> = ({
  userList,
  userListIsLoading,

  locationList,
  locationListIsLoading,

  onChangeRelocateFrom,
}) => {
  const form = Form.useFormInstance()
  const [confirmModalOpened, { toggle: toggleConfirmModal }] = useBoolean(false)
  const [selectedRelocateFrom, setSelectedRelocateFrom] = useState<LocationOption>()
  const prevSelectedRelocateFrom = usePrevious(selectedRelocateFrom)

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
    <>
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
            <Select<LocationOption['value'], LocationOption>
              loading={locationListIsLoading}
              options={locationOptions}
              placeholder='Выберите объект'
              onChange={(value, option) => {
                if (Array.isArray(option)) return

                setSelectedRelocateFrom(option)
                form.setFieldValue('relocateFrom', value)
                const equipments = form.getFieldValue('equipments')
                if (!!equipments.length && selectedRelocateFrom) {
                  toggleConfirmModal()
                } else {
                  onChangeRelocateFrom(option)
                }
              }}
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

      <Modal
        title='Перечень перемещаемого оборудования будет очищен'
        open={confirmModalOpened}
        onCancel={() => {
          toggleConfirmModal()
          setSelectedRelocateFrom(prevSelectedRelocateFrom)
          if (prevSelectedRelocateFrom) {
            form.setFieldValue('relocateFrom', prevSelectedRelocateFrom.value)
          }
        }}
        onOk={() => {
          toggleConfirmModal()
          form.setFieldValue('equipments', [])
          selectedRelocateFrom && onChangeRelocateFrom(selectedRelocateFrom)
        }}
      >
        <Text>Вы действительно хотите сменить объект выбытия?</Text>
      </Modal>
    </>
  )
}

export default CreateRelocationTaskForm
