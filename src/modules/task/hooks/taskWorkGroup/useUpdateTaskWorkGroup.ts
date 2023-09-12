import { useCallback, useEffect } from 'react'

import { updateTaskWorkGroupMessages } from 'modules/task/constants'
import { UpdateTaskWorkGroupMutationArgs } from 'modules/task/models'
import { taskWorkGroupApiPermissions } from 'modules/task/permissions'
import { useUpdateTaskWorkGroupMutation } from 'modules/task/services/taskApiService'
import { useUserPermissions } from 'modules/user/hooks'

import {
  isBadRequestError,
  isErrorResponse,
  isServerRangeError,
} from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

export const useUpdateTaskWorkGroup = () => {
  const permissions = useUserPermissions(taskWorkGroupApiPermissions)
  const [mutation, state] = useUpdateTaskWorkGroupMutation()

  const fn = useCallback(
    async (data: UpdateTaskWorkGroupMutationArgs) => {
      if (!permissions.canUpdate) return

      await mutation(data).unwrap()
    },
    [mutation, permissions.canUpdate],
  )

  useEffect(() => {
    if (!state.error) return

    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error) && state.error.data.detail) {
        showErrorNotification(state.error.data.detail)
      } else if (isServerRangeError(state.error)) {
        showErrorNotification(updateTaskWorkGroupMessages.commonError)
      }
    }
  }, [state.error])

  return { fn, state }
}
