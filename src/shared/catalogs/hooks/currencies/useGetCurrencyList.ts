import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/services/baseApi'
import { useGetCurrenciesQuery } from 'shared/catalogs/api/endpoints/currenciesCatalog'
import {
  GetCurrencyListQueryArgs,
  GetCurrencyListSuccessResponse,
} from 'shared/catalogs/models/currencies'
import { getCurrencyListMessages } from 'shared/constants/currency'
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
      showErrorNotification(getCurrencyListMessages.commonError)
    }
  }, [state.error])

  return state
}
