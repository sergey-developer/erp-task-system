import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import {
  GetTimeZoneListQueryArgs,
  GetTimeZoneListSuccessResponse,
} from 'shared/catalogs/api/dto/timeZones'
import { useGetTimeZonesCatalogQuery } from 'shared/catalogs/api/endpoints/timeZonesCatalog.endpoints'
import { getTimeZonesCatalogErrMsg } from 'shared/catalogs/constants'
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
  const state = useGetTimeZonesCatalogQuery(undefined, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getTimeZonesCatalogErrMsg)
    }
  }, [state.error])

  return state
}
