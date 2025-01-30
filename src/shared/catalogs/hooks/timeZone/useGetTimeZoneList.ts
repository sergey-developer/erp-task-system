import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/services/baseApi'
import { useGetTimeZonesCatalogQuery } from 'shared/catalogs/api/endpoints/timeZonesCatalog'
import { getTimeZonesCatalogErrMsg } from 'shared/catalogs/constants'
import {
  GetTimeZoneListQueryArgs,
  GetTimeZoneListSuccessResponse,
} from 'shared/catalogs/models/timeZones'
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
