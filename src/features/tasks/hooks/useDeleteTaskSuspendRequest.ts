import { deleteTaskSuspendRequestErrorMessage } from 'features/tasks/api/constants'
import { useDeleteTaskSuspendRequestMutation } from 'features/tasks/api/endpoints/tasks.endpoints'
import {
  DeleteTaskSuspendRequestRequest,
  DeleteTaskSuspendRequestResponse,
} from 'features/tasks/api/schemas'
import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseDeleteTaskSuspendRequest = CustomUseMutationResult<
  DeleteTaskSuspendRequestRequest,
  DeleteTaskSuspendRequestResponse
>

export const useDeleteTaskSuspendRequest = (): UseDeleteTaskSuspendRequest => {
  const [mutation, state] = useDeleteTaskSuspendRequestMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(deleteTaskSuspendRequestErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
