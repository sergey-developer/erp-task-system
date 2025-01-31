import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { getCurrenciesErrMsg } from 'shared/catalogs/api/constants/errorMessages'
import {
  GetCurrencyListQueryArgs,
  GetCurrencyListSuccessResponse,
} from 'shared/catalogs/api/dto/currencies'
import { useGetCurrenciesQuery } from 'shared/catalogs/api/endpoints/currenciesCatalog.endpoints'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetCurrencyListResult = CustomUseQueryHookResult<
  GetCurrencyListQueryArgs,
  GetCurrencyListSuccessResponse
>

type UseGetCurrencyListOptions = CustomUseQueryOptions<
  GetCurrencyListQueryArgs,
  GetCurrencyListSuccessResponse
>

export const useGetCurrencyList = (
  args?: GetCurrencyListQueryArgs,
  options?: UseGetCurrencyListOptions,
): UseGetCurrencyListResult => {
  const state = useGetCurrenciesQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getCurrenciesErrMsg)
    }
  }, [state.error])

  return state
}
