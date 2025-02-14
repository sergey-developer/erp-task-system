import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { cancelSubTaskErrorMessage } from 'features/task/constants/task'
import { CancelSubTaskRequest, CancelSubTaskResponse } from 'features/task/models'
import { useCancelSubTaskMutation } from 'features/task/services/subTaskApi.service'

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
