import { useCallback, useEffect } from 'react'

import { taskWorkGroupApiMessages } from 'modules/task/constants/errorMessages'
import { UpdateTaskWorkGroupMutationArgs } from 'modules/task/models'
import { taskWorkGroupApiPermissions } from 'modules/task/permissions'
import { useUpdateTaskWorkGroupMutation } from 'modules/task/services/taskWorkGroupApi.service'
import { useUserPermissions } from 'modules/user/hooks'

import { commonApiMessages } from 'shared/constants/errors'
import {
  isBadRequestError,
  isErrorResponse,
  isServerRangeError,
} from 'shared/services/api'
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
    if (!state.isError) return

    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error) || isServerRangeError(state.error)) {
        showErrorNotification(
          taskWorkGroupApiMessages.updateWorkGroup.commonError,
        )
      } else {
        showErrorNotification(commonApiMessages.unknownError)
      }
    }
  }, [state.error, state.isError])

  return { fn, state }
}
