import { Space, Typography } from 'antd'
import { FC, useState } from 'react'

import { EllipsisConfig } from 'antd/lib/typography/Base'
import { TaskDetailsCommentModel } from 'modules/tasks/taskView/models'

import { HeaderTextStyled } from './styles'

const { Paragraph } = Typography
const commentEllipsisProps: EllipsisConfig = { rows: 3 }

type TaskCommentProps = Pick<TaskDetailsCommentModel, 'createdAt' | 'text'> & {
  author: string
}

const TaskComment: FC<TaskCommentProps> = (props) => {
  const { text, createdAt, author } = props
  const [commentHasEllipsis, setCommentHasEllipsis] = useState(true)

  return (
    <Space direction='vertical'>
      <Space split={<HeaderTextStyled>•</HeaderTextStyled>}>
        <HeaderTextStyled>{author}</HeaderTextStyled>
        <HeaderTextStyled>{createdAt}</HeaderTextStyled>
      </Space>

      <Paragraph
        ellipsis={commentHasEllipsis ? commentEllipsisProps : false}
        onClick={() => setCommentHasEllipsis(false)}
      >
        {text}
      </Paragraph>
    </Space>
  )
}

export default TaskComment
