import { useCallback, useEffect } from 'react'

import { createTaskCommentMessages } from 'modules/task/constants'
import { CreateTaskCommentMutationArgs } from 'modules/task/models'
import { taskCommentApiPermissions } from 'modules/task/permissions'
import { useCreateTaskCommentMutation } from 'modules/task/services/taskCommentApi.service'
import { useUserPermissions } from 'modules/user/hooks'

import { commonApiMessages } from 'shared/constants/errors'
import {
  isBadRequestError,
  isErrorResponse,
  isNotFoundError,
  isServerRangeError,
} from 'shared/services/api'
import { showErrorNotification } from 'shared/utils/notifications'

export const useCreateTaskComment = () => {
  const permissions = useUserPermissions(taskCommentApiPermissions)
  const [mutation, state] = useCreateTaskCommentMutation()

  const fn = useCallback(
    async (data: CreateTaskCommentMutationArgs) => {
      if (!permissions.canCreate) return

      await mutation(data).unwrap()
    },
    [mutation, permissions.canCreate],
  )

  useEffect(() => {
    if (!state.error) return

    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error) || isServerRangeError(state.error)) {
        showErrorNotification(createTaskCommentMessages.commonError)
      } else if (!isBadRequestError(state.error)) {
        showErrorNotification(commonApiMessages.unknownError)
      }
    }
  }, [state.error])

  return { fn, state }
}
