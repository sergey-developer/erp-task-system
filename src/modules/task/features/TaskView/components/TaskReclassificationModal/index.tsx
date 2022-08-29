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
import { ReclassificationReasonEnum } from 'modules/task/constants/enums'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'

import { TaskReclassificationRequestFormFields } from './interfaces'
import { COMMENT_RULES, RECLASSIFICATION_REASON_RULES } from './validation'

const { Text, Link } = Typography
const { TextArea } = Input

export type TaskReclassificationModalProps = Pick<
  ModalProps,
  'visible' | 'onCancel'
> &
  Pick<TaskDetailsModel, 'recordId'> & {
    onSubmit: (
      values: TaskReclassificationRequestFormFields,
      setFields: FormInstance['setFields'],
    ) => void
    isLoading: boolean
  }

const TaskReclassificationModal: FC<TaskReclassificationModalProps> = ({
  visible,
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
      visible={visible}
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
        requiredMark={false}
      >
        <Form.Item
          label='Причина переклассификации'
          name='reclassificationReason'
          rules={RECLASSIFICATION_REASON_RULES}
        >
          <Radio.Group>
            <Space direction='vertical'>
              <Radio value={ReclassificationReasonEnum.WrongClassification}>
                Требуется переклассификация (классификация неверная)
              </Radio>
              <Radio value={ReclassificationReasonEnum.WrongSupportGroup}>
                Требуется переклассификация (классификация верная)
              </Radio>
              <Radio value={ReclassificationReasonEnum.DivideTask}>
                Требуется разбить обращение
              </Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <Form.Item label='Комментарий' name='comment' rules={COMMENT_RULES}>
          <TextArea placeholder='Опишите ситуацию' />
        </Form.Item>
      </Form>
    </BaseModal>
  )
}

export default TaskReclassificationModal
