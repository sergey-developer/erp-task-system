import { Button, Form, Input } from 'antd'
import { FC } from 'react'

import Space from 'components/Space'
import { BASE_LONG_TEXT_RULES } from 'shared/constants/validation'

import { CreateCommentFormFields, CreateCommentFormProps } from './interfaces'

const { TextArea } = Input

const CreateCommentForm: FC<CreateCommentFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [form] = Form.useForm<CreateCommentFormFields>()

  const handleFinish = async (values: CreateCommentFormFields) => {
    await onSubmit(values, form)
  }

  return (
    <Space
      data-testid='form-create-comment'
      direction='vertical'
      size='middle'
      $block
    >
      <Form<CreateCommentFormFields>
        form={form}
        layout='vertical'
        onFinish={handleFinish}
      >
        <Form.Item
          data-testid='field-comment'
          name='comment'
          rules={BASE_LONG_TEXT_RULES}
        >
          <TextArea
            placeholder='Дополните информацию о заявке'
            disabled={isLoading}
          />
        </Form.Item>

        <Button type='primary' htmlType='submit' loading={isLoading}>
          Опубликовать комментарий
        </Button>
      </Form>
    </Space>
  )
}

export default CreateCommentForm
