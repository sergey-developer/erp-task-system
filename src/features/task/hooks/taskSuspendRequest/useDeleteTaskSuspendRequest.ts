import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { deleteSuspendRequestErrorMessage } from 'features/task/constants/taskSuspendRequest'
import {
  DeleteTaskSuspendRequestRequest,
  DeleteTaskSuspendRequestResponse,
} from 'features/task/models'
import { useDeleteSuspendRequestMutation } from 'features/task/services/taskApi.service'

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
  const [mutation, state] = useDeleteSuspendRequestMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(deleteSuspendRequestErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
