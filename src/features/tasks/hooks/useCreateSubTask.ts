import { useCreateSubTaskMutation } from 'features/tasks/api/endpoints/tasks.endpoints'
import { createSubTaskErrorMessage } from 'features/tasks/api/constants'
import { CreateSubTaskRequest, CreateSubTaskResponse } from 'features/tasks/api/schemas'
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

type UseCreateSubTaskResult = CustomUseMutationResult<CreateSubTaskRequest, CreateSubTaskResponse>

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
        showErrorNotification(createSubTaskErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
