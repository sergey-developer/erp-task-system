import { useCreateTaskCompletionDocumentsMutation } from 'features/tasks/api/endpoints/tasks.endpoints'
import { createTaskCompletionDocumentsErrorMessage } from 'features/tasks/api/constants'
import {
  CreateTaskCompletionDocumentsRequest,
  CreateTaskCompletionDocumentsResponse,
} from 'features/tasks/api/schemas'
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

type UseCreateTaskCompletionDocumentsResult = CustomUseMutationResult<
  CreateTaskCompletionDocumentsRequest,
  CreateTaskCompletionDocumentsResponse
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
        showErrorNotification(createTaskCompletionDocumentsErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
