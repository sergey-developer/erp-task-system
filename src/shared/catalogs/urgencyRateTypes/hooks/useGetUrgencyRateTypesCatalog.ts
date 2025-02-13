import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

import { getUrgencyRateTypesCatalogErrMsg } from '../api/constants'
import { useGetUrgencyRateTypesCatalogQuery } from '../api/endpoints/urgencyRateTypesCatalog.endpoints'
import {
  GetUrgencyRateTypesCatalogQueryArgs,
  GetUrgencyRateTypesCatalogSuccessResponse,
} from '../api/schemas'

type UseGetUrgencyRateTypesCatalogResult = CustomUseQueryHookResult<
  MaybeUndefined<GetUrgencyRateTypesCatalogQueryArgs>,
  GetUrgencyRateTypesCatalogSuccessResponse
>

type UseGetUrgencyRateTypesCatalogOptions = CustomUseQueryOptions<
  MaybeUndefined<GetUrgencyRateTypesCatalogQueryArgs>,
  GetUrgencyRateTypesCatalogSuccessResponse
>

export const useGetUrgencyRateTypesCatalog = (
  args?: GetUrgencyRateTypesCatalogQueryArgs,
  options?: UseGetUrgencyRateTypesCatalogOptions,
): UseGetUrgencyRateTypesCatalogResult => {
  const state = useGetUrgencyRateTypesCatalogQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getUrgencyRateTypesCatalogErrMsg)
    }
  }, [state.error])

  return state
}
