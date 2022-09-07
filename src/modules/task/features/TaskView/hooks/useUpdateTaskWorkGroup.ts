import { useCallback, useEffect } from 'react'

import { useUpdateTaskWorkGroupMutation } from 'modules/task/services/taskApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { HttpStatusCodeEnum } from 'shared/constants/http'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/messages'
import { ErrorResponse } from 'shared/services/api'
import { isEqual } from 'shared/utils/common/isEqual'
import showErrorNotification from 'shared/utils/notifications/showErrorNotification'

import { UPDATE_TASK_WORK_GROUP_COMMON_ERROR_MSG } from '../constants/messages'
import { UpdateTaskWorkGroupMutationArgsModel } from '../models'
import { taskWorkGroupApiPermissions } from '../permissions/taskWorkGroup.permissions'

const useUpdateTaskWorkGroup = () => {
  const [mutation, state] = useUpdateTaskWorkGroupMutation()
  const permissions = useUserPermissions(taskWorkGroupApiPermissions)

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

    if (
      isEqual(error.status, HttpStatusCodeEnum.NotFound) ||
      error.status >= HttpStatusCodeEnum.ServerError
    ) {
      showErrorNotification(UPDATE_TASK_WORK_GROUP_COMMON_ERROR_MSG)
    } else {
      showErrorNotification(UNKNOWN_ERROR_MSG)
    }
  }, [state.error, state.isError])

  return { fn, state }
}

export default useUpdateTaskWorkGroup
