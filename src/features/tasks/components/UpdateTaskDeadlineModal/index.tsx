import { Col, Flex, Form, Row } from 'antd'
import moment from 'moment-timezone'
import React, { FC } from 'react'

import { getTaskCompleteAtDate } from 'features/tasks/components/TaskDetails/MainDetails/utils'

import DatePicker from 'components/DatePicker'
import Label from 'components/Label'
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
  const dateFormValue = Form.useWatch('date', form)
  const timeFormValue = Form.useWatch('time', form)

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
        <Label label='Внешний срок выполнения:'>
          {getTaskCompleteAtDate({
            olaNextBreachTime: previousOlaNextBreachTime || olaNextBreachTime,
          })}
        </Label>

        <Form<UpdateTaskDeadlineModalFormFields>
          form={form}
          layout='vertical'
          initialValues={{ date: initialDate, time: initialDate }}
          onFinish={onFinish}
        >
          <Form.Item label='Внутренний срок выполнения:'>
            <Row justify='space-between'>
              <Col span={15}>
                <Form.Item name='date' rules={dateRules(!!timeFormValue)}>
                  <DatePicker />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item name='time' dependencies={['date']} rules={timeRules(!!dateFormValue)}>
                  <TimePicker />
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
