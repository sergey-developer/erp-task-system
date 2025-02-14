import { GetInventorizationsRequest } from 'features/inventorizations/api/dto'
import { useGetInventorizationsQuery } from 'features/inventorizations/api/endpoints/inventorizations.endpoints'
import { GetInventorizationsTransformedResponse } from 'features/warehouse/types'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/api/baseApi'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

import { getInventorizationsErrMsg } from '../api/constants'

type UseGetInventorizationsResult = CustomUseQueryHookResult<
  MaybeUndefined<GetInventorizationsRequest>,
  GetInventorizationsTransformedResponse
>

type UseGetInventorizationsOptions = CustomUseQueryOptions<
  MaybeUndefined<GetInventorizationsRequest>,
  GetInventorizationsTransformedResponse
>

export const useGetInventorizations = (
  args?: GetInventorizationsRequest,
  options?: UseGetInventorizationsOptions,
): UseGetInventorizationsResult => {
  const state = useGetInventorizationsQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getInventorizationsErrMsg)
      }
    }
  }, [state.error])

  return state
}
