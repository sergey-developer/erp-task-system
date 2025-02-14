import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { createTaskCommentErrMsg } from 'features/task/constants/taskComment'
import {
  CreateTaskCommentRequest,
  CreateTaskCommentResponse,
} from 'features/task/models'
import { useCreateTaskCommentMutation } from 'features/task/services/taskApi.service'

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
        showErrorNotification(createTaskCommentErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
