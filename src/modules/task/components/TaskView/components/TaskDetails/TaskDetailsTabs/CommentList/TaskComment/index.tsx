import { Space, Typography } from 'antd'
import React, { FC } from 'react'

import SeparatedText from 'components/Texts/SeparatedText'
import { TaskDetailsCommentModel } from 'modules/task/components/TaskView/models'

const { Paragraph, Text } = Typography

type TaskCommentProps = Pick<TaskDetailsCommentModel, 'createdAt' | 'text'> & {
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
