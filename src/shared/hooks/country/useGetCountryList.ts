import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getCountryListMessages } from 'shared/constants/country'
import { GetCountryListQueryArgs, GetCountryListSuccessResponse } from 'shared/models/country'
import { isErrorResponse } from 'shared/services/baseApi'
import { useGetCountryListQuery } from 'shared/services/countryApi.service'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetCountryListResult = CustomUseQueryHookResult<
  GetCountryListQueryArgs,
  GetCountryListSuccessResponse
>

type UseGetCountryListOptions = CustomUseQueryOptions<
  GetCountryListQueryArgs,
  GetCountryListSuccessResponse
>

export const useGetCountryList = (
  args?: GetCountryListQueryArgs,
  options?: UseGetCountryListOptions,
): UseGetCountryListResult => {
  const state = useGetCountryListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getCountryListMessages.commonError)
    }
  }, [state.error])

  return state
}
