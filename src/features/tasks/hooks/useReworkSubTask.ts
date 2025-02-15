import { reworkSubTaskErrorMessage } from 'features/tasks/api/constants'
import { useReworkSubTaskMutation } from 'features/tasks/api/endpoints/subTasks.endpoints'
import { ReworkSubTaskRequest, ReworkSubTaskResponse } from 'features/tasks/api/schemas'
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

type UseReworkSubTaskResult = CustomUseMutationResult<ReworkSubTaskRequest, ReworkSubTaskResponse>

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
        showErrorNotification(reworkSubTaskErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
