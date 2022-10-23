import { Space, Typography } from 'antd'
import React, { FC } from 'react'

import SeparatedText from 'components/Texts/SeparatedText'
import { TaskCommentModel } from 'modules/task/features/TaskView/models'

const { Paragraph, Text } = Typography

type TaskCommentProps = Pick<TaskCommentModel, 'createdAt' | 'text'> & {
  author: string
}

const TaskComment: FC<TaskCommentProps> = ({ text, createdAt, author }) => {
  return (
    <Space direction='vertical'>
      <SeparatedText>
        <Text type='secondary'>{author}</Text>
        <Text type='secondary'>{createdAt}</Text>
      </SeparatedText>

      <Paragraph>{text}</Paragraph>
    </Space>
  )
}

export default TaskComment
