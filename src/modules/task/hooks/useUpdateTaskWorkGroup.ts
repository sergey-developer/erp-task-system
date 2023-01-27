import { useCallback, useEffect } from 'react'

import { UPDATE_TASK_WORK_GROUP_COMMON_ERROR_MSG } from 'modules/task/constants/errorMessages'
import { UpdateTaskWorkGroupMutationArgs } from 'modules/task/models'
import { taskWorkGroupApiPermissions } from 'modules/task/permissions'
import { useUpdateTaskWorkGroupMutation } from 'modules/task/services/taskWorkGroupApi.service'
import { useUserPermissions } from 'modules/user/hooks'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/errors'
import {
  ErrorResponse,
  isBadRequestError,
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

    const error = state.error as ErrorResponse

    if (isBadRequestError(error) || isServerRangeError(error)) {
      showErrorNotification(UPDATE_TASK_WORK_GROUP_COMMON_ERROR_MSG)
    } else {
      showErrorNotification(UNKNOWN_ERROR_MSG)
    }
  }, [state.error, state.isError])

  return { fn, state }
}
