import {
  Col,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  RadioGroupProps,
  Row,
  Space,
  Typography,
} from 'antd'
import moment from 'moment-timezone'
import React, { FC, useEffect } from 'react'

import { TIME_PICKER_FORMAT } from 'lib/antd/constants/dateTimePicker'

import { suspendReasonDict, SuspendReasonEnum } from 'modules/task/constants/taskSuspendRequest'

import DatePicker from 'components/DatePicker'
import BaseModal from 'components/Modals/BaseModal'
import TimePicker from 'components/TimePicker'

import { disabledSuspendReasons, reasonsMakeDateTimeFieldDisabled } from './constants'
import { RequestTaskSuspendFormFields, RequestTaskSuspendModalProps } from './types'
import { commentRules, endDateRules, endTimeRules, reasonRules } from './validation'

const { Text, Link } = Typography
const { TextArea } = Input

const RequestTaskSuspendModal: FC<RequestTaskSuspendModalProps> = ({
  open,
  recordId,
  isLoading,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm<RequestTaskSuspendFormFields>()

  const reasonFormValue = Form.useWatch('reason', form)

  const isReasonMakeDateTimeFieldDisabled =
    reasonsMakeDateTimeFieldDisabled.includes(reasonFormValue)

  const isDateTimeFieldDisabled = !reasonFormValue || isReasonMakeDateTimeFieldDisabled

  const modalTitle = (
    <Text>
      Запрос перевода заявки <Link>{recordId}</Link> в ожидание
    </Text>
  )

  const handleFinish = async (values: RequestTaskSuspendFormFields) => {
    await onSubmit(values, form.setFields)
  }

  const handleChangeReason: RadioGroupProps['onChange'] = (event: RadioChangeEvent) => {
    const isReasonMakeDateTimeFieldDisabled = reasonsMakeDateTimeFieldDisabled.includes(
      event.target.value,
    )

    if (isReasonMakeDateTimeFieldDisabled) {
      const endDate = moment().add(14, 'days')
      const endTime = endDate.clone()
      form.setFieldsValue({ endDate, endTime })
    }
  }

  useEffect(() => {
    if (!isReasonMakeDateTimeFieldDisabled) {
      form.resetFields(['endDate', 'endTime'])
    }
  }, [isReasonMakeDateTimeFieldDisabled, form])

  return (
    <BaseModal
      data-testid='request-task-suspend-modal'
      open={open}
      title={modalTitle}
      confirmLoading={isLoading}
      onOk={form.submit}
      okText='Перевести в ожидание'
      onCancel={onCancel}
    >
      <Form<RequestTaskSuspendFormFields>
        form={form}
        layout='vertical'
        onFinish={handleFinish}
        preserve={false}
      >
        <Form.Item
          data-testid='reason-form-item'
          label='Причина ожидания'
          name='reason'
          rules={reasonRules}
        >
          <Radio.Group onChange={handleChangeReason}>
            <Space direction='vertical'>
              {Object.keys(suspendReasonDict).map((key, index) => (
                <Radio
                  key={index}
                  value={key}
                  disabled={isLoading || disabledSuspendReasons.includes(key as SuspendReasonEnum)}
                >
                  {suspendReasonDict[key as SuspendReasonEnum]}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Form.Item>

        <Form.Item data-testid='return-time-form-item' label='Время возврата'>
          <Row justify='space-between'>
            <Col span={11}>
              <Form.Item data-testid='end-date-form-item' name='endDate' rules={endDateRules}>
                <DatePicker disabled={isDateTimeFieldDisabled || isLoading} />
              </Form.Item>
            </Col>

            <Col span={11}>
              <Form.Item
                data-testid='end-time-form-item'
                name='endTime'
                dependencies={['endDate']}
                rules={endTimeRules}
              >
                <TimePicker
                  disabled={isDateTimeFieldDisabled || isLoading}
                  format={TIME_PICKER_FORMAT}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          data-testid='comment-form-item'
          label='Комментарий'
          name='comment'
          rules={commentRules}
        >
          <TextArea placeholder='Опишите ситуацию' disabled={isLoading} />
        </Form.Item>
      </Form>
    </BaseModal>
  )
}

export default RequestTaskSuspendModal
