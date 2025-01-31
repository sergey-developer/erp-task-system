import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getRelocationTaskCompletionDocumentsErrMsg } from 'features/warehouse/constants/relocationTask'
import {
  GetRelocationTaskCompletionDocumentsQueryArgs,
  GetRelocationTaskCompletionDocumentsSuccessResponse,
} from 'features/warehouse/models'
import { useGetRelocationTaskCompletionDocumentsQuery } from 'features/warehouse/services/relocationTaskApi.service'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetRelocationTaskCompletionDocumentsResult = CustomUseQueryHookResult<
  GetRelocationTaskCompletionDocumentsQueryArgs,
  GetRelocationTaskCompletionDocumentsSuccessResponse
>

type UseGetRelocationTaskCompletionDocumentsOptions = CustomUseQueryOptions<
  GetRelocationTaskCompletionDocumentsQueryArgs,
  GetRelocationTaskCompletionDocumentsSuccessResponse
>

export const useGetRelocationTaskCompletionDocuments = (
  args: GetRelocationTaskCompletionDocumentsQueryArgs,
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
