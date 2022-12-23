import { useCallback, useEffect } from 'react'

import { CreateTaskCommentMutationArgsModel } from 'modules/task/models'
import { taskCommentApiPermissions } from 'modules/task/permissions'
import { useCreateTaskCommentMutation } from 'modules/task/services/taskCommentApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/validation'
import {
  ErrorResponse,
  isBadRequestError,
  isNotFoundError,
  isServerRangeError,
} from 'shared/services/api'
import { showErrorNotification } from 'shared/utils/notifications'

import { CREATE_TASK_COMMENT_ERROR_MSG } from '../constants/messages'

export const useCreateTaskComment = () => {
  const permissions = useUserPermissions(taskCommentApiPermissions)
  const [mutation, state] = useCreateTaskCommentMutation()

  const fn = useCallback(
    async (data: CreateTaskCommentMutationArgsModel) => {
      if (!permissions.canCreate) return

      await mutation(data).unwrap()
    },
    [mutation, permissions.canCreate],
  )

  useEffect(() => {
    if (!state.isError) return
    const error = state.error as ErrorResponse

    if (isNotFoundError(error) || isServerRangeError(error)) {
      showErrorNotification(CREATE_TASK_COMMENT_ERROR_MSG)
    } else if (!isBadRequestError(error)) {
      showErrorNotification(UNKNOWN_ERROR_MSG)
    }
  }, [state.error, state.isError])

  return { fn, state }
}
