import { useTakeTaskMutation } from 'features/tasks/api/endpoints/tasks.endpoints'
import { takeTaskErrorMessage } from 'features/tasks/api/constants'
import { TakeTaskRequest, TakeTaskResponse } from 'features/tasks/api/schemas'
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

type UseTakeTaskResult = CustomUseMutationResult<TakeTaskRequest, TakeTaskResponse>

export const useTakeTask = (): UseTakeTaskResult => {
  const [mutation, state] = useTakeTaskMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(takeTaskErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
