import { Form, Input, Radio, Space, Typography } from 'antd'
import { ReclassificationReasonEnum } from 'features/tasks/api/constants'
import { reclassificationReasonDict } from 'features/tasks/constants'
import React, { FC } from 'react'

import BaseModal from 'components/Modals/BaseModal'

import {
  RequestTaskReclassificationFormFields,
  RequestTaskReclassificationModalProps,
} from './types'
import { commentRules, reclassificationReasonRules } from './validation'

const { Text, Link } = Typography
const { TextArea } = Input

const RequestTaskReclassificationModal: FC<RequestTaskReclassificationModalProps> = ({
  open,
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
      open={open}
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
              <Radio value={ReclassificationReasonEnum.DivideTask}>
                {reclassificationReasonDict[ReclassificationReasonEnum.DivideTask]}
              </Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          data-testid='taskComment'
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

export default RequestTaskReclassificationModal
