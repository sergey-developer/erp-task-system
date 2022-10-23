import { useBoolean } from 'ahooks'
import { Button, Row, Typography } from 'antd'
import React, { FC, useCallback } from 'react'

import LoadingArea from 'components/LoadingArea'
import Space from 'components/Space'
import useCreateTaskComment from 'modules/task/features/TaskView/hooks/useCreateTaskComment'
import useGetTaskCommentList from 'modules/task/features/TaskView/hooks/useGetTaskCommentList'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'
import { ErrorResponse } from 'shared/services/api'
import handleSetFieldsErrors from 'shared/utils/form/handleSetFieldsErrors'

import AddCommentForm from './AddCommentForm'
import {
  AddCommentFormErrors,
  AddCommentFormProps,
} from './AddCommentForm/interfaces'
import CommentList from './CommentList'

const { Title } = Typography
const DEFAULT_DISPLAYABLE_COUNT: number = 3

type CommentListTabProps = {
  title: string
  taskId: TaskDetailsModel['id']
}

const CommentListTab: FC<CommentListTabProps> = ({ title, taskId }) => {
  const {
    fn: createComment,
    state: { isLoading: createCommentIsLoading },
  } = useCreateTaskComment()

  const { data: commentList = [], isFetching: commentListIsFetching } =
    useGetTaskCommentList(taskId)

  const [expanded, { toggle: toggleExpanded }] = useBoolean(false)

  const handleCreateComment = useCallback<AddCommentFormProps['onSubmit']>(
    async (values, setFields) => {
      try {
        await createComment({ taskId, ...values })
      } catch (exception) {
        const error = exception as ErrorResponse<AddCommentFormErrors>
        handleSetFieldsErrors(error, setFields)
      }
    },
    [createComment, taskId],
  )

  const isDisplayableCountExceed: boolean =
    commentList.length > DEFAULT_DISPLAYABLE_COUNT

  const displayableComments =
    isDisplayableCountExceed && expanded
      ? commentList
      : commentList.slice(0, DEFAULT_DISPLAYABLE_COUNT)

  return (
    <Space direction='vertical' size='large' $block>
      <Row justify='space-between'>
        <Title level={5}>{title}</Title>

        {!!commentList.length && isDisplayableCountExceed && (
          <Button type='link' onClick={toggleExpanded}>
            {expanded
              ? 'Скрыть комментарии'
              : `Отобразить все комментарии: ${commentList.length}`}
          </Button>
        )}
      </Row>

      <AddCommentForm
        onSubmit={handleCreateComment}
        isLoading={createCommentIsLoading}
      />

      <LoadingArea isLoading={commentListIsFetching}>
        <CommentList
          isLoading={commentListIsFetching}
          data={displayableComments}
        />
      </LoadingArea>
    </Space>
  )
}

export default CommentListTab
