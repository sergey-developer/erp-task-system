import { getRelocationTaskAttachmentsErrMsg } from 'features/warehouse/constants/relocationTask'
import {
  GetRelocationTaskAttachmentsRequest,
  GetRelocationTaskAttachmentsResponse,
} from 'features/warehouse/models'
import { useGetRelocationTaskAttachmentsQuery } from 'features/warehouse/services/relocationTaskApi.service'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetRelocationTaskAttachmentsResult = CustomUseQueryHookResult<
  GetRelocationTaskAttachmentsRequest,
  GetRelocationTaskAttachmentsResponse
>

type UseGetRelocationTaskAttachmentsOptions = CustomUseQueryOptions<
  GetRelocationTaskAttachmentsRequest,
  GetRelocationTaskAttachmentsResponse
>

export const useGetRelocationTaskAttachments = (
  args: GetRelocationTaskAttachmentsRequest,
  options?: UseGetRelocationTaskAttachmentsOptions,
): UseGetRelocationTaskAttachmentsResult => {
  const state = useGetRelocationTaskAttachmentsQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else if (isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getRelocationTaskAttachmentsErrMsg)
      }
    }
  }, [state.error])

  return state
}
