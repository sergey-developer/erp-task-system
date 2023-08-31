import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getCountryListMessages } from 'modules/warehouse/constants'
import { GetCurrencyListQueryArgs, GetCurrencyListSuccessResponse } from 'modules/warehouse/models'
import { useGetCountryListQuery } from 'modules/warehouse/services/countryApi.service'

import { isErrorResponse } from 'shared/services/api'
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
  const state = useGetCountryListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getCountryListMessages.commonError)
    }
  }, [state.error])

  const fakeData = [
    { id: 1, title: 'Currency 1' },
    { id: 2, title: 'Currency 2' },
  ]

  return { ...state, currentData: fakeData }
}
