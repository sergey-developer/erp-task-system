import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getRelocationCompletionDocumentsErrMsg } from 'modules/warehouse/constants/relocationTask'
import {
  GetRelocationCompletionDocumentsQueryArgs,
  GetRelocationCompletionDocumentsSuccessResponse,
} from 'modules/warehouse/models'
import { useGetRelocationCompletionDocumentsQuery } from 'modules/warehouse/services/relocationTaskApi.service'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetRelocationCompletionDocumentsResult = CustomUseQueryHookResult<
  GetRelocationCompletionDocumentsQueryArgs,
  GetRelocationCompletionDocumentsSuccessResponse
>

type UseGetRelocationCompletionDocumentsOptions = CustomUseQueryOptions<
  GetRelocationCompletionDocumentsQueryArgs,
  GetRelocationCompletionDocumentsSuccessResponse
>

export const useGetRelocationCompletionDocuments = (
  args: GetRelocationCompletionDocumentsQueryArgs,
  options?: UseGetRelocationCompletionDocumentsOptions,
): UseGetRelocationCompletionDocumentsResult => {
  const state = useGetRelocationCompletionDocumentsQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getRelocationCompletionDocumentsErrMsg)
      }
    }
  }, [state.error])

  return state
}
