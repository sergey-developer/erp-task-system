import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { createTaskCompletionDocumentsErrMsg } from 'features/task/constants/task'
import {
  CreateTaskCompletionDocumentsMutationArgs,
  CreateTaskCompletionDocumentsSuccessResponse,
} from 'features/task/models'
import { useCreateTaskCompletionDocumentsMutation } from 'features/task/services/taskApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateTaskCompletionDocumentsResult = CustomUseMutationResult<
  CreateTaskCompletionDocumentsMutationArgs,
  CreateTaskCompletionDocumentsSuccessResponse
>

export const useCreateTaskCompletionDocuments = (): UseCreateTaskCompletionDocumentsResult => {
  const [mutation, state] = useCreateTaskCompletionDocumentsMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createTaskCompletionDocumentsErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
