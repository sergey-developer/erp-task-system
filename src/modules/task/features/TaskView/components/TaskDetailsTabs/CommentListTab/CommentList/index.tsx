import { Typography } from 'antd'
import React, { FC } from 'react'

import Space from 'components/Space'
import { GetTaskCommentListResponseModel } from 'modules/task/features/TaskView/models'
import { getShortUserName } from 'modules/user/utils'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import formatDate from 'shared/utils/date/formatDate'

import Comment from './Comment'

const { Text } = Typography

export type CommentListProps = {
  data: GetTaskCommentListResponseModel
  isLoading: boolean
}

const CommentList: FC<CommentListProps> = ({ isLoading, data }) => {
  return (
    <Space
      data-testid='task-comment-list'
      size='large'
      direction='vertical'
      $block
    >
      {!isLoading && !data.length ? (
        <Text>Комментариев пока нет</Text>
      ) : (
        data.map((comment) => (
          <Comment
            key={comment.id}
            text={comment.text}
            author={getShortUserName(comment.author)}
            createdAt={formatDate(comment.createdAt, DATE_TIME_FORMAT)}
          />
        ))
      )}
    </Space>
  )
}

export default CommentList
