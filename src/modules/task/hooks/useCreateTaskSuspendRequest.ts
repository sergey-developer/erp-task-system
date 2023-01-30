import { useCallback, useEffect } from 'react'

import { suspendRequestApiMessages } from 'modules/task/constants/errorMessages'
import { CreateTaskSuspendRequestMutationArgs } from 'modules/task/models'
import { taskSuspendRequestApiPermissions } from 'modules/task/permissions'
import { useCreateSuspendRequestMutation } from 'modules/task/services/taskSuspendRequestApi.service'
import { useUserPermissions } from 'modules/user/hooks'
import { commonApiMessages } from 'shared/constants/errors'
import {
  ErrorResponse,
  isBadRequestError,
  isNotFoundError,
} from 'shared/services/api'
import { showErrorNotification } from 'shared/utils/notifications'

export const useCreateTaskSuspendRequest = () => {
  const permissions = useUserPermissions(taskSuspendRequestApiPermissions)
  const [mutation, state] = useCreateSuspendRequestMutation()

  const fn = useCallback(
    async (data: CreateTaskSuspendRequestMutationArgs) => {
      if (!permissions.canCreate) return

      await mutation(data).unwrap()
    },
    [mutation, permissions.canCreate],
  )

  useEffect(() => {
    if (!state.isError) return

    const error = state.error as ErrorResponse

    if (isNotFoundError(error)) {
      showErrorNotification(suspendRequestApiMessages.create.notFoundError)
    } else if (isBadRequestError(error)) {
      showErrorNotification(suspendRequestApiMessages.create.badRequestError)
    } else {
      showErrorNotification(commonApiMessages.unknownError)
    }
  }, [state.error, state.isError])

  return { fn, state }
}
