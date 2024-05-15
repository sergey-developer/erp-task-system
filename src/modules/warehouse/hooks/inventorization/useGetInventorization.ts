import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getInventorizationErrMsg } from 'modules/warehouse/constants/inventorization'
import {
  GetInventorizationQueryArgs,
  GetInventorizationSuccessResponse,
} from 'modules/warehouse/models'
import { useGetInventorizationQuery } from 'modules/warehouse/services/inventorizationApi.service'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetInventorizationResult = CustomUseQueryHookResult<
  GetInventorizationQueryArgs,
  GetInventorizationSuccessResponse
>

type UseGetInventorizationOptions = CustomUseQueryOptions<
  GetInventorizationQueryArgs,
  GetInventorizationSuccessResponse
>

export const useGetInventorization = (
  args: GetInventorizationQueryArgs,
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
