import { useGetInventorizationQuery } from 'features/inventorizations/api/endpoints/inventorizations.endpoints'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getInventorizationErrorMessage } from '../api/constants'
import { GetInventorizationRequest, GetInventorizationResponse } from '../api/schemas'

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
        showErrorNotification(getInventorizationErrorMessage)
      }
    }
  }, [state.error])

  return state
}
