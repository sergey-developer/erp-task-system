import {
  ButtonProps,
  Form,
  Input,
  Modal,
  ModalProps,
  Space,
  Typography,
} from 'antd'
import React, { FC } from 'react'

const { Text } = Typography
const { TextArea } = Input

const buttonCommonProps: ButtonProps = {
  size: 'large',
}

type TaskDecisionModalProps = Pick<
  ModalProps,
  'visible' | 'title' | 'onOk' | 'onCancel'
>

const AddTaskSolutionModal: FC<TaskDecisionModalProps> = (props) => {
  const { title, visible, onOk, onCancel } = props

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText='Выполнить заявку'
      okButtonProps={buttonCommonProps}
      cancelText='Отменить'
      cancelButtonProps={buttonCommonProps}
      width={613}
    >
      <Space direction='vertical' size='large'>
        <Space direction='vertical'>
          <Text>
            Заполните информацию о работах на объекте и предложенном решении.
            Затем нажмите кнопку «Выполнить заявку».
          </Text>

          <Text type='danger'>
            После выполнения заявка будет доступна только в режиме просмотра.
          </Text>
        </Space>

        <Form layout='vertical'>
          <Form.Item label='Техническое решение' name='technicalSolution'>
            <TextArea placeholder='Расскажите о работах на объекте' />
          </Form.Item>

          <Form.Item label='Решение для пользователя' name='solutionForUser'>
            <TextArea placeholder='Расскажите заявителю о решении' />
          </Form.Item>
        </Form>
      </Space>
    </Modal>
  )
}

export default AddTaskSolutionModal
