import { Space, Typography } from 'antd'
import React, { FC } from 'react'

import { TaskDetailsCommentModel } from 'modules/task/components/TaskView/models'

import { HeaderTextStyled } from './styles'

const { Paragraph } = Typography

type TaskCommentProps = Pick<TaskDetailsCommentModel, 'createdAt' | 'text'> & {
  author: string
}

const TaskComment: FC<TaskCommentProps> = ({ text, createdAt, author }) => {
  return (
    <Space direction='vertical'>
      <Space split={<HeaderTextStyled>•</HeaderTextStyled>}>
        <HeaderTextStyled>{author}</HeaderTextStyled>
        <HeaderTextStyled>{createdAt}</HeaderTextStyled>
      </Space>

      <Paragraph className='mb-0'>{text}</Paragraph>
    </Space>
  )
}

export default TaskComment
