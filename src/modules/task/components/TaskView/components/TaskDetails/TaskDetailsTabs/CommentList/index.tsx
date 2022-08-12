import { useBoolean } from 'ahooks'
import { Button, Row, Space, Spin, Typography } from 'antd'
import React, { FC, useMemo } from 'react'

import useGetTaskCommentList from 'modules/task/components/TaskView/hooks/useGetTaskCommentList'
import { TaskDetailsModel } from 'modules/task/components/TaskView/models'
import getShortUserName from 'modules/user/utils/getShortUserName'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import formatDate from 'shared/utils/date/formatDate'

import TaskComment from './TaskComment'

const { Title, Text } = Typography
const DEFAULT_DISPLAYABLE_COUNT: number = 3

type CommentListProps = {
  title: string
  taskId: TaskDetailsModel['id']
}

const CommentList: FC<CommentListProps> = ({ title, taskId }) => {
  const { data: commentList = [], isFetching: commentListIsFetching } =
    useGetTaskCommentList(taskId)

  const [expanded, { toggle: toggleExpanded }] = useBoolean(false)

  const modifiedCommentList = useMemo(
    () =>
      commentList.map((comment) => ({
        ...comment,
        author: getShortUserName(comment.author),
        createdAt: formatDate(comment.createdAt, DATE_TIME_FORMAT),
      })),
    [commentList],
  )

  const commentsExist: boolean = !!modifiedCommentList.length

  const isDisplayableCountExceed: boolean =
    modifiedCommentList.length > DEFAULT_DISPLAYABLE_COUNT

  const displayableComments =
    isDisplayableCountExceed && expanded
      ? modifiedCommentList
      : modifiedCommentList.slice(0, DEFAULT_DISPLAYABLE_COUNT)

  return (
    <Space direction='vertical' size='middle'>
      <Row justify='space-between'>
        <Title level={5}>{title}</Title>

        {commentsExist && isDisplayableCountExceed && (
          <Button type='link' onClick={toggleExpanded}>
            {expanded
              ? 'Скрыть комментарии'
              : `Отобразить все комментарии: ${modifiedCommentList.length}`}
          </Button>
        )}
      </Row>

      {commentListIsFetching ? (
        <Spin />
      ) : !commentsExist ? (
        <Text>Комментариев пока нет</Text>
      ) : (
        <Space size='large' direction='vertical'>
          {displayableComments.map((comment) => (
            <TaskComment
              key={comment.id}
              text={comment.text}
              author={comment.author}
              createdAt={comment.createdAt}
            />
          ))}
        </Space>
      )}
    </Space>
  )
}

export default CommentList
