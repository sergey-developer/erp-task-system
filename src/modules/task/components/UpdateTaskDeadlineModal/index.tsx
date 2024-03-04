import { Col, Flex, Form, Row } from 'antd'
import moment from 'moment-timezone'
import React, { FC } from 'react'

import { TIME_PICKER_FORMAT } from 'lib/antd/constants/dateTimePicker'

import { getTaskCompleteAtDate } from 'modules/task/components/TaskDetails/MainDetails/utils'

import DatePicker from 'components/DatePicker'
import LabeledData from 'components/LabeledData'
import BaseModal from 'components/Modals/BaseModal'
import TimePicker from 'components/TimePicker'

import { SAVE_TEXT } from 'shared/constants/common'

import { UpdateTaskDeadlineModalFormFields, UpdateTaskDeadlineModalProps } from './types'
import { dateRules, timeRules } from './validation'

const UpdateTaskDeadlineModal: FC<UpdateTaskDeadlineModalProps> = ({
  onSubmit,
  olaNextBreachTime,
  previousOlaNextBreachTime,
  ...props
}) => {
  const [form] = Form.useForm<UpdateTaskDeadlineModalFormFields>()

  const initialDate = previousOlaNextBreachTime
    ? olaNextBreachTime
      ? moment(olaNextBreachTime)
      : undefined
    : undefined

  const onFinish = async (values: UpdateTaskDeadlineModalFormFields) => {
    await onSubmit(values, form.setFields)
  }

  return (
    <BaseModal
      {...props}
      data-testid='update-task-deadline-modal'
      title='Изменение внутреннего срока выполнения'
      onOk={form.submit}
      okText={SAVE_TEXT}
    >
      <Flex vertical gap='large'>
        <LabeledData label='Внешний срок выполнения:'>
          {getTaskCompleteAtDate({
            olaNextBreachTime: previousOlaNextBreachTime || olaNextBreachTime,
          })}
        </LabeledData>

        <Form<UpdateTaskDeadlineModalFormFields>
          form={form}
          layout='vertical'
          initialValues={{ date: initialDate, time: initialDate }}
          onFinish={onFinish}
        >
          <Form.Item label='Внутренний срок выполнения:'>
            <Row justify='space-between'>
              <Col span={15}>
                <Form.Item name='date' rules={dateRules}>
                  <DatePicker />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item name='time' dependencies={['date']} rules={timeRules}>
                  <TimePicker format={TIME_PICKER_FORMAT} placeholder='Время' />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Flex>
    </BaseModal>
  )
}

export default UpdateTaskDeadlineModal
