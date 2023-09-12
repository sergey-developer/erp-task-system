import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { GetWorkTypeListQueryArgs, GetWorkTypeListSuccessResponse } from 'modules/warehouse/models'

import { getCountryListMessages } from 'shared/constants/country'
import { isErrorResponse } from 'shared/services/baseApi'
import { useGetCountryListQuery } from 'shared/services/countryApi.service'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetWorkTypeListResult = CustomUseQueryHookResult<
  GetWorkTypeListQueryArgs,
  GetWorkTypeListSuccessResponse
>

type UseGetWorkTypeListOptions = CustomUseQueryOptions<
  GetWorkTypeListQueryArgs,
  GetWorkTypeListSuccessResponse
>

export const useGetWorkTypeList = (
  args?: GetWorkTypeListQueryArgs,
  options?: UseGetWorkTypeListOptions,
): UseGetWorkTypeListResult => {
  const state = useGetCountryListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getCountryListMessages.commonError)
    }
  }, [state.error])

  const fakeData = [
    { id: 1, title: 'WorkType 1' },
    { id: 2, title: 'WorkType 2' },
  ]

  return { ...state, currentData: fakeData }
}
