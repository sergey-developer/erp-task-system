import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { createSubTaskErrMsg } from 'features/task/constants/task'
import { CreateSubTaskRequest, CreateSubTaskResponse } from 'features/task/models'
import { useCreateSubTaskMutation } from 'features/task/services/taskApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateSubTaskResult = CustomUseMutationResult<
  CreateSubTaskRequest,
  CreateSubTaskResponse
>

export const useCreateSubTask = (): UseCreateSubTaskResult => {
  const [mutation, state] = useCreateSubTaskMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createSubTaskErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
