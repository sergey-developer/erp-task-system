import {
  Form,
  FormInstance,
  Input,
  ModalProps,
  Radio,
  Space,
  Typography,
} from 'antd'
import React, { FC } from 'react'

import { ReclassificationReasonEnum } from 'modules/task/constants'
import { TaskModel } from 'modules/task/models'

import BaseModal from 'components/Modals/BaseModal'

import { validationRules } from 'shared/constants/validation'

import { reclassificationReasonLabels } from './constants'
import { RequestTaskReclassificationFormFields } from './interfaces'
import { RECLASSIFICATION_REASON_RULES } from './validation'

const { Text, Link } = Typography
const { TextArea } = Input

export type RequestTaskReclassificationModalProps = Pick<
  TaskModel,
  'recordId'
> & {
  onSubmit: (
    values: RequestTaskReclassificationFormFields,
    setFields: FormInstance['setFields'],
  ) => Promise<void>
  onCancel: NonNullable<ModalProps['onCancel']>
  isLoading: boolean
}

const RequestTaskReclassificationModal: FC<
  RequestTaskReclassificationModalProps
> = ({ recordId, isLoading, onCancel, onSubmit }) => {
  const [form] = Form.useForm<RequestTaskReclassificationFormFields>()

  const modalTitle = (
    <Text>
      Запрос о переклассификации заявки <Link>{recordId}</Link>
    </Text>
  )

  const handleFinish = async (
    values: RequestTaskReclassificationFormFields,
  ) => {
    await onSubmit(values, form.setFields)
  }

  return (
    <BaseModal
      data-testid='request-task-reclassification-modal'
      visible
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
          rules={RECLASSIFICATION_REASON_RULES}
        >
          <Radio.Group disabled={isLoading}>
            <Space direction='vertical'>
              <Radio value={ReclassificationReasonEnum.WrongClassification}>
                {
                  reclassificationReasonLabels[
                    ReclassificationReasonEnum.WrongClassification
                  ]
                }
              </Radio>
              <Radio value={ReclassificationReasonEnum.WrongSupportGroup}>
                {
                  reclassificationReasonLabels[
                    ReclassificationReasonEnum.WrongSupportGroup
                  ]
                }
              </Radio>
              <Radio value={ReclassificationReasonEnum.DivideTask} disabled>
                {
                  reclassificationReasonLabels[
                    ReclassificationReasonEnum.DivideTask
                  ]
                }
              </Radio>
            </Space>
          </Radio.Group>
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

export default RequestTaskReclassificationModal
