import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getInventorizationsErrMsg } from 'modules/warehouse/constants/inventorization'
import { GetInventorizationsQueryArgs } from 'modules/warehouse/models/inventorization'
import { useGetInventorizationsQuery } from 'modules/warehouse/services/inventorizationApi.service'
import { GetInventorizationsTransformedSuccessResponse } from 'modules/warehouse/types'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/services/baseApi'
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
