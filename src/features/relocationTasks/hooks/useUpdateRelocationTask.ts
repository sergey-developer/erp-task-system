import { useUpdateRelocationTaskMutation } from 'features/relocationTasks/api/endpoints/relocationTasks.endpoints'
import { updateRelocationTaskErrorMessage } from 'features/relocationTasks/constants'
import {
  UpdateRelocationTaskRequest,
  UpdateRelocationTaskResponse,
} from 'features/warehouse/models'
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

type UseUpdateRelocationTaskResult = CustomUseMutationResult<
  UpdateRelocationTaskRequest,
  UpdateRelocationTaskResponse
>

export const useUpdateRelocationTask = (): UseUpdateRelocationTaskResult => {
  const [mutation, state] = useUpdateRelocationTaskMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(updateRelocationTaskErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
