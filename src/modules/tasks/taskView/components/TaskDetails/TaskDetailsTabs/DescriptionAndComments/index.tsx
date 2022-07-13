import { Space, Spin, Typography } from 'antd'
import React, { FC, useMemo } from 'react'

import OpenableText from 'components/OpenableText'
import useGetTaskCommentList from 'modules/tasks/taskView/hooks/useGetTaskCommentList'
import { TaskDetailsModel } from 'modules/tasks/taskView/models'
import getShortUserName from 'modules/user/utils/getShortUserName'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import formatDate from 'shared/utils/date/formatDate'

import TaskComment from './TaskComment'

const { Title, Text } = Typography

type DescriptionAndCommentsTabProps = Pick<
  TaskDetailsModel,
  'id' | 'description'
>

const DescriptionAndComments: FC<DescriptionAndCommentsTabProps> = ({
  id: taskId,
  description,
}) => {
  const { data: comments, isFetching: commentsIsFetching } =
    useGetTaskCommentList(taskId)

  const taskComments = useMemo(() => {
    if (!comments?.length) {
      return <Text>Комментариев пока нет</Text>
    }

    return (
      <Space size='large' direction='vertical'>
        {comments.map((comment) => (
          <TaskComment
            key={comment.id}
            text={comment.text}
            author={getShortUserName(comment.author)}
            createdAt={formatDate(comment.createdAt, DATE_TIME_FORMAT)}
          />
        ))}
      </Space>
    )
  }, [comments])

  return (
    <>
      <Title level={5}>Описание</Title>

      {description && (
        <OpenableText
          className='margin-b-15'
          text={description}
          modalTitle='Описание'
        />
      )}

      <Title level={5}>Комментарии</Title>

      {commentsIsFetching ? <Spin /> : taskComments}
    </>
  )
}

export default DescriptionAndComments
