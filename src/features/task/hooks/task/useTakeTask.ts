import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { takeTaskErrorMessage } from 'features/task/constants/task'
import { TakeTaskRequest, TakeTaskResponse } from 'features/task/models'
import { useTakeTaskMutation } from 'features/task/services/taskApi.service'

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
