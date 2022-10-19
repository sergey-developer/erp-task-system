import { useCallback, useEffect } from 'react'

import { useDeleteTaskWorkGroupMutation } from 'modules/task/services/taskApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/validation'
import {
  ErrorResponse,
  getErrorDetail,
  isNotFoundError,
  isServerRangeError,
} from 'shared/services/api'
import showErrorNotification from 'shared/utils/notifications/showErrorNotification'
import showMultipleErrorNotification from 'shared/utils/notifications/showMultipleErrorNotification'

import { DeleteTaskWorkGroupMutationArgsModel } from '../models'
import { taskWorkGroupApiPermissions } from '../permissions/taskWorkGroup.permissions'

const useDeleteTaskWorkGroup = () => {
  const [mutation, state] = useDeleteTaskWorkGroupMutation()
  const permissions = useUserPermissions(taskWorkGroupApiPermissions)

  const fn = useCallback(
    async (data: DeleteTaskWorkGroupMutationArgsModel) => {
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
    } else {
      showErrorNotification(UNKNOWN_ERROR_MSG)
    }
  }, [state.error, state.isError])

  return { fn, state }
}

export default useDeleteTaskWorkGroup
