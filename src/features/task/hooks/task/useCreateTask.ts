import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { createTaskErrMsg } from 'features/task/constants/task'
import { CreateTaskMutationArgs, CreateTaskSuccessResponse } from 'features/task/models'
import { useCreateTaskMutation } from 'features/task/services/taskApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
} from 'shared/api/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateTaskResult = CustomUseMutationResult<
  CreateTaskMutationArgs,
  CreateTaskSuccessResponse
>

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
