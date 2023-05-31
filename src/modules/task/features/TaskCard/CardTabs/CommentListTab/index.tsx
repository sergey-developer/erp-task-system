import { useBoolean } from 'ahooks'
import { Button, Row, Typography } from 'antd'
import React, { FC, useCallback } from 'react'

import { useCreateTaskComment, useGetTaskCommentList } from 'modules/task/hooks'
import { TaskModel } from 'modules/task/models'

import LoadingArea from 'components/LoadingArea'
import Space from 'components/Space'

import { isBadRequestError, isErrorResponse } from 'shared/services/api'
import { mapUploadedFiles } from 'shared/utils/file'
import { handleSetFieldsErrors } from 'shared/utils/form'

import CommentList from './CommentList'
import CreateCommentForm from './CreateCommentForm'
import { CreateCommentFormProps } from './CreateCommentForm/interfaces'

const { Title } = Typography
export const DEFAULT_DISPLAYABLE_COUNT: number = 3

export type CommentListTabProps = {
  title: string
  taskId: TaskModel['id']
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
        await createComment({
          taskId,
          comment: values.comment.trim(),
          attachments: values.attachments
            ? mapUploadedFiles(values.attachments)
            : undefined,
        })

        form.resetFields()
      } catch (error) {
        if (isErrorResponse(error)) {
          if (isBadRequestError(error)) {
            handleSetFieldsErrors(error, form.setFields)
          }
        }
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
    <Space
      data-testid='task-comment-list-tab'
      direction='vertical'
      size='large'
      $block
    >
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

      <LoadingArea
        data-testid='task-comment-list-loading'
        isLoading={commentListIsFetching}
      >
        <CommentList
          isLoading={commentListIsFetching}
          comments={displayableComments}
        />
      </LoadingArea>
    </Space>
  )
}

export default CommentListTab
