import { useCallback, useEffect } from 'react'

import { DeleteTaskWorkGroupMutationArgs } from 'modules/task/models'
import { taskWorkGroupApiPermissions } from 'modules/task/permissions'
import { useDeleteTaskWorkGroupMutation } from 'modules/task/services/taskApi.service'
import { useUserPermissions } from 'modules/user/hooks'

import { commonApiMessages } from 'shared/constants/common'
import {
  isBadRequestError,
  isErrorResponse,
  isNotFoundError,
  isServerRangeError,
} from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

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
    if (!state.error) return

    if (isErrorResponse(state.error)) {
      if (
        (isNotFoundError(state.error) || isServerRangeError(state.error)) &&
        state.error.data.detail
      ) {
        showErrorNotification(state.error.data.detail)
      } else if (!isBadRequestError(state.error)) {
        showErrorNotification(commonApiMessages.unknownError)
      }
    }
  }, [state.error])

  return { fn, state }
}
