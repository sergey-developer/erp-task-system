import { createTaskCommentErrorMessage } from 'features/tasks/api/constants'
import { useCreateTaskCommentMutation } from 'features/tasks/api/endpoints/tasks.endpoints'
import { CreateTaskCommentRequest, CreateTaskCommentResponse } from 'features/tasks/api/schemas'
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

type UseCreateTaskCommentResult = CustomUseMutationResult<
  CreateTaskCommentRequest,
  CreateTaskCommentResponse
>

export const useCreateTaskComment = (): UseCreateTaskCommentResult => {
  const [mutation, state] = useCreateTaskCommentMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isNotFoundError(state.error) ||
        isBadRequestError(state.error) ||
        isForbiddenError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createTaskCommentErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
