import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { GetCountryListQueryArgs, GetCountryListSuccessResponse } from 'modules/country/models'
import { getCountryListMessages } from 'modules/warehouse/constants'
import { useGetCountryListQuery } from 'modules/warehouse/services/countryApi.service'

import { isErrorResponse } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

export type UseGetCountryListResult = CustomUseQueryHookResult<
  GetCountryListQueryArgs,
  GetCountryListSuccessResponse
>

export const useGetCountryList = (
  args?: GetCountryListQueryArgs,
  options?: CustomUseQueryOptions<GetCountryListQueryArgs, GetCountryListSuccessResponse>,
): UseGetCountryListResult => {
  const state = useGetCountryListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getCountryListMessages.commonError)
    }
  }, [state.error])

  return state
}
