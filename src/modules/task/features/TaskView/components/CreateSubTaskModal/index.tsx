import { Form, Input, Typography } from 'antd'
import React, { FC } from 'react'

import BaseModal from 'components/Modals/BaseModal'
import { DEFAULT_LONG_TEXT_RULES } from 'shared/constants/validation'

import { templateFieldNames } from './constants'
import { CreateSubTaskFormFields, CreateSubTaskModalProps } from './interfaces'
import { SelectStyled } from './styles'
import { TEMPLATE_RULES, TITLE_RULES } from './validation'

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
          name='template'
          rules={TEMPLATE_RULES}
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
          rules={TITLE_RULES}
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
          rules={DEFAULT_LONG_TEXT_RULES}
        >
          <TextArea
            placeholder='Расскажите подробнее о задаче'
            allowClear
            disabled={isLoading}
          />
        </Form.Item>
      </Form>
    </BaseModal>
  )
}

export default CreateSubTaskModal
