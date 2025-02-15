import { updateTaskDeadlineErrorMessage } from 'features/tasks/api/constants'
import { useUpdateTaskDeadlineMutation } from 'features/tasks/api/endpoints/tasks.endpoints'
import { UpdateTaskDeadlineRequest, UpdateTaskDeadlineResponse } from 'features/tasks/api/schemas'
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

type UseUpdateTaskDeadlineResult = CustomUseMutationResult<
  UpdateTaskDeadlineRequest,
  UpdateTaskDeadlineResponse
>

export const useUpdateTaskDeadline = (): UseUpdateTaskDeadlineResult => {
  const [mutation, state] = useUpdateTaskDeadlineMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(updateTaskDeadlineErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
