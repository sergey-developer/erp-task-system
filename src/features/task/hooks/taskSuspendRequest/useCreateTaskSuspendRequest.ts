import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { createSuspendRequestErrMsg } from 'features/task/constants/taskSuspendRequest'
import {
  CreateTaskSuspendRequestRequest,
  CreateTaskSuspendRequestResponse,
} from 'features/task/models'
import { useCreateSuspendRequestMutation } from 'features/task/services/taskApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateTaskSuspendRequestResult = CustomUseMutationResult<
  CreateTaskSuspendRequestRequest,
  CreateTaskSuspendRequestResponse
>

export const useCreateTaskSuspendRequest = (): UseCreateTaskSuspendRequestResult => {
  const [mutation, state] = useCreateSuspendRequestMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error) || isBadRequestError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createSuspendRequestErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
