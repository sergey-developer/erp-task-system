import { useCallback, useEffect } from 'react'

import { DeleteTaskWorkGroupMutationArgs } from 'modules/task/models'
import { taskWorkGroupApiPermissions } from 'modules/task/permissions'
import { useDeleteTaskWorkGroupMutation } from 'modules/task/services/taskWorkGroupApi.service'
import { useUserPermissions } from 'modules/user/hooks'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/errors'
import {
  ErrorResponse,
  getErrorDetail,
  isBadRequestError,
  isNotFoundError,
  isServerRangeError,
} from 'shared/services/api'
import {
  showErrorNotification,
  showMultipleErrorNotification,
} from 'shared/utils/notifications'

export const useDeleteTaskWorkGroup = () => {
  const permissions = useUserPermissions(taskWorkGroupApiPermissions)
  const [mutation, state] = useDeleteTaskWorkGroupMutation()

  const fn = useCallback(
    async (data: DeleteTaskWorkGroupMutationArgs) => {
      if (!permissions.canDelete) return

      await mutation(data).unwrap()
    },
    [mutation, permissions.canDelete],
  )

  useEffect(() => {
    if (!state.isError) return

    const error = state.error as ErrorResponse

    if (isNotFoundError(error) || isServerRangeError(error)) {
      showMultipleErrorNotification(getErrorDetail(error))
    } else if (!isBadRequestError(error)) {
      showErrorNotification(UNKNOWN_ERROR_MSG)
    }
  }, [state.error, state.isError])

  return { fn, state }
}
