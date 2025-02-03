import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { getTimeZonesCatalogErrMsg } from 'shared/catalogs/api/constants/errorMessages'
import { useGetTimeZonesCatalogQuery } from 'shared/catalogs/timeZones/api/endpoints/timeZonesCatalog.endpoints'
import {
  GetTimeZonesCatalogQueryArgs,
  GetTimeZonesCatalogSuccessResponse,
} from 'shared/catalogs/timeZones/api/schemas/getTimeZonesCatalog.schema'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTimeZonesCatalogResult = CustomUseQueryHookResult<
  GetTimeZonesCatalogQueryArgs,
  GetTimeZonesCatalogSuccessResponse
>

type UseGetTimeZonesCatalogOptions = CustomUseQueryOptions<
  GetTimeZonesCatalogQueryArgs,
  GetTimeZonesCatalogSuccessResponse
>

export const useGetTimeZonesCatalog = (
  options?: UseGetTimeZonesCatalogOptions,
): UseGetTimeZonesCatalogResult => {
  const state = useGetTimeZonesCatalogQuery(undefined, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getTimeZonesCatalogErrMsg)
    }
  }, [state.error])

  return state
}
