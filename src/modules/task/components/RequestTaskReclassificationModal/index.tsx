import { Form, FormInstance, Input, ModalProps, Radio, Space, Typography } from 'antd'
import React, { FC } from 'react'

import {
  ReclassificationReasonEnum,
  reclassificationReasonDict,
} from 'modules/task/constants/taskReclassificationRequest'
import { TaskModel } from 'modules/task/models'

import BaseModal from 'components/Modals/BaseModal'

import { RequestTaskReclassificationFormFields } from './types'
import { reclassificationReasonRules, commentRules } from './validation'

const { Text, Link } = Typography
const { TextArea } = Input

export type RequestTaskReclassificationModalProps = Pick<TaskModel, 'recordId'> & {
  onSubmit: (
    values: RequestTaskReclassificationFormFields,
    setFields: FormInstance['setFields'],
  ) => Promise<void>
  onCancel: NonNullable<ModalProps['onCancel']>
  isLoading: boolean
}

const RequestTaskReclassificationModal: FC<RequestTaskReclassificationModalProps> = ({
  recordId,
  isLoading,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm<RequestTaskReclassificationFormFields>()

  const modalTitle = (
    <Text>
      Запрос о переклассификации заявки <Link>{recordId}</Link>
    </Text>
  )

  const handleFinish = async (values: RequestTaskReclassificationFormFields) => {
    await onSubmit(values, form.setFields)
  }

  return (
    <BaseModal
      data-testid='request-task-reclassification-modal'
      open
      title={modalTitle}
      confirmLoading={isLoading}
      onOk={form.submit}
      okText='Запросить переклассификацию'
      onCancel={onCancel}
    >
      <Form<RequestTaskReclassificationFormFields>
        form={form}
        layout='vertical'
        onFinish={handleFinish}
        preserve={false}
      >
        <Form.Item
          data-testid='reclassification-reason'
          label='Причина переклассификации'
          name='reclassificationReason'
          rules={reclassificationReasonRules}
        >
          <Radio.Group disabled={isLoading}>
            <Space direction='vertical'>
              <Radio value={ReclassificationReasonEnum.WrongClassification}>
                {reclassificationReasonDict[ReclassificationReasonEnum.WrongClassification]}
              </Radio>
              <Radio value={ReclassificationReasonEnum.WrongSupportGroup}>
                {reclassificationReasonDict[ReclassificationReasonEnum.WrongSupportGroup]}
              </Radio>
              <Radio value={ReclassificationReasonEnum.DivideTask} disabled>
                {reclassificationReasonDict[ReclassificationReasonEnum.DivideTask]}
              </Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <Form.Item data-testid='comment' label='Комментарий' name='comment' rules={commentRules}>
          <TextArea placeholder='Опишите ситуацию' disabled={isLoading} />
        </Form.Item>
      </Form>
    </BaseModal>
  )
}

export default RequestTaskReclassificationModal
