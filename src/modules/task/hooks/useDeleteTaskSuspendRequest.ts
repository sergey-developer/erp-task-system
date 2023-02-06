import { useCallback, useEffect } from 'react'

import { suspendRequestApiMessages } from 'modules/task/constants/errorMessages'
import { DeleteTaskSuspendRequestMutationArgs } from 'modules/task/models'
import { taskSuspendRequestApiPermissions } from 'modules/task/permissions'
import { useDeleteSuspendRequestMutation } from 'modules/task/services/taskSuspendRequestApi.service'
import { useUserPermissions } from 'modules/user/hooks'
import { commonApiMessages } from 'shared/constants/errors'
import {
  ErrorResponse,
  getErrorDetail,
  isBadRequestError,
  isNotFoundError,
} from 'shared/services/api'
import {
  showErrorNotification,
  showMultipleErrorNotification,
} from 'shared/utils/notifications'

export const useDeleteTaskSuspendRequest = () => {
  const permissions = useUserPermissions(taskSuspendRequestApiPermissions)
  const [mutation, state] = useDeleteSuspendRequestMutation()

  const fn = useCallback(
    async (data: DeleteTaskSuspendRequestMutationArgs) => {
      if (!permissions.canDelete) return

      await mutation(data).unwrap()
    },
    [mutation, permissions.canDelete],
  )

  useEffect(() => {
    if (!state.isError) return

    const error = state.error as ErrorResponse

    if (isNotFoundError(error)) {
      showErrorNotification(suspendRequestApiMessages.delete.notFoundError)
    } else if (isBadRequestError(error)) {
      showMultipleErrorNotification(getErrorDetail(error))
    } else {
      showErrorNotification(commonApiMessages.unknownError)
    }
  }, [state.error, state.isError])

  return { fn, state }
}
