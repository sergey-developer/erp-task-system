import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getCurrencyListMessages } from 'shared/constants/currency'
import { GetCurrencyListQueryArgs, GetCurrencyListSuccessResponse } from 'shared/models/currency'
import { isErrorResponse } from 'shared/services/baseApi'
import { useGetCurrencyListQuery } from 'shared/services/currencyApi.service'
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
  const state = useGetCurrencyListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getCurrencyListMessages.commonError)
    }
  }, [state.error])

  return state
}
