import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import {
  GetUrgencyRateTypesQueryArgs,
  GetUrgencyRateTypesSuccessResponse,
} from 'shared/catalogs/api/dto/urgencyRateTypes'
import { useGetUrgencyRateTypesCatalogQuery } from 'shared/catalogs/api/endpoints/urgencyRateTypesCatalog.endpoints'
import { getUrgencyRateTypesErrMsg } from 'shared/catalogs/constants'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetUrgencyRateTypesResult = CustomUseQueryHookResult<
  MaybeUndefined<GetUrgencyRateTypesQueryArgs>,
  GetUrgencyRateTypesSuccessResponse
>

type UseGetUrgencyRateTypesOptions = CustomUseQueryOptions<
  MaybeUndefined<GetUrgencyRateTypesQueryArgs>,
  GetUrgencyRateTypesSuccessResponse
>

export const useGetUrgencyRateTypes = (
  args?: GetUrgencyRateTypesQueryArgs,
  options?: UseGetUrgencyRateTypesOptions,
): UseGetUrgencyRateTypesResult => {
  const state = useGetUrgencyRateTypesCatalogQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getUrgencyRateTypesErrMsg)
    }
  }, [state.error])

  return state
}
