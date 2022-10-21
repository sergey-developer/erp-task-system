import { Button, Form, Input } from 'antd'
import { FC } from 'react'

import Space from 'components/Space'
import { BASE_LONG_TEXT_RULES } from 'shared/constants/validation'

import { AddCommentFormFields, AddCommentFormProps } from './interfaces'

const { TextArea } = Input

const AddCommentForm: FC<AddCommentFormProps> = ({ onSubmit, isLoading }) => {
  const [form] = Form.useForm<AddCommentFormFields>()

  const handleFinish = async (values: AddCommentFormFields) => {
    await onSubmit(values, form.setFields)
  }

  return (
    <Space
      data-testid='form-add-comment'
      direction='vertical'
      size='middle'
      $block
    >
      <Form<AddCommentFormFields>
        form={form}
        layout='vertical'
        onFinish={handleFinish}
      >
        <Form.Item name='comment' rules={BASE_LONG_TEXT_RULES}>
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

export default AddCommentForm
