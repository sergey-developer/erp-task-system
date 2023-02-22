import { Form, Input, Typography } from 'antd'
import React, { FC } from 'react'

import BaseModal from 'components/Modals/BaseModal'

import { validationRules } from 'shared/constants/validation'

import { templateFieldNames } from './constants'
import { CreateSubTaskFormFields, CreateSubTaskModalProps } from './interfaces'
import { SelectStyled } from './styles'

const { Text, Link } = Typography
const { TextArea } = Input

const CreateSubTaskModal: FC<CreateSubTaskModalProps> = ({
  recordId,
  initialFormValues,
  templateOptions,
  templateOptionsIsLoading,
  isLoading,
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm<CreateSubTaskFormFields>()

  const modalTitle = (
    <Text>
      Задание по заявке <Link>{recordId}</Link>
    </Text>
  )

  const handleFinish = async (values: CreateSubTaskFormFields) => {
    await onSubmit(values, form.setFields)
  }

  return (
    <BaseModal
      data-testid='create-sub-task-modal'
      visible
      title={modalTitle}
      confirmLoading={isLoading}
      onOk={form.submit}
      okText='Создать задание'
      onCancel={onCancel}
    >
      <Form<CreateSubTaskFormFields>
        form={form}
        initialValues={initialFormValues}
        layout='vertical'
        onFinish={handleFinish}
        preserve={false}
      >
        <Form.Item
          data-testid='template'
          label='Шаблон'
          name='templateX5'
          rules={[validationRules.required]}
        >
          <SelectStyled
            placeholder='Наименование шаблона'
            loading={templateOptionsIsLoading}
            disabled={isLoading}
            options={templateOptions}
            fieldNames={templateFieldNames}
          />
        </Form.Item>

        <Form.Item
          data-testid='title'
          label='Краткое описание'
          name='title'
          rules={[validationRules.string.short]}
        >
          <Input
            placeholder='Опишите коротко задачу'
            allowClear
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item
          data-testid='description'
          label='Подробное описание'
          name='description'
          rules={[validationRules.string.long]}
        >
          <TextArea
            placeholder='Расскажите подробнее о задаче'
            allowClear
            disabled={isLoading}
            rows={3}
          />
        </Form.Item>
      </Form>
    </BaseModal>
  )
}

export default CreateSubTaskModal
