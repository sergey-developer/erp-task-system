import { useGetRelocationTaskCompletionDocumentsQuery } from 'features/relocationTasks/api/endpoints/relocationTasks.endpoints'
import {
  GetRelocationTaskCompletionDocumentsRequest,
  GetRelocationTaskCompletionDocumentsResponse,
} from 'features/relocationTasks/api/schemas'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getRelocationTaskCompletionDocumentsErrorMessage } from '../api/constants'

type UseGetRelocationTaskCompletionDocumentsResult = CustomUseQueryHookResult<
  GetRelocationTaskCompletionDocumentsRequest,
  GetRelocationTaskCompletionDocumentsResponse
>

type UseGetRelocationTaskCompletionDocumentsOptions = CustomUseQueryOptions<
  GetRelocationTaskCompletionDocumentsRequest,
  GetRelocationTaskCompletionDocumentsResponse
>

export const useGetRelocationTaskCompletionDocuments = (
  args: GetRelocationTaskCompletionDocumentsRequest,
  options?: UseGetRelocationTaskCompletionDocumentsOptions,
): UseGetRelocationTaskCompletionDocumentsResult => {
  const state = useGetRelocationTaskCompletionDocumentsQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getRelocationTaskCompletionDocumentsErrorMessage)
      }
    }
  }, [state.error])

  return state
}
