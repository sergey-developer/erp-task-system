import { useCallback, useEffect } from 'react'

import { createSuspendRequestMessages } from 'modules/task/constants'
import { CreateTaskSuspendRequestMutationArgs } from 'modules/task/models'
import { taskSuspendRequestApiPermissions } from 'modules/task/permissions'
import { useCreateSuspendRequestMutation } from 'modules/task/services/taskSuspendRequestApi.service'
import { useUserPermissions } from 'modules/user/hooks'

import { commonApiMessages } from 'shared/constants/common'
import { isBadRequestError, isErrorResponse, isNotFoundError } from 'shared/services/baseApi'
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
    if (!state.error) return

    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error)) {
        showErrorNotification(createSuspendRequestMessages.notFoundError)
      } else if (isBadRequestError(state.error)) {
        showErrorNotification(createSuspendRequestMessages.badRequestError)
      } else {
        showErrorNotification(commonApiMessages.unknownError)
      }
    }
  }, [state.error])

  return { fn, state }
}
