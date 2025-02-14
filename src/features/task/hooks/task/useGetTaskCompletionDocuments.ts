import { getTaskCompletionDocumentsErrorMessage } from 'features/task/constants/task'
import {
  GetTaskCompletionDocumentsRequest,
  GetTaskCompletionDocumentsResponse,
} from 'features/task/models'
import { useGetTaskCompletionDocumentsQuery } from 'features/task/services/taskApi.service'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTaskCompletionDocumentsResult = CustomUseQueryHookResult<
  GetTaskCompletionDocumentsRequest,
  GetTaskCompletionDocumentsResponse
>

type UseGetTaskCompletionDocumentsOptions = CustomUseQueryOptions<
  GetTaskCompletionDocumentsRequest,
  GetTaskCompletionDocumentsResponse
>

export const useGetTaskCompletionDocuments = (
  args: GetTaskCompletionDocumentsRequest,
  options?: UseGetTaskCompletionDocumentsOptions,
): UseGetTaskCompletionDocumentsResult => {
  const state = useGetTaskCompletionDocumentsQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getTaskCompletionDocumentsErrorMessage)
      }
    }
  }, [state.error])

  return state
}
