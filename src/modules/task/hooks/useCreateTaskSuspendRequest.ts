import { useCallback, useEffect } from 'react'

import { suspendRequestApiMessages } from 'modules/task/constants/errorMessages'
import { CreateTaskSuspendRequestMutationArgs } from 'modules/task/models'
import { taskSuspendRequestApiPermissions } from 'modules/task/permissions'
import { useCreateSuspendRequestMutation } from 'modules/task/services/taskSuspendRequestApi.service'
import { useUserPermissions } from 'modules/user/hooks'

import { commonApiMessages } from 'shared/constants/errors'
import {
  isBadRequestError,
  isErrorResponse,
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

    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error)) {
        showErrorNotification(
          suspendRequestApiMessages.createRequest.notFoundError,
        )
      } else if (isBadRequestError(state.error)) {
        showErrorNotification(
          suspendRequestApiMessages.createRequest.badRequestError,
        )
      } else {
        showErrorNotification(commonApiMessages.unknownError)
      }
    }
  }, [state.error, state.isError])

  return { fn, state }
}
