import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { resolveTaskErrorMessage } from 'features/task/constants/task'
import { ResolveTaskRequest, ResolveTaskResponse } from 'features/task/models'
import { useResolveTaskMutation } from 'features/task/services/taskApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseResolveTaskResult = CustomUseMutationResult<
  ResolveTaskRequest,
  ResolveTaskResponse
>

export const useResolveTask = (): UseResolveTaskResult => {
  const [mutation, state] = useResolveTaskMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(resolveTaskErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
