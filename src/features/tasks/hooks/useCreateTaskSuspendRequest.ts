import { createTaskSuspendRequestErrorMessage } from 'features/tasks/api/constants'
import { useCreateTaskSuspendRequestMutation } from 'features/tasks/api/endpoints/tasks.endpoints'
import {
  CreateTaskSuspendRequestRequest,
  CreateTaskSuspendRequestResponse,
} from 'features/tasks/api/schemas'
import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

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
  const [mutation, state] = useCreateTaskSuspendRequestMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error) || isBadRequestError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createTaskSuspendRequestErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
