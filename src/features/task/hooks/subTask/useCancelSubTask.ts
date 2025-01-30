import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { cancelSubTaskErrMsg } from 'features/task/constants/task'
import { CancelSubTaskMutationArgs, CancelSubTaskSuccessResponse } from 'features/task/models'
import { useCancelSubTaskMutation } from 'features/task/services/subTaskApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCancelSubTaskResult = CustomUseMutationResult<
  CancelSubTaskMutationArgs,
  CancelSubTaskSuccessResponse
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
        showErrorNotification(cancelSubTaskErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
