import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { createTaskCommentErrorMsg } from 'modules/task/constants/taskComment'
import {
  CreateTaskCommentMutationArgs,
  CreateTaskCommentSuccessResponse,
} from 'modules/task/models'
import { useCreateTaskCommentMutation } from 'modules/task/services/taskApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateTaskCommentResult = CustomUseMutationResult<
  CreateTaskCommentMutationArgs,
  CreateTaskCommentSuccessResponse
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
        showErrorNotification(createTaskCommentErrorMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
