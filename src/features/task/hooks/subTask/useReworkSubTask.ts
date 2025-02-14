import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { reworkSubTaskErrMsg } from 'features/task/constants/task'
import { ReworkSubTaskRequest, ReworkSubTaskResponse } from 'features/task/models'
import { useReworkSubTaskMutation } from 'features/task/services/subTaskApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseReworkSubTaskResult = CustomUseMutationResult<
  ReworkSubTaskRequest,
  ReworkSubTaskResponse
>

export const useReworkSubTask = (): UseReworkSubTaskResult => {
  const [mutation, state] = useReworkSubTaskMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(reworkSubTaskErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
