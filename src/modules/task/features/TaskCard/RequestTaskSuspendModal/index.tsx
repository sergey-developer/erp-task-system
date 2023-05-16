import {
  Col,
  Form,
  FormInstance,
  Input,
  ModalProps,
  Radio,
  RadioChangeEvent,
  RadioGroupProps,
  Row,
  Space,
  Typography,
} from 'antd'
import moment from 'moment-timezone'
import React, { FC, useEffect } from 'react'

import { SuspendReasonEnum } from 'modules/task/constants/common'
import { suspendReasonDict } from 'modules/task/constants/dictionary'

import BaseModal from 'components/Modals/BaseModal'

import { validationRules } from 'shared/constants/validation'

import { reasonsMakeDateTimeFieldDisabled } from './constants'
import { RequestTaskSuspendFormFields } from './interfaces'
import { DatePickerStyled, TimePickerStyled } from './styles'
import { END_DATE_RULES, END_TIME_RULES, REASON_RULES } from './validation'

const { Text, Link } = Typography
const { TextArea } = Input

export type RequestTaskSuspendModalProps = {
  recordId: string
  onSubmit: (
    values: RequestTaskSuspendFormFields,
    setFields: FormInstance['setFields'],
  ) => Promise<void>
  onCancel: NonNullable<ModalProps['onCancel']>
  isLoading: boolean
}

const RequestTaskSuspendModal: FC<RequestTaskSuspendModalProps> = ({
  recordId,
  isLoading,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm<RequestTaskSuspendFormFields>()

  const reasonFieldValue = Form.useWatch('reason', form)

  const isReasonMakeDateTimeFieldDisabled =
    reasonsMakeDateTimeFieldDisabled.includes(reasonFieldValue)

  const isDateTimeFieldDisabled =
    !reasonFieldValue || isReasonMakeDateTimeFieldDisabled

  const modalTitle = (
    <Text>
      Запрос перевода заявки <Link>{recordId}</Link> в ожидание
    </Text>
  )

  const handleFinish = async (values: RequestTaskSuspendFormFields) => {
    await onSubmit(values, form.setFields)
  }

  const handleChangeReason: RadioGroupProps['onChange'] = (
    event: RadioChangeEvent,
  ) => {
    const isReasonMakeDateTimeFieldDisabled =
      reasonsMakeDateTimeFieldDisabled.includes(event.target.value)

    if (isReasonMakeDateTimeFieldDisabled) {
      const endDate = moment().add(5, 'days')
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
      visible
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
          data-testid='reason'
          label='Причина ожидания'
          name='reason'
          rules={REASON_RULES}
        >
          <Radio.Group disabled={isLoading} onChange={handleChangeReason}>
            <Space direction='vertical'>
              {Object.keys(suspendReasonDict).map((key, index) => (
                <Radio key={index} value={key}>
                  {suspendReasonDict[key as SuspendReasonEnum]}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Form.Item>

        <Form.Item data-testid='return-time' label='Время возврата'>
          <Row justify='space-between'>
            <Col span={11}>
              <Form.Item
                data-testid='end-date'
                name='endDate'
                rules={END_DATE_RULES}
              >
                <DatePickerStyled
                  disabled={isDateTimeFieldDisabled || isLoading}
                />
              </Form.Item>
            </Col>

            <Col span={11}>
              <Form.Item
                data-testid='end-time'
                name='endTime'
                dependencies={['endDate']}
                rules={END_TIME_RULES}
              >
                <TimePickerStyled
                  disabled={isDateTimeFieldDisabled || isLoading}
                  format='HH:mm'
                />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          data-testid='comment'
          label='Комментарий'
          name='comment'
          rules={[validationRules.string.long]}
        >
          <TextArea placeholder='Опишите ситуацию' disabled={isLoading} />
        </Form.Item>
      </Form>
    </BaseModal>
  )
}

export default RequestTaskSuspendModal
