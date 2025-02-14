import { useCreateRelocationTaskMutation } from 'features/relocationTasks/api/endpoints/relocationTasks.endpoints'
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

import { createRelocationTaskErrorMessage } from '../api/constants'
import { CreateRelocationTaskRequest, CreateRelocationTaskResponse } from '../api/schemas'

type UseCreateRelocationTaskResult = CustomUseMutationResult<
  CreateRelocationTaskRequest,
  CreateRelocationTaskResponse
>

export const useCreateRelocationTask = (): UseCreateRelocationTaskResult => {
  const [mutation, state] = useCreateRelocationTaskMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createRelocationTaskErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
