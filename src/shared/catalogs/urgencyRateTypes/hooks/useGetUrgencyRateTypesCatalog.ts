import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

import { getUrgencyRateTypesCatalogErrMsg } from '../api/constants'
import { useGetUrgencyRateTypesCatalogQuery } from '../api/endpoints/urgencyRateTypesCatalog.endpoints'
import {
  GetUrgencyRateTypesCatalogRequest,
  GetUrgencyRateTypesCatalogResponse,
} from '../api/schemas'

type UseGetUrgencyRateTypesCatalogResult = CustomUseQueryHookResult<
  MaybeUndefined<GetUrgencyRateTypesCatalogRequest>,
  GetUrgencyRateTypesCatalogResponse
>

type UseGetUrgencyRateTypesCatalogOptions = CustomUseQueryOptions<
  MaybeUndefined<GetUrgencyRateTypesCatalogRequest>,
  GetUrgencyRateTypesCatalogResponse
>

export const useGetUrgencyRateTypesCatalog = (
  args?: GetUrgencyRateTypesCatalogRequest,
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
