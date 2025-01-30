import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getRelocationTaskAttachmentsErrMsg } from 'features/warehouse/constants/relocationTask'
import {
  GetRelocationTaskAttachmentsQueryArgs,
  GetRelocationTaskAttachmentsSuccessResponse,
} from 'features/warehouse/models'
import { useGetRelocationTaskAttachmentsQuery } from 'features/warehouse/services/relocationTaskApi.service'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetRelocationTaskAttachmentsResult = CustomUseQueryHookResult<
  GetRelocationTaskAttachmentsQueryArgs,
  GetRelocationTaskAttachmentsSuccessResponse
>

type UseGetRelocationTaskAttachmentsOptions = CustomUseQueryOptions<
  GetRelocationTaskAttachmentsQueryArgs,
  GetRelocationTaskAttachmentsSuccessResponse
>

export const useGetRelocationTaskAttachments = (
  args: GetRelocationTaskAttachmentsQueryArgs,
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
