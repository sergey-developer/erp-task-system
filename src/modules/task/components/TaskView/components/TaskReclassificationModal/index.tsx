import {
  ButtonProps,
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
import { TaskDetailsModel } from 'modules/task/components/TaskView/models'

import { ReclassificationReasonEnum } from '../../../../constants/enums'
import { TaskReclassificationFormFields } from './interfaces'
import { COMMENT_RULES, RECLASSIFICATION_REASON_RULES } from './validation'

const { Text, Link } = Typography
const { TextArea } = Input

const buttonCommonProps: ButtonProps = {
  size: 'large',
}

export type TaskReclassificationModalProps = Pick<
  ModalProps,
  'visible' | 'onCancel'
> &
  Pick<TaskDetailsModel, 'recordId'> & {
    onSubmit: (
      values: TaskReclassificationFormFields,
      setFields: FormInstance['setFields'],
    ) => void
  }

const TaskReclassificationModal: FC<TaskReclassificationModalProps> = ({
  visible,
  onCancel,
  recordId,
  onSubmit,
}) => {
  const [form] = Form.useForm<TaskReclassificationFormFields>()

  const modalTitle = (
    <Text>
      Запрос о переклассификации заявки <Link>{recordId}</Link>
    </Text>
  )

  const submitButtonProps: ButtonProps = {
    ...buttonCommonProps,
    htmlType: 'submit',
  }

  const handleFinish = async (values: TaskReclassificationFormFields) => {
    await onSubmit(values, form.setFields)
  }

  return (
    <BaseModal
      visible={visible}
      title={modalTitle}
      onOk={form.submit}
      okText='Запросить переклассификацию'
      okButtonProps={submitButtonProps}
      onCancel={onCancel}
      cancelButtonProps={buttonCommonProps}
    >
      <Form<TaskReclassificationFormFields>
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
