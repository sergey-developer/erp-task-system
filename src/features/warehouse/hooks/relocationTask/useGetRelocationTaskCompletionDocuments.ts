import { getRelocationTaskCompletionDocumentsErrMsg } from 'features/warehouse/constants/relocationTask'
import {
  GetRelocationTaskCompletionDocumentsRequest,
  GetRelocationTaskCompletionDocumentsResponse,
} from 'features/warehouse/models'
import { useGetRelocationTaskCompletionDocumentsQuery } from 'features/warehouse/services/relocationTaskApi.service'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

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
        showErrorNotification(getRelocationTaskCompletionDocumentsErrMsg)
      }
    }
  }, [state.error])

  return state
}
