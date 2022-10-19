import { Button, Form, Input } from 'antd'
import { FC } from 'react'

import Space from 'components/Space'
import { BASE_LONG_TEXT_RULES } from 'shared/constants/validation'

const { TextArea } = Input

type AddCommentFormProps = {
  isLoading: boolean
}

const AddCommentForm: FC<AddCommentFormProps> = ({ isLoading }) => {
  return (
    <Space direction='vertical' size='middle' $block>
      <Form layout='vertical'>
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
