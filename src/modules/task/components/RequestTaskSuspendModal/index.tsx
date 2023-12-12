import {
  Col,
  Form,
  FormProps,
  Input,
  Radio,
  RadioChangeEvent,
  RadioGroupProps,
  Row,
  Select,
  Space,
  Typography,
} from 'antd'
import isEqual from 'lodash/isEqual'
import moment from 'moment-timezone'
import React, { FC, useEffect } from 'react'

import { TIME_PICKER_FORMAT } from 'lib/antd/constants/dateTimePicker'

import {
  ExternalResponsibleCompanyEnum,
  organizationOptions,
  suspendReasonDict,
  SuspendReasonEnum,
} from 'modules/task/constants/taskSuspendRequest'

import DatePicker from 'components/DatePicker'
import BaseModal from 'components/Modals/BaseModal'
import TimePicker from 'components/TimePicker'

import { onlyRequiredRules } from 'shared/constants/validation'

import { reasonsMakeDateTimeFieldDisabled } from './constants'
import { RequestTaskSuspendFormFields, RequestTaskSuspendModalProps } from './types'
import { commentRules, endDateRules, endTimeRules, reasonRules, taskLinkRules } from './validation'

const { Text, Link } = Typography
const { TextArea } = Input

const initialValues: FormProps<RequestTaskSuspendFormFields>['initialValues'] = {
  organization: ExternalResponsibleCompanyEnum.BusinessDepartmentX5,
}

const RequestTaskSuspendModal: FC<RequestTaskSuspendModalProps> = ({
  open,
  recordId,
  isLoading,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm<RequestTaskSuspendFormFields>()

  const reasonFormValue = Form.useWatch('reason', form)
  const isAwaitingReleaseReason = isEqual(reasonFormValue, SuspendReasonEnum.AwaitingRelease)
  const isAwaitingNonItWorkReason = isEqual(reasonFormValue, SuspendReasonEnum.AwaitingNonItWork)

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
        initialValues={initialValues}
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
          <Radio.Group onChange={handleChangeReason} disabled={isLoading}>
            <Space direction='vertical'>
              {Object.keys(suspendReasonDict).map((key) => (
                <Radio key={key} value={key}>
                  {suspendReasonDict[key as keyof typeof suspendReasonDict]}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Form.Item>

        {isAwaitingReleaseReason && (
          <Form.Item
            data-testid='task-link-form-item'
            label='Ссылка на задачу'
            name='taskLink'
            rules={taskLinkRules}
          >
            <Input placeholder='Ссылка на задачу во внешней системе' disabled={isLoading} />
          </Form.Item>
        )}

        {isAwaitingNonItWorkReason && (
          <Form.Item
            data-testid='organization-form-item'
            label='Организация (ответственная за работу вне зоны ответственности ИТ)'
            name='organization'
            rules={onlyRequiredRules}
          >
            <Select aria-label='Организация' options={organizationOptions} disabled={isLoading} />
          </Form.Item>
        )}

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
