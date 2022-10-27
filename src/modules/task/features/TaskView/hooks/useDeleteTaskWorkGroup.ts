import { useCallback, useEffect } from 'react'

import { useDeleteTaskWorkGroupMutation } from 'modules/task/services/taskWorkGroupApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/validation'
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

import { DeleteTaskWorkGroupMutationArgsModel } from '../models'
import { taskWorkGroupApiPermissions } from '../permissions'

const useDeleteTaskWorkGroup = () => {
  const permissions = useUserPermissions(taskWorkGroupApiPermissions)
  const [mutation, state] = useDeleteTaskWorkGroupMutation()

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
    } else if (!isBadRequestError(error)) {
      showErrorNotification(UNKNOWN_ERROR_MSG)
    }
  }, [state.error, state.isError])

  return { fn, state }
}

export default useDeleteTaskWorkGroup
