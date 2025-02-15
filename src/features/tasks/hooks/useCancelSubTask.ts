import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { cancelSubTaskErrorMessage } from 'features/tasks/api/constants'
import { CancelSubTaskRequest, CancelSubTaskResponse } from 'features/tasks/api/schemas'
import { useCancelSubTaskMutation } from 'features/tasks/api/endpoints/subTasks.endpoints'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCancelSubTaskResult = CustomUseMutationResult<
  CancelSubTaskRequest,
  CancelSubTaskResponse
>

export const useCancelSubTask = (): UseCancelSubTaskResult => {
  const [mutation, state] = useCancelSubTaskMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(cancelSubTaskErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
