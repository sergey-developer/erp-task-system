import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { deleteSuspendRequestErrMsg } from 'features/task/constants/taskSuspendRequest'
import {
  DeleteTaskSuspendRequestMutationArgs,
  DeleteTaskSuspendRequestSuccessResponse,
} from 'features/task/models'
import { useDeleteSuspendRequestMutation } from 'features/task/services/taskApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseDeleteTaskSuspendRequest = CustomUseMutationResult<
  DeleteTaskSuspendRequestMutationArgs,
  DeleteTaskSuspendRequestSuccessResponse
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
        showErrorNotification(deleteSuspendRequestErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
