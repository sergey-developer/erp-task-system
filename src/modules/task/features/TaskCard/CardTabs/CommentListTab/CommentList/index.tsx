import { Typography } from 'antd'
import React, { FC } from 'react'

import { TaskCommentModel } from 'modules/task/models'
import { getShortUserName } from 'modules/user/utils'

import Space from 'components/Space'

import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import { formatDate } from 'shared/utils/date'

import Comment from './Comment'

const { Text } = Typography

export type CommentListProps = {
  comments: Array<TaskCommentModel>
  isLoading: boolean
}

const CommentList: FC<CommentListProps> = ({ isLoading, comments }) => {
  return (
    <Space
      data-testid='task-comment-list'
      size='large'
      direction='vertical'
      $block
    >
      {!isLoading && !comments.length ? (
        <Text>Комментариев пока нет</Text>
      ) : (
        comments.map((comment) => (
          <Comment
            key={comment.id}
            text={comment.text}
            author={getShortUserName(comment.author)}
            createdAt={formatDate(comment.createdAt, DATE_TIME_FORMAT)}
            attachments={comment.attachments}
          />
        ))
      )}
    </Space>
  )
}

export default CommentList
