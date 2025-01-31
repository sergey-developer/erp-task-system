import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { updateTaskDeadlineErrMsg } from 'features/task/constants/task'
import {
  UpdateTaskDeadlineMutationArgs,
  UpdateTaskDeadlineSuccessResponse,
} from 'features/task/models'
import { useUpdateTaskDeadlineMutation } from 'features/task/services/taskApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseUpdateTaskDeadlineResult = CustomUseMutationResult<
  UpdateTaskDeadlineMutationArgs,
  UpdateTaskDeadlineSuccessResponse
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
        showErrorNotification(updateTaskDeadlineErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
