import { Flex, Form, Input } from 'antd'
import React, { FC } from 'react'

import Label from 'components/Label'
import BaseModal from 'components/Modals/BaseModal'

import { SAVE_TEXT } from 'shared/constants/common'

import { UpdateTaskDescriptionModalFormFields, UpdateTaskDescriptionModalProps } from './types'

const { TextArea } = Input

const UpdateTaskDescriptionModal: FC<UpdateTaskDescriptionModalProps> = ({
  onSubmit,
  description,
  previousDescription,
  ...props
}) => {
  const [form] = Form.useForm<UpdateTaskDescriptionModalFormFields>()

  const onFinish = async (values: UpdateTaskDescriptionModalFormFields) => {
    await onSubmit({ internalDescription: values.internalDescription.trim() }, form.setFields)
  }

  return (
    <BaseModal
      {...props}
      data-testid='update-task-description-modal'
      title='Изменить описание'
      onOk={form.submit}
      okText={SAVE_TEXT}
    >
      <Flex vertical gap='large'>
        <Label label='Внешнее описание:'>{previousDescription || description}</Label>

        <Form<UpdateTaskDescriptionModalFormFields>
          form={form}
          layout='vertical'
          initialValues={{
            internalDescription: previousDescription ? description : undefined,
          }}
          onFinish={onFinish}
        >
          <Form.Item name='internalDescription' label='Новое описание'>
            <TextArea placeholder='Расскажите подробнее о задаче' />
          </Form.Item>
        </Form>
      </Flex>
    </BaseModal>
  )
}

export default UpdateTaskDescriptionModal
