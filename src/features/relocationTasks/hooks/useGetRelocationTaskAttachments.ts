import { getRelocationTaskAttachmentsErrorMessage } from 'features/relocationTasks/api/constants'
import { useGetRelocationTaskAttachmentsQuery } from 'features/relocationTasks/api/endpoints/relocationTasks.endpoints'
import {
  GetRelocationTaskAttachmentsRequest,
  GetRelocationTaskAttachmentsResponse,
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
        showErrorNotification(getRelocationTaskAttachmentsErrorMessage)
      }
    }
  }, [state.error])

  return state
}
