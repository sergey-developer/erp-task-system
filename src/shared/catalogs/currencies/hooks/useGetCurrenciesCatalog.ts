import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { getCurrenciesCatalogErrMsg } from 'shared/catalogs/api/constants/messages'
import {
  GetCurrenciesCatalogQueryArgs,
  GetCurrenciesCatalogSuccessResponse,
} from 'shared/catalogs/api/dto/currencies'
import { useGetCurrenciesQuery } from 'shared/catalogs/currencies/api/endpoints/currenciesCatalog.endpoints'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetCurrenciesCatalogResult = CustomUseQueryHookResult<
  GetCurrenciesCatalogQueryArgs,
  GetCurrenciesCatalogSuccessResponse
>

type UseGetCurrenciesCatalogOptions = CustomUseQueryOptions<
  GetCurrenciesCatalogQueryArgs,
  GetCurrenciesCatalogSuccessResponse
>

export const useGetCurrenciesCatalog = (
  args?: GetCurrenciesCatalogQueryArgs,
  options?: UseGetCurrenciesCatalogOptions,
): UseGetCurrenciesCatalogResult => {
  const state = useGetCurrenciesQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getCurrenciesCatalogErrMsg)
    }
  }, [state.error])

  return state
}
