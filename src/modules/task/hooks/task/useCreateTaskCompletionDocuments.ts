import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { createTaskCompletionDocumentsErrMsg } from 'modules/task/constants/task'
import {
  CreateTaskCompletionDocumentsMutationArgs,
  CreateTaskCompletionDocumentsSuccessResponse,
} from 'modules/task/models'
import { useCreateTaskCompletionDocumentsMutation } from 'modules/task/services/taskApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
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
