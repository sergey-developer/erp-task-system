import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getLocationListMessages } from 'shared/constants/catalogs'
import {
  GetLocationListQueryArgs,
  GetLocationListSuccessResponse,
} from 'shared/models/catalogs/location'
import { isErrorResponse, isForbiddenError } from 'shared/services/baseApi'
import { useGetLocationListQuery } from 'shared/services/catalogsApi.service'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetLocationListResult = CustomUseQueryHookResult<
  GetLocationListQueryArgs,
  GetLocationListSuccessResponse
>

type UseGetLocationListOptions = CustomUseQueryOptions<
  GetLocationListQueryArgs,
  GetLocationListSuccessResponse
>

export const useGetLocationList = (
  args?: GetLocationListQueryArgs,
  options?: UseGetLocationListOptions,
): UseGetLocationListResult => {
  const state = useGetLocationListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) && state.error.data.detail) {
        showErrorNotification(state.error.data.detail)
      } else {
        showErrorNotification(getLocationListMessages.commonError)
      }
    }
  }, [state.error])

  return state
}
