import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getCurrenciesCatalogErrMsg } from '../api/constants'
import { useGetCurrenciesCatalogQuery } from '../api/endpoints/currenciesCatalog.endpoints'
import { GetCurrenciesCatalogQueryArgs, GetCurrenciesCatalogSuccessResponse } from '../api/schemas'

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
  const state = useGetCurrenciesCatalogQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getCurrenciesCatalogErrMsg)
    }
  }, [state.error])

  return state
}
