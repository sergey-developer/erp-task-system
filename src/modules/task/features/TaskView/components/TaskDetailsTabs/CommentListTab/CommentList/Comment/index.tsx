import { Typography } from 'antd'
import React, { FC } from 'react'

import Space from 'components/Space'
import SeparatedText from 'components/Texts/SeparatedText'
import { TaskCommentModel } from 'modules/task/features/TaskView/models'

const { Paragraph, Text } = Typography

type CommentProps = Pick<TaskCommentModel, 'createdAt' | 'text'> & {
  author: string
}

const Comment: FC<CommentProps> = ({ text, createdAt, author }) => {
  return (
    <Space data-testid='task-comment' direction='vertical' $block>
      <SeparatedText>
        <Text type='secondary'>{author}</Text>
        <Text type='secondary'>{createdAt}</Text>
      </SeparatedText>

      <Paragraph>{text}</Paragraph>
    </Space>
  )
}

export default Comment
