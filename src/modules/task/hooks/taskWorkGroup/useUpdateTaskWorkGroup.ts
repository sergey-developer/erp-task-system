import { useCallback, useEffect } from 'react'

import { updateTaskWorkGroupMessages } from 'modules/task/constants/taskWorkGroup'
import { UpdateTaskWorkGroupMutationArgs } from 'modules/task/models'
import { taskWorkGroupApiPermissions } from 'modules/task/permissions'
import { useUpdateTaskWorkGroupMutation } from 'modules/task/services/taskApi.service'
import { useUserPermissions } from 'modules/user/hooks'

import {
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
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
    if (isErrorResponse(state.error)) {
      if (
        (isBadRequestError(state.error) ||
          isForbiddenError(state.error) ||
          isNotFoundError(state.error)) &&
        state.error.data.detail
      ) {
        showErrorNotification(state.error.data.detail)
      } else {
        showErrorNotification(updateTaskWorkGroupMessages.commonError)
      }
    }
  }, [state.error])

  return { fn, state }
}
