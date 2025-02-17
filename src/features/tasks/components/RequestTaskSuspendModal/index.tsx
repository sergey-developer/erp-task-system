import { InfoCircleTwoTone } from '@ant-design/icons'
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
import { ExternalResponsibleCompanyEnum, SuspendReasonEnum } from 'features/tasks/api/constants'
import { organizationOptions, suspendReasonDict } from 'features/tasks/constants'
import isEqual from 'lodash/isEqual'
import moment from 'moment-timezone'
import React, { FC } from 'react'

import { TIME_PICKER_FORMAT } from 'lib/antd/constants/dateTimePicker'

import DatePicker from 'components/DatePicker'
import BaseModal from 'components/Modals/BaseModal'
import TimePicker from 'components/TimePicker'

import { onlyRequiredRules } from 'shared/constants/validation'
import { MaybeUndefined } from 'shared/types/utils'

import { RequestTaskSuspendFormFields, RequestTaskSuspendModalProps } from './types'
import { commentRules, endDateRules, endTimeRules, reasonRules, taskLinkRules } from './validation'

const { Text, Link } = Typography
const { TextArea } = Input
const returnTimeInfo = (
  <Space align='start' style={{ marginTop: '5px' }}>
    <InfoCircleTwoTone />

    <Text>
      Убедитесь, что на компьютере установлено точное время. Время ожидания может быть автоматически
      уменьшено до установленного администратором системы
    </Text>
  </Space>
)

const initialValues: FormProps<RequestTaskSuspendFormFields>['initialValues'] = {
  organization: ExternalResponsibleCompanyEnum.BusinessDepartmentX5,
}

const RequestTaskSuspendModal: FC<RequestTaskSuspendModalProps> = ({
  open,
  recordId,
  systemSettings,
  systemSettingsIsLoading,
  isLoading,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm<RequestTaskSuspendFormFields>()

  const reasonFormValue: MaybeUndefined<SuspendReasonEnum> = Form.useWatch('reason', form)
  const isAwaitingReleaseReason = isEqual(reasonFormValue, SuspendReasonEnum.AwaitingRelease)
  const isAwaitingNonItWorkReason = isEqual(reasonFormValue, SuspendReasonEnum.AwaitingNonItWork)

  const modalTitle = (
    <Text>
      Запрос перевода заявки <Link>{recordId}</Link> в ожидание
    </Text>
  )

  const handleFinish = async (values: RequestTaskSuspendFormFields) => {
    await onSubmit(values, form.setFields)
  }

  const handleChangeReason: RadioGroupProps['onChange'] = (event: RadioChangeEvent) => {
    if (systemSettings) {
      const reason = event.target.value as SuspendReasonEnum
      const endDate = moment().add(systemSettings.suspendReasons[reason].limit, 'days')
      const endTime = endDate.clone()
      form.setFieldsValue({ endDate, endTime })
    } else {
      console.error('For changing reason the systemSettings was not provided')
    }
  }

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
          <Radio.Group
            onChange={handleChangeReason}
            disabled={isLoading || systemSettingsIsLoading}
          >
            <Space direction='vertical'>
              {Object.values(SuspendReasonEnum).map((reason) => (
                <Radio key={reason} value={reason}>
                  {suspendReasonDict[reason]}
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

        <Form.Item
          data-testid='return-time-form-item'
          label='Время возврата'
          extra={returnTimeInfo}
        >
          <Row justify='space-between'>
            <Col span={11}>
              <Form.Item
                data-testid='end-date-form-item'
                name='endDate'
                rules={endDateRules(systemSettings?.suspendReasons[reasonFormValue]?.limit)}
              >
                <DatePicker
                  disabled={
                    !reasonFormValue ||
                    isLoading ||
                    systemSettingsIsLoading ||
                    !systemSettings?.suspendReasons[reasonFormValue].editable
                  }
                />
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
                  disabled={
                    !reasonFormValue ||
                    isLoading ||
                    systemSettingsIsLoading ||
                    !systemSettings?.suspendReasons[reasonFormValue].editable
                  }
                  format={TIME_PICKER_FORMAT}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          data-testid='taskComment-form-item'
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
