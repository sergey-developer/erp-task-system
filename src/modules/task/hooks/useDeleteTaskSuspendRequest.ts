import { useCallback, useEffect } from 'react'

import { DeleteTaskSuspendRequestMutationArgs } from 'modules/task/models'
import { taskSuspendRequestApiPermissions } from 'modules/task/permissions'
import { useUserPermissions } from 'modules/user/hooks'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/errors'
import {
  ErrorResponse,
  getErrorDetail,
  isBadRequestError,
  isNotFoundError,
} from 'shared/services/api'
import {
  showErrorNotification,
  showMultipleErrorNotification,
} from 'shared/utils/notifications'

import { useDeleteSuspendRequestMutation } from '../services/taskSuspendRequestApi.service'

export const useDeleteTaskSuspendRequest = () => {
  const permissions = useUserPermissions(taskSuspendRequestApiPermissions)
  const [mutation, state] = useDeleteSuspendRequestMutation()

  const fn = useCallback(
    async (data: DeleteTaskSuspendRequestMutationArgs) => {
      if (!permissions.canDelete) return

      await mutation(data).unwrap()
    },
    [mutation, permissions.canDelete],
  )

  useEffect(() => {
    if (!state.isError) return

    const error = state.error as ErrorResponse

    if (isNotFoundError(error)) {
      showErrorNotification('Заявка не найдена или не находится в ожидании')
    } else if (isBadRequestError(error)) {
      showMultipleErrorNotification(getErrorDetail(error))
    } else {
      showErrorNotification(UNKNOWN_ERROR_MSG)
    }
  }, [state.error, state.isError])

  return { fn, state }
}
