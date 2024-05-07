import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getRelocationTaskAttachmentsErrMsg } from 'modules/warehouse/constants/relocationTask'
import {
  GetRelocationTaskAttachmentsQueryArgs,
  GetRelocationTaskAttachmentsSuccessResponse,
} from 'modules/warehouse/models'
import { useGetRelocationTaskAttachmentsQuery } from 'modules/warehouse/services/relocationTaskApi.service'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
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
