import { Flex, Form, Input } from 'antd'
import React, { FC } from 'react'

import LabeledData from 'components/LabeledData'
import BaseModal from 'components/Modals/BaseModal'

import { SAVE_TEXT } from 'shared/constants/common'

import { ChangeTaskDescriptionModalFormFields, ChangeTaskDescriptionModalProps } from './types'

const { TextArea } = Input

const ChangeTaskDescriptionModal: FC<ChangeTaskDescriptionModalProps> = ({
  onSubmit,
  description,
  previousDescription,
  ...props
}) => {
  const [form] = Form.useForm<ChangeTaskDescriptionModalFormFields>()

  const onFinish = async (values: ChangeTaskDescriptionModalFormFields) => {
    await onSubmit({ internalDescription: values.internalDescription.trim() }, form.setFields)
  }

  return (
    <BaseModal
      {...props}
      data-testid='change-task-description-modal'
      title='Изменить описание'
      onOk={form.submit}
      okText={SAVE_TEXT}
    >
      <Flex vertical>
        <LabeledData label='Внешнее описание:'>{previousDescription || description}</LabeledData>

        <Form<ChangeTaskDescriptionModalFormFields>
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

export default ChangeTaskDescriptionModal
