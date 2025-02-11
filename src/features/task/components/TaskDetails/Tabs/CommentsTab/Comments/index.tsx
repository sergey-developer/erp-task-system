import { Typography } from 'antd'
import { TaskCommentModel } from 'features/task/models'
import { getShortUserName } from 'features/users/helpers'
import React, { FC } from 'react'

import Space from 'components/Space'

import { formatDate } from 'shared/utils/date'

import Comment from './Comment'

const { Text } = Typography

export type CommentsProps = {
  comments: TaskCommentModel[]
  isLoading: boolean
}

const Comments: FC<CommentsProps> = ({ isLoading, comments }) => {
  return (
    <Space data-testid='task-comments' size='large' direction='vertical' $block>
      {!isLoading && !comments.length ? (
        <Text>Комментариев пока нет</Text>
      ) : (
        comments.map((comment) => (
          <Comment
            key={comment.id}
            text={comment.text}
            author={getShortUserName(comment.author)}
            createdAt={formatDate(comment.createdAt)}
            attachments={comment.attachments}
          />
        ))
      )}
    </Space>
  )
}

export default Comments
