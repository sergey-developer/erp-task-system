import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { getUrgencyRateTypesCatalogErrMsg } from 'shared/catalogs/api/constants/messages'
import {
  GetUrgencyRateTypesCatalogQueryArgs,
  GetUrgencyRateTypesCatalogSuccessResponse,
} from 'shared/catalogs/api/dto/urgencyRateTypes'
import { useGetUrgencyRateTypesCatalogQuery } from 'shared/catalogs/urgencyRateTypes/api/endpoints/urgencyRateTypesCatalog.endpoints'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

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
