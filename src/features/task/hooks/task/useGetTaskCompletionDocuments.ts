import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getTaskCompletionDocumentsErrMsg } from 'features/task/constants/task'
import {
  GetTaskCompletionDocumentsQueryArgs,
  GetTaskCompletionDocumentsSuccessResponse,
} from 'features/task/models'
import { useGetTaskCompletionDocumentsQuery } from 'features/task/services/taskApi.service'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTaskCompletionDocumentsResult = CustomUseQueryHookResult<
  GetTaskCompletionDocumentsQueryArgs,
  GetTaskCompletionDocumentsSuccessResponse
>

type UseGetTaskCompletionDocumentsOptions = CustomUseQueryOptions<
  GetTaskCompletionDocumentsQueryArgs,
  GetTaskCompletionDocumentsSuccessResponse
>

export const useGetTaskCompletionDocuments = (
  args: GetTaskCompletionDocumentsQueryArgs,
  options?: UseGetTaskCompletionDocumentsOptions,
): UseGetTaskCompletionDocumentsResult => {
  const state = useGetTaskCompletionDocumentsQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getTaskCompletionDocumentsErrMsg)
      }
    }
  }, [state.error])

  return state
}
