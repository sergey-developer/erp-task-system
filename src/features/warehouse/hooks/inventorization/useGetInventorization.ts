import { getInventorizationErrMsg } from 'features/warehouse/constants/inventorization'
import { GetInventorizationRequest, GetInventorizationResponse } from 'features/warehouse/models'
import { useGetInventorizationQuery } from 'features/warehouse/services/inventorizationApi.service'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetInventorizationResult = CustomUseQueryHookResult<
  GetInventorizationRequest,
  GetInventorizationResponse
>

type UseGetInventorizationOptions = CustomUseQueryOptions<
  GetInventorizationRequest,
  GetInventorizationResponse
>

export const useGetInventorization = (
  args: GetInventorizationRequest,
  options?: UseGetInventorizationOptions,
): UseGetInventorizationResult => {
  const state = useGetInventorizationQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getInventorizationErrMsg)
      }
    }
  }, [state.error])

  return state
}
