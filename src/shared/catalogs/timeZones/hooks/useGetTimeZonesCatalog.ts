import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getTimeZonesCatalogErrMsg } from '../api/constants'
import { useGetTimeZonesCatalogQuery } from '../api/endpoints/timeZonesCatalog.endpoints'
import { GetTimeZonesCatalogRequest, GetTimeZonesCatalogResponse } from '../api/schemas'

type UseGetTimeZonesCatalogResult = CustomUseQueryHookResult<
  GetTimeZonesCatalogRequest,
  GetTimeZonesCatalogResponse
>

type UseGetTimeZonesCatalogOptions = CustomUseQueryOptions<
  GetTimeZonesCatalogRequest,
  GetTimeZonesCatalogResponse
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
