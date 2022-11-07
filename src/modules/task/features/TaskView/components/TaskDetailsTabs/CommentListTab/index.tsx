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

import CommentList from './CommentList'
import CreateCommentForm from './CreateCommentForm'
import {
  CreateCommentFormErrors,
  CreateCommentFormProps,
} from './CreateCommentForm/interfaces'

const { Title } = Typography
const DISPLAYABLE_COUNT: number = 3

export type CommentListTabProps = {
  title: string
  taskId: TaskDetailsModel['id']
}

const CommentListTab: FC<CommentListTabProps> = ({ title, taskId }) => {
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

  const isDisplayableCountExceed: boolean =
    commentList.length > DISPLAYABLE_COUNT

  const displayableComments =
    isDisplayableCountExceed && expanded
      ? commentList
      : commentList.slice(0, DISPLAYABLE_COUNT)

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

      <CreateCommentForm
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
