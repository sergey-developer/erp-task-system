import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getCurrenciesCatalogErrorMessage } from '../api/constants'
import { useGetCurrenciesCatalogQuery } from '../api/endpoints/currenciesCatalog.endpoints'
import { GetCurrenciesCatalogRequest, GetCurrenciesCatalogResponse } from '../api/schemas'

type UseGetCurrenciesCatalogResult = CustomUseQueryHookResult<
  GetCurrenciesCatalogRequest,
  GetCurrenciesCatalogResponse
>

type UseGetCurrenciesCatalogOptions = CustomUseQueryOptions<
  GetCurrenciesCatalogRequest,
  GetCurrenciesCatalogResponse
>

export const useGetCurrenciesCatalog = (
  args?: GetCurrenciesCatalogRequest,
  options?: UseGetCurrenciesCatalogOptions,
): UseGetCurrenciesCatalogResult => {
  const state = useGetCurrenciesCatalogQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getCurrenciesCatalogErrorMessage)
    }
  }, [state.error])

  return state
}
