import { useCreateTaskMutation } from 'features/tasks/api/endpoints/tasks.endpoints'
import { createTaskErrorMessage } from 'features/tasks/api/constants'
import { CreateTaskRequest, CreateTaskResponse } from 'features/tasks/api/schemas'
import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateTaskResult = CustomUseMutationResult<CreateTaskRequest, CreateTaskResponse>

export const useCreateTask = (): UseCreateTaskResult => {
  const [mutation, state] = useCreateTaskMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error) || isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createTaskErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
