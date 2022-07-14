import { useBoolean } from 'ahooks'
import { Space } from 'antd'
import React, { FC } from 'react'

import { EllipsisConfig } from 'antd/lib/typography/Base'
import { TaskDetailsCommentModel } from 'modules/tasks/taskView/models'

import { CommentText, HeaderTextStyled } from './styles'

const commentEllipsisProps: EllipsisConfig = { rows: 3 }

type TaskCommentProps = Pick<TaskDetailsCommentModel, 'createdAt' | 'text'> & {
  author: string
}

const TaskComment: FC<TaskCommentProps> = (props) => {
  const { text, createdAt, author } = props
  const [commentHasEllipsis, { setFalse: setCommentHasNotEllipsis }] =
    useBoolean(true)

  return (
    <Space direction='vertical'>
      <Space split={<HeaderTextStyled>•</HeaderTextStyled>}>
        <HeaderTextStyled>{author}</HeaderTextStyled>
        <HeaderTextStyled>{createdAt}</HeaderTextStyled>
      </Space>

      <CommentText
        ellipsis={commentHasEllipsis && commentEllipsisProps}
        onClick={setCommentHasNotEllipsis}
      >
        {text}
      </CommentText>
    </Space>
  )
}

export default TaskComment
