import { updateTaskDeadlineErrorMessage } from 'features/task/constants/task'
import { UpdateTaskDeadlineRequest, UpdateTaskDeadlineResponse } from 'features/task/models'
import { useUpdateTaskDeadlineMutation } from 'features/task/services/taskApi.service'
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
