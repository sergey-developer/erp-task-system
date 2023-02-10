import { useCallback, useEffect } from 'react'

import { taskCommentApiMessages } from 'modules/task/constants/errorMessages'
import { CreateTaskCommentMutationArgs } from 'modules/task/models'
import { taskCommentApiPermissions } from 'modules/task/permissions'
import { useCreateTaskCommentMutation } from 'modules/task/services/taskCommentApi.service'
import { useUserPermissions } from 'modules/user/hooks'
import { commonApiMessages } from 'shared/constants/errors'
import {
  ErrorResponse,
  isBadRequestError,
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
    if (!state.isError) return

    const error = state.error as ErrorResponse

    if (isNotFoundError(error) || isServerRangeError(error)) {
      showErrorNotification(taskCommentApiMessages.createComment.commonError)
    } else if (!isBadRequestError(error)) {
      showErrorNotification(commonApiMessages.unknownError)
    }
  }, [state.error, state.isError])

  return { fn, state }
}
