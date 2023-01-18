import { useCallback, useEffect } from 'react'

import { CreateTaskSuspendRequestMutationArgsModel } from 'modules/task/models'
import { taskSuspendRequestApiPermissions } from 'modules/task/permissions'
import { useUserPermissions } from 'modules/user/hooks'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/errors'
import {
  ErrorResponse,
  isBadRequestError,
  isNotFoundError,
} from 'shared/services/api'
import { showErrorNotification } from 'shared/utils/notifications'

import { useCreateSuspendRequestMutation } from '../services/taskSuspendRequestApi.service'

export const useCreateTaskSuspendRequest = () => {
  const permissions = useUserPermissions(taskSuspendRequestApiPermissions)
  const [mutation, state] = useCreateSuspendRequestMutation()

  const fn = useCallback(
    async (data: CreateTaskSuspendRequestMutationArgsModel) => {
      if (!permissions.canCreate) return

      await mutation(data).unwrap()
    },
    [mutation, permissions.canCreate],
  )

  useEffect(() => {
    if (!state.isError) return

    const error = state.error as ErrorResponse

    if (isNotFoundError(error)) {
      showErrorNotification(
        'Невозможно перевести заявку в ожидание - заявка не найдена',
      )
    } else if (isBadRequestError(error)) {
      showErrorNotification(
        'Невозможно перевести заявку в ожидание. Пожалуйста, попробуйте позже',
      )
    } else {
      showErrorNotification(UNKNOWN_ERROR_MSG)
    }
  }, [state.error, state.isError])

  return { fn, state }
}
