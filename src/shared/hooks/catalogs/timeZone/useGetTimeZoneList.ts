import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getTimeZoneListErrorMsg } from 'shared/constants/catalogs'
import {
  GetTimeZoneListQueryArgs,
  GetTimeZoneListSuccessResponse,
} from 'shared/models/catalogs/timeZone'
import { isErrorResponse } from 'shared/services/baseApi'
import { useGetTimeZoneListQuery } from 'shared/services/catalogsApi.service'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTimeZoneListResult = CustomUseQueryHookResult<
  GetTimeZoneListQueryArgs,
  GetTimeZoneListSuccessResponse
>

type UseGetTimeZoneListOptions = CustomUseQueryOptions<
  GetTimeZoneListQueryArgs,
  GetTimeZoneListSuccessResponse
>

export const useGetTimeZoneList = (
  options?: UseGetTimeZoneListOptions,
): UseGetTimeZoneListResult => {
  const state = useGetTimeZoneListQuery(undefined, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getTimeZoneListErrorMsg)
    }
  }, [state.error])

  return state
}
