import { useBoolean } from 'ahooks'
import { Button, Flex, Row, Typography } from 'antd'
import React, { FC, useCallback } from 'react'

import { useCreateTaskComment, useGetTaskCommentList } from 'features/task/hooks/taskComment'
import { TaskModel } from 'features/task/models'
import { UserPermissionsEnum } from 'features/user/constants'
import { useUserPermissions } from 'features/user/hooks'

import LoadingArea from 'components/LoadingArea'

import { isBadRequestError, isErrorResponse } from 'shared/api/baseApi'
import { extractOriginFiles } from 'shared/utils/file'
import { getFieldsErrors } from 'shared/utils/form'

import Comments from './Comments'
import CreateCommentForm from './CreateCommentForm'
import { CreateCommentFormProps } from './CreateCommentForm/types'

const { Title } = Typography
export const DEFAULT_DISPLAYABLE_COUNT = 3

export type CommentsTabProps = {
  title: string
  taskId: TaskModel['id']
}

const CommentsTab: FC<CommentsTabProps> = ({ title, taskId }) => {
  const permissions = useUserPermissions([UserPermissionsEnum.TasksCommentCreate])

  const { data: comments = [], isFetching: commentsIsFetching } = useGetTaskCommentList({
    taskId,
  })

  const [createCommentMutation, { isLoading: createCommentIsLoading }] = useCreateTaskComment()

  const [expanded, { toggle: toggleExpanded }] = useBoolean(false)

  const onCreateComment = useCallback<CreateCommentFormProps['onSubmit']>(
    async (values, form) => {
      try {
        await createCommentMutation({
          taskId,
          comment: values.comment.trim(),
          attachments: values.attachments?.length
            ? extractOriginFiles(values.attachments)
            : undefined,
        }).unwrap()

        form.resetFields()
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          form.setFields(getFieldsErrors(error.data))
        }
      }
    },
    [createCommentMutation, taskId],
  )

  const isDisplayableCountExceed: boolean = comments.length > DEFAULT_DISPLAYABLE_COUNT

  const displayableComments =
    isDisplayableCountExceed && expanded ? comments : comments.slice(0, DEFAULT_DISPLAYABLE_COUNT)

  return (
    <Flex data-testid='task-comments-tab' vertical gap='large'>
      <Row justify='space-between'>
        <Title level={5}>{title}</Title>

        {!!comments.length && isDisplayableCountExceed && (
          <Button type='link' onClick={toggleExpanded}>
            {expanded ? 'Скрыть комментарии' : `Отобразить все комментарии: ${comments.length}`}
          </Button>
        )}
      </Row>

      {permissions.tasksCommentCreate && (
        <CreateCommentForm onSubmit={onCreateComment} isLoading={createCommentIsLoading} />
      )}

      <LoadingArea data-testid='task-comments-loading' isLoading={commentsIsFetching}>
        <Comments isLoading={commentsIsFetching} comments={displayableComments} />
      </LoadingArea>
    </Flex>
  )
}

export default CommentsTab
