import { useCreateRelocationTaskCompletionDocumentsMutation } from 'features/relocationTasks/api/endpoints/relocationTasks.endpoints'
import {
  CreateRelocationTaskCompletionDocumentsRequest,
  CreateRelocationTaskCompletionDocumentsResponse,
} from 'features/warehouse/models'
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

import { createRelocationTaskCompletionDocumentsErrorMessage } from '../api/constants'

type UseCreateRelocationTaskCompletionDocumentsResult = CustomUseMutationResult<
  CreateRelocationTaskCompletionDocumentsRequest,
  CreateRelocationTaskCompletionDocumentsResponse
>

export const useCreateRelocationTaskCompletionDocuments =
  (): UseCreateRelocationTaskCompletionDocumentsResult => {
    const [mutation, state] = useCreateRelocationTaskCompletionDocumentsMutation()

    useEffect(() => {
      if (isErrorResponse(state.error)) {
        if (
          isBadRequestError(state.error) ||
          isForbiddenError(state.error) ||
          isNotFoundError(state.error)
        ) {
          showErrorNotification(getErrorDetail(state.error))
        } else {
          showErrorNotification(createRelocationTaskCompletionDocumentsErrorMessage)
        }
      }
    }, [state.error])

    return [mutation, state]
  }
