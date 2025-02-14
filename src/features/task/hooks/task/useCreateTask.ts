import { createTaskErrMsg } from 'features/task/constants/task'
import { CreateTaskRequest, CreateTaskResponse } from 'features/task/models'
import { useCreateTaskMutation } from 'features/task/services/taskApi.service'
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
        showErrorNotification(createTaskErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
