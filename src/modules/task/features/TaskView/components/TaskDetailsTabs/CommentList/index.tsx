import { useBoolean } from 'ahooks'
import { Button, Row, Typography } from 'antd'
import React, { FC, useCallback, useMemo } from 'react'

import LoadableData from 'components/LoadableData'
import Space from 'components/Space'
import useCreateTaskComment from 'modules/task/features/TaskView/hooks/useCreateTaskComment'
import useGetTaskCommentList from 'modules/task/features/TaskView/hooks/useGetTaskCommentList'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'
import getShortUserName from 'modules/user/utils/getShortUserName'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import { ErrorResponse } from 'shared/services/api'
import formatDate from 'shared/utils/date/formatDate'
import handleSetFieldsErrors from 'shared/utils/form/handleSetFieldsErrors'

import CreateCommentForm from './AddCommentForm'
import {
  CreateCommentFormErrors,
  CreateCommentFormProps,
} from './AddCommentForm/interfaces'
import TaskComment from './TaskComment'

const { Title, Text } = Typography
const DEFAULT_DISPLAYABLE_COUNT: number = 3

export type CommentListProps = {
  title: string
  taskId: TaskDetailsModel['id']
}

const CommentList: FC<CommentListProps> = ({ title, taskId }) => {
  const { data: commentList = [], isFetching: commentListIsFetching } =
    useGetTaskCommentList(taskId)

  const {
    fn: createComment,
    state: { isLoading: createCommentIsLoading },
  } = useCreateTaskComment()

  const [expanded, { toggle: toggleExpanded }] = useBoolean(false)

  const handleCreateComment = useCallback<CreateCommentFormProps['onSubmit']>(
    async (values, form) => {
      try {
        await createComment({ taskId, ...values })
        form.resetFields()
      } catch (exception) {
        const error = exception as ErrorResponse<CreateCommentFormErrors>
        handleSetFieldsErrors(error, form.setFields)
      }
    },
    [createComment, taskId],
  )

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
    <Space direction='vertical' size='large' $block>
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

      <CreateCommentForm
        onSubmit={handleCreateComment}
        isLoading={createCommentIsLoading}
      />

      <LoadableData
        isLoading={commentListIsFetching}
        noContent={!commentsExist && <Text>Комментариев пока нет</Text>}
      >
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
      </LoadableData>
    </Space>
  )
}

export default CommentList
