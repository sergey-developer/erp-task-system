import { useCallback, useEffect } from 'react'

import { useUpdateTaskWorkGroupMutation } from 'modules/task/services/taskWorkGroupApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/validation'
import {
  ErrorResponse,
  isNotFoundError,
  isServerRangeError,
} from 'shared/services/api'
import { showErrorNotification } from 'shared/utils/notifications'

import { UPDATE_TASK_WORK_GROUP_COMMON_ERROR_MSG } from '../constants/messages'
import { UpdateTaskWorkGroupMutationArgsModel } from '../models'
import { taskWorkGroupApiPermissions } from '../permissions'

const useUpdateTaskWorkGroup = () => {
  const permissions = useUserPermissions(taskWorkGroupApiPermissions)
  const [mutation, state] = useUpdateTaskWorkGroupMutation()

  const fn = useCallback(
    async (data: UpdateTaskWorkGroupMutationArgsModel) => {
      if (!permissions.canUpdate) return

      await mutation(data).unwrap()
    },
    [mutation, permissions.canUpdate],
  )

  useEffect(() => {
    if (!state.isError) return

    const error = state.error as ErrorResponse

    if (isNotFoundError(error) || isServerRangeError(error)) {
      showErrorNotification(UPDATE_TASK_WORK_GROUP_COMMON_ERROR_MSG)
    } else {
      showErrorNotification(UNKNOWN_ERROR_MSG)
    }
  }, [state.error, state.isError])

  return { fn, state }
}

export default useUpdateTaskWorkGroup
