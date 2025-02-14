import { createRelocationTaskCompletionDocumentsErrMsg } from 'features/warehouse/constants/relocationTask'
import {
  CreateRelocationTaskCompletionDocumentsRequest,
  CreateRelocationTaskCompletionDocumentsResponse,
} from 'features/warehouse/models'
import { useCreateRelocationTaskCompletionDocumentsMutation } from 'features/warehouse/services/relocationTaskApi.service'
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
          showErrorNotification(createRelocationTaskCompletionDocumentsErrMsg)
        }
      }
    }, [state.error])

    return [mutation, state]
  }
