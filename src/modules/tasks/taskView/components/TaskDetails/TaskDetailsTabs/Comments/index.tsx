import { Spin, Typography } from 'antd'
import React, { FC, useMemo } from 'react'

import TaskCommentList from 'modules/tasks/taskView/components/TaskCommentList'
import useGetTaskCommentList from 'modules/tasks/taskView/hooks/useGetTaskCommentList'
import { TaskDetailsModel } from 'modules/tasks/taskView/models'
import getShortUserName from 'modules/user/utils/getShortUserName'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import formatDate from 'shared/utils/date/formatDate'

const { Title } = Typography
const DEFAULT_DISPLAYABLE_COMMENTS_COUNT: number = 3

type CommentsProps = {
  title: string
  taskId: TaskDetailsModel['id']
}

const Comments: FC<CommentsProps> = ({ title, taskId }) => {
  const { data: commentList = [], isFetching: commentListIsFetching } =
    useGetTaskCommentList(taskId)

  const modifiedCommentList = useMemo(() => {
    return commentList.map((comment) => ({
      ...comment,
      author: getShortUserName(comment.author),
      createdAt: formatDate(comment.createdAt, DATE_TIME_FORMAT),
    }))
  }, [commentList])

  return (
    <>
      <Title level={5}>{title}</Title>

      {commentListIsFetching ? (
        <Spin />
      ) : (
        <TaskCommentList
          list={modifiedCommentList}
          defaultDisplayableCount={DEFAULT_DISPLAYABLE_COMMENTS_COUNT}
        />
      )}
    </>
  )
}

export default Comments
