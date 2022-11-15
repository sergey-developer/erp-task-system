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

import BaseModal from 'components/Modals/BaseModal'
import { ReclassificationReasonEnum } from 'modules/task/constants/common'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'
import { BASE_LONG_TEXT_RULES } from 'shared/constants/validation'

import { TaskReclassificationRequestFormFields } from './interfaces'
import { RECLASSIFICATION_REASON_RULES } from './validation'

const { Text, Link } = Typography
const { TextArea } = Input

export type TaskReclassificationModalProps = Pick<ModalProps, 'onCancel'> &
  Pick<TaskDetailsModel, 'recordId'> & {
    onSubmit: (
      values: TaskReclassificationRequestFormFields,
      setFields: FormInstance['setFields'],
    ) => Promise<void>
    isLoading: boolean
  }

const TaskReclassificationModal: FC<TaskReclassificationModalProps> = ({
  recordId,
  isLoading,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm<TaskReclassificationRequestFormFields>()

  const modalTitle = (
    <Text>
      Запрос о переклассификации заявки <Link>{recordId}</Link>
    </Text>
  )

  const handleFinish = async (
    values: TaskReclassificationRequestFormFields,
  ) => {
    await onSubmit(values, form.setFields)
  }

  return (
    <BaseModal
      visible
      title={modalTitle}
      confirmLoading={isLoading}
      onOk={form.submit}
      okText='Запросить переклассификацию'
      onCancel={onCancel}
    >
      <Form<TaskReclassificationRequestFormFields>
        form={form}
        layout='vertical'
        onFinish={handleFinish}
        preserve={false}
      >
        <Form.Item
          label='Причина переклассификации'
          name='reclassificationReason'
          rules={RECLASSIFICATION_REASON_RULES}
        >
          <Radio.Group disabled={isLoading}>
            <Space direction='vertical'>
              <Radio value={ReclassificationReasonEnum.WrongClassification}>
                Требуется переклассификация (классификация неверная)
              </Radio>
              <Radio value={ReclassificationReasonEnum.WrongSupportGroup}>
                Требуется переклассификация (классификация верная)
              </Radio>
              <Radio value={ReclassificationReasonEnum.DivideTask} disabled>
                Требуется разбить обращение
              </Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label='Комментарий'
          name='comment'
          rules={BASE_LONG_TEXT_RULES}
        >
          <TextArea placeholder='Опишите ситуацию' disabled={isLoading} />
        </Form.Item>
      </Form>
    </BaseModal>
  )
}

export default TaskReclassificationModal
