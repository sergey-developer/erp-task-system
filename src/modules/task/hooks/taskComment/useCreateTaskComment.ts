import { useEffect } from 'react'

import { CustomMutationTrigger, CustomUseMutationResult } from 'lib/rtk-query/types'

import { createTaskCommentMessages } from 'modules/task/constants/taskComment'
import {
  CreateTaskCommentMutationArgs,
  CreateTaskCommentSuccessResponse,
} from 'modules/task/models'
import { useCreateTaskCommentMutation } from 'modules/task/services/taskApi.service'

import {
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateTaskCommentResult = [
  CustomMutationTrigger<CreateTaskCommentMutationArgs, CreateTaskCommentSuccessResponse>,
  CustomUseMutationResult<CreateTaskCommentMutationArgs, CreateTaskCommentSuccessResponse>,
]

export const useCreateTaskComment = (): UseCreateTaskCommentResult => {
  const [mutation, state] = useCreateTaskCommentMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error) && state.error.data.detail) {
        showErrorNotification(state.error.data.detail)
      } else if (isBadRequestError(state.error) && state.error.data.detail) {
        showErrorNotification(state.error.data.detail)
      } else if (isForbiddenError(state.error) && state.error.data.detail) {
        showErrorNotification(state.error.data.detail)
      } else {
        showErrorNotification(createTaskCommentMessages.commonError)
      }
    }
  }, [state.error])

  return [mutation, state]
}
