import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getInventorizationsErrMsg } from 'features/warehouse/constants/inventorization'
import { GetInventorizationsQueryArgs } from 'features/warehouse/models/inventorization'
import { useGetInventorizationsQuery } from 'features/warehouse/services/inventorizationApi.service'
import { GetInventorizationsTransformedSuccessResponse } from 'features/warehouse/types'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/api/baseApi'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetInventorizationsResult = CustomUseQueryHookResult<
  MaybeUndefined<GetInventorizationsQueryArgs>,
  GetInventorizationsTransformedSuccessResponse
>

type UseGetInventorizationsOptions = CustomUseQueryOptions<
  MaybeUndefined<GetInventorizationsQueryArgs>,
  GetInventorizationsTransformedSuccessResponse
>

export const useGetInventorizations = (
  args?: GetInventorizationsQueryArgs,
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
